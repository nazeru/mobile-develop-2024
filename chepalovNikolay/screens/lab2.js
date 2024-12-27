import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext"; 

const Lab2 = () => {
  const { isDarkTheme } = useTheme(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processedData = useMemo(() => {
    if (!data) return null; 
    return {
      updated: data.time.updated,
      rates: data.bpi,
    };
  }, [data]);

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
      <Text style={[styles.title, { color: isDarkTheme ? "#fff" : "#000" }]}>
        Lab 2
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: isDarkTheme ? "#ccc" : "#666" },
        ]}
      >
        Current Bitcoin Prices
      </Text>
      <Text
        style={[
          styles.updatedText,
          { color: isDarkTheme ? "#fff" : "#000" },
        ]}
      >
        Last updated: {processedData.updated}
      </Text>
      <FlatList
        data={Object.entries(processedData.rates)}
        keyExtractor={([currency]) => currency}
        renderItem={({ item }) => {
          const [currency, info] = item;
          return (
            <View
              style={[
                styles.rateContainer,
                {
                  backgroundColor: isDarkTheme ? "#555" : "#e0e0e0",
                },
              ]}
            >
              <Text
                style={[
                  styles.rateText,
                  { color: isDarkTheme ? "#fff" : "#000" },
                ]}
              >
                {info.code}: {info.rate}
              </Text>
            </View>
          );
        }}
      />
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
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  updatedText: {
    fontSize: 16,
    marginBottom: 20,
  },
  rateContainer: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "stretch",
  },
  rateText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Lab2;
