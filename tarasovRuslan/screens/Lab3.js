import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Lab3 = () => {

  const [number, setNumber] = useState(1);
  const [result, setResult] = useState(null);
  const [timeWithoutMemo, setTimeWithoutMemo] = useState(null); // Время без useMemo
  const [timeWithMemo, setTimeWithMemo] = useState(null); // Время с useMemo

  const calculateFactorial = (n) => {
    console.log(`Вычисление факториала для n = ${n}`);
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }
    return fact;
  };

  const computeFactorialWithoutMemo = () => {
    console.log('Вычисление факториала без useMemo...');
    const startTime = performance.now();
    const fact = calculateFactorial(number);
    const endTime = performance.now();
    const elapsedTime = (endTime - startTime).toFixed(3); // Время в миллисекундах
    console.log(`Время выполнения без useMemo: ${elapsedTime} мс`);
    setTimeWithoutMemo(elapsedTime);
    setResult(fact);
  };

  const computeFactorialWithMemo = () => {
    console.log('Вычисление факториала с useMemo...');
    const startTime = performance.now();
    const fact = memoizedFactorial;
    const endTime = performance.now();
    const elapsedTime = (endTime - startTime).toFixed(3); // Время в миллисекундах
    console.log(`Время выполнения с useMemo: ${elapsedTime} мс`);
    setTimeWithMemo(elapsedTime);
    setResult(fact);
  };

  const memoizedFactorial = useMemo(() => {
    console.log(`Кэширование факториала для числа = ${number}`);
    return calculateFactorial(number);
  }, [number]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Факториал числа: {number}</Text>
      <Text style={styles.result}>Результат: {result}</Text>

      <Text style={styles.timeLabel}>
        Время выполнения с useMemo: {timeWithMemo !== null ? `${timeWithMemo} мс` : 0}
      </Text>

      <Text style={styles.timeLabel}>
        Время выполнения без useMemo: {timeWithoutMemo !== null ? `${timeWithoutMemo} мс` : 0}
      </Text>

      <View style={styles.buttonsContainer}>
        <Button
          title="Увеличить на 1"
          onPress={() => {
            console.log('Увеличение числа на 1');
            setNumber(number + 1);
          }}
        />
        <Button
          title="Увеличить на 100"
          onPress={() => {
            console.log('Увеличение числа на 100');
            setNumber(number + 100);
          }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Решить без useMemo" onPress={computeFactorialWithoutMemo} />
        <Button title="Решить с useMemo" onPress={computeFactorialWithMemo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginBottom: 20,
  },
  timeLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
  },
  buttonsContainer: {
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Lab3;
