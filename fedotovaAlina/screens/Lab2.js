import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SumCalculator() {
  const [input, setInput] = useState('');

  const sum = useMemo(() => {
    console.log('Подсчитываем сумму чисел...');
    return input.split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num))
      .reduce((acc, curr) => acc + curr, 0);
  }, [input]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите числа через запятую:</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(newText) => setInput(newText)}
        placeholder="Например: 1, 3"
      />
      <Text style={styles.sum}>Сумма чисел: {sum}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffe4e1'  
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '60%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 18,
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
