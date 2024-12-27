import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from './ThemeContext';
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // библиотека иконок

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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Lab1') {
                iconName = focused ? 'flask' : 'flask-outline';
              } else if (route.name === 'Lab2') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Lab3') {
                iconName = focused ? 'happy' : 'happy-outline';
              } else if (route.name === 'Lab4') {
                iconName = focused ? 'moon' : 'moon-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue', // Цвет активной вкладки
            tabBarInactiveTintColor: 'gray', // Цвет неактивной вкладки
          })}
        >
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
