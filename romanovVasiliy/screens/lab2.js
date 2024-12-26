import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../redux/actions";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Lab2 = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = React.useState(true);
  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=1");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const usersWithId = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
          age: user.dob.age,
          city: user.location.city,
        }));

        // Добавляем пользователей в Redux store
        usersWithId.forEach((user) => dispatch(addUser(user)));
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Функция для добавления нового пользователя
  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const lastUserId =
        users.length > 0
          ? parseInt(users[users.length - 1].id.split("-")[0])
          : 0;
      const newUser = {
        id: `${lastUserId + 1}-custom`,
        name: newUserName,
        email: newUserEmail,
        picture: "https://via.placeholder.com/50", // Заглушка для аватара
        age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
        city: "Новый Город",
      };
      dispatch(addUser(newUser));
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Загрузка...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={{ uri: item.picture }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userAge}>Возраст: {item.age}</Text>
              <Text style={styles.userCity}>Город: {item.city}</Text>
            </View>
            <TouchableOpacity onPress={() => dispatch(deleteUser(item.id))}>
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  userAge: {
    fontSize: 12,
    color: "#333",
  },
  userCity: {
    fontSize: 12,
    color: "#888",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
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

export default Lab2;
