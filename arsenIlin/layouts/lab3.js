import React from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "../ThemeContext.js";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkTheme ? "black" : "white" }}>
      <Text style={{ color: isDarkTheme ? "white" : "black" }}>
        {isDarkTheme ? "Темная тема" : "Светлая тема"}
      </Text>
      <Button title="Переключить тему" onPress={toggleTheme} />
    </View>
  );
};

export default ThemeToggle;
