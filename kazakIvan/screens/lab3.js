import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BackArrow from "../components/BackArrow";
import { useTheme } from "../components/ThemeContext";

const PokemonItem = React.memo(({ name, themeStyles }) => {
  // Искусственная задержка
  const delay = Date.now() + 100; // 100 мс 
  while (Date.now() < delay) {
  }

  return (
    <View style={[styles.pokemonContainer, themeStyles.pokemonContainer]}>
      <Text style={[styles.pokemonText, themeStyles.text]}>{name}</Text>
    </View>
  );
});

export default function Lab2_3({ navigation }) {
  const [inputValue, setInputValue] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  const { darkTheme } = useTheme(); // Получаем текущую тему

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const data = await response.json();
      setAllPokemons(data.results); 
      setPokemons(data.results); 
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    const count = Math.min(Number(inputValue), allPokemons.length);
    return inputValue ? allPokemons.slice(0, count) : allPokemons;
  }, [inputValue, allPokemons]);

  const handleSearch = () => {
    setPokemons(filteredPokemons);
  };

  const themeStyles = darkTheme ? styles.darkTheme : styles.lightTheme;

  const memoizedRenderItem = useMemo(
    () => ({ item }) => <PokemonItem name={item.name} themeStyles={themeStyles} />,
    [themeStyles]
  );

  return (
    <View style={[styles.container, themeStyles.container]}>
      <BackArrow navigation={navigation} />
      <View style={styles.p1}>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Write the number of Pokemons"
          placeholderTextColor={darkTheme ? "#E1E1E1" : "#333333"}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.searchButton, themeStyles.searchButton]}
          onPress={handleSearch}
        >
          <Text style={[styles.searchButtonText, themeStyles.text]}>
            Search
          </Text>
        </TouchableOpacity>
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={memoizedRenderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  p1: {
    padding: 20,
  },
  input: {
    height: 36,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 45,
    marginBottom: 14,
    borderRadius: 20,
    fontSize: 16,
    borderColor: "#fff", 
  },
  searchButton: {
    width: 165,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 36,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pokemonContainer: {
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  pokemonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  // Стили для светлой темы
  lightTheme: {
    container: {
      backgroundColor: "#F2E8D5",
    },
    input: {
      backgroundColor: "#FFFFFF",
      color: "#333333",
    },
    searchButton: {
      backgroundColor: "#B28451",
    },
    pokemonContainer: {
      backgroundColor: "#DAAD86",
    },
    text: {
      color: "#fff",
    },
  },
  // Стили для темной темы
  darkTheme: {
    container: {
      backgroundColor: "#1E1E1E",
    },
    input: {
      backgroundColor: "#424242",
      color: "#E1E1E1",
    },
    searchButton: {
      backgroundColor: "#BB86FC",
    },
    pokemonContainer: {
      backgroundColor: "#424242",
    },
    text: {
      color: "#FFFFFF",
    },
  },
});