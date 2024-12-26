import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setRandomCountry } from '../store/store';

export default function Lab2() {
  const [loading, setLoading] = useState(false);
  const randomCountry = useSelector(state => state.global.randomCountry);
  const dispatch = useDispatch();

  const fetchRandomCountry = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const countryName = data[randomIndex].name.common;
      console.log("Fetched Country: ", countryName);
      dispatch(setRandomCountry(countryName));
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Random Country from Redux: ", randomCountry);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Страна:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Text style={styles.countryName}>{randomCountry}</Text>
      )}

      <Button title="START" onPress={fetchRandomCountry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryName: {
    fontSize: 24,
    marginVertical: 20,
  },
});