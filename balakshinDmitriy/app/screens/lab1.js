import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import "../../global.css";

const Lab1Screen = () => {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView className="flex p-4 bg-gray-100">
      <View className="flex justify-center items-center gap-4">
        <Text className="text-lg font-bold">Count: {count}</Text>
        <TouchableOpacity
          className="p-4 bg-orange-500 rounded-lg"
          onPress={() => setCount(count + 1)}
        >
          <Text className="text-white text-base">Click me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Lab1Screen;
