import React, { useState, useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Lab3 = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const memoizedValue1 = useMemo(() => {
    const n = parseInt(num1) || 0;
    return slowfunc(n);
  }, [num1]);

  const memoizedValue2 = useMemo(() => {
    const n = parseInt(num2) || 0;
    return num1 === num2 ? memoizedValue1 : slowfunc(n);
  }, [num1, num2, memoizedValue1]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab3: UseMemo</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Введите первое число"
        value={num1}
        onChangeText={setNum1}
      />
      <Text style={styles.result}>
        квадрат для первого числа: {memoizedValue1}
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Введите второе число"
        value={num2}
        onChangeText={setNum2}
      />
      <Text style={styles.result}>
         квадрат второго числа: {memoizedValue2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  result: {
    fontSize: 18,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

const slowfunc = (n) => {
  console.log(`Выполняются ресурсоёмкие вычисления для ${n}...`);
  if(n==0) return 0
  const result = n || 0;
  for (let i = 0; i < 1e8; i++) {
    Math.sqrt(result);
  }
  return result ** 2;
};

export default Lab3;
