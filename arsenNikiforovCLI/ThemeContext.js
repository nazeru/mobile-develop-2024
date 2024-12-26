// ThemeContext.js
import React from 'react';
import { useSelector } from 'react-redux';

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  buttonBackground: '#D3D3D3',
  buttonText: '#000000',
  border: '#000000',
  shadow: '#000000',
  accent: '#0000FF',
};

const darkTheme = {
  background: '#000000',
  text: '#FFFFFF',
  buttonBackground: '#333333', // Более темный фон для кнопок
  buttonText: '#FFFFFF', // Белый текст для кнопок
  border: '#FFFFFF',
  shadow: '#FFFFFF',
  accent: '#FF0000',
};

export const ThemeContext = React.createContext(lightTheme);

export const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme);
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
};
