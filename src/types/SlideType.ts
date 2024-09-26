import {StaticImageData} from "next/image";

export type SlideType = {
  title: string,
  href?: string,
  image: { src: StaticImageData, alt: string },
}