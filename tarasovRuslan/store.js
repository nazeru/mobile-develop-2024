import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const httpStatusCodes = ['100', '200', '201', '202', '204', '301', '302', '400', '401', '403', '404', '418', '500', '502', '503'];

const appSlice = createSlice({
  name: 'app',
  initialState: {
    colorIndex: 0,
    shapeIndex: 0,
    sortOrder: 'asc',
    imageUrl: '',
  },
  reducers: {
    changeColor: (state) => {
        state.colorIndex = (state.colorIndex + 1) % 3;
    },
    changeShape: (state) => {
        state.shapeIndex = (state.shapeIndex + 1) % 3;
    },
    setSortOrder: (state, action) => {
        state.sortOrder = action.payload;
    },
    setImageUrl: (state, action) => {
        state.imageUrl = action.payload;
    },
  },
});

export const fetchRandomImage = () => async (dispatch) => {
    const status_code = httpStatusCodes[Math.floor(Math.random() * httpStatusCodes.length)];
    const imageUrl = `https://http.cat/${status_code}`;
    dispatch(setImageUrl(imageUrl));
};

export const { changeColor, changeShape, setSortOrder, setImageUrl } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
