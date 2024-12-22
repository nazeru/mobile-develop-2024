// App.js
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from './ThemeContext';
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import { View, Text, Button, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const Lab4Screen = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>Lab 4</Text>
      <Button title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"} onPress={toggleTheme} />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Lab1" component={Lab1} />
          <Tab.Screen name="Lab2" component={Lab2} />
          <Tab.Screen name="Lab3" component={Lab3} />
          <Tab.Screen name="Lab4" component={Lab4Screen} />
        </Tab.Navigator> 
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
