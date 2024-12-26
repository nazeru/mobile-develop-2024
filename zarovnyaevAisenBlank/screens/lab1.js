import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const colors = ["black", "red", "blue", "green", "yellow", "purple"];
const colorsText = [
  "Цвет квадрата черный",
  "Цвет квадрата красный",
  "Цвет квадрата синий",
  "Цвет квадрата зелёный",
  "Цвет квадрата жёлтый",
  "Цвет квадрата фиолетовый",
];
export default function HomeScreen() {
  const [colorIndex, setColorIndex] = useState(0); // Меняет цвет
  const [colorChangeCount, setColorChangeCount] = useState(0); // Счётчик кликов на квадрат
  const [displayText, setDisplayText] = useState(colorsText[0]); // Говорит какого цвета квадрат
  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <View style={styles.container}>
        <Text style={styles.displayText}>{displayText}</Text>
        <View
          style={{
            backgroundColor: colors[colorIndex],
            width: 100,
            height: 100,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setColorIndex((colorIndex + 1) % colors.length); // Меняет цвет
            setColorChangeCount(colorChangeCount + 1); // Счётчик
            //setDisplayText((displayText + 1) % 3);
            setDisplayText(colorsText[(colorIndex + 1) % colors.length]); // Текст цвета
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Нажимай!</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>
          {" "}
          Цвет поменялся: {colorChangeCount} раз{" "}
        </Text>
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
  displayText: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#2673D0",
    marginBottom: 20,
  },
  square: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    position: "absolute",
    top: 610, // Позиция кнопки ниже верхней точки
    width: 150,
    height: 150,
    borderRadius: 90, // Круглая кнопка
    backgroundColor: "#CFE2F9", // Цвет, как у таба
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#2673D0",
  },
  counterText: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#2673D0",
    marginTop: 20,
  },
});
