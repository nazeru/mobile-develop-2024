import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Switch } from "react-native";
import useTheme from "../hooks/useTheme";

const ThemedSafeAreaView = ({ children }) => {
  const { isDarkTheme, textColor, toggleTheme, backgroundColor } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.buttonContainer}>
        <Text style={[styles.text, { color: textColor }]}>
          {isDarkTheme ? "Dark" : "Light"}
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: "#777777", true: "#777777" }}
          thumbColor={isDarkTheme ? "#f5f5f5" : "#252525"}
        />
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
  },
});

export default ThemedSafeAreaView;
