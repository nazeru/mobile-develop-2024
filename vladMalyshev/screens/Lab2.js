import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import axios from "axios";

const Lab2 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = () => {
    if (newUserName.trim() && newUserEmail.trim()) {
      const newUser = {
        id: users.length + 1,
        name: newUserName,
        email: newUserEmail,
      };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
        <Button title="Попробовать снова" onPress={fetchUsers} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Верхняя полоса с текстом */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Лабораторная 2</Text>
      </View>

      {/* Основное содержимое */}
      <Button title="Обновить" onPress={fetchUsers} />

      {/* Поля для добавления нового пользователя */}
      <TextInput
        style={styles.input}
        placeholder="Введите имя"
        value={newUserName}
        onChangeText={setNewUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Введите почту"
        value={newUserEmail}
        onChangeText={setNewUserEmail}
      />
      <Button title="Добавить пользователя" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Lab2;
