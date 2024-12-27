import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

export default function MovieSearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minYear, setMinYear] = useState("1896");

  const fetchMovies = async (searchQuery) => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data.ok && data.description) {
        setMovies(data.description);
        console.log(data);
        console.log("movies fetched");
      } else {
        setMovies([]);
        console.log("movies not fetched");
      }
    } catch (error) {
      console.error("Ошибка при получении данных о фильмах:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMovies = movies.filter((movie) => {
    console.log(1);
    const year = parseInt(movie["#YEAR"]);
    return year >= parseInt(minYear);
  });

  const handleSearch = () => {
    fetchMovies(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={styles.searchBlock}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={styles.searchBarName}
        />
        <TextInput
          value={minYear}
          onChangeText={setMinYear}
          keyboardType="numeric"
          style={styles.searchBarYear}
        />

        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.btnText}>Поиск</Text>
        </Pressable>
      </View>

      {loading ? (
        <Text>Загрузка</Text>
      ) : (
        <FlatList
          data={getFilteredMovies}
          keyExtractor={(item) => item["#IMDB_ID"]}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={{ uri: item["#IMG_POSTER"] }}
                style={styles.poster}
                resizeMode="cover"
              />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{item["#TITLE"]}</Text>
                <Text style={styles.desc}>Год выхода: {item["#YEAR"]}</Text>
                <Text style={styles.desc}>Оценка: {item["#RANK"]}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBarName: {
    borderWidth: 1,
    width: 345,
    height: 29,
    borderRadius: 3,
  },
  searchBarYear: {
    borderWidth: 1,
    width: 140,
    height: 29,
    borderRadius: 3,
  },
  searchBlock: {
    display: "flex",
    alignItems: "left",
    gap: 14,
  },
  button: {
    backgroundColor: "#2A4758",
    color: "white",
    borderRadius: 10,
    width: 140,
    height: 29,
  },
  btnText: {
    color: "#DCEEFA",
    fontFamily: "Inter",
    fontSize: 12,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 29,
    fontWeight: "300",
  },
  movieItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 10,
  },
  poster: {
    width: 110,
    height: 150,
    marginRight: 24,
    borderRadius: 10,
  },
  movieDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  desc: {
    fontSize: 11,
  },
});
