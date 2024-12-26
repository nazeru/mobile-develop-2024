import { Text, TextInput, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import ThemedSafeAreaView from "../components/ThemedSafeAreaView";
import useTheme from "../hooks/useTheme";

const Lab2 = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const { backgroundColor, textColor } = useTheme();

  const getWeatherData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fb55c434b593d7e53d17f9a7911897f4`;
    axios
      .get(url)
      .then((dataWeather) => {
        if (dataWeather.data.name.length > 0) {
          setWeatherData(dataWeather);
        }
      })
      .catch((err) => {
        setWeatherData(null);
      });
  };

  useEffect(() => {
    if (city.length > 0) {
      getWeatherData();
    }
  }, [city]);

  return (
    <ThemedSafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>Weather</Text>
      <View>
        <Text style={[styles.text, { color: textColor }]}>
          Enter the city name
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              color: backgroundColor,
              borderColor: backgroundColor,
              backgroundColor: textColor,
            },
          ]}
          value={city}
          onChangeText={setCity}
        />
        {weatherData ? (
          <>
            <Text style={[styles.message, { color: textColor }]}>City:</Text>
            <Text style={[styles.info, { color: textColor }]}>
              {weatherData.data.name}
            </Text>
            <Text style={[styles.message, { color: textColor }]}>
              Temperature:
            </Text>
            <Text style={[styles.info, { color: textColor }]}>
              {weatherData.data.main.temp}
            </Text>
            <Text style={[styles.message, { color: textColor }]}>
              Precipitation:
            </Text>
            <Text style={[styles.info, { color: textColor }]}>
              {weatherData.data.weather[0].main}
            </Text>
            <Text style={[styles.message, { color: textColor }]}>
              Description:
            </Text>
            <Text style={[styles.info, { color: textColor }]}>
              {weatherData.data.weather[0].description}
            </Text>
            <Text style={[styles.message, { color: textColor }]}>
              Wind speed:
            </Text>
            <Text style={[styles.info, { color: textColor }]}>
              {weatherData.data.wind.speed}
            </Text>
            <Text style={[styles.message, { color: textColor }]}>
              Humidity:
            </Text>
            <Text style={[styles.info, { color: textColor }]}>
              {weatherData.data.main.humidity}
            </Text>
          </>
        ) : (
          <Text style={[styles.message, { color: textColor }]}>
            Loading or no data available
          </Text>
        )}
      </View>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 148,
    fontFamily: "Roboto-Medium",
    fontSize: 24,
  },
  text: {
    marginTop: 44,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  input: {
    marginTop: 4,
    marginBottom: 24,
    height: 32,
    width: 196,
    borderRadius: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    paddingLeft: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default Lab2;
