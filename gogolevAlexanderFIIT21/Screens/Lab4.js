import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, toggleTask } from "../store/store";

export default function Lab4() {
  const [taskName, setTaskName] = useState("");
  const tasks = useSelector((state) => state.tasksState.tasks);
  const completedCount = useSelector(
    (state) => state.tasksState.completedCount
  );
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask(taskName));
      setTaskName("");
    }
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, item.completed && styles.completedTask]}
      onPress={() => dispatch(toggleTask(item.id))}
      onLongPress={() => dispatch(deleteTask(item.id))}
    >
      <Text style={styles.taskText}>{item.name}</Text>
      <Text style={styles.taskStatus}>
        {item.completed ? " Завершено" : " В процессе"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Задачи</Text>
      <Text style={styles.counter}>Завершено: {completedCount}</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите задачу"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Button title="Добавить" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  counter: { fontSize: 16, color: "#555", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  list: { marginTop: 10 },
  taskItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  completedTask: {
    backgroundColor: "#d4edda",
  },
  taskText: { fontSize: 16 },
  taskStatus: { fontSize: 14, color: "#555" },
});
