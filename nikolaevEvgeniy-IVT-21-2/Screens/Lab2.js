import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { commonStyles } from "../styles";

const Lab2 = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const newGreeting = name ? `Привет, ${name}!` : "Введите своё имя.";
    setGreeting(newGreeting);

    return () => {
      console.log(`Очистка: имя было "${name}"`);
    };
  }, [name]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Lab2: useEffect</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Введите своё имя"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.greeting}>{greeting}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 18,
    marginVertical: 20,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Lab2;
