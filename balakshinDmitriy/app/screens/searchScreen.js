import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, Text, ActivityIndicator } from "react-native";
import { searchProducts } from "../api";
import { SearchItem } from "../components/productCard";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const products = await searchProducts(debouncedQuery);
        setResults(products);
      } catch (error) {
        console.error("Ошибка при выполнении поиска:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <View className="flex flex-col gap-4 p-4 bg-[#F3F4F6]">
      <View className="flex-row items-center justify-between">
      <TextInput
        className="flex-[1_0_100%] px-[24] py-4 bg-white rounded-md"
        value={query}
        onChangeText={setQuery}
        placeholder="Поиск товаров"
        returnKeyType="search"
      />
      <Ionicons name="search" size={20} color="#777" style={styles.icon}/>
    </View>

      {loading && (
        <View style={{ marginBottom: 16 }}>
          <ActivityIndicator size="large" color="#FBAF03" />
        </View>
      )}

      {results.length === 0 && !loading ? (
        <Text>Ничего не найдено</Text>
      ) : (
        <View>
          {!loading && (<Text className="text-lg font-semibold">Товаров по запросу: <Text className="text-lg">{results.length}</Text></Text>)}
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SearchItem product={item} />}
            contentContainerStyle={{ paddingTop: 16 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 20,
  }
});

export default SearchScreen;
