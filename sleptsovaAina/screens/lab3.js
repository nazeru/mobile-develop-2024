import React, { useMemo, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput } from 'react-native';
import {styles} from "../styles/StylesLab3"

const generateLargeData = () => {
  // Генерируем массив из 10,000 элементов
  return Array.from({ length: 10000 }, (_, index) => ({
    id: index.toString(),
    value: `Элемент #${index + 1}`,
  }));
};

const Lab3 = () => {
  const [search, setSearch] = useState('');

  // Генерируем данные и мемоизируем их, чтобы не пересоздавать массив при каждом рендере
  const largeData = useMemo(() => generateLargeData(), []);

  // Фильтруем данные на основе поиска (также мемоизируем)
  const filteredData = useMemo(() => {
    if (!search.trim()) return largeData;
    return largeData.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, largeData]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите текст для поиска..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={20}
        maxToRenderPerBatch={50} 
        removeClippedSubviews 
      />
    </View>
  );
};
export default Lab3;