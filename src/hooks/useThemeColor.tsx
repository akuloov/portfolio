import {useState} from "react";
export type ThemeColor = "ThemeRed" | "ThemeBlue" | "ThemeGreen" | "ThemeYellow" | "ThemePurple";

export default function useThemeColor() {
  const [themeColor, setThemeColor] = useState<ThemeColor>("ThemeBlue");
  return {
    themeColor,
    setThemeColor,
  };
}