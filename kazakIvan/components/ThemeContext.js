import React, { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  // Запоминаем значения темы с использованием useMemo
  const themeContextValue = useMemo(
    () => ({ darkTheme, setDarkTheme }),
    [darkTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};