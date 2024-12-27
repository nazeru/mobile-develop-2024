import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity} from 'react-native';
import { useTheme } from '../ThemeContext'; 


export default function ColorAndMoveScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [color, setColor] = useState('blue');
  const [position, setPosition] = useState(new Animated.Value(0));

  const handlePress = () => {
    const newColor = color === 'blue' ? 'green' : 'blue';
    setColor(newColor);

    Animated.timing(position, {
      toValue: position._value === 0 ? 100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
    style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#333' : '#fff' },
    ]}
    >
      <Animated.View
        style={[
        styles.rectangle,
        { backgroundColor: isDarkMode ? '#fff' : '#000', transform: [{ translateY: position }] },
        ]}
      />
      <Button title="Change Color and Move" onPress={handlePress} />
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.emojiText}>
          {isDarkMode ? '🌞' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  themeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  emojiText: {
    fontSize: 30,
  },
});
