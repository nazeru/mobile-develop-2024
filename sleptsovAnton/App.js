import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import { NavigationContainer } from "@react-navigation/native";
import Lab4_1 from "./screens/lab4_1";
import Lab4_2 from "./screens/lab4_2";
import * as Font from "expo-font";
const colors = ["black", "red", "yellow"];

const Tab = createBottomTabNavigator();
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Загрузка шрифтов
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"), // Замените путь на ваш
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.headerTab,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Lab 1"
          component={Lab1}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab1.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#000000" },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lab 2"
          component={Lab2}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab2.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#000000" },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lab 3"
          component={Lab3}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab3.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#000000" },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lab 4_1"
          component={Lab4_1}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab4_1.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#000000" },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lab 4_2"
          component={Lab4_2}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab4_2.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#000000" },
                ]}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#000000",
  },
  icon: {
    width: 42,
    height: 42,
    marginBottom: 9,
    marginTop: 9,
    color: "#000000",
  },
  headerTab: {
    backgroundColor: "#FFFFFF",
    height: 100,
  },
  tabBar: {
    height: 60,
    backgroundColor: "#FFFFFF",
    paddingTop: 6,
    paddingBottom: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#000000",
  },
});