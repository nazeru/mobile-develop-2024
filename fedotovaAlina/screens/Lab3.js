// screens/UniversityList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Picker, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Импортируем контекст темы

const UniversityList = () => {
  const { isDarkTheme } = useTheme(); // Получаем состояние темы
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('Kazakhstan'); // Начальная страна

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUniversities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [country]);

  const handleCountryChange = (itemValue) => {
    setCountry(itemValue);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    Alert.alert('Error', error);
    return null;
  }

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>Universities</Text>
      <Text style={[styles.label, isDarkTheme ? styles.darkText : styles.lightText]}>Choose a country:</Text>
      <Picker
        selectedValue={country}
        style={styles.picker}
        onValueChange={handleCountryChange}
      >
        <Picker.Item label="Kazakhstan" value="Kazakhstan" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="Germany" value="Germany" />
        <Picker.Item label="France" value="France" />
      </Picker>
      <FlatList
        data={universities}
        keyExtractor={(item) => item.alpha_two_code}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_pages[0])}>
            <Text style={[styles.universityName, isDarkTheme ? styles.darkText : styles.lightText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333', // Фон для темной темы
  },
  lightContainer: {
    backgroundColor: '#ffffff', // Фон для светлой темы
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkText: {
    color: '#ffffff', // Цвет текста для темной темы
  },
  lightText: {
    color: '#000000', // Цвет текста для светлой темы
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  universityName: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UniversityList;
