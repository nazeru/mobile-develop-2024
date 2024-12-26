import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import ThemedSafeAreaView from "../components/ThemedSafeAreaView";
import useTheme from "../hooks/useTheme";

const Lab1 = () => {
  const [clicks, setClicks] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [result, setResult] = useState(0);
  const { backgroundColor, textColor } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  if (seconds == 0) {
    if (clicks > result) {
      setResult(clicks);
    }
    setClicks(0);
    setSeconds(5);
  }

  return (
    <ThemedSafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>
        Click per second test
      </Text>
      <View style={styles.container}>
        <Text style={[styles.textDesc, { color: textColor, marginRight: 48 }]}>
          {seconds}
          {"\n"}Timer
        </Text>
        <Text style={[styles.textDesc, { color: textColor }]}>
          {clicks}
          {"\n"}Score
        </Text>
        <Text style={[styles.textDesc, { color: textColor, marginLeft: 48 }]}>
          {result}
          {"\n"}Best
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setClicks(clicks + 1);
        }}
        style={[styles.clickButton, { backgroundColor: textColor }]}
      >
        <Text
          style={{
            color: backgroundColor,
            fontFamily: "Roboto-Medium",
            fontSize: 20,
          }}
        >
          Click!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSeconds(5);
        }}
        style={[styles.button, { backgroundColor: textColor }]}
      >
        <Text
          style={{
            color: backgroundColor,
            fontFamily: "Roboto-Medium",
            fontSize: 14,
          }}
        >
          Restart
        </Text>
      </TouchableOpacity>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Roboto-Medium",
    marginTop: 148,
  },
  textDesc: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
  },
  button: {
    width: 92,
    height: 28,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 44,
  },
  clickButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 44,
  },
  container: {
    flexDirection: "row",
    marginTop: 22,
  },
});

export default Lab1;
