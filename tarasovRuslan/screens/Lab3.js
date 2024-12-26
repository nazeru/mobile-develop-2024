import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Функция для вычисления факториала
const factorial = (num) => {
  console.log("Выполняется вычисление факториала...");
  if (num <= 0) return 1;
  return num * factorial(num - 1);
};

const Lab3 = () => {
  const [number, setNumber] = useState(1000); // Начальное значение
  const [timeWithMemo, setTimeWithMemo] = useState(null);
  const [timeWithoutMemo, setTimeWithoutMemo] = useState(null);

  // Вычисление с useMemo
  const memoizedFactorial = useMemo(() => {
    console.log("Кешированное вычисление факториала...");
    return factorial(number);
  }, [number]);

  const calculateWithoutMemo = () => {
    const start = Date.now();
    const result = factorial(number);
    const end = Date.now();
    setTimeWithoutMemo(end - start); // Сохраняем время выполнения
    return result;
  };

  const calculateWithMemo = () => {
    const start = Date.now();
    memoizedFactorial; // Просто обращаемся к значению
    const end = Date.now();
    setTimeWithMemo(end - start); // Сохраняем время выполнения
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Факториал</Text>
      <Text style={styles.label}>Число: {number}</Text>
      <Text style={styles.label}>Факториал (с useMemo): {memoizedFactorial}</Text>

      <View style={styles.buttonGroup}>
        <Button title="Увеличить на 1" onPress={() => setNumber(number + 1)} />
        <Button title="Увеличить на 10" onPress={() => setNumber(number + 10)} />
      </View>

      <Button title="Измерить время без useMemo" onPress={calculateWithoutMemo} />
      <Button title="Измерить время с useMemo" onPress={calculateWithMemo} />

      {/* Время выполнения */}
      <Text style={styles.timeLabel}>
        Время выполнения без useMemo: {timeWithoutMemo !== null ? `${timeWithoutMemo} мс` : 0}
      </Text>
      <Text style={styles.timeLabel}>
        Время выполнения с useMemo: {timeWithMemo !== null ? `${timeWithMemo} мс` : 0}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
  timeLabel: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});

export default Lab3;
