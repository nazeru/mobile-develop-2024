import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "./styles";

const Lab2 = () => {
  const [fact, setFact] = useState("");
  const [loadT, setLoadT] = useState(false);

  const getCatFact = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      return data.fact;
    } catch (error) {
      return "Ошибка: " + error.message;
    }
  };

  const getTranslate = async (text) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|ru`
      );
      const data = await response.json();
      if (
        data.responseData.translatedText.includes(
          "YOU USED ALL AVAILABLE FREE TRANSLATIONS"
        )
      ) {
        return "Перевод временно недоступен.";
      }
      return data.responseData.translatedText;
    } catch (error) {
      return "Ошибка: " + error.message;
    }
  };

  const getCatFactAndTransIt = async () => {
    setLoadT(true);
    try {
      const fact = await getCatFact();
      const translatedFact = await getTranslate(fact);
      setFact(translatedFact);
    } finally {
      setLoadT(false);
    }
  };

  useEffect(() => {
    getCatFactAndTransIt();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{loadT ? "Думаю..." : "Забавный факт"}</Text>
        <Text style={styles.subtitle}>{fact}</Text>
        <View>
          <Button
            title="Получить новый факт"
            onPress={loadT ? null : getCatFactAndTransIt}
            disabled={loadT}
          />
        </View>
      </View>
    </View>
  );
};

export default Lab2;
