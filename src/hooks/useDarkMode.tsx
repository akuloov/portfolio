import useStore from "@/app/stateStorage/storage";
import {useCallback, useEffect} from "react";

export default function useDarkMode() {

  const darkMode = useStore((state) => state.darkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "true");
    }
  }, []);

  const toggleDarkMode = useCallback((newTheme: boolean) => {
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
  }, [setDarkMode]);

  return {
    darkMode,
    toggleDarkMode,
  };
}