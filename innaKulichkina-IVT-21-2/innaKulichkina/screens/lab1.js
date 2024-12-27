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
      toValue: position._value === 0 ? 170 : 0,
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
        { backgroundColor: color, transform: [{ translateY: position }] },
        ]}
      />
      <TouchableOpacity style={[styles.ovalButton, { backgroundColor: isDarkMode ? '#fff' : '#333' }]} onPress={handlePress}>
              <Text style={{color: isDarkMode ? '#333' : '#fff' , fontWeight: 'bold'}}>Change Color and Move</Text>
      </TouchableOpacity>\
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
  ovalButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 10,
  }
});
