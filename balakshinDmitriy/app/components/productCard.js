import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../store";
import { currencyFormat } from "../utils";

export const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return (
      <View>
        <Text>Данные о продукте отсутствуют.</Text>
      </View>
    );
  }

  const formatPrice = currencyFormat(product.price);

  return (
    <View className="flex w-[200px] p-3 rounded-xl bg-white">
      <Image
        source={{
          uri:
            product.images && product.images[0]
              ? product.images[0].src
              : "https://stockholmykt.ru/wp-content/uploads/2024/03/placeholder-e1714032640700.jpg",
        }}
        style={{
          height: 150,
          resizeMode: "contain",
          marginBottom: 8,
        }}
      />
      <Text className="text-base/snug font-semibold mb-2" numberOfLines={2}>
        {product.name}
      </Text>
      <Text className="text-gray-600">
        {product.categories && product.categories[0]
          ? product.categories[0].name
          : "Без категории"}
      </Text>
      <View className="flex-row items-center justify-between mt-auto">
        <Text className="text-xl">{formatPrice}</Text>
        <Pressable
          onPress={() => {
            addToCart(product);
          }}
          className="w-[40] h-[40] p-2 bg-gray-300 rounded-full"
          backgroundColor="#D8D8D8"
        >
          <Ionicons name="add-outline" size={26} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export const CartItem = ({ product, incrementQuantity, decrementQuantity }) => {
  if (!product) {
    return (
      <View>
        <Text>Данные о продукте отсутствуют.</Text>
      </View>
    );
  }

  const formatPrice = currencyFormat(product.price);
  const totalPrice = currencyFormat(product.price * product.quantity);

  return (
    <View className="flex-row items-center justify-between p-4 rounded-lg bg-white mb-4">
      <Image
        source={{
          uri:
            product.images && product.images[0]
              ? product.images[0].src
              : "https://stockholmykt.ru/wp-content/uploads/2024/03/placeholder-e1714032640700.jpg",
        }}
        style={{
          width: 70,
          height: "100%",
          resizeMode: "contain",
          marginRight: 16,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text className="text-base font-semibold mb-1" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-lg text-black">{totalPrice} ₽</Text>
        <Text className="text-sm text-gray-500">{formatPrice} ₽ × {product.quantity}</Text>
      </View>
      <View className="flex-row items-center">
        <Pressable
          onPress={() => decrementQuantity(product.id)}
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#E0E0E0",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>-</Text>
        </Pressable>
        <Text style={{ fontSize: 16 }}>{product.quantity}</Text>
        <Pressable
          onPress={() => incrementQuantity(product.id)}
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#E0E0E0",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SearchItem = ({ product }) => {

  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return (
      <View>
        <Text>Данные о продукте отсутствуют.</Text>
      </View>
    );
  }

  const formatPrice = currencyFormat(product.price);

  return (
    <View className="flex-row items-center justify-between p-4 rounded-lg bg-white mb-4">
      <Image
        source={{
          uri:
            product.images && product.images[0]
              ? product.images[0].src
              : "https://stockholmykt.ru/wp-content/uploads/2024/03/placeholder-e1714032640700.jpg",
        }}
        style={{
          width: 70,
          height: "100%",
          resizeMode: "contain",
          marginRight: 16,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text className="text-base font-semibold mb-1" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-gray-600">
          {product.categories && product.categories[0]
            ? product.categories[0].name
            : "Без категории"}
        </Text>
        <Text className="text-lg text-black">{formatPrice} ₽</Text>
      </View>
      <View className="flex-row items-center">
        <Pressable
          onPress={() => {
            addToCart(product);
          }}
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#E0E0E0",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};
