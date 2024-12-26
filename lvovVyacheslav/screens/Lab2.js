import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useClicksStore } from '../stores/stores';

const Lab2 = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { clicks, incrementClicks } = useClicksStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список пользователей</Text>
      {users.map((user) => (
        <Text key={user.id} style={styles.user}>
          {user.name}
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => fetchData()}>
        <Text style={styles.buttonText}>Обновить данные</Text>
      </TouchableOpacity>
      <Text style={styles.counter}>Количество нажатий: {clicks}</Text>
      <TouchableOpacity style={styles.button} onPress={incrementClicks}>
        <Text style={styles.buttonText}>Добавить в счётчик</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5FF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  user: {
    fontSize: 16,
    color: '#0000FF',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#D7E3FC',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#0000FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  counter: {
    fontSize: 16,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
    width: '80%',
  },
});

export default Lab2;
