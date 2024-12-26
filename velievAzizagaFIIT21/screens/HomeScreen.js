import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = Font.useFonts({
    "JetBrainsMono-Regular": require("../fonts/JetBrainsMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("lab1")}
        >
          <Text style={styles.buttonText}>ПЕРЕЙТИ К ЗАДАНИЮ 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("lab2")}
        >
          <Text style={styles.buttonText}>ПЕРЕЙТИ К ЗАДАНИЮ 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("lab3")}
        >
          <Text style={styles.buttonText}>ПЕРЕЙТИ К ЗАДАНИЮ 3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingBottom: 156,
    marginBottom: 12,
    paddingTop: 366,
  },
  button: {
    backgroundColor: "#529471",
    borderRadius: 30,
    width: 250,
    height: 84,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
    color: "#000000",
    fontFamily: "JetBrainsMono-Regular",
  },
});
