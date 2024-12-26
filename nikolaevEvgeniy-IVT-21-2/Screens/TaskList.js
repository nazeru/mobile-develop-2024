import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { commonStyles } from "../styles";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Список задач</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={commonStyles.taskItem}>
            <Text>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={commonStyles.emptyText}>Список задач пуст</Text>}
      />
    </View>
  );
};

export default TaskList;
