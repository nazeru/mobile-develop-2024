// App.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const App = () => {
  // Объявляем переменные состояния `count` и `setCount`
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Счетчик: {count}</Text>
      <Button
        title="Увеличить счетчик"
        onPress={() => setCount(count + 1)}
      />
      <Button
        title="Сбросить счетчик"
        onPress={() => setCount(0)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
