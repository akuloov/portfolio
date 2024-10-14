import js from '../../public/js.png';
import ts from '../../public/ts.png';
import react from '../../public/react.svg';
import next from '../../public/next.svg';
import tailwind from '../../public/tailwind.png';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';

import '../app/globals.css';

// import required modules
import {EffectFlip, Pagination} from 'swiper/modules';
import Image from "next/image";
import {cva} from "class-variance-authority";
import {cn} from "@/utils/cn";
import {ThemeColor} from "@/types/ThemeColorType";
import LinkIcon from "@/components/icons/LinkIcon";
import useStore from "@/stateStorage/storage";
import {useMemo} from "react";
import {SlideType} from "@/types/SlideType";

const variants = cva(
  "",
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

export default function Slider(
  {themeColor, className}:
    {
      themeColor: ThemeColor,
      className?: string
    }) {
  const darkMode = useStore((state) => state.darkMode);

  const slides: SlideType[] = useMemo(() => [
    {
      title: "React",
      href: "https://react.dev/",
      image: {src: react, alt: "react"},
    },
    {
      title: "Next JS",
      href: "https://nextjs.org/",
      image: {src: next, alt: "nextjs"},
    },
    {
      title: "Javascript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      image: {src: js, alt: "javascript"},
    },
    {
      title: "Typescript",
      href: "https://www.typescriptlang.org/",
      image: {src: ts, alt: "typescript"},
    },
    {
      title: "Tailwind css",
      href: "https://tailwindcss.com/",
      image: {src: tailwind, alt: "tailwind"},
    },
  ], []);

  return (
    <>
      <Swiper
        effect={'flip'}
        grabCursor={true}
        modules={[EffectFlip, Pagination]}
        className={cn("mySwiper max-w-[305px]", className)}
        pagination={{clickable: true}}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={cn("bg-darkslate-500", variants({themeColor}), {"bg-white text-black": !darkMode})}>
            <a href={slide.href} target="_blank"
               className="flex items-center gap-2 mb-4 text-xl font-bold hover:opacity-70 transition-all">
              <h1>{slide.title}</h1>
              <LinkIcon color={darkMode} width="16" height="16"/>
            </a>
            <Image src={slide.image.src} alt={slide.image.alt} width={200}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {
        darkMode &&
          <style>{`
          .swiper-pagination-bullet {
              background-color: white !important;
          }
      `}</style>
      }
    </>
  );
}
