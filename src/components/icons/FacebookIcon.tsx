import getTailwindColor from "@/utils/getTailwindColor";
import {ThemeColor} from "@/types/ThemeColorType";

export default function FacebookIcon({
                                     height = "20",
                                     width = "20",
                                     color,
                                   }: {
  height?: string;
  width?: string;
  color: ThemeColor;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M44 0C19.7 0 0 19.7 0 44C0 66.06 16.25 84.274 37.424 87.456V55.662H26.538V44.096H37.424V36.4C37.424 23.658 43.632 18.064 54.222 18.064C59.294 18.064 61.976 18.44 63.246 18.612V28.708H56.022C51.526 28.708 49.956 32.97 49.956 37.774V44.096H63.132L61.344 55.662H49.956V87.55C71.432 84.636 88 66.274 88 44C88 19.7 68.3 0 44 0Z"
        fill={getTailwindColor(color)}/>
    </svg>
  );
}