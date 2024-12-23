import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SumCalculator() {
  const { isDarkTheme } = useTheme();
  const [input, setInput] = useState('');

  const sum = useMemo(() => {
    console.log('Подсчитываем сумму чисел...');
    return input.split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num))
      .reduce((acc, curr) => acc + curr, 0);
  }, [input]);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>
        Введите числа через запятую:
      </Text>
      <TextInput
        style={[styles.input, isDarkTheme ? styles.darkInput : styles.lightInput]}
        value={input}
        onChangeText={(newText) => setInput(newText)}
        placeholder="Например: 1, 3"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
      />
      <Text style={[styles.sum, isDarkTheme ? styles.darkText : styles.lightText]}>
        Сумма чисел: {sum}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#ffffe4e1',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  input: {
    width: '60%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 18,
  },
  darkInput: {
    borderColor: '#888',
    backgroundColor: '#444',
    color: '#ffffff',
  },
  lightInput: {
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
