import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// Context to store dark mode state and toggle function
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // Initial dark mode state
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  // Using useEffect to add or remove CSS classes for dark or light mode
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  // Function to toggle the dark mode state
  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  // Providing the dark mode state and toggle function to all children components
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook to use the dark mode context in other components
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
