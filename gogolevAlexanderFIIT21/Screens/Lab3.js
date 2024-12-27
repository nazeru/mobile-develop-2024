import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Switch,
} from "react-native";

const Lab3 = () => {
  const [onMemo, setOnMemo] = useState(true);
  const [filter, setFilter] = useState("");
  const [newFruit, setNewFruit] = useState("");
  const [fruits, setFruits] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Используем useMemo для фильтрации данных
  const leng = 10000000;

  const bigFunc = () => {
    for (let i = 0; i < leng; i++) {}
  };
  const bigFuncMemo = useCallback(() => {
    for (let i = 0; i < leng; i++) {}
    return 0;
  }, []);

  const filteredData = useMemo(() => {
    bigFuncMemo();
    return fruits.filter((fruit) =>
      fruit.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, fruits]);

  const filteredDataWithoutMemo = () => {
    bigFunc();
    return fruits.filter((fruit) =>
      fruit.toLowerCase().includes(filter.toLowerCase())
    );
  };
  // const filteredData = useMemo(() => {
  //   return fruits.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
  // }, [filter, fruits]);

  // Функция для добавления нового фрукта
  const addFruit = () => {
    if (newFruit.trim()) {
      setFruits((prevFruits) => [...prevFruits, newFruit.trim()]);
      setNewFruit(""); // Очистить поле ввода
    }
  };

  // Определяем стили в зависимости от темы
  const styles = createStyles(isDarkTheme);

  return (
    <View style={styles.container}>
      <Button
        title={`Переключить на ${isDarkTheme ? "светлую" : "темную"} тему`}
        onPress={() => setIsDarkTheme((prev) => !prev)}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Использовать useMemo:</Text>
        <Switch value={onMemo} onValueChange={() => setOnMemo(!onMemo)} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Введите текст для фильтрации"
        value={filter}
        onChangeText={setFilter}
      />
      <TextInput
        style={styles.input}
        placeholder="Добавьте новый фрукт"
        value={newFruit}
        onChangeText={setNewFruit}
      />
      <Button title="Добавить фрукт" onPress={addFruit} color="#4CAF50" />

      <FlatList
        data={onMemo ? filteredData : filteredDataWithoutMemo()}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Функция для создания стилей в зависимости от темы
const createStyles = (isDarkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkTheme ? "#333" : "#f5f5f5",
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },

    switchLabel: {
      color: isDarkTheme ? "#fff" : "#000",
      marginRight: 10,
      fontSize: 16,
    },
    input: {
      height: 40,
      borderColor: isDarkTheme ? "#aaa" : "#ccc",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: isDarkTheme ? "#fff" : "#000",
      backgroundColor: isDarkTheme ? "#444" : "#fff",
      borderRadius: 5,
    },
    itemContainer: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#555" : "#ccc",
      backgroundColor: isDarkTheme ? "#444" : "#fff",
      borderRadius: 5,
      marginBottom: 5,
    },
    item: {
      fontSize: 18,
      color: isDarkTheme ? "#fff" : "#000",
    },
  });

export default Lab3;
