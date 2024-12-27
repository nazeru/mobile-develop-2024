// JokeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const JokeScreen = () => {
  const { isDarkTheme } = useTheme(); // Get the current theme
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke(); // Fetch joke on component mount
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <Text style={[styles.joke, { color: isDarkTheme ? '#fff' : '#000' }]}>{joke}</Text>
      <Button title="Get Another Joke" onPress={fetchJoke} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joke: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default JokeScreen;
