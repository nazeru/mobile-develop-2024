import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles";

const Lab2 = () => {
  const [catImage, setCatImage] = useState("");

  const fetchRandomCat = () => {
    const randomCatUrl = `https://cataas.com/cat?timestamp=${new Date().getTime()}`;
    setCatImage(randomCatUrl);
  };

  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Lab2: useEffect</Text>
      <Text style={commonStyles.title1}>Random Cat</Text>
      {catImage ? (
        <Image source={{ uri: catImage }} style={commonStyles.image} />
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity style={commonStyles.button} onPress={fetchRandomCat}>
        <Text style={commonStyles.buttonText}>Нового кота!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Lab2;
