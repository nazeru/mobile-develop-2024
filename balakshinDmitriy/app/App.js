import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useCartStore } from './store';
import "../global.css";

import HomeScreen from "./screens/homeScreen";
import CartScreen from "./screens/cartScreen";
import SearchScreen from "./screens/searchScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "home":
                iconName = focused ? "home" : "home-outline";
                break;
              case 'cart':
                iconName = focused ? 'bag' : 'bag-outline';
                break;
              case 'search':
                iconName = focused ? 'search' : 'search-outline';
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
          name="home"
          component={HomeScreen}
          options={{
            title: "Главная",
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchScreen}
          options={{
            title: "Поиск",
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartScreen}
          options={{
            title: "Корзина",
            tabBarBadge: cart.length
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
