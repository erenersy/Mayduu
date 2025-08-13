/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) { 
  // Başlangıç değerini localStorage'dan oku
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // theme değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
