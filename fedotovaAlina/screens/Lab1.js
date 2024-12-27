import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Lab1() {
  const [message, setMessage] = useState('Нажми!');
  const [bgColor, setBgColor] = useState('#fff');

  const changeBackgroundColor = () => {
    setMessage('Ок');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Кнопка" onPress={changeBackgroundColor} color="#6200EE" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});