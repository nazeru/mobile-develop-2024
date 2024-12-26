import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

function LaunchesMemo() {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => setLaunches(data));
  }, []);

  const processedLaunches = useMemo(() => {
    return expensiveComputation(launches);
  }, [launches]);

  const filteredLaunches = processedLaunches.filter(launch =>
    launch.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <TextInput
        className="border p-2 rounded mb-4 bg-white"
        placeholder="Filter by name"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredLaunches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text className="p-2 border-b border-gray-300 text-lg">{item.computedName}</Text>
        )}
      />
    </View>
  );
}

const expensiveComputation = (items) => {
  let computedItems = [];
  for (let i = 0; i < 10000; i++) {
    computedItems = items.map(item => ({
      ...item,
      computedName: item.name.split('').reverse().join(''),
    }));
  }
  return computedItems;
};

export default LaunchesMemo;
