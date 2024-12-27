import React from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../styles";
import { addTask, removeTask } from "../store";

const Lab4 = () => {
  const [task, setTask] = React.useState("");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task) {
      dispatch(addTask({ id: Date.now().toString(), title: task }));
      setTask("");
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Lab4:State-manager (redux)</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Введите задачу"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={commonStyles.button} onPress={handleAddTask}>
        <Text style={commonStyles.buttonText}>Добавить задачу</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={commonStyles.taskItem}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => dispatch(removeTask(item.id))}>
              <Text style={{ color: "red", margintop: 100 }}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={commonStyles.emptyText}>Список задач пуст</Text>}
      />
    </View>
  );
};

export default Lab4;
