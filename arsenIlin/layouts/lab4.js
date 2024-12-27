import React, { useState, useMemo } from "react";
import { SafeAreaView, Text, Image, Button, StyleSheet, View } from "react-native";

const Lab3 = () => {
  const imagesArray = [
    "https://static-cse.canva.com/blob/847132/paulskorupskas7KLaxLbSXAunsplash2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQupO_zS53IkSDLDDyx4lVpeNCEjMPuY_vngQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR714ew_Ux8gcIazedVGdquTOp0gpmZq5jDgw&s"
  ];

  const [indexWithoutMemo, setIndexWithoutMemo] = useState(0);
  const [indexWithMemo, setIndexWithMemo] = useState(0);

  // Для картинки с useMemo (кэшируем изображение)
  const imageWithMemo = useMemo(() => {
    return imagesArray[indexWithMemo];
  }, [indexWithMemo]); // Изображение будет пересчитываться только при изменении индекса

  // Функции для изменения картинок
  const handleChangeImageWithoutMemo = () => {
    setIndexWithoutMemo((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  const handleChangeImageWithMemo = () => {
    setIndexWithMemo((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Загрузка картинок</Text>

      {/* Блок без useMemo */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Без useMemo:</Text>
        <Button title="Следующая картинка" onPress={handleChangeImageWithoutMemo} />
        <Image source={{ uri: imagesArray[indexWithoutMemo] }} style={styles.image} />
      </View>

      {/* Блок с использованием useMemo */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>С useMemo:</Text>
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
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Lab3;
