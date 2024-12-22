import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

const Lab2 = () => {
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

  // Используем useMemo для мемоизации данных о ценах
  const processedData = useMemo(() => {
    if (!data) return null; // Проверяем, есть ли данные
    return {
      updated: data.time.updated,
      rates: data.bpi,
    };
  }, [data]); // Зависимость от `data`

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Bitcoin Prices</Text>
      <Text>Last updated: {processedData.updated}</Text>
      <FlatList
        data={Object.entries(processedData.rates)}
        keyExtractor={([currency]) => currency}
        renderItem={({ item }) => {
          const [currency, info] = item;
          return (
            <Text style={styles.item}>
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