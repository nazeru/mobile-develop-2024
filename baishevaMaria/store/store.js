import { configureStore, createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    message: 'Нажмите кнопку',
    bgColor: '#fff',
    randomCountry: '',
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    setBgColor(state, action) {
      state.bgColor = action.payload;
    },
    setRandomCountry(state, action) {
      state.randomCountry = action.payload;
    },
  },
});

export const { setMessage, setBgColor, setRandomCountry } = globalSlice.actions;

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export default store;