import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Lab1 from "./layout/lab1";
import Lab2 from "./layout/lab2";
import Lab3 from "./layout/lab3";
import { ThemeProvider, useTheme } from "./themeContext";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabButton = ({ children, onPress }) => {
  const { isDarkTheme } = useTheme();

  return (
    <View
      style={[
        styles.tabButton,
        { backgroundColor: isDarkTheme ? "#444" : "#AEFFB1" },
      ]}
    >
      <Text
        style={[styles.tabButtonText, { color: isDarkTheme ? "#fff" : "#000" }]}
        onPress={onPress}
      >
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  );
};

const MainNavigator = () => {
  const { isDarkTheme } = useTheme();

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: isDarkTheme ? "#333" : "#fff" },
          headerTintColor: isDarkTheme ? "#fff" : "#000",
          tabBarStyle: { backgroundColor: isDarkTheme ? "#333" : "#fff" },
          tabBarActiveTintColor: isDarkTheme ? "#fff" : "#000",
          tabBarInactiveTintColor: isDarkTheme ? "#777" : "#888",
        }}
      >
        <Tab.Screen
          name="Lab1"
          component={Lab1}
          options={{
            tabBarButton: (props) => (
              <CustomTabButton {...props}>Lab1</CustomTabButton>
            ),
          }}
        />
        <Tab.Screen
          name="Lab2"
          component={Lab2}
          options={{
            tabBarButton: (props) => (
              <CustomTabButton {...props}>Lab2</CustomTabButton>
            ),
          }}
        />
        <Tab.Screen
          name="Lab3"
          component={Lab3}
          options={{
            tabBarButton: (props) => (
              <CustomTabButton {...props}>Lab3</CustomTabButton>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  tabButtonText: {
    fontSize: 16,
  },
});

export default App;
