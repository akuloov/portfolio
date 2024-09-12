import {ThemeMode} from "@/types/ThemeModeType";

export default function LinkIcon({
                                   height = "20",
                                   width = "20",
                                   color,
                                 }: {
  height?: string;
  width?: string;
  color: ThemeMode | undefined;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.5 8.5L19 1M19 1H14M19 1V6M19 12V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H8"
        stroke={color === "light" ? "#000" : "#fff"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
