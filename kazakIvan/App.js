import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { ThemeProvider } from "./components/ThemeContext"; 
import Lab1 from "./screens/lab1";
import Lab2_3 from "./screens/lab3";
import MainMenu from "./screens/mainMenu";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Загрузка шрифтов
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Roboto-Medium": require("./assets/fonts/SFProText-Medium.ttf"),
        "Roboto-Bold": require("./assets/fonts/SFProText-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  // Если шрифты не загружены, показываем индикатор загрузки
  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu">
          <Stack.Screen
            name="MainMenu"
            options={{ headerShown: false }}
            component={MainMenu}
          />
          <Stack.Screen
            name="Lab1"
            options={{ headerShown: false }}
            component={Lab1}
          />
          <Stack.Screen
            name="Lab2_3"
            options={{ headerShown: false }}
            component={Lab2_3}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
