import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function Lab4View() {
  const tasks = useSelector((state) => state.tasks);

  return (
    <View style={styles.container}>
      {/* Верхняя синяя полоса */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Список задач</Text>
      </View>

      {/* Основной контент */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.name}</Text>
            <Text style={styles.taskStatus}>
              Статус: {item.completed ? "Завершено" : "В процессе"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    backgroundColor: "#007AFF",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  taskContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskStatus: {
    fontSize: 14,
    color: "gray",
  },
});
