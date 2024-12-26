import React, { useState, useMemo } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, Button } from "react-native";

export default function Lab3() {
  const [searchTerm, setSearchTerm] = useState("");
  const [key, setKey] = useState(0);

  const names = [
    "Sardaana",
    "Aytal",
    "Nurgun",
    "Bergen",
    "Sandal",
    "Erchim",
    "Keskil",
    "Tuskun",
  ];

  const filteredNames = useMemo(() => {
    console.log("Фильтруем список...");
    return names.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const forceRerender = () => {
    setKey((prevKey) => prevKey + 1);
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
      <Button title="Очистить экран" onPress={forceRerender} />
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
});