import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
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

    const existingCalculation = calculations.find(
      (calc) => calc.input === inputValue
    );

    if (existingCalculation) {
      setCalculations((prevState) =>
        prevState.map((calc) =>
          calc.input === inputValue ? { ...calc, time: 0 } : calc
        )
      );
    } else {
      setCalculations((prevState) => [
        ...prevState,
        { input: inputValue, result: calcResult, time: timeTaken },
      ]);
    }
  };

  const cachedResult = useMemo(() => {
    return calculations.find((calc) => calc.input === inputValue);
  }, [inputValue, calculations]);


  const formattedTime = cachedResult ? cachedResult.time.toFixed(3) : '-';

  const isInputPreviouslyCalculated = cachedResult !== undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Формула: (число ** 2 + 3 * число - 10) / 2</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Введите число"
      />

      <Button title="Вычислить" onPress={handleCalculate} />

      <Text
        style={[
          styles.resultText,
          { color: isInputPreviouslyCalculated ? 'green' : 'red' },
        ]}
      >
        {cachedResult ? `Результат: ${cachedResult.result}` : 'Результат: -'}
      </Text>

      <Text style={styles.timeText}>
        Время расчета: {formattedTime !== '-' ? `${formattedTime} мс` : '-'}
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
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
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

export default App;
