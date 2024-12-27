import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button } from 'react-native';

export default function Lab3() {
  const [searchTerm, setSearchTerm] = useState("");
  const [key, setKey] = useState(0);
  const [useMemoFilter, setUseMemoFilter] = useState(true);

  const leng = 100000000;

  const bigFunc = () => {
    for (let i = 0; i < leng; i++) {}
  };

  const bigFuncMemo = useCallback(() => {
    for (let i = 0; i < leng; i++) {}
    return 0;
  }, []);

  const names = useMemo(() => [
    "Sardaana",
    "Aytal",
    "Nurgun",
    "Bergen",
    "Sandal",
    "Erchim",
    "Keskil",
    "Tuskun",
  ], []);

  const lowerCaseSearchTerm = useMemo(() => searchTerm.toLowerCase(), [searchTerm]);

  const filteredNamesWithMemo = useMemo(() => {
    bigFuncMemo();
    return names.filter((name) =>
      name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [lowerCaseSearchTerm, names, bigFuncMemo]);

  const filteredNamesWithoutMemo = () => {
    bigFunc();
    return names.filter((name) =>
      name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  };

  const filteredNames = useMemo(() => {
    return useMemoFilter ? filteredNamesWithMemo : filteredNamesWithoutMemo();
  }, [useMemoFilter, filteredNamesWithMemo, filteredNamesWithoutMemo]);

  const forceRerender = () => {
    setKey(prevKey => prevKey + 1);
    setSearchTerm("");
  };

  return (
    <View style={styles.container} key={key}>
      <Text style={styles.title}>Фильтрация списка имен</Text>
      <TextInput
        style={styles.input}
        placeholder="Искать имя..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />

      <Button 
        title={useMemoFilter ? "Использовать без useMemo" : "Использовать с useMemo"}
        onPress={() => setUseMemoFilter(!useMemoFilter)} 
      />

      <Button title="Очистить экран" onPress={forceRerender} />

      <Text>Отфильтрованные имена:</Text>
      <FlatList
        data={filteredNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.name}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
});