import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const AppContext = createContext();

function getInitialTheme() {
  const prefersDarkTheme = window.matchMedia(
    "prefers-color-scheme:daek"
  ).matches;
  console.log(prefersDarkTheme);

  const storedDarkMode = localStorage.getItem("darkTheme");
  console.log(typeof storedDarkMode);

  if (storedDarkMode === null) {
    return prefersDarkTheme;
  }

  return storedDarkMode === "true";
}

export function AppProvider({ children }) {
  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme());
  const [searchTerm, setSearchTerm] = useState("cat");

  const body = document.querySelector("body");

  function toggleDarkTheme() {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);

    // body.classList.toggle("dark-theme", newTheme);
    // console.log(body);

    localStorage.setItem("dark-theme", newTheme);
  }

  useEffect(() => {
    body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
