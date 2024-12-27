import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../themeContext";

const Lab2 = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  if (!theme) {
    console.error(
      "Theme is undefined. Ensure ThemeProvider is properly configured."
    );
    return null;
  }

  const { isDarkTheme } = theme;

  const themeStyles = isDarkTheme
    ? styles.darkContainer
    : styles.lightContainer;
  const textStyles = isDarkTheme ? styles.darkText : styles.lightText;

  const getJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.title, textStyles]}>A random joke</Text>
      <View style={styles.jokeContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          joke && (
            <View style={styles.jokeDisplay}>
              <Text style={[styles.jokeText, textStyles]}>{joke.setup}</Text>
              <Text style={[styles.jokeText, textStyles]}>
                {joke.punchline}
              </Text>
            </View>
          )
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={getJoke}>
        <Text
          style={[
            styles.buttonText,
            isDarkTheme ? { color: "#fff" } : { color: "#000" },
          ]}
        >
          Get a random joke
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
    position: "absolute",
    top: 20,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
  jokeContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  jokeDisplay: {
    alignItems: "center",
    position: "absolute",
    top: "50%",
    marginTop: -200,
  },
  jokeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6FA670",
    paddingVertical: 20,
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    position: "absolute",
    bottom: "50%",
    marginBottom: -50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Lab2;
