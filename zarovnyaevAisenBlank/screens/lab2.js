import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const countries = [
  { code: "AT", name: "Австрия" },
  { code: "US", name: "США" },
  { code: "CA", name: "Канада" },
  { code: "FR", name: "Франция" },
  { code: "GB", name: "Великобритания" },
  { code: "JP", name: "Япония" },
  { code: "RU", name: "Россия" },
];

export default function AdministrativeDivisionsScreen() {
  const [divisions, setDivisions] = useState([]);
  const [countryIndex, setCountryIndex] = useState(0);

  const fetchDivisions = async (countryCode) => {
    try {
      const response = await fetch(
        `https://rawcdn.githack.com/kamikazechaser/administrative-divisions-db/master/api/${countryCode}.json`
      );
      const data = await response.json();
      setDivisions(data); // Устанавливаем данные административных единиц
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  useEffect(() => {
    fetchDivisions(countries[countryIndex].code); // Загружаем данные для текущей страны
  }, [countryIndex]);

  const handleChangeCountry = () => {
    setCountryIndex((prevIndex) => (prevIndex + 1) % countries.length); // Изменяем индекс страны
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.countryName, { marginTop: 120 }]}>
          {countries[countryIndex].name}:
        </Text>
        <View style={styles.divisionsContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}
          >
            {divisions.map((division, index) => (
              <Text key={index} style={styles.divisionText}>
                {division}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangeCountry}>
        <Text style={styles.buttonText}>Сменить страну</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  countryName: {
    fontSize: 24,
    color: "#2673D0",
    fontFamily: "Roboto-Bold",
    marginBottom: 80,
    textAlign: "center",
  },
  divisionsContainer: {
    width: 300,
    height: 324,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  divisionText: {
    fontSize: 16,
    color: "#2673D0",
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginVertical: 5,
  },
  button: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    backgroundColor: "#CFE2F9",
    width: 200,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#2673D0",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
