import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { ProductCard } from "./productCard";
import { getProductsFromCategory } from "../api";

export const ProductsCarousel = ({ categoryId, count = 10 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsFromCategory(categoryId, count);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов категории:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, count]);

  if (loading) {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#FBAF03" />
        <Text>Загрузка продуктов...</Text>
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View className="flex items-center justify-center">
        <Text>Нет доступных продуктов</Text>
      </View>
    );
  }

  return (
    <View className="flex">
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 10 }}>
            <ProductCard product={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
