import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext.js";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#404040" : "#D9D9D9" },
      ]}
    >
      <Text style={{ color: isDarkTheme ? "white" : "black", marginBottom: 20 }}>
        {isDarkTheme ? "Темная тема" : "Светлая тема"}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF" },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: isDarkTheme ? "#FFFFFF" : "#000000" }]}>
          Переключить тему
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%", // Ширина кнопки
    height: 60, // Высота кнопки
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Округлые углы
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Тень для Android
  },
  buttonText: {
    fontSize: 18, // Размер текста
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ThemeToggle;
