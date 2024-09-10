import {ThemeColor} from "@/types/ThemeColorType";


export default function getTailwindColor(themeColor: ThemeColor): string {
  const colorMap: { [key in ThemeColor]: string } = {
    ThemeRed: "#cf2f3d",
    ThemeBlue: "#1e88e5",
    ThemeGreen: "#4caf50",
    ThemeYellow: "#fdd835",
    ThemePurple: "#8e24aa",
  };

  return colorMap[themeColor];
}