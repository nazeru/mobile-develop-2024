import { SafeAreaView, Text, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Lab2 = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [textMessage, setTextMessage] = useState("");

  const getWeatherData = async () => {
    const apiKey = "b93df7f5926c4d62b8a103312241912"; // Замените на ваш ключ API
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.location) {
        setWeatherData(response.data);
      } else {
        setTextMessage("Город не найден");
        setWeatherData(null);
      }
    } catch (error) {
      setTextMessage("Ошибка при получении данных");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city.trim().length > 0) {
      getWeatherData();
    }
  }, [city]);

  // Используем useMemo для вычисления текстового сообщения о погоде
  const weatherMessage = useMemo(() => {
    if (weatherData) {
      return (
        `Погода в: ${weatherData.location.name}\n` +
        `Температура: ${weatherData.current.temp_c}°C\n` +
        `Ощущается как: ${weatherData.current.feelslike_c}°C\n` +
        `Состояние: ${weatherData.current.condition.text}\n` +
        `Скорость ветра: ${weatherData.current.wind_kph} км/ч\n` +
        `Влажность: ${weatherData.current.humidity}%`
      );
    }
    return "";
  }, [weatherData]);

  // Обновляем текст сообщения
  useEffect(() => {
    if (weatherMessage) {
      setTextMessage(weatherMessage);
    }
  }, [weatherMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Погода</Text>
      <Text style={styles.label}>Введите название вашего города:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите город"
        value={city}
        onChangeText={setCity}
      />
      <Text style={styles.result}>{textMessage}</Text>
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
  },
  label: {
    marginTop: 30,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 5,
  },
  result: {
    marginTop: 30,
    fontSize: 20,
    textAlign: "center",
  },
});

export default Lab2;
