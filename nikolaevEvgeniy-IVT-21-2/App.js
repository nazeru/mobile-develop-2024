import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import Lab1 from "./Screens/Lab1";
import Lab2 from "./Screens/Lab2";
import Lab3 from "./Screens/Lab3";
import TaskList from "./Screens/TaskList";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Lab1" component={Lab1} />
          <Tab.Screen name="Lab2" component={Lab2} />
          <Tab.Screen name="Lab3" component={Lab3} />
          <Tab.Screen name="Tasks" component={TaskList} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}