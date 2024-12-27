import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../ThemeContext";

const CurrencyRates = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chosenCurrency = ["USD", "EUR", "CNY"];
  const { isDarkTheme } = useTheme();

  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    CNY: "¥",
  };

  const fetchCurrencyRates = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/c8eeda21e63430fa00336497/latest/RUB`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const filteredRates = Object.fromEntries(
        Object.entries(data.conversion_rates).filter(([currency]) =>
          chosenCurrency.includes(currency)
        )
      ) as { [key: string]: number };
      const convertedRates = Object.fromEntries(
        Object.entries(filteredRates).map(([currency, rate]) => [
          currency,
          parseFloat((1 / rate).toFixed(2)),
        ])
      );
      setRates(convertedRates);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
      console.log("Данные обновлены");
    }
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const themeStyles = isDarkTheme
    ? styles.darkContainer
    : styles.lightContainer;
  const textStyles = isDarkTheme ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.title, textStyles]}>Курс валют</Text>
      {Object.entries(rates).map(([currency, rate]) => (
        <Text key={currency} style={[styles.rate, textStyles]}>
          {currencySymbols[currency]} {currency} {rate.toFixed(2)} RUB
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={fetchCurrencyRates}>
        <Text style={styles.buttonText}>обновить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 50,
    marginBottom: 210,
    alignContent: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  rate: {
    fontWeight: "bold",
    marginBottom: 40,

    fontSize: 25,
  },
  error: {
    color: "red",
    fontSize: 18,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
  updateMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
  button: {
    backgroundColor: "#D9D9D9",
    borderColor: "#008B8B",
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 215,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CurrencyRates;
