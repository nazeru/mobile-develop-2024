import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import Lab1 from "./screens/Lab1.js";
import Lab2 from "./screens/Lab2.js";
import Lab3 from "./screens/Lab3.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

