import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function Lab2({ isDarkTheme, setIsDarkTheme }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const result = await response.json();
      if (response.ok) {
        setImage(result.message);
      } else {
        throw new Error('Не удалось получить изображение');
      }
    } catch (err) {
      setError('Ошибка загрузки изображения');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>Случайная фотография собаки</Text>

      {loading ? (
        <ActivityIndicator size="large" color={isDarkTheme ? "#fff" : "#000"} />
      ) : error ? (
        <Text style={[styles.error, isDarkTheme ? styles.darkText : styles.lightText]}>{error}</Text>
      ) : (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <Button title="Обновить" onPress={fetchDogImage} />
      <Button
        title={isDarkTheme ? "Светлая тема" : "Тёмная тема"}
        onPress={() => setIsDarkTheme(!isDarkTheme)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});
