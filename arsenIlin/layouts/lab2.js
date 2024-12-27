import { SafeAreaView, Text, TextInput, StyleSheet, View } from "react-native";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTheme } from "../ThemeContext.js";

const Lab2 = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const { isDarkTheme } = useTheme();

  const getWeatherData = async () => {
    const apiKey = "d50c6c38d41a4f4892e112610242612"; // Замените на ваш ключ API
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.location) {
        setWeatherData(response.data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city.trim().length > 0) {
      getWeatherData();
    }
  }, [city]);

  const weatherMessage = useMemo(() => {
    if (weatherData) {
      return {
        info: `Погода в\nТемпература\nОщущается как\nСостояние\nСкорость ветра\nСкорость ветра\nВлажность`,
        test: `${weatherData.location.name}\n${weatherData.current.temp_c}°C\n ${weatherData.current.feelslike_c}°C\n ${weatherData.current.condition.text}\n${weatherData.current.wind_kph} км/ч\n${weatherData.current.humidity}%`,
      };
    }
    return { info: "Информация отсутствует", test: "" };
  }, [weatherData]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: isDarkTheme ? "#404040" : "#D9D9D9"}]}>
      <Text style={styles.title}>Погода</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите название города"
        placeholderTextColor="#AAAAAA"
        value={city}
        onChangeText={setCity}
      />
      <View style={[styles.card, {backgroundColor: isDarkTheme ? "#1C1B1B" : "#8C8C8C"}]}>
        <Text style={[styles.cardInfo, {color: isDarkTheme ? "#ffffff" : "#000000"}]}>{weatherMessage.info}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={[styles.cardTest,{color: isDarkTheme ? "#ffffff" : "#000000"}]}>{weatherMessage.test}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  card: {
    width: 364,
    height: 436,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    padding: 10,
    flexDirection: "row",
  },
  cardInfo: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  separator: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginHorizontal: 10,
  },
  cardTest: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default Lab2;
