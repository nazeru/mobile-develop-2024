// store/store.js
import { createStore } from 'redux';

const initialState = {
  counter: 0,
  theme: 'light',
};

export const incrementCounter = () => ({
  type: 'INCREMENT_COUNTER',
});

export const decrementCounter = () => ({
  type: 'DECREMENT_COUNTER',
});

export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT_COUNTER':
      return { ...state, counter: state.counter - 1 };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;