import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BackArrow from "../components/BackArrow";
import { useTheme } from "../components/ThemeContext";
import { useTasksStore } from "../components/zustand"; // Импорт Zustand

const Dot = ({ position, visible, dotColor }) => (
  <View
    style={[
      styles.dot,
      position,
      { opacity: visible ? 1 : 0, backgroundColor: dotColor },
    ]}
  />
);

export default function Lab1({ navigation }) {
  const { darkTheme } = useTheme();
  const { randomNumber, setRandomNumber } = useTasksStore(); // Zustand-хранилище

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    setRandomNumber(number); // Сохраняем число
  };

  const dotPositions = [
    { top: "25%", left: "25%", transform: [{ translateX: -20 }, { translateY: -20 }] },
    { top: "50%", left: "25%", transform: [{ translateX: -20 }, { translateY: -20 }] },
    { bottom: "25%", left: "25%", transform: [{ translateX: -20 }, { translateY: 20 }] },
    { top: "50%", left: "50%", transform: [{ translateX: -20 }, { translateY: -20 }] },
    { top: "25%", right: "25%", transform: [{ translateX: 20 }, { translateY: -20 }] },
    { top: "50%", right: "25%", transform: [{ translateX: 20 }, { translateY: -20 }] },
    { bottom: "25%", right: "25%", transform: [{ translateX: 20 }, { translateY: 20 }] },
  ];

  const dotVisibilityMap = {
    1: [0, 0, 0, 1, 0, 0, 0],
    2: [1, 0, 0, 0, 0, 0, 1],
    3: [1, 0, 0, 1, 0, 0, 1],
    4: [1, 0, 1, 0, 1, 0, 1],
    5: [1, 0, 1, 1, 1, 0, 1],
    6: [1, 1, 1, 0, 1, 1, 1],
  };

  const themeStyles = darkTheme
    ? styles.darkTheme
    : styles.lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <BackArrow navigation={navigation} />
      <View style={styles.container2}>
        <Text style={[styles.numberText, themeStyles.text]}>{randomNumber}</Text>
        <View style={[styles.dice, themeStyles.dice]}>
          {dotPositions.map((position, index) => (
            <Dot
              key={index}
              position={position}
              visible={dotVisibilityMap[randomNumber][index]}
              dotColor={darkTheme ? "#E1E1E1" : "#8C6F53"}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={generateRandomNumber}
          style={[styles.rollButton, themeStyles.rollButton]}
        >
          <Text style={styles.buttonText}>Roll</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    alignItems: "center",
  },
  numberText: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 61,
  },
  dice: {
    marginTop: 36,
    width: 200,
    height: 200,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
  },
  rollButton: {
    width: 250,
    height: 70,
    flexShrink: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 165,
  },
  buttonText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF", // Цвет текста всегда белый
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 50,
    alignSelf: "center",
  },
  // Стили для светлой и темной темы
  lightTheme: {
    container: {
      backgroundColor: "#F2E8D5",
    },
    text: {
      color: "#333333",
    },
    dice: {
      backgroundColor: "#DAAD86",
    },
    rollButton: {
      backgroundColor: "#B28451",
    },
  },
  darkTheme: {
    container: {
      backgroundColor: "#1E1E1E",
    },
    text: {
      color: "#FFFFFF",
    },
    dice: {
      backgroundColor: "#424242",
    },
    rollButton: {
      backgroundColor: "#BB86FC", // Фиолетовый цвет для кнопки Roll в темной теме
    },
  },
});