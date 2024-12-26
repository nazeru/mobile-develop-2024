// screens/NumberDisplay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NumberDisplay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  numberText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
});

export { NumberDisplay };
