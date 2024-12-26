import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import * as Font from "expo-font";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Inter: require("../../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerStyle: {
            backgroundColor: "#2A4758",
            height: 59,
          },
          tabBarStyle: {
            height: 70,
            borderRadius: 50,
            backgroundColor: "#2A4758",
            margin: 14,
            marginBottom: 30,
          },
        }}
      >
        <Tabs.Screen
          name="lab1"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-1-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="lab2"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-2-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="lab3"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-3-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="lab3_2"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-3-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="lab4"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-4-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="lab4_2"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-4-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="numeric-0-box-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#000000",
  },
  icon: {
    width: 42,
    height: 42,
    marginBottom: 9,
    marginTop: 9,
    color: "#000000",
  },
  headerTab: {
    backgroundColor: "#CFE2F9",
    height: 100,
  },
  tabBar: {
    height: 60,
    backgroundColor: "#CFE2F9",
    paddingTop: 6,
    paddingBottom: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#000000",
  },
});
