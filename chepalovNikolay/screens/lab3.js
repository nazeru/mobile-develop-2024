import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext";

const JokeScreen = () => {
  const { isDarkTheme } = useTheme(); 
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke(); 
  }, []);

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDarkTheme ? "#fff" : "#000" },
        ]}
      >
        Lab 3
      </Text>
      <View
        style={[
          styles.jokeContainer,
          { backgroundColor: isDarkTheme ? "#444" : "#87CEFA" },
        ]}
      >
        <Text
          style={[
            styles.joke,
            { color: isDarkTheme ? "#fff" : "#000" },
          ]}
        >
          {joke}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDarkTheme ? "#555" : "#32CD32" },
        ]}
        onPress={fetchJoke}
      >
        <Text style={{ color: isDarkTheme ? "#fff" : "#000", fontWeight: "bold" }}>
          Нажми
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  jokeContainer: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  joke: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default JokeScreen;
