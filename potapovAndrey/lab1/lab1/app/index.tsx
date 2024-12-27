import Lab1 from "./lab1";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { ThemeProvider, useTheme } from "../ThemeContext";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const ThemedIndex = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#008B8B",
          },
          headerShown: false,
          tabBarLabelStyle: {
            color: "#FFFFFF", // Цвет текста вкладок
            fontSize: 20, // Размер шрифта
            fontWeight: "bold",
            marginBottom: 12,
          },
          headerTintColor: "#fff",
          tabBarItemStyle: {
            borderRightWidth: 1, // Добавляем правую границу
            borderLeftWidth: 1,
            borderRightColor: "#FFFFFF", // Цвет границы
            borderLeftColor: "#FFFFFF",
          },
          tabBarIcon: () => null,
        }}
      >
        <Tab.Screen name="Лаб 1" component={Lab1} />
        <Tab.Screen name="Лаб 2" component={Lab2} />
        <Tab.Screen name="Лаб 3" component={Lab3} />
      </Tab.Navigator>
    </View>
  );
};
export default function Index() {
  return (
    <ThemeProvider>
      <ThemedIndex />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  lightContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    marginBottom: 30,
  },
  emojiContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 100,
  },
  counter: {
    fontSize: 30,
    marginTop: 20,
  },
});
