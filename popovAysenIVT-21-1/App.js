import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import lab1 from "./screen/lab1";

import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="lab1" component={lab1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
