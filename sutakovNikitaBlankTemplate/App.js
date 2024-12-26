import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import * as Font from "expo-font";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useState, useEffect } from "react";

const Tab = createBottomTabNavigator();
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Lab1"
          component={Lab1}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab1.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#777777" },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lab2"
          component={Lab2}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab2.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#777777" },
                ]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lab3"
          component={Lab3}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./assets/icons/lab3.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#007AFF" : "#777777" },
                ]}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#252525",
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 6,
  },
  tabBarLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
  },
  tabBar: {
    height: 60,
    paddingTop: 6,
    paddingBottom: 6,
  },
});
