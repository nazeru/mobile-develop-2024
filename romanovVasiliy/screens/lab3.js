import React, { useEffect, useMemo } from "react";
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Lab3 = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = React.useState(true);
  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserAge, setNewUserAge] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
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

        usersWithId.forEach((user) => dispatch(addUser(user)));
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAddUser = () => {
    if (newUserName && newUserEmail && newUserAge) {
      const lastUserId = users.length > 0 ? users[users.length - 1].id : "0";
      const newUser = {
        id: `${parseInt(lastUserId.split("-")[0]) + 1}-custom`,
        name: newUserName,
        email: newUserEmail,
        age: parseInt(newUserAge, 10),
        city: "Новый Город",
      };
      dispatch(addUser(newUser));
      setNewUserName("");
      setNewUserEmail("");
      setNewUserAge("");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  if (loading) {
    return <Text style={styles.loadingText}>Загрузка...</Text>;
  }

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkTheme && styles.darkInput]}
          placeholder="Поиск"
          placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            name={isDarkTheme ? "weather-night" : "white-balance-sunny"}
            size={30}
            color={isDarkTheme ? "#FFD700" : "#FFA500"}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.userContainer,
              isDarkTheme && styles.darkUserContainer,
            ]}
          >
            <Image source={{ uri: item.picture }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text
                style={[styles.userName, isDarkTheme && styles.darkUserName]}
              >
                {item.name}
              </Text>
              <Text
                style={[styles.userText, isDarkTheme && styles.darkUserText]}
              >
                {item.email}
              </Text>
              <Text
                style={[styles.userText, isDarkTheme && styles.darkUserText]}
              >
                Возраст: {item.age}
              </Text>
              <Text
                style={[styles.userText, isDarkTheme && styles.darkUserText]}
              >
                Город: {item.city}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
              <Icon name="close-circle" size={30} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isDarkTheme && styles.darkInput]}
          placeholder="Имя пользователя"
          placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={[styles.input, isDarkTheme && styles.darkInput]}
          placeholder="Email пользователя"
          placeholderTextColor={isDarkTheme ? "#aaa" : "#555"}
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <TouchableOpacity
          style={[styles.addButton, isDarkTheme && styles.darkAddButton]}
          onPress={handleAddUser}
        >
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
  darkContainer: {
    backgroundColor: "#121212",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 18,
  },
  darkInput: {
    backgroundColor: "#333",
    borderColor: "#555",
    color: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  darkUserContainer: {
    borderBottomColor: "#555",
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
    color: "#000",
  },
  darkUserName: {
    color: "#fff",
  },
  userText: {
    color: "#555",
  },
  darkUserText: {
    color: "#aaa",
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
    backgroundColor: "#f9f9f9",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  darkAddButton: {
    backgroundColor: "#007BFF",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#000",
  },
});

export default Lab3;
