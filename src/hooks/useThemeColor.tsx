import {useState} from "react";
import {ThemeColor} from "@/types/ThemeColorType";

export default function useThemeColor() {
  const [themeColor, setThemeColor] = useState<ThemeColor>("ThemeBlue");
  return {
    themeColor,
    setThemeColor,
  };
}