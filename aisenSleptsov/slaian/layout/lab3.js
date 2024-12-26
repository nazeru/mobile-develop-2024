import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

const Lab3 = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const getCountry = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const randomCountry = data[Math.floor(Math.random() * data.length)].name.common;
      setCountry(randomCountry);
    } catch (error) {
      console.error('Error fetching country:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Country:</Text>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text style={styles.text}>{country}</Text>}
      <Button title="Get Country" onPress={getCountry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 15,
  },
});

export default Lab3;