// export default store;
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Селектор для всех задач
const selectTasks = (state) => state.tasksState.tasks;

// Мемоизированный селектор для завершённых задач
export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.completed)
);

// Slice для задач
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    completedCount: 0,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), name: action.payload, completed: false });
    },
    deleteTask: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        if (state.tasks[taskIndex].completed) {
          state.completedCount -= 1;
        }
        state.tasks.splice(taskIndex, 1);
      }
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        state.completedCount += task.completed ? 1 : -1;
      }
    },
  },
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;

// Настраиваем Redux store
const store = configureStore({
  reducer: {
    tasksState: tasksSlice.reducer,
  },
});

export default store;