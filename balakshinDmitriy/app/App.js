import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import Lab1Screen from "./screens/lab1";
import "../global.css";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Главная":
                iconName = focused ? "home" : "home-outline";
                break;
              default:
                iconName = focused ? "home" : "home-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "black",
          tabBarLabel: () => undefined,
          headerShown: true,
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            elevation: 0.1,
            shadowOpacity: 0.1,
            shadowColor: "black",
            shadowRadius: 20,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={20}
              tint="light"
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Lab 1"
          component={Lab1Screen}
          options={{
            title: "Lab 1",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
