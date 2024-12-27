import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useAppContext } from '@/components/AppContext'; 

export default function MovieSearchScreen() {
  const { isDarkTheme } = useAppContext(); // Используйте контекст для получения состояния темной темы
  const [query, setQuery] = useState(""); // Запрос пользователя
  const [movies, setMovies] = useState([]); // Данные о фильмах
  const [loading, setLoading] = useState(false); // Статус загрузки
  const [minYear, setMinYear] = useState("1800"); // Минимальный год
  const [maxYear, setMaxYear] = useState("3000"); // Максимальный год
  const [error, setError] = useState(""); // Ошибка

  // Функция для получения данных о фильмах
  const fetchMovies = async (searchQuery) => {
    if (!searchQuery) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data.ok && data.description) {
        setMovies(data.description);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Ошибка при получении данных о фильмах:", error);
      setError('Не удалось получить данные о фильмах. Попробуйте снова.');
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
    if (minYear && maxYear && parseInt(minYear) > parseInt(maxYear)) {
      setError("Минимальный год не может быть больше максимального года.");
      return;
    }
    fetchMovies(query);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <TextInput
        placeholder="Введите название фильма"
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={isDarkTheme ? '#aaa' : '#999'}
        style={[styles.input, isDarkTheme && styles.inputDark]}
      />
      <View style={styles.yearContainer}>
        <TextInput
          placeholder="Мин. год"
          value={minYear}
          onChangeText={setMinYear}
          keyboardType="numeric"
          placeholderTextColor={isDarkTheme ? '#aaa' : '#999'}
          style={[styles.yearInput, isDarkTheme && styles.inputDark]}
        />
        <TextInput
          placeholder="Макс. год"
          value={maxYear}
          onChangeText={setMaxYear}
          keyboardType="numeric"
          placeholderTextColor={isDarkTheme ? '#aaa' : '#999'}
          style={[styles.yearInput, isDarkTheme && styles.inputDark]}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Поиск</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={[styles.loadingText, isDarkTheme && styles.loadingTextDark]}>Загрузка...</Text>
      ) : error ? (
        <Text style={[styles.error, isDarkTheme && styles.errorDark]}>{error}</Text>
      ) : getFilteredMovies.length === 0 ? (
        <Text style={[styles.emptyText, isDarkTheme && styles.emptyTextDark]}>Фильмы не найдены по вашему запросу.</Text>
      ) : (
        <FlatList
          style={styles.movieList}
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
                <Text style={[styles.title, isDarkTheme && styles.titleDark]}>{item["#TITLE"]}</Text>
                <Text style={[styles.detailText, isDarkTheme && styles.detailTextDark]}>Год: {item["#YEAR"]}</Text>
                <Text style={[styles.detailText, isDarkTheme && styles.detailTextDark]}>Актеры: {item["#ACTORS"]}</Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', 
  },
  containerDark: {
    backgroundColor: '#1e1e1e', 
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputDark: {
    borderColor: '#555', 
    backgroundColor: '#333', 
    color: '#fff', 
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, 
  },
  yearInput: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 10,
    paddingVertical: 10, 
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
  },
  loadingTextDark: {
    color: '#fff', 
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
  },
  errorDark: {
    color: 'lightcoral', 
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyTextDark: {
    color: '#fff', 
  },
  movieList: {
    marginTop: 20,
    flexGrow: 0,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  movieDetails: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleDark: {
    color: '#fff',
  },
  detailText: {
    fontSize: 14,
  },
  detailTextDark: {
    color: '#ccc',
  },
});
