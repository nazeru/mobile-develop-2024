import React from "react";
import { ProductsCarousel } from "../components/productsCarousel";
import { View, Text, ScrollView } from "react-native";

const HomeScreen = () => {

  return(
    <ScrollView className="overflow-visible">
      <View className="flex flex-col gap-4 p-4 bg-[#F3F4F6]">
        <View className="flex flex-col gap-2">
          <Text className="text-lg font-semibold">Диваны, кресла</Text>
          <ProductsCarousel categoryId={2480}/>
        </View>

        <View className="flex flex-col gap-2">
          <Text className="text-lg font-semibold">Столы и стулья</Text>
          <ProductsCarousel categoryId={2584}/>
        </View>
      </View>
    </ScrollView>
  )
  
}

export default HomeScreen;