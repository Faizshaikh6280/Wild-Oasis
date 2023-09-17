import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function toggleMode() {
    setIsDarkMode((mode) => !mode);
  }

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

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkMode context is used outside of darkmode provider");
  return context;
}

export { DarkModeProvider, useMode };
