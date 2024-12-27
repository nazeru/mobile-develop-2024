import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screen/lab1";
import Lab2 from "./screen/lab2";
import Lab3 from "./screen/lab3";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State for the theme

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Lab1"
          children={() => <Lab1 isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
        />
        <Tab.Screen
          name="Lab2"
          children={() => <Lab2 isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
        />
        <Tab.Screen
          name="Lab3"
          children={() => <Lab3 isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
