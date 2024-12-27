// /screens/lab1/index.js
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useTheme } from '../ThemeContext';

const colors = ["black", "red", "yellow", "green", "gray", "blue"];

export default function Lab1() {
  const [shapeColor, setShapeColor] = useState(colors[0]); 
  const { isDarkTheme } = useTheme(); // Получаем состояние темы

  function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : 'white' }]}>
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.shape,
            { backgroundColor: shapeColor } // Цвет фигуры остается прежним
          ]}
        />
        <TouchableOpacity
          onPress={() => {
            const randomNumber = getRandomNumber(colors.length - 1); 
            setShapeColor(colors[randomNumber]); 
          }}
          style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : 'lightgray' }]}
        >
          <Text style={{ color: isDarkTheme ? '#fff' : 'black', fontWeight: "bold" }}>Измени цвет фигуры!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shape: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
  },
});
