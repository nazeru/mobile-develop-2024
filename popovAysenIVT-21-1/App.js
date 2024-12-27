import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import lab1 from "./screen/lab1";
import lab2 from "./screen/lab2";
import lab3 from "./screen/lab3";

import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="lab1" component={lab1} />
        <Tab.Screen name="lab2" component={lab2} />
        <Tab.Screen name="lab3" component={lab3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
