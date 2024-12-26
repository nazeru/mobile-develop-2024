import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { TextStoreProvider } from './store/TextStore';
import Lab1 from './screens/lab1';
import Lab2 from './screens/lab2';
import Lab3 from './screens/lab3';
import Lab4a from './screens/lab4a';
import Lab4b from './screens/lab4b';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TextStoreProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Лаб. работа 1" component={Lab1} />
          <Tab.Screen name="Лаб. работа 2" component={Lab2} />
          <Tab.Screen name="Лаб. работа 3" component={Lab3} />
          <Tab.Screen name="Лаб. работа 4а" component={Lab4a} />
          <Tab.Screen name="Лаб. работа 4б" component={Lab4b} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </TextStoreProvider>
  );
}
