import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Lab3({ isDarkTheme, setIsDarkTheme }) {
  const [inputValue, setInputValue] = useState('');
  const [calculations, setCalculations] = useState([]);

  const handleCalculate = () => {
    const num = parseFloat(inputValue);

    if (isNaN(num)) {
      return;
    }

    const start = performance.now();
    const calcResult = (num ** 2 + 3 * num - 10) / 2;
    const end = performance.now();
    const timeTaken = end - start;

    setCalculations(prevState => [
      ...prevState,
      { input: inputValue, result: calcResult, time: timeTaken },
    ]);
  };

  const cachedResult = useMemo(() => {
    return calculations.find(calc => calc.input === inputValue);
  }, [inputValue, calculations]);

  const formattedTime = cachedResult ? cachedResult.time.toFixed(3) : '-';

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkTheme ? styles.darkText : styles.lightText]}>Формула: (число ** 2 + 3 * число - 10) / 2</Text>

      <TextInput
        style={[styles.input, isDarkTheme ? styles.darkInput : styles.lightInput]}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Введите число"
      />

      <Button title="Вычислить" onPress={handleCalculate} />

      <Text style={[styles.resultText, isDarkTheme ? styles.darkText : styles.lightText]}>
        {cachedResult ? `Результат: ${cachedResult.result}` : 'Результат: -'}
      </Text>

      <Text style={[styles.timeText, isDarkTheme ? styles.darkText : styles.lightText]}>
        Время расчета: {formattedTime !== '-' ? `${formattedTime} мс` : '-'}
      </Text>

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
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  darkInput: {
    backgroundColor: '#555',
    borderColor: '#aaa',
  },
  lightInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: 'gray',
  },
});
