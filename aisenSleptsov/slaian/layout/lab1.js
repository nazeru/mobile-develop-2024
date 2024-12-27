import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "../themeContext";

const colors = ["red", "yellow", "green", "gray", "blue"];

const Lab1 = () => {
  const { isDarkTheme } = useTheme();

  const [backgroundColor, setBackgroundColor] = useState(
    isDarkTheme ? "#333" : "#fff"
  );

  useEffect(() => {
    setBackgroundColor(isDarkTheme ? "#333" : "#fff");
  }, [isDarkTheme]);

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
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.headerText, isDarkTheme && styles.darkText]}>
          Change background color
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={changeColor}
            style={styles.button}
          ></TouchableOpacity>
          <Text
            style={[
              styles.buttonText,
              isDarkTheme ? styles.whiteText : styles.blackText,
              styles.clickMeText,
            ]}
          >
            Click me!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6FA670",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clickMeText: {
    marginTop: 10,
  },
  blackText: {
    color: "#000",
  },
  whiteText: {
    color: "#fff",
  },
  darkText: {
    color: "#fff",
  },
});

export default Lab1;
