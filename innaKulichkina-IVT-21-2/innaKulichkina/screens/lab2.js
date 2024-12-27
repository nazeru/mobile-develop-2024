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
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>Cat Fact</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#dedad7" />
      ) : (
        <Text style={[styles.factText, { color: isDarkMode ? '#fff' : '#333' }]}>{fact}</Text>
      )}
      <TouchableOpacity style={[styles.ovalButton, { backgroundColor: isDarkMode ? '#fff' : '#333' }]} onPress={fetchCatFact}>
        <Text style={{color: isDarkMode ? '#333' : '#fff' , fontWeight: 'bold'}}>Get Another Fact</Text>
      </TouchableOpacity>
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
  ovalButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 10,
  }
  
});

export default CatFactApp;
