import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const colors = ["black", "red", "yellow", "green", "gray", "blue"];

const Lab2 = () => {
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);

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
        <TouchableOpacity onPress={changeColor} style={styles.button}>
          <Text style={styles.buttonText}>Нажми!</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "gray",
  },
});

export default Lab2;
