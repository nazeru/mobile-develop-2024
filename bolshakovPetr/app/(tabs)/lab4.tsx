import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useShopList } from "../../hooks/useShopList";

export default function Lab4_1() {
  const [title, setTitle] = useState("");
  const goods = useShopList((state) => state.goods);
  const addProduct = useShopList((state) => state.addProduct);
  const deleteProduct = useShopList((state) => state.deleteProduct);

  const handleAddProduct = () => {
    if (title) {
      addProduct(title);
      setTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addBlock}>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <Pressable style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.btnText}>Добавить</Text>
        </Pressable>
      </View>

      <FlatList
        data={goods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.textDesc}>
                Статус: {item.completed ? "Куплен" : "В прогрессе"}
              </Text>
            </View>
            <Pressable
              style={styles.deleteBtn}
              onPress={() => deleteProduct(item.id)}
            >
              <Text style={styles.btnText}>Удалить</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    width: 345,
    height: 29,
  },
  productContainer: {
    flexDirection: "row",

    marginTop: 16,
    borderWidth: 1,
    borderColor: "#2A4758",
    borderRadius: 8,
    height: 74,
    width: 345,
  },
  button: {
    backgroundColor: "#2A4758",
    borderRadius: 12,
    width: 149,
    height: 29,
    marginBottom: 16,
    marginRight: 8,
  },
  btnText: {
    color: "#DCEEFA",
    fontFamily: "Inter",
    fontSize: 11,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 29,
    fontWeight: "300",
  },
  addBlock: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  deleteBtn: {
    backgroundColor: "#2A4758",
    borderRadius: 15,
    width: 85,
    height: 29,
    marginBottom: 16,
    marginRight: 8,
    marginTop: 23,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 12,
    marginLeft: 17,
    marginBottom: 6,
    color: "#2A4758",
    marginTop: 19,
  },
  textDesc: {
    fontFamily: "Inter",
    fontSize: 10,
    marginLeft: 17,
    color: "#2A4758",
  },
});
