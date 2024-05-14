import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "theme-light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "theme-light" ? "theme-dark" : "theme-light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
