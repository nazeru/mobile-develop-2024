import React from "react";
import { ThemeProvider } from "./themeContext";
import App from "./App";

const ThemedApp = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default ThemedApp;
