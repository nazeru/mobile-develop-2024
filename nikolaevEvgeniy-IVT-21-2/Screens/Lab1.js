import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { commonStyles } from "../styles";

const Lab1 = () => {
  const [count, setCount] = useState(0);
  const [showChallenge, setShowChallenge] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const handleIncrement = () => {
    if ((count + 1) % 10 === 0 && !challengeCompleted) {
      setShowChallenge(true);
    } else {
      setCount(count + 1);
      setChallengeCompleted(false);
    }
  };

  const handleChallengeSubmit = () => {
    if (inputValue.toLowerCase() === "продолжить") {
      setShowChallenge(false);
      setChallengeCompleted(true);
      setCount(count + 1);
      setInputValue("");
    } else {
      alert("Ответ неверный! Попробуйте снова.");
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Lab1: useState</Text>
      <Text style={styles.counter}>Счетчик: {count}</Text>

      {!showChallenge ? (
        <TouchableOpacity style={commonStyles.button} onPress={handleIncrement}>
          <Text style={commonStyles.buttonText}>Кликнуть</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.challengeText}>Введите "продолжить", чтобы увеличить счет:</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Ваш ответ"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity style={commonStyles.button} onPress={handleChallengeSubmit}>
            <Text style={commonStyles.buttonText}>Ответить</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  challengeText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
});

export default Lab1;
