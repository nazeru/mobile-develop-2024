// screens/SavedImage.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import useTheme from '../hooks/useTheme';

const SavedImage = ({ route }) => {
  const { imageUrl } = route.params;
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={[styles.text, { color: colors.text }]}>Saved Image</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'PixelFont',
  },
});

export default SavedImage;