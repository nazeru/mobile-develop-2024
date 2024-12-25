import React, { useState, useMemo } from 'react';
import { View, Text, Button } from 'react-native';

function ExpensiveComputation() {
  const [count, setCount] = useState(0);

  // Мемоизация вычисления
  const expensiveComputation = useMemo(() => {
    console.log('Вычисление выполнено');
    // Эмулируем сложное вычисление
    return count * 1000;
  }, [count]);  // Мемоизируем только, если count изменится

  return (
    <View style={{ padding: 20 }}>
      <Text>Результат вычисления: {expensiveComputation}</Text>
      <Button title="Увеличить" onPress={() => setCount(count + 1)} />
    </View>
  );
}

export default ExpensiveComputation;
