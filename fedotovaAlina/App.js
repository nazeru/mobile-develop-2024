import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import Lab1 from "./screens/Lab1.js";
import Lab2 from "./screens/Lab2.js";
import Lab3 from "./screens/Lab3.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

const AppContent = () => {
  const { isDarkTheme, toggleTheme } = useTheme(); // Получаем функцию переключения темы

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <Button title="Переключить тему" onPress={toggleTheme} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDarkTheme ? '#444' : '#ffffff',
          },
          tabBarActiveTintColor: isDarkTheme ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkTheme ? '#aaa' : '#888',
        }}
      >
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
      </Tab.Navigator>
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Добавим немного отступа для кнопки
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
});
