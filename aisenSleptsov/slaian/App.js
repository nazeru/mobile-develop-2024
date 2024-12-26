import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab2 from "./layout/lab2";
import Lab3 from "./layout/lab3";
import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}