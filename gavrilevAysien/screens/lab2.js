import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import useThemeStore from "../store/themeStore";

const Lab2 = () => {
  const [data, setData] = useState(null); // Данные текущего поста
  const [postId, setPostId] = useState(1); // ID поста для загрузки
  const { isDarkTheme, toggleTheme } = useThemeStore();

  // Загрузка поста по ID
  const fetchPost = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const result = await response.json();
      setData(result); // Обновляем данные
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  useEffect(() => {
    fetchPost(postId); // Загружаем начальный пост
  }, [postId]); // Обновляем данные при изменении postId

  const themeStyles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkTheme ? "#121212" : "#f8f8f8",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
      color: isDarkTheme ? "#ffffff" : "#000000",
    },
    card: {
      backgroundColor: isDarkTheme ? "#1e1e1e" : "#fff",
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: isDarkTheme ? "#ffffff" : "#000000",
    },
    cardBody: {
      fontSize: 14,
      color: isDarkTheme ? "#cccccc" : "#555555",
    },
    themeSwitchButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: isDarkTheme ? "#121212" : "#fff",
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: isDarkTheme ? "#ffffff" : "#121212",
    },
    themeSwitchButtonText: {
      color: isDarkTheme ? "#ffffff" : "#121212",
    },
  };

  return (
    <View style={themeStyles.container}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={themeStyles.themeSwitchButton}
      >
        <Text style={themeStyles.themeSwitchButtonText}>Сменить тему</Text>
      </TouchableOpacity>
      {data ? (
        <>
          <Text style={themeStyles.title}>Пост #{data.id}</Text>
          <View style={themeStyles.card}>
            <Text style={themeStyles.cardTitle}>{data.title}</Text>
            <Text style={themeStyles.cardBody}>{data.body}</Text>
          </View>
        </>
      ) : (
        <Text>Загрузка данных...</Text>
      )}
      <Button
        title="Загрузить следующий пост"
        onPress={() => setPostId((prevId) => (prevId < 100 ? prevId + 1 : 1))} // Увеличиваем ID поста, циклически
      />
    </View>
  );
};

export default Lab2;
