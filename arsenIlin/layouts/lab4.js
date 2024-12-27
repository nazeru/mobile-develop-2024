import React, { useState, useMemo } from "react";
import { SafeAreaView, Text, Image, Button, StyleSheet, View } from "react-native";
import { useTheme } from "../ThemeContext.js";
const Lab3 = () => {
  const imagesArray = [
    "https://static-cse.canva.com/blob/847132/paulskorupskas7KLaxLbSXAunsplash2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQupO_zS53IkSDLDDyx4lVpeNCEjMPuY_vngQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR714ew_Ux8gcIazedVGdquTOp0gpmZq5jDgw&s"
  ];

  const [indexWithoutMemo, setIndexWithoutMemo] = useState(0);
  const [indexWithMemo, setIndexWithMemo] = useState(0);
  const { isDarkTheme } = useTheme();
  const imageWithMemo = useMemo(() => {
    return imagesArray[indexWithMemo];
  }, [indexWithMemo]); 

  // Функции для изменения картинок
  const handleChangeImageWithoutMemo = () => {
    setIndexWithoutMemo((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  const handleChangeImageWithMemo = () => {
    setIndexWithMemo((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkTheme ? "#404040" : "#D9D9D9" }]}>
      <Text style={styles.title}>Загрузка картинок</Text>

      <View style={[styles.card,{backgroundColor: isDarkTheme ? "#1C1B1B" : "#8C8C8C"}]}>
        <Text style={[styles.label, {color: isDarkTheme ? "#ffffff" : "#000000"}]}>Без useMemo:</Text>
        <Button title="Следующая картинка" onPress={handleChangeImageWithoutMemo} />
        <Image source={{ uri: imagesArray[indexWithoutMemo] }} style={styles.image} />
      </View>

      <View style={[styles.card,{backgroundColor: isDarkTheme ? "#1C1B1B" : "#8C8C8C"}]}>
        <Text style={[styles.label, {color: isDarkTheme ? "#ffffff" : "#000000"}]}>С useMemo:</Text>
        <Button title="Следующая картинка" onPress={handleChangeImageWithMemo} />
        <Image source={{ uri: imageWithMemo }} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
  },
  card: {
    width: 364,
    height: 200,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    padding: 10,
    flexDirection: "column", 
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Lab3;
