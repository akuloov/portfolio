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
import {ThemeColor} from "@/app/page";
import {cn} from "@/utils/cn";

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

export default function Slider({themeColor}: { themeColor: ThemeColor }) {
  return (
    <>
      <Swiper
        effect={'flip'}
        grabCursor={true}
        modules={[EffectFlip, Pagination]}
        className="mySwiper"
        pagination={{clickable: true}}
      >
        <SwiperSlide className={cn(variants({themeColor}))}>
          <Image src={react} alt="react" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <Image src={next} alt="nextjs" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <Image src={js} alt="javascript" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <Image src={ts} alt="typescript" width={200}/>
        </SwiperSlide>
        <SwiperSlide className={cn(variants({themeColor}))}>
          <Image src={tailwind} alt="tailwind" width={200}/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
