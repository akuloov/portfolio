import {cn} from "@/utils/cn";
import {cva} from "class-variance-authority";
import {ThemeColor} from "@/hooks/useThemeColor";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  themeColor: ThemeColor;
}

const variants = cva(
  "overflow-hidden transfer-y-[-40%] shadow-lg rounded-lg border w-full relative transform perspective-1200 transition duration-75 ease-in-out p-6 bg-darkslate-500 border-darkslate-400",
  {
    variants: {
      themeColor: {
        ThemeRed: "hover:border-ThemeRed",
        ThemeBlue: "hover:border-ThemeBlue",
        ThemeGreen: "hover:border-ThemeGreen",
        ThemeYellow: "hover:border-ThemeYellow",
        ThemePurple: "hover:border-ThemePurple",
      },
    },
    defaultVariants: {
      themeColor: "ThemeBlue",
    },
  }
)

const Card = ({className, children, themeColor, ...otherProps}: DivProps) => {
  return (
    <div
      {...otherProps}
      className={cn(
        variants({themeColor, className})
      )}
    >
      {children}
    </div>
  );
}

export default Card;