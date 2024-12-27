import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../components/ThemeContext";
import { useTasksStore } from "../components/zustand"; // Импорт Zustand

export default function MainMenu({ navigation }) {
  const { darkTheme, setDarkTheme } = useTheme();
  const { randomNumber } = useTasksStore(); // Доступ к сохраненному числу

return (
  <View
    style={[
      styles.container,
      darkTheme ? styles.darkBackground : styles.lightBackground,
    ]}
  >
    <Text
        style={[
          styles.savedNumber,
          darkTheme ? styles.darkText : styles.lightText,
        ]}
      >
        {randomNumber}
      </Text>
    <TouchableOpacity
      style={[
        styles.switchButton,
        darkTheme ? styles.darkSwitchButton : styles.lightSwitchButton,
      ]}
      onPress={() => setDarkTheme((prev) => !prev)}
    >
      <Text style={styles.labButtonText}>
        Switch Theme
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.button,
        darkTheme ? styles.darkLabButton : styles.lightLabButton,
      ]}
      onPress={() => navigation.navigate("Lab1")}
    >
      <Text style={styles.labButtonText}>Lab 1</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.button,
        darkTheme ? styles.darkLabButton : styles.lightLabButton,
      ]}
      onPress={() => navigation.navigate("Lab2_3")}
    >
      <Text style={styles.labButtonText}>Lab 2_3</Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  savedNumber: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 156,
  },
  lightText: {
    color: "#333333",
  },
  darkText: {
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  lightBackground: {
    backgroundColor: "#F2E8D5",
  },
  darkBackground: {
    backgroundColor: "#1E1E1E",
  },
  switchButton: {
    width: 184,
    height: 53,
    flexShrink: 0,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
    marginTop: 23,
  },
  lightSwitchButton: {
    backgroundColor: "#B28451",
  },
  darkSwitchButton: {
    backgroundColor: "#BB86FC",
  },
  button: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: 211,
    height: 53,
    alignItems: "center",
  },
  lightLabButton: {
    backgroundColor: "#DAAD86",
  },
  darkLabButton: {
    backgroundColor: "#424242",
  },
  labButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});