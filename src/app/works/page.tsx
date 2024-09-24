"use client"

import useThemeColor from "@/hooks/useThemeColor";
import Card from "@/components/Card";
import LinkCard from "@/components/LinkCard";
import Link from "next/link";
import Image from "next/image";
import weatherApp from "../../../public/weatherApp.png";
import todoApp from "../../../public/todoApp.png";
import LinkIcon from "@/components/icons/LinkIcon";
import useDarkMode from "@/hooks/useDarkMode";
import {WorkExampleType} from "@/types/WorkExampleType";
import {useMemo} from "react";
import {cn} from "@/utils/cn";

const Works = () => {
  const {darkMode} = useDarkMode();
  const {themeColor} = useThemeColor();

  const workExamples: WorkExampleType[] = useMemo(() => [
    {
      title: "Weather app",
      description: "This is a weather forecast app, created using openweathermap API",
      technologies: ["Next JS", "Typescript", "Tailwind css"],
      projectLinks: [
        {
          name: "Github repository",
          link: "https://github.com/akuloov/next-weather-app",
        },
        {
          name: "Live Demo",
          link: "https://akulov-weather-app-mu.vercel.app/",
        }
      ],
      image: {
        src: weatherApp,
        alt: "weather app",
      },
    },
    {
      title: "TODO app",
      description: "This is a simple TODO app",
      technologies: ["Next JS", "Typescript", "daisyui", "Tailwind css"],
      projectLinks: [
        {
          name: "Github repository",
          link: "https://github.com/akuloov/nextJS-Todo-App",
        }
      ],
      image: {
        src: todoApp,
        alt: "TODO app",
      },
      animateClassName: "animate-delay-[300ms]",
    },
  ], []);
  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <Link href={"/"}>
        <LinkCard className="animate-fade-down" themeColor={themeColor}>
          Back
        </LinkCard>
      </Link>
      {workExamples.map((workExample, index) => (
        <Card themeColor={themeColor}
              className={cn("mt-6 animate-fade-up md:animate-fade-left animate-once animate-ease-in-out p-4 sm:p-6", workExample.animateClassName)}
              key={index}>
          <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between">
            <div className="flex flex-col w-full gap-2">
              <h2 className="text-xl font-bold">{workExample.title}</h2>
              <p className="font-light mb-4 text-sm">{workExample.description}</p>
              <h2 className="text-base font-medium">Technologies that I used:</h2>
              <ul className="list-disc list-inside mb-4 text-sm">
                {workExample.technologies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div
                className={cn("bg-gray-300 p-4 max-w-[200px] rounded mb-10 sm:mb-0", {"bg-darkslate-400": darkMode})}>
                <h2 className="text-base font-bold mb-2">Project Links</h2>
                {workExample.projectLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    className="font-light w-fit flex items-center gap-1 hover:opacity-70 transition-all">{item.name}
                    <LinkIcon
                      color={darkMode} width="16" height="16"/>
                  </a>
                ))}
              </div>
            </div>
            <Image src={workExample.image.src} className="rounded w-[300px]" alt={workExample.image.alt}/>
          </div>
        </Card>
      ))}
    </main>
  );
};

export default Works;