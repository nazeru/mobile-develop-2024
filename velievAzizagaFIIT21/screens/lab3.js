import React, { useState, useMemo } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, reset, double } from "../redux/counterSlice";

export default function Lab3() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [textColor, setTextColor] = useState("black");

  const users = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Edward",
    "Frank",
    "George",
    "Hannah",
  ];

  // useMemo мемоизирует отфильтрованный список, чтобы пересчитывать его только при изменении searchTerm или списка пользователей
  const filteredUsers = useMemo(() => {
    console.log("Фильтрация пользователей...");
    return users.filter((user) =>
      user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const changeTextColor = () => {
    setTextColor((prevColor) => (prevColor === "black" ? "blue" : "black"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ПОИСК ПОЛЬЗОВАТЕЛЕЙ"
        placeholderTextColor="black"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={[styles.user, { color: textColor }]}>{item}</Text>
        )}
      />
      <TouchableOpacity
        style={styles.footer}
        onPress={changeTextColor}
        color="#000"
      >
        <Text style={styles.buttonText}>ИЗМЕНИТЬ ЦВЕТ ТЕКСТА</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8E6C9",
    padding: 20,
  },
  input: {
    height: 64,
    backgroundColor: "#F1F8E9",
    textAlign: "left",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "JetBrainsMono-Regular",
  },
  user: {
    fontSize: 20,
    paddingVertical: 5,
    fontFamily: "JetBrainsMono-Regular",
  },
  footer: {
    backgroundColor: "#529471",
    paddingVertical: 10,
    marginTop: 20,
    height: 84,
    justifyContent: "center", // Центровка по вертикали
    alignItems: "center", // Центровка по горизонтали
  },
  buttonText: {
    fontSize: 24,
    color: "#000000",
    textAlign: "center",
    fontFamily: "JetBrainsMono-Regular",
  },
});
