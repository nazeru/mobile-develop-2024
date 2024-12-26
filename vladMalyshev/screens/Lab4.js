import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, editTask, toggleTask } from "../store/store";

export default function Lab4() {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  };

  const handleEditTask = () => {
    if (newTitle.trim() && editId !== null) {
      dispatch(editTask({ id: editId, name: newTitle }));
      setEditId(null);
      setNewTitle("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Верхняя полоса с текстом */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Лабораторная 4</Text>
      </View>

      {/* Основное содержимое */}
      <TextInput
        style={styles.input}
        placeholder="Введите название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Добавить задачу" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={styles.taskStatus}>
                Статус: {item.completed ? "Завершено" : "В процессе"}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Удалить"
                onPress={() => dispatch(deleteTask(item.id))}
                color="#FF3B30"
              />
              <Button
                title="Редактировать"
                onPress={() => {
                  setEditId(item.id);
                  setNewTitle(item.name);
                }}
                color="#FF9500"
              />
              <Button
                title="Завершить"
                onPress={() => dispatch(toggleTask(item.id))}
                color="#4CD964"
              />
            </View>
          </View>
        )}
      />

      {editId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Новое название задачи"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <Button title="Сохранить изменения" onPress={handleEditTask} />
          <Button
            title="Отмена"
            onPress={() => {
              setEditId(null);
              setNewTitle("");
            }}
            color="#8E8E93"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
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
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
  },
  taskTextContainer: {
    flex: 2,
    marginRight: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskStatus: {
    fontSize: 14,
    color: "gray",
  },
  editContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginHorizontal: 20,
  },
});
