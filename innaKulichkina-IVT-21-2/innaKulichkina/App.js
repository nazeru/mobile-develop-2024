import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import ColorAndMoveScreen from './screens/lab1'; 
import CatFactApp from './screens/lab2'; 
import Lab3 from './screens/lab3';
import { ThemeProvider } from './ThemeContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconSource;

              if (route.name === '1') {
                iconSource = focused
                  ? require('./assets/lab1_active.png')
                  : require('./assets/lab1_inactive.png');
              } else if (route.name === '2') {
                iconSource = focused
                  ? require('./assets/lab2_active.png')
                  : require('./assets/lab2_inactive.png');
              } else if (route.name === '3') {
                iconSource = focused
                  ? require('./assets/lab3_active.png')
                  : require('./assets/lab3_inactive.png');
              }
              return (
                <Image
                  source={iconSource}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              );
            },
            tabBarStyle: {
              height: 60, 
              paddingTop:10,
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen name="1" component={ColorAndMoveScreen} />
          <Tab.Screen name="2" component={CatFactApp} />
          <Tab.Screen name="3" component={Lab3} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
