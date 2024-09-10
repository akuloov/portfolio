import getTailwindColor from "@/utils/getTailwindColor";
import {ThemeColor} from "@/types/ThemeColorType";

export default function MailIcon({
                                   height = "20",
                                   width = "20",
                                   color,
                                 }: {
  height?: string;
  width?: string;
  color: ThemeColor;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5592C0.146875 11.2653 0 10.9119 0 10.4992V1.49417C0 1.08139 0.146875 0.729167 0.440625 0.4375C0.734375 0.145833 1.0875 0 1.5 0H14.5C14.9125 0 15.2656 0.146944 15.5594 0.440833C15.8531 0.734722 16 1.08806 16 1.50083V10.5058C16 10.9186 15.8531 11.2708 15.5594 11.5625C15.2656 11.8542 14.9125 12 14.5 12H1.5ZM8 7L1.5 3.27083V10.5H14.5V3.27083L8 7ZM8 5.22917L14.5 1.5H1.5L8 5.22917ZM1.5 3.27083V1.5V10.5V3.27083Z"
        fill={getTailwindColor(color)}/>
    </svg>
  );
}