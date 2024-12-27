import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { CartItem } from "../components/productCard";
import { useCartStore } from "../store";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const cart = useCartStore((state) => state.cart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  if (cart.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Корзина пуста</Text>
      </View>
    );
  }

  return (
    <View className="overflow-visible">
      <View className="flex flex-col gap-4 p-4 bg-[#F3F4F6]">
        <Text className="text-lg font-bold mb-4">Корзина</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              product={item}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </View>
  );
};

export default CartScreen;
