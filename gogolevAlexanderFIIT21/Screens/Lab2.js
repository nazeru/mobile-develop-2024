import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Функция для получения постов
  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const data = await response.json();
      // Ограничиваем количество постов до 2
      setPosts(data.slice(0, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Используем useEffect для получения постов при первом рендере
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список постов</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
      <Button title="Обновить" onPress={fetchPosts} />
    </View>
  );
};

const Lab2 = () => {
  return (
    <View style={styles.appContainer}>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '90%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  post: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  postTitle: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Lab2;