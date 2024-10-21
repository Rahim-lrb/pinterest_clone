import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';

const ImageCard = ({ image }) => {
  // Calculate height based on aspect ratio
  const aspectRatio = image.imageWidth / image.imageHeight;
  const width = '100%'; // Set to full width for responsive design
  const height = width / aspectRatio;

  return (
    <View style={[styles.card, { height: height > 200 ? height : 200 }]}>
      <Image source={{ uri: image.largeImageURL }} style={styles.image} />
      <Text style={styles.title}>{image.user}</Text>
    </View>
  );
};

export default function ImageGrid({ images }) {
  return (
    <MasonryList
      data={images} 
      numColumns={2} 
      renderItem={({ item }) => <ImageCard image={item} />} 
      keyExtractor={(item) => item.id.toString()} 
      contentContainerStyle={styles.container} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%', // Fill the card's height
    resizeMode: 'cover',
  },
  title: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
