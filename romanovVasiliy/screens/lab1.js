import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Lab1 = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    const staticUsers = [
      { id: 1, name: "Ivan Ivanov", email: "ivan@gmail.com" },
      { id: 2, name: "Kirill Kirillin", email: "kirill@gmail.com" },
    ];

    setUsers(staticUsers);
  }, []);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addUser = () => {
    if (newUserName && newUserEmail) {
      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
      const newUser = {
        id: lastUserId + 1,
        name: newUserName,
        email: newUserEmail,
      };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteUser(item.id)}>
              <Icon name="close-circle" size={30} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имя пользователя"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email пользователя"
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <TouchableOpacity style={styles.addButton} onPress={addUser}>
          <Text style={styles.addButtonText}>ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#555",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Lab1;
