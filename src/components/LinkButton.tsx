"use client";

import LinkCard from "@/components/LinkCard";
import Link from "next/link";
import useThemeColor from "@/hooks/useThemeColor";

const LinkButton = ({route, className, text = "Back", onClick}: {
  route?: string,
  className?: string,
  text?: string
  onClick?: () => void
}) => {

  const {themeColor} = useThemeColor();

  return (
    route ? (
      <Link href={route} className="block w-fit" onClick={onClick}>
        <LinkCard className={className} themeColor={themeColor}>
          {text}
        </LinkCard>
      </Link>
    ) : (
      <div className="block w-fit" onClick={onClick}>
        <LinkCard className={className} themeColor={themeColor}>
          {text}
        </LinkCard>
      </div>
    )
  );
}

export default LinkButton;