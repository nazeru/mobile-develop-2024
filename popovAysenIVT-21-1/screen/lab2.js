import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function App() {
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
    <View style={styles.container}>
      <Text style={styles.title}>Случайная фотография собаки</Text>
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Загрузка...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <Button title="Обновить" onPress={fetchDogImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});
