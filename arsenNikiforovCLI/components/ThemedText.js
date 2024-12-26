// components/ThemedText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import useTheme from '../hooks/useTheme';


const ThemedText = ({ style, children, ...props }) => {
  const colors = useTheme();

  return (
    <Text
      style={[
        styles.text, // Базовый стиль
        style,       // Пользовательский стиль
        { color: colors.text }, // Цвет текста из темы
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PixelFont', // Пиксельный шрифт
    fontSize: 16,           // Базовый размер шрифта
  },
});

export default ThemedText;
