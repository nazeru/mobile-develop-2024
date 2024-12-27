import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useMemo } from "react";
import useThemeStore from "../store/themeStore";

const generateLargeData = () => {
  return Array.from({ length: 10000 }, (_, index) => ({
    id: index.toString(),
    value: `Элемент #${index + 1}`,
  }));
};

const Lab3 = () => {
  const [search, setSearch] = useState("");
  const { isDarkTheme, toggleTheme } = useThemeStore();

  const largeData = useMemo(() => generateLargeData(), []);

  const filteredData = useMemo(() => {
    if (!search.trim()) return largeData;
    return largeData.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, largeData]);

  const themeStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
      paddingTop: 40,
    },
    input: {
      height: 40,
      width: "90%",
      borderColor: isDarkTheme ? "#444" : "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      marginHorizontal: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: isDarkTheme ? "#1e1e1e" : "#fff",
      color: isDarkTheme ? "#ffffff" : "#000000",
      alignSelf: "center",
      marginTop: 18,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#333" : "#eee",
    },
    text: {
      fontSize: 16,
      color: isDarkTheme ? "#ffffff" : "#000000",
    },
    themeSwitchButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: isDarkTheme ? "#ffffff" : "#121212",
    },
    themeSwitchButtonText: {
      color: isDarkTheme ? "#ffffff" : "#121212",
    },
  };

  const renderItem = ({ item }) => (
    <View style={themeStyles.item}>
      <Text style={themeStyles.text}>{item.value}</Text>
    </View>
  );

  return (
    <View style={themeStyles.container}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={themeStyles.themeSwitchButton}
      >
        <Text style={themeStyles.themeSwitchButtonText}>Сменить тему</Text>
      </TouchableOpacity>
      <TextInput
        style={themeStyles.input}
        placeholder="Введите текст для поиска..."
        placeholderTextColor={isDarkTheme ? "#777" : "#aaa"}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={20}
        maxToRenderPerBatch={50}
        removeClippedSubviews
      />
    </View>
  );
};

export default Lab3;
