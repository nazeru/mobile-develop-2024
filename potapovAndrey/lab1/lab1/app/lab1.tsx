import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { ThemeProvider, useTheme } from "../ThemeContext";

const emoji = ["🍉", "🍌", "🍓", "🍏", "🍊", "🍑"];

const Lab1 = () => {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { isDarkTheme, toggleTheme } = useTheme();

  const changeEmo = () => {
    setCurrent((prevIndex) => (prevIndex + 1) % emoji.length);
    setCount((prev) => prev + 1);
  };

  const themeStyles = isDarkTheme
    ? styles.darkContainer
    : styles.lightContainer;
  const textStyles = isDarkTheme ? styles.darkText : styles.lightText;

  return (
    <SafeAreaView style={[styles.container, themeStyles]}>
      <Text style={[styles.header, textStyles]}>FRUIT KOMBAT</Text>
      <TouchableOpacity onPress={changeEmo} style={styles.emojiContainer}>
        <Text style={[styles.emoji, textStyles]}>{emoji[current]}</Text>
      </TouchableOpacity>
      <Text style={[styles.counter, textStyles]}>FruitCoin: {count} $</Text>
    </SafeAreaView>
  );
};

export default Lab1;

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  lightContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    marginBottom: 30,
  },
  emojiContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 100,
  },
  counter: {
    fontSize: 30,
    marginTop: 20,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});
