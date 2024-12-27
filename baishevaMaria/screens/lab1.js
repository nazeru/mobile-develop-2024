import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setBgColor } from '../store/store';

export default function Lab1() {
  const dispatch = useDispatch();
  const message = useSelector(state => state.global.message);
  const bgColor = useSelector(state => state.global.bgColor);

  const changeBackgroundColor = () => {
    dispatch(setMessage('Нажми на кнопку!'));
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    dispatch(setBgColor(randomColor));
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text>{message}</Text>
      <Button title="START" onPress={changeBackgroundColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});