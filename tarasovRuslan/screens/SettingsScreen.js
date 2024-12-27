import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeColor, changeShape } from '../store';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const colorIndex = useSelector((state) => state.app.colorIndex);
  const shapeIndex = useSelector((state) => state.app.shapeIndex);

  const colors = ["black", "red", "yellow"];
  const shapes = ["square", "circle", "triangle"];

  const currentColor = colors[colorIndex];
  const currentShape = shapes[shapeIndex];

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Настройки</Text>

        {/* Сменить цвет */}
        <TouchableOpacity
          onPress={() => dispatch(changeColor())}
          style={{
            backgroundColor: 'green',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            width: '80%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Сменить цвет</Text>
        </TouchableOpacity>

        {/* Сменить фигуру */}
        <TouchableOpacity
          onPress={() => dispatch(changeShape())}
          style={{
            backgroundColor: 'blue',
            padding: 15,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Поменять фигуру</Text>
        </TouchableOpacity>

        {/* Текущий цвет и фигура */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: currentColor }}>Текущий цвет: {currentColor}</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>Текущая фигура: {currentShape}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
