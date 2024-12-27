import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";

const colors = ["black", "red", "yellow", "green", "gray", "blue"];

export default function Lab1() {
  const [shapeColor, setShapeColor] = useState(colors[0]); 

  function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: shapeColor, 
            borderRadius: 10, 
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            const randomNumber = getRandomNumber(5); 
            setShapeColor(colors[randomNumber]); 
          }}
          style={{
            backgroundColor: "lightgray",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>Измени цвет фигуры!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
