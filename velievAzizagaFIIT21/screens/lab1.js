import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, reset, double } from "../redux/counterSlice";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function Lab1() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [fontsLoaded] = Font.useFonts({
    "JetBrainsMono-Regular": require("../fonts/JetBrainsMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.counterLabel}>СЧЁТЧИК:</Text>
        <Text style={styles.counterValue}>{count}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>УВЕЛИЧИТЬ ×1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.buttonText}>ОБНУЛИТЬ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(double())}
        >
          <Text style={styles.buttonText}>УВЕЛИЧИТЬ ×2</Text>
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
  },
  counterLabel: {
    fontSize: 36,
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 12,
    paddingTop: 250,
  },
  counterValue: {
    fontSize: 36,
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 16,
    width: 246,
    height: 44,
    textAlign: "center",
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
    fontSize: 25,
    color: "#000000",
    fontFamily: "JetBrainsMono-Regular",
  },
});
