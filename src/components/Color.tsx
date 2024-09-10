import {cva} from "class-variance-authority";
import {cn} from "@/utils/cn";
import {ThemeColor} from "@/types/ThemeColorType";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  themeColor: ThemeColor;
}

const variants = cva(
  "w-10 h-10 rounded-full",
  {
    variants: {
      themeColor: {
        ThemeRed: "bg-ThemeRed",
        ThemeBlue: "bg-ThemeBlue",
        ThemeGreen: "bg-ThemeGreen",
        ThemeYellow: "bg-ThemeYellow",
        ThemePurple: "bg-ThemePurple",
      },
    },
    defaultVariants: {
      themeColor: "ThemeRed",
    },
  }
)

const Color = ({className, themeColor, ...otherProps}: DivProps) => {
  return (
    <div className={cn(
      variants({themeColor, className})
    )}
         {...otherProps}
    ></div>
  )
}

export default Color;