import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Lab1 = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      {/* Верхняя полоса с текстом */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Лабораторная 1</Text>
      </View>

      {/* Основное содержимое */}
      <View style={styles.content}>
        <Text style={styles.counter}>Счетчик: {count}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Увеличить" onPress={increment} color="#007AFF" />
          <Button title="Уменьшить" onPress={decrement} color="#007AFF" />
        </View>
      </View>

      {/* Нижняя синяя панель (отображается в App.js как навигация) */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default Lab1;
