import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import Lab1 from "./Screens/Lab1";
import Lab2 from "./Screens/Lab2";
import Lab3 from "./Screens/Lab3";
import Lab4 from "./Screens/Lab4";
import TaskList from "./Screens/TaskList";
import { Image, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconSource;

              if (route.name === "Lab1") {
                iconSource = require("./assets/1.png");
              } else if (route.name === "Lab2") {
                iconSource = require("./assets/2.png");
              } else if (route.name === "Lab3") {
                iconSource = require("./assets/3.png");
              } else if (route.name === "Lab4") {
                iconSource = require("./assets/4.png");
              } else if (route.name === "Tasks") {
                iconSource = require("./assets/5.png");
              }

              return (
                <Image
                  source={iconSource}
                  style={[
                    styles.icon,
                    { tintColor: focused ? "tomato" : "gray" },
                  ]}
                />
              );
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Lab1" component={Lab1} />
          <Tab.Screen name="Lab2" component={Lab2} />
          <Tab.Screen name="Lab3" component={Lab3} />
          <Tab.Screen name="Lab4" component={Lab4} />
          <Tab.Screen name="Tasks" component={TaskList} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24, // Ширина иконки
    height: 24, // Высота иконки
  },
});
