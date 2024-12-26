// screens/Lab4.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Switch, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter, toggleTheme } from '../store/store';
import useTheme from '../hooks/useTheme';

const Lab4 = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const colors = useTheme();
  const theme = useSelector((state) => state.theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Theme Switcher</Text>
      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, { color: colors.text }]}>
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={() => dispatch(toggleTheme())}
          thumbColor={colors.accent}
          trackColor={{ false: colors.border, true: colors.border }}
          style={styles.switch}
        />
      </View>
      <Text style={[styles.counterText, { color: colors.text }]}>Counter: {counter}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.buttonBackground,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
          onPress={() => dispatch(incrementCounter())}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.buttonBackground,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
          onPress={() => dispatch(decrementCounter())}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 30,
    textTransform: 'uppercase',
    fontFamily: 'PixelFont',
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeText: {
    fontSize: 20,
    marginRight: 10,
    fontFamily: 'PixelFont',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '700',
    fontFamily: 'PixelFont',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    borderWidth: 2,
    borderRadius: 50,
    marginHorizontal: 20,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'PixelFont',
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
});

export default Lab4;