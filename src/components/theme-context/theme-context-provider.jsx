import { useState } from "react";
import { ThemeContext } from "./theme-context";
import { theme as antdTheme } from "antd";

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    isLight: true,
    algorithm: antdTheme.defaultAlgorithm,
  });

  const switchTheme = () => {
    setTheme((old) => {
      return old.isLight
        ? { isLight: false, algorithm: antdTheme.darkAlgorithm }
        : { isLight: true, algorithm: antdTheme.defaultAlgorithm };
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
