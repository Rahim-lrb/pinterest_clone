import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { data } from '@/constants/Data';
import { hp, wp } from '@/helpers/common';
import { theme } from '@/constants/Theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function Categories({ activeCategory, handleChangeCategory }) {
  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
        data={data.categories}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <CategoryItem
            title={item}
            index={index}
            isActive={activeCategory === item} // Compare against the active category
            handleChangeCategory={handleChangeCategory}
          />
        )}
      />
    </View>
  );
}

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  let backgroundColor = isActive ? 'black' : theme.colors.white;
  let color = isActive ? 'white' : theme.colors.neutral(0.8);

  return (
    <Animated.View entering={FadeInRight.delay(index * 200).duration(1000).springify().damping(14)}>
      <Pressable
        style={[styles.category, { backgroundColor }]}
        onPress={() => handleChangeCategory(title)} // Call the handler with the category title
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium,
  },
});
