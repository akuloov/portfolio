import {cva} from "class-variance-authority";
import {ThemeColor} from "@/app/page";
import {cn} from "@/utils/cn";

interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  themeColor: ThemeColor;
  className?: string;
  message?: boolean;
}

const variants = cva(
  "border border-b-4 border-r-4 rounded-lg px-5 py-2 w-fit h-fit active:border-b active:border-r active:ml-[3px] active:mt-[3px]",
  {
    variants: {
      themeColor: {
        ThemeRed: "border-ThemeRed",
        ThemeBlue: "border-ThemeBlue",
        ThemeGreen: "border-ThemeGreen",
        ThemeYellow: "border-ThemeYellow",
        ThemePurple: "border-ThemePurple",
      },
    },
    defaultVariants: {
      themeColor: "ThemeBlue",
    },
  }
)

const messageVariants = cva(
  "after:content-[''] after:block after:rotate-45 after:bg-darkslate-500 after:w-4 after:h-4 after:absolute after:overflow-hidden after:-bottom-2 after:-translate-x-1/2 after:left-1/2 after:z-20",
  {
    variants: {
      themeColor: {
        ThemeRed: "after:bg-ThemeRed",
        ThemeBlue: "after:bg-ThemeBlue",
        ThemeGreen: "after:bg-ThemeGreen",
        ThemeYellow: "after:bg-ThemeYellow",
        ThemePurple: "after:bg-ThemePurple",
      },
    },
    defaultVariants: {
      themeColor: "ThemeBlue",
    },
  }
)

const LinkCard = ({themeColor, className, message, ...otherProps}: LinkProps) => {
  return (
    <a {...otherProps}
       className={cn(variants({themeColor, className}), message && messageVariants({themeColor}))}
    />
  )
}
export default LinkCard;