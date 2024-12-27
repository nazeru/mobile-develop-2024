import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../themeContext";

export default function MovieSearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minYear, setMinYear] = useState("1900");
  const [maxYear, setMaxYear] = useState("2100");
  const { isDarkTheme, toggleTheme } = useTheme();

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

      console.log("API Response:", data);

      if (data.ok && data.description) {
        setMovies(data.description);
      } else {
        console.log("No movies found or error in API response.");
        setMovies([]);
      }
    } catch (error) {
      console.error("Ошибка при получении данных о фильмах:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const year = parseInt(movie["#YEAR"]);
      return year >= parseInt(minYear) && year <= parseInt(maxYear);
    });
  }, [movies, minYear, maxYear]);

  const handleSearch = () => {
    fetchMovies(query);
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkTheme && styles.darkContainer]}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#6FA670" />
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
                <Text style={[styles.title, isDarkTheme && styles.darkText]}>
                  {item["#TITLE"]}
                </Text>
                <Text style={isDarkTheme && styles.darkText}>
                  Год: {item["#YEAR"]}
                </Text>
              </View>
            </View>
          )}
          style={styles.resultsList}
        />
      )}

      <View style={styles.filtersContainer}>
        <TextInput
          placeholder="Min year"
          value={minYear}
          onChangeText={setMinYear}
          keyboardType="numeric"
          style={[styles.input, isDarkTheme && styles.darkInput]}
        />
        <TextInput
          placeholder="Max year"
          value={maxYear}
          onChangeText={setMaxYear}
          keyboardType="numeric"
          style={[styles.input, isDarkTheme && styles.darkInput]}
        />
        <TextInput
          placeholder="Select movie"
          value={query}
          onChangeText={setQuery}
          style={[styles.input, isDarkTheme && styles.darkInput]}
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text
          style={[
            styles.buttonText,
            isDarkTheme ? { color: "#fff" } : { color: "#000" },
          ]}
        >
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text
          style={[
            styles.themeButtonText,
            isDarkTheme ? { color: "#fff" } : { color: "#000" },
          ]}
        >
          Change theme
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  filtersContainer: {
    marginVertical: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  darkInput: {
    backgroundColor: "#555",
    borderColor: "lightgray",
    color: "#fff",
  },
  searchButton: {
    backgroundColor: "#6FA670",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  resultsList: {
    flex: 1,
  },
  movieItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  themeButton: {
    backgroundColor: "#6FA670",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  themeButtonText: {
    fontWeight: "bold",
  },
  darkText: {
    color: "#fff",
  },
});
