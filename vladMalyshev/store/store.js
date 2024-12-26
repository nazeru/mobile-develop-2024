import { configureStore, createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), name: action.payload, completed: false });
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
      }
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTask } = tasksSlice.actions;

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export default store;
