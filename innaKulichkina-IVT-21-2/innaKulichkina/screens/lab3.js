import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';

const calculateFactorial = (n) => {
  console.log('Вычисляем факториал...');
  if (n < 0) return 'Нет значения';
  return n === 0 ? 1 : n * calculateFactorial(n - 1);
};

const Lab3 = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [input, setInput] = useState('');
  const [number, setNumber] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const factorial = useMemo(() => {
    console.log(`useMemo пересчёт для числа: ${number}`);
    setIsCalculating(true);
    const result = calculateFactorial(number);
    setTimeout(() => setIsCalculating(false), 300);
    return result;
  }, [number]);

  const handleChange = (text) => {
    setInput(text);
    if (text === '') {
      return;
    }
  
    const parsedNumber = parseInt(text, 10);
    if (!isNaN(parsedNumber) && parsedNumber !== number) {
      setNumber(parsedNumber);
    }
  };
  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#333' : '#fff' },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}>
        Факториал
      </Text>
      <TextInput
        style={[styles.input, { color: isDarkMode ? '#fff' : '#333' }]}
        keyboardType="numeric"
        value={input}
        onChangeText={handleChange}
      />
      <Text style={[styles.result, { color: isDarkMode ? '#fff' : '#333' }]}>
        {input === ''
          ? 'Введите число'
          : isCalculating
          ? 'Вычисляем факториал...'
          : `Факториал числа ${number}: ${factorial}`}
      </Text>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.emojiText}>{isDarkMode ? '🌞' : '🌙'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  renderCount: {
    fontSize: 16,
    marginBottom: 10,
    color: '#6c757d',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
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

export default Lab3;
