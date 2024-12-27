import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity  } from 'react-native';
import { useTheme } from '../ThemeContext';

const CatFactApp = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCatFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error('Error fetching the cat fact:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#333' : '#fff' },
      ]}
    >
      <Text style={styles.title}>Cat Fact</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.factText}>{fact}</Text>
      )}
      <Button title="Get Another Fact" onPress={fetchCatFact} />
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.emojiText}>
          {isDarkMode ? '🌞' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  factText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  themeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  emojiText: {
    fontSize: 30,
  },
});

export default CatFactApp;
