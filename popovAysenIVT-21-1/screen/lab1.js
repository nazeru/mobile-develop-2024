import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Lab1({ isDarkTheme, setIsDarkTheme }) {
  const [count, setCount] = useState(0);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDarkTheme ? styles.darkText : styles.lightText]}>Счётчик: {count}</Text>
      <Button title="Увеличить" onPress={() => setCount(count + 1)} />
      <Button title="Сбросить" onPress={() => setCount(0)} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});
