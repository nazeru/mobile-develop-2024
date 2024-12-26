import React from "react";
import { Button, Image } from "react-native";
import {
  createBottomTabNavigator,
  TransitionPresets,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import { ThemeProvider } from "./ContextAPI/themeContext";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useTheme } from "./ContextAPI/themeContext";

const Tab = createBottomTabNavigator();

function AppContent() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const navigationTheme = isDarkTheme ? DarkTheme : DefaultTheme;
  const inactiveTintColor = isDarkTheme ? "darkgray" : "gray";

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarIcon: ({ focused, size }) => {
            const icon = isDarkTheme
              ? focused
                ? require("./assets/folderF.png")
                : require("./assets/folderD.png")
              : focused
              ? require("./assets/folderF.png")
              : require("./assets/folderL.png");
            return (
              <Image source={icon} style={{ width: size, height: size }} />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: inactiveTintColor,
        })}
      >
        <Tab.Screen
          name="Lab 1"
          component={Lab1}
          options={{
            TransitionPresets: TransitionPresets.ShiftTransition,
          }}
        />
        <Tab.Screen
          name="Lab 2"
          component={Lab2}
          options={{
            TransitionPresets: TransitionPresets.ShiftTransition,
          }}
        />
        <Tab.Screen
          name="Lab 3"
          component={Lab3}
          options={{
            TransitionPresets: TransitionPresets.ShiftTransition,
          }}
        />
      </Tab.Navigator>
      <Button
        title="Сменить тему"
        onPress={toggleTheme}
        color={isDarkTheme ? "gray" : "#2296f3"}
      />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
