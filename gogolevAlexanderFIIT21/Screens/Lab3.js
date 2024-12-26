import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';

const Lab3 = () => {
  const [filter, setFilter] = useState('');
  const [newFruit, setNewFruit] = useState('');
  const [fruits, setFruits] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Используем useMemo для фильтрации данных
  const filteredData = useMemo(() => {
    return fruits.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, fruits]);

  // Функция для добавления нового фрукта
  const addFruit = () => {
    if (newFruit.trim()) {
      setFruits(prevFruits => [...prevFruits, newFruit.trim()]);
      setNewFruit(''); // Очистить поле ввода
    }
  };

  // Определяем стили в зависимости от темы
  const styles = createStyles(isDarkTheme);

  return (
    <View style={styles.container}>
      <Button 
        title={`Переключить на ${isDarkTheme ? 'светлую' : 'темную'} тему`} 
        onPress={() => setIsDarkTheme(prev => !prev)} 
      />
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
      <Button title="Добавить фрукт" onPress={addFruit} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
};

// Функция для создания стилей в зависимости от темы
const createStyles = (isDarkTheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkTheme ? '#333' : '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: isDarkTheme ? '#aaa' : '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: isDarkTheme ? '#fff' : '#000',
    backgroundColor: isDarkTheme ? '#444' : '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: isDarkTheme ? '#555' : '#ccc',
    color: isDarkTheme ? '#fff' : '#000',
  },
});

export default Lab3;