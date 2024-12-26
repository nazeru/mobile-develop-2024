import React, { useState, useMemo } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "../ThemeContext";

const DATA = Array.from({ length: 21 }, (_, i) => ({
  id: i,
  name: `Компонент ${i}`,
}));

const Item = ({ name }: { name: string }) => {
  return <Text>{name}</Text>;
};

const MemoizedItem = React.memo(Item);

const Lab3 = () => {
  const [count, setCount] = useState(0);
  const { isDarkTheme, toggleTheme } = useTheme();

  const themeStyles = isDarkTheme ? darkThemeStyles : lightThemeStyles;

  const memoizedData = useMemo(() => {
    return DATA.map((item) => ({ ...item, name: `${item.name} ${count}` }));
  }, [count]);

  return (
    <View style={themeStyles.container}>
      <Button title="Сменить тему" onPress={toggleTheme} />
      <Text style={themeStyles.text}>СЧЕТ: {count}</Text>
      <Button title="Увеличить" onPress={() => setCount(count + 1)} />
      <FlatList
        data={memoizedData}
        renderItem={({ item }) => <MemoizedItem name={item.name} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const lightThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
  },
});

const darkThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

export default Lab3;
