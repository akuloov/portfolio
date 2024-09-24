import {StaticImageData} from "next/image";

export type WorkExampleType = {
  title: string,
  description: string,
  technologies: string[],
  projectLinks: { name: string, link: string }[],
  image: { src: StaticImageData, alt: string },
  animateClassName?: string,
};