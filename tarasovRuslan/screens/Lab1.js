import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { changeColor, changeShape } from '../store';

const colors = ["black", "red", "yellow"];
const shapes = ["square", "circle", "triangle"];

const Lab1 = ({ navigation }) => {
  const dispatch = useDispatch();
  const colorIndex = useSelector((state) => state.app.colorIndex);
  const shapeIndex = useSelector((state) => state.app.shapeIndex);

  const shapeStyle = {
    backgroundColor: colors[colorIndex],
    width: 100,
    height: 100,
    ...(shapes[shapeIndex] === "circle" && {
      borderRadius: 50,
    }),
    ...(shapes[shapeIndex] === "triangle" && {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderLeftWidth: 50,
      borderRightWidth: 50,
      borderBottomWidth: 100,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: colors[colorIndex],
    }),
  };

  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <Text>Первая лабораторная работа.</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={shapeStyle} />
        <TouchableOpacity
          onPress={() => {
            dispatch(changeColor());
            dispatch(changeShape());
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Измени мой цвет и фигуру!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Поменять самостоятельно</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Lab1;
