import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useShopList } from "../../hooks/useShopList";

export default function Lab4_2() {
  const goods = useShopList((state) => state.goods);
  const toggleProductStatus = useShopList((state) => state.toggleProductStatus);

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.textDesc}>
        Статус: {item.completed ? "Куплен" : "В прогрессе"}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => toggleProductStatus(item.id)}
      >
        <Text style={styles.btnText}>
          {item.completed ? "В процессе" : "Купить"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Товары</Text>
      <FlatList
        data={goods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 36,
    color: "#2A4758",
    fontWeight: "600",
  },
  productContainer: {
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#2A4758",
    borderRadius: 8,
    height: 102,
    width: 345,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 12,
    marginLeft: 17,
    marginBottom: 8,
    color: "#2A4758",
    marginTop: 15,
    fontWeight: "400",
  },
  textDesc: {
    fontFamily: "Inter",
    fontSize: 10,
    marginLeft: 17,
    color: "#2A4758",
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#2A4758",
    borderRadius: 15,
    width: 85,
    height: 26,
    marginLeft: 17,
    marginTop: 15,
  },
  btnText: {
    color: "#DCEEFA",
    fontFamily: "Inter",
    fontSize: 11,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 26,
    fontWeight: "300",
  },
});
