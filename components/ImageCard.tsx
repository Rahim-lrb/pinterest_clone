import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { wp, hp } from '@/helpers/common';  // Assuming you are using these helpers for responsive dimensions

const ImageCard = ({ img }) => {
    console.log("signlllllllllllllllllllllllllllllllll")
    console.log(img)
  return (
    <View style={styles.card}>
      <Image source={{ uri: img.url }} style={styles.image} />
      <Text style={styles.title}>{img.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: wp(2),
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: wp(45),  // Each image takes half the width minus margins
    height: hp(25),
    resizeMode: 'cover',
  },
  title: {
    padding: 10,
    fontSize: hp(2),
    textAlign: 'center',
  },
});

export default ImageCard;
