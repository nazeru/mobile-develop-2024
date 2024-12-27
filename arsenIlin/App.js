import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider, useTheme } from "./ThemeContext.js";
import Lab1 from "./layouts/lab1";
import Lab2 from "./layouts/lab2";
import Lab3 from "./layouts/lab3";
import Lab4 from "./layouts/lab4";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Tab = createBottomTabNavigator();

const TabButton = ({ title, onPress }) => {
  const { isDarkTheme } = useTheme();
  return (
    <View style={styles.tabButtonContainer}>
      <TouchableOpacity onPress={onPress} style={[styles.tabButton,{backgroundColor: isDarkTheme ? "#1C1B1B" : "#8C8C8C",}]}>
        <Text style={styles.tabButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppTabs = () => {
  const { isDarkTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <TabButton {...props} title={route.name.replace("Lab", "")} />
        ),
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "#2E2E2E" : "#9F9F9F",
          height: 70,
          borderTopWidth: 0,
          padding: 10,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Lab1" component={Lab1} />
      <Tab.Screen name="Lab2" component={Lab2} />
      <Tab.Screen name="Lab3" component={Lab3} />
      <Tab.Screen name="Lab4" component={Lab4} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    width: 45,
    height: 45,
    borderRadius: 30, // Полностью круглые кнопки
    alignItems: "center",
    justifyContent: "center",
    
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: 5, // Отступ между кнопками
  },
  tabButtonText: {
    color: "#fff", // Цвет текста
    fontWeight: "bold", // Жирный текст
    fontSize: 16, // Размер текста
    textAlign: "center", // Центрирование текста
  },
});
