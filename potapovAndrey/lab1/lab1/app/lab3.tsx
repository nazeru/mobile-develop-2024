import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { ThemeProvider, useTheme } from "../ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";

const DATA = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: `Компонент: ${i + 1}`,
}));

const Item = ({ name }: { name: string }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
};

const MemoizedItem = React.memo(Item);

const Lab3 = () => {
  const len = 1000000;

  const bigFunc = () => {
    for (let i = 0; i < len; i++) {}
    return 0;
  };
  const bigFuncMemo = useCallback(() => {
    for (let i = 0; i < len; i++) {}
    return 0;
  }, []);

  const [count, setCount] = useState(0);
  const [useMemoized, setUseMemoized] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();

  const themeStyles = isDarkTheme ? darkThemeStyles : lightThemeStyles;

  const memoizedData = useMemo(() => {
    return DATA.map((item) => ({ ...item, name: `${item.name} ${count}` }));
  }, [count]);

  return (
    <View style={themeStyles.container}>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Icon name={isDarkTheme ? "moon-o" : "sun-o"} size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={themeStyles.title}>Use memory</Text>
      <Text style={themeStyles.text}>СЧЕТ</Text>
      <Text style={themeStyles.text}>{count}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          {
            setCount(count + 1);
            if (useMemoized) {
              console.log("Вызов функции bigFuncMemo");
              bigFuncMemo();
            } else {
              console.log("Вызов функции bigFunc");
              bigFunc();
            }
          }
        }}
      >
        <Text style={styles.buttonText}>Увеличить</Text>
      </TouchableOpacity>
      <FlatList
        data={memoizedData}
        renderItem={({ item }) => <MemoizedItem name={item.name} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View style={styles.switchContainer}>
        <Text style={themeStyles.text}>
          UseMemo: {useMemoized ? "Да" : "Нет"}
        </Text>
        <Switch
          value={useMemoized}
          onValueChange={() => setUseMemoized((prev) => !prev)}
        />
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
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
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  themeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#008B8B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 340,
    marginTop: 40,
  },
  button: {
    backgroundColor: "#D9D9D9",
    borderColor: "#008B8B",
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 25,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
});
export default Lab3;
