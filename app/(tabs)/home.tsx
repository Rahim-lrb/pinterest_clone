import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { theme } from '@/constants/Theme';
import { hp, wp } from '@/helpers/common';
import { Feather, Ionicons } from '@expo/vector-icons';
import Categories from '@/components/Categories';
import { apiCall } from '@/api';
import ImageGrid from '@/components/ImageGrid';

var page = 1;

export default function Home() {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    handleClearSearch();
    page = 1;
    let params = { page };
    if (cat) params.category = cat;

    // setImages([]); 
    fetchImages(params, false);
  };

  const handleClearSearch = () => {
    setSearch(''); // Clear the state
    searchInputRef.current.clear(); // Clear the TextInput field
    searchInputRef.current.focus(); // Refocus the search bar
    fetchImages(); // Fetch default images when search is cleared
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 0) {
      page = 1;
      setImages([]);
      fetchImages({ page, q: text }, false);
    } else {
      page = 1;
      setImages([]);
      fetchImages({ page }, false);
    }
  };

  const fetchImages = async (params = { page: 1 }, append = false) => {
    try {
      let res = await apiCall(params);
      if (res.hits) {
        if (append) {
          setImages((prevImages) => [...prevImages, ...res.hits]);
        } else {
          setImages(res.hits);
        }
      }
    } catch (error) {
      console.log('Error fetching images:', error.message);
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome name="bars" size={22} color={theme.colors.neutral(0.7)} />
        </Pressable>
      </View>
      {/* search bar */}
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
          </View>
          <TextInput
            placeholder="search for images..."
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch} // Use the updated handleSearch directly
            ref={searchInputRef} // attach the ref
          />
          {search.length > 0 && ( // Ensure the close icon is displayed when there’s input
            <Pressable style={styles.closeIcon} onPress={handleClearSearch}>
              <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
            </Pressable>
          )}
        </View>
        {/* categories */}
        <View style={styles.categories}>
          <Categories 
            activeCategory={activeCategory} 
            handleChangeCategory={handleChangeCategory} 
          />
        </View>
        {/* image grid */}
        <View>
          {images.length > 0 && <ImageGrid images={images} />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.neutral(0.9),
    fontSize: hp(4),
    fontWeight: theme.fonts.semibold,
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.3),
    borderRadius: theme.radius.sm,
    padding: 8,
  },
  categories: {
    marginHorizontal: wp(4),
  },
});
