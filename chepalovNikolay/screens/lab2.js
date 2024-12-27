// Lab2.js
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext'; // Import the theme context

const Lab2 = () => {
  const { isDarkTheme } = useTheme(); // Get the current theme
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

  // Use useMemo to memoize the price data
  const processedData = useMemo(() => {
    if (!data) return null; // Check if data exists
    return {
      updated: data.time.updated,
      rates: data.bpi,
    };
  }, [data]); // Dependency on `data`

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Current Bitcoin Prices</Text>
      <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>Last updated: {processedData.updated}</Text>
      <FlatList
        data={Object.entries(processedData.rates)}
        keyExtractor={([currency]) => currency}
        renderItem={({ item }) => {
          const [currency, info] = item;
          return (
            <Text style={[styles.item, { color: isDarkTheme ? '#fff' : '#000' }]}>
              {info.code}: {info.rate}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Lab2;
