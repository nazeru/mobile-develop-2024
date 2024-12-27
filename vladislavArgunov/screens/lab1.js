import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { useTheme } from "../ContextAPI/themeContext";
import { getStyles } from "./styles";

const Lab1 = () => {
  const { isDarkTheme } = useTheme();
  const styles = getStyles(isDarkTheme);

  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{number}</Text>
        <Text style={styles.title}>Нажимай</Text>
        <View style={styles.subContent}>
          <Button title="на меня" onPress={() => setNumber(number + 1)} />
        </View>
        <View style={styles.subContent}>
          <Button title="не сюда" onPress={() => setNumber(-9999)} />
        </View>
      </View>
    </View>
  );
};

export default Lab1;
