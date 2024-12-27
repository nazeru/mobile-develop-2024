import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { ThemeProvider, useTheme } from "../themeContext";

const colors = ["black", "red", "yellow", "green", "gray", "blue"];

const Lab1 = () => {
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);

  const { isDarkTheme, toggleTheme } = useTheme();

  const themeStyles = isDarkTheme
    ? styles.darkContainer
    : styles.lightContainer;
  const textStyles = isDarkTheme ? styles.darkText : styles.lightText;

  const getRandomColor = () => {
    let newColor;
    do {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === backgroundColor);
    return newColor;
  };

  const changeColor = () => {
    setBackgroundColor(getRandomColor());
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={changeColor}
          style={[styles.header, textStyles]}
        >
          <Text style={[styles.header, textStyles]}>Нажми!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  lightContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});

export default Lab1;
