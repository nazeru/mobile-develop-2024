import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [characters, setCharacters] = useState([]);

  const [nextChar, setNextChar] = useState(1);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      setCharacters(res.data.results);
      console.log(res);
      console.log(characters);
    });
  }, []);

  function NextFunc(val) {
    if (val == 20) {
      setNextChar(1);
    } else {
      setNextChar(nextChar + 1);
    }
  }

  function PrevFunc(val) {
    if (val == 1) {
      setNextChar(20);
    } else {
      setNextChar(nextChar - 1);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>
          {characters[nextChar - 1]?.name}
        </Text>

        <Image
          style={styles.image}
          source={{ uri: characters[nextChar - 1]?.image }}
        />
        <View style={styles.btnDiv}>
          <Pressable
            onPress={() => {
              PrevFunc(nextChar);
            }}
            style={styles.button}
          >
            <Text style={styles.btnText}>Предыдущий</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              NextFunc(nextChar);
            }}
            style={styles.button}
          >
            <Text style={styles.btnText}>Следующий</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 236,
    height: 236,
    marginRight: 78,
    marginLeft: 79,
    borderRadius: 10,
    marginBottom: 28,
  },
  btnDiv: {
    width: 236,
    flexDirection: "row",
    gap: 46,
  },
  button: {
    backgroundColor: "#2A4758",
    height: 29,
    width: 95,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 10,
    color: "#DCEEFA",
    textAlign: "center",
    margin: 7,
    fontFamily: "Inter",
    fontWeight: "300",
  },
});
