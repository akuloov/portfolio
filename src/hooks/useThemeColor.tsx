import useStore from "@/stateStorage/storage";
import {ThemeColor} from "@/types/ThemeColorType";
import {useCallback, useEffect} from "react";

export default function useThemeColor() {
  const themeColor = useStore((state) => state.themeColor)
  const setThemeColorToStore = useStore((state) => state.setThemeColor);

  useEffect(() => {
    const storedThemeColor = localStorage.getItem('themeColor') as ThemeColor;
    if (storedThemeColor) {
      setThemeColorToStore(storedThemeColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setThemeColor = useCallback((newThemeColor: ThemeColor) => {
    setThemeColorToStore(newThemeColor);
    localStorage.setItem('themeColor', newThemeColor);
  }, [setThemeColorToStore]);

  return {
    themeColor,
    setThemeColor,
  };
}