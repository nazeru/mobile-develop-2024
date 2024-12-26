import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Lab3 from "./app/lab3";
import Lab2 from "./app/lab2";
import Lab1 from "./app/lab1"; // Импортируйте другие страницы

const App = () => {
  return (
    <ThemeProvider>
      <Lab3 />
      <Lab2 />
      <Lab1 />
    </ThemeProvider>
  );
};

export default App;
