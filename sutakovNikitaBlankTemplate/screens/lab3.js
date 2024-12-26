import { Text, TextInput, FlatList, View, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ThemedSafeAreaView from "../components/ThemedSafeAreaView";
import useTheme from "../hooks/useTheme";

const Lab3 = () => {
  const [items, setItems] = useState([]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("Infinity");
  const [sortOrder, setSortOrder] = useState("asc");
  const { backgroundColor, textColor } = useTheme();

  const getFakeStoreData = () => {
    const url = "https://fakestoreapi.com/products";
    axios.get(url).then((storeData) => {
      setItems(storeData.data);
    });
  };

  useEffect(() => {
    getFakeStoreData();
  }, []);

  const getFilteredItems = useMemo(() => {
    const filteredItems = items
      .filter((item) => {
        return (
          item.price >= parseFloat(minPrice) &&
          item.price <= parseFloat(maxPrice)
        );
      })
      .sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    return filteredItems;
  }, [items, minPrice, maxPrice, sortOrder]);

  return (
    <ThemedSafeAreaView>
      <Text style={[styles.title, { color: textColor }]}>Products</Text>
      <View>
        <Text style={[styles.propertities, { color: textColor }]}>
          Minimum price
        </Text>
        <TextInput
          value={minPrice}
          onChangeText={setMinPrice}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              color: backgroundColor,
              borderColor: backgroundColor,
              backgroundColor: textColor,
            },
          ]}
        />
        <Text style={[styles.propertities, { color: textColor }]}>
          Maximum price
        </Text>
        <TextInput
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              color: backgroundColor,
              borderColor: backgroundColor,
              backgroundColor: textColor,
            },
          ]}
        />
        <Text style={[styles.propertities, { color: textColor }]}>Sorting</Text>
        <View style={styles.radioButtons}>
          <View style={styles.radioButton}>
            <RadioButton
              value="asc"
              status={sortOrder == "asc" ? "checked" : "unchecked"}
              onPress={() => setSortOrder("asc")}
              color={textColor}
              uncheckedColor={textColor}
            />
            <Text style={[styles.sortText, { color: textColor }]}>Asc</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="desc"
              status={sortOrder == "desc" ? "checked" : "unchecked"}
              onPress={() => setSortOrder("desc")}
              color={textColor}
              uncheckedColor={textColor}
            />
            <Text style={[styles.sortText, { color: textColor }]}>Desc</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={getFilteredItems}
        keyExtractor={(item) => item.id.toString()}
        style={{ borderColor: textColor, borderWidth: 0.5, marginTop: 40 }}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.item,
                {
                  color: textColor,
                  borderColor: textColor,
                  backgroundColor: backgroundColor,
                },
              ]}
            >
              <Text style={[styles.itemTitle, { color: textColor }]}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: textColor,
                  fontSize: 12,
                  fontFamily: "Roboto-Regular",
                }}
              >
                Цена:{" "}
                <Text
                  style={{
                    color: textColor,
                    fontSize: 12,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  ${item.price}
                </Text>
              </Text>
              <Text
                style={{
                  color: textColor,
                  fontSize: 12,
                  fontFamily: "Roboto-Regular",
                }}
              >
                Rating:{" "}
                <Text
                  style={{
                    color: textColor,
                    fontSize: 12,
                    fontFamily: "Roboto-Medium",
                    marginBottom: 8,
                  }}
                >
                  ${item.rating?.rate}
                </Text>
              </Text>
            </View>
          );
        }}
      />
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Roboto-Medium",
    marginTop: 80,
    marginBottom: 20,
  },
  propertities: {
    fontsize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 20,
  },
  input: {
    height: 28,
    width: 196,
    marginTop: 4,
    borderRadius: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    paddingLeft: 8,
  },
  radioButtons: {
    flexDirection: "row",
    marginTop: 4,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    marginTop: 16,
    marginLeft: 28,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    marginBottom: 4,
  },
  sortText: {
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    marginRight: 16,
  },
});

export default Lab3;
