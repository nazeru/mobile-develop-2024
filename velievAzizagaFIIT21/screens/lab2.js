import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function lab2() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);
  const [fontsLoaded] = Font.useFonts({
    "JetBrainsMono-Regular": require("../fonts/JetBrainsMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        <View style={styles.textBackground}>
          <Text style={styles.counterValue}>{joke}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={fetchJoke}>
          <Text style={styles.buttonText}>Получить шутку</Text>
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
  },
  counterContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingTop: 140,
    paddingBottom: 156,
  },
  counterLabel: {
    fontSize: 36,
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 12,
  },
  counterValue: {
    fontSize: 26,
    fontFamily: "JetBrainsMono-Regular",
    textAlign: "center",
    height: 284,
    width: 284,
  },
  textBackground: {
    width: 402,
    height: 402,
    backgroundColor: "#A3CD9E",
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#529471",
    borderRadius: 30,
    width: 252,
    height: 84,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 25,
    color: "#000000",
    fontFamily: "JetBrainsMono-Regular",
  },
});
