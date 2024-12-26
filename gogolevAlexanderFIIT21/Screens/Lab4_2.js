import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectCompletedTasks } from "../store/store"; // Импорт мемоизированного селектора

export default function Lab4_2() {
  const completedTasks = useSelector(selectCompletedTasks);

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Завершённые задачи</Text>

      {completedTasks.length === 0 ? (
        <Text style={styles.noTasks}>Нет завершённых задач</Text>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTask}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  noTasks: { fontSize: 16, color: "#555", textAlign: "center", marginTop: 20 },
  list: { marginTop: 10 },
  taskItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#d4edda",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  taskText: { fontSize: 16 },
});
