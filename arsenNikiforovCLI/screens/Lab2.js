// screens/Lab2.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import useTheme from '../hooks/useTheme';

const { width } = Dimensions.get('window');

const Lab2 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const colors = useTheme();
  const [savedImages, setSavedImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=ClspQNLxhvMh10IcVPSRUzwwQqwbcaoM4hiSKNQv'
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [imageIndex]);

  const handleSavePicture = () => {
    if (data && !savedImages.includes(data.url)) {
      setSavedImages((prev) => [...prev, data.url]);
    }
  };

  const handleLoadNext = () => {
    setImageIndex((prev) => prev + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.text} />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, { backgroundColor: colors.buttonBackground }]}
              onPress={handleSavePicture}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Save Picture</Text>
            </TouchableOpacity>

            <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
            <Image source={{ uri: data.url }} style={styles.image} />
            <Text style={[styles.description, { color: colors.text }]}>
              {data.explanation}
            </Text>

            <View style={styles.savedContainer}>
              <Text style={[styles.savedText, { color: colors.text }]}>
                Saved Pictures:
              </Text>
              {savedImages.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={styles.savedImage} />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, styles.loadButton, { backgroundColor: colors.buttonBackground }]}
        onPress={handleLoadNext}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Load Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 20,
    flexGrow: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  saveButton: {
    marginBottom: 20,
  },
  loadButton: {
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PixelFont',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'PixelFont',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PixelFont',
    marginBottom: 20,
  },
  savedText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'PixelFont',
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  savedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  savedImage: {
    width: width - 60,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Lab2;