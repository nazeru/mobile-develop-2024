import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../themeContext";

const Lab2 = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDarkTheme } = useTheme();
  const themeStyles = isDarkTheme
    ? styles.darkContainer
    : styles.lightContainer;
  const textStyles = isDarkTheme ? styles.darkText : styles.lightText;
  const getCountry = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const randomCountry =
        data[Math.floor(Math.random() * data.length)].name.common;
      setCountry(randomCountry);
    } catch (error) {
      console.error("Error fetching country:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.title, textStyles]}>Random Country:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={[styles.title, textStyles]}>{country}</Text>
      )}
      <Button title="Get Country" onPress={getCountry} />
    </View>
  );
};

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: "#333",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});

export default Lab2;
