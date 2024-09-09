import js from '../../public/js.png';
import ts from '../../public/ts.png';
import react from '../../public/react.svg';
import next from '../../public/next.svg';
import tailwind from '../../public/tailwind.png';
import link from '../../public/linkIcon.svg';

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
import {ThemeColor} from "@/hooks/useThemeColor";

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
  return (
    <>
      <Swiper
        effect={'flip'}
        grabCursor={true}
        modules={[EffectFlip, Pagination]}
        className={cn("mySwiper max-w-[305px]", className)}
        pagination={{clickable: true}}
      >
        <SwiperSlide className={cn(variants({themeColor}))}>
          <a href="https://react.dev/" target="_blank" className="flex gap-2 mb-4 text-xl font-bold">
            <h1>React</h1>
            <Image src={link} alt="link"/>
          </a>
          <Image src={react} alt="react" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <a href="https://nextjs.org/" target="_blank" className="flex gap-2 mb-4 text-xl font-bold">
            <h1>Next JS</h1>
            <Image src={link} alt="link"/>
          </a>
          <Image src={next} alt="nextjs" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"
             className="flex gap-2 mb-4 text-xl font-bold">
            <h1>Javascript</h1>
            <Image src={link} alt="link"/>
          </a>
          <Image src={js} alt="javascript" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <a href="https://www.typescriptlang.org/" target="_blank"
             className="flex gap-2 mb-4 text-xl font-bold">
            <h1>Typescript</h1>
            <Image src={link} alt="link"/>
          </a>
          <Image src={ts} alt="typescript" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <a href="https://tailwindcss.com/" target="_blank"
             className="flex gap-2 mb-4 text-xl font-bold">
            <h1>Tailwind css</h1>
            <Image src={link} alt="link"/>
          </a>
          <Image src={tailwind} alt="tailwind" width={200}/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
