// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const ThemeContext = createContext();

// Провайдер контекста
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Состояние для темы

  const toggleTheme = () => setIsDarkTheme((prev) => !prev); // Функция для переключения темы

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста
export const useTheme = () => {
  return useContext(ThemeContext);
};