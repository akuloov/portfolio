"use client";

import LinkCard from "@/components/LinkCard";
import Link from "next/link";
import useThemeColor from "@/hooks/useThemeColor";

const LinkButton = ({route, className, text = "Back"}: {
  route: string,
  className?: string,
  text?: string
}) => {

  const {themeColor} = useThemeColor();

  return (
    <Link href={route} className="block w-fit">
      <LinkCard className={className} themeColor={themeColor}>
        {text}
      </LinkCard>
    </Link>
  );
}

export default LinkButton;