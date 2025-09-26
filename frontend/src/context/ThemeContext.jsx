// context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("pink"); // default theme

  const toggleTheme = () => {
    setTheme((prev) => (prev === "pink" ? "blue" : "pink"));
  };

  const gradients = {
    pink: {
      main: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
      alt: "linear-gradient(135deg,#ff4da6,#ff0080)",
      text: "#ff8ccf",
    },
    blue: {
      main: "linear-gradient(90deg, #00c6ff, #0072ff)",
      alt: "linear-gradient(135deg, #43cea2, #185a9d)",
      text: "#5cd5ff",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, gradients }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
