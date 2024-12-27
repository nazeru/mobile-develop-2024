import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";
import Lab3 from "./screens/Lab3";
import Lab4 from "./screens/Lab4";
import Lab4View from "./screens/Lab4View";
import Icon from "react-native-vector-icons/Ionicons"; // Импорт иконок из библиотеки

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView  style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: "#ffffff",
              tabBarInactiveTintColor: "#dddddd",
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch (route.name) {
                  case "Лабораторная 1":
                    iconName = focused ? "calculator" : "calculator-outline";
                    break;
                  case "Лабораторная 2":
                    iconName = focused ? "clipboard" : "clipboard-outline";
                    break;
                  case "Лабораторная 3":
                    iconName = focused ? "person" : "person-outline";
                    break;
                  case "Лабораторная 4":
                    iconName = focused ? "calendar" : "calendar-outline";
                    break;
                  case "Просмотр задач":
                    iconName = focused ? "desktop" : "desktop-outline";
                    break;
                  default:
                    iconName = "ellipse";
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Лабораторная 1" component={Lab1} />
            <Tab.Screen name="Лабораторная 2" component={Lab2} />
            <Tab.Screen name="Лабораторная 3" component={Lab3} />
            <Tab.Screen name="Лабораторная 4" component={Lab4} />
            <Tab.Screen name="Просмотр задач" component={Lab4View} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#007AFF",
    height: 60,
    paddingBottom: 5,
  },
  container: {
    flex:1
  }
});