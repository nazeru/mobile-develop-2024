import React, { useState, useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { commonStyles } from "../styles";

const Lab2 = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const sumBetween = useMemo(() => {
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    const [start, end] = n1 < n2 ? [n1, n2] : [n2, n1];
    return ((end - start + 1) * (start + end)) / 2;
  }, [num1, num2]);

  const comparison = useMemo(() => {
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    if (n1 === n2) return "Числа равны";
    return n1 > n2 ? "Первое число больше" : "Второе число больше";
  }, [num1, num2]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Lab2: useMemo</Text>
      <TextInput
        style={commonStyles.input}
        keyboardType="numeric"
        placeholder="Введите первое число"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={commonStyles.input}
        keyboardType="numeric"
        placeholder="Введите второе число"
        value={num2}
        onChangeText={setNum2}
      />
      <Text style={styles.result}>Сравнение: {comparison}</Text>
      <Text style={styles.result}>Сумма чисел от {num1} до {num2}: {sumBetween}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    fontSize: 18,
    marginVertical: 10,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Lab2;
