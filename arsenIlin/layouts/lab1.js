import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useTheme } from "../ThemeContext.js";

const colors = ["black", "red", "yellow", "green", "gray", "blue"];

const Lab1 = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [figureColor, setFigureColor] = useState(colors[0]); // Цвет фигуры

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: isDarkTheme ? "#404040" : "#D9D9D9",}]}>
      <Text style={styles.title}>Фигура</Text>

      <View style={[styles.figure, { backgroundColor: figureColor}]} />

      <TouchableOpacity
        onPress={() => {
          const randomNumber = getRandomNumber(colors.length - 1);
          setFigureColor(colors[randomNumber]); // Меняем цвет фигуры
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Поменять цвет фигуры</Text>
      </TouchableOpacity>

      <View style={[styles.navigation]}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  figure: {
    width: 300,
    height: 400,
    borderRadius: 60,
    backgroundColor: "red", // Начальный цвет фигуры
  },
  button: {
    backgroundColor: "#B0B0B0", // Серый цвет кнопки как в макете
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  navButton: {
    width: 50,
    height: 50,
    backgroundColor: "#CCCCCC",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888888",
  },
};

export default Lab1;
