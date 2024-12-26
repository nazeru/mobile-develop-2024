import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Lab1 from "./screens/lab1";
// import Lab2 from "./screens/lab2";
// import Lab3 from "./screens/lab3";
import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
        {/* <Tab.Screen name="Lab2" component={Lab2} /> */}
        {/* <Tab.Screen name="Lab3" component={Lab3} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}