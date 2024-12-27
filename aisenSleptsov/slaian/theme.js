import React from "react";
import { ThemeProvider } from "./themeContext";
import Lab3 from "./layout/lab3";
import Lab2 from "./layout/lab2";
import Lab1 from "./layout/lab1";

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
