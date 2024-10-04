"use client"

import useThemeColor from "@/hooks/useThemeColor";
import Card from "@/components/Card";
import LinkCard from "@/components/LinkCard";
import Link from "next/link";
import Image from "next/image";
import weatherApp from "../../../public/weatherApp.png";
import todoApp from "../../../public/todoApp.png";
import petStoreApp from "../../../public/petStoreApp.png";
import personalWebsite from "../../../public/personalWebsite.png";
import honeyStore from "../../../public/honeyStore.png";
import todoReactApp from "../../../public/todoReactApp.png";
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
        },
        {
          name: "Openweathermap API",
          link: "https://openweathermap.org/api",
        }
      ],
      image: {
        src: weatherApp,
        alt: "Weather app",
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
    {
      title: "Personal website",
      description: "This is a personal website that I created for myself and for fun, almost all information on this website is fake",
      technologies: ["Webpack(my config)", "SCSS"],
      projectLinks: [
        {
          name: "Github repository",
          link: "https://github.com/akuloov/personal-practise",
        },
        {
          name: "Live Demo",
          link: "https://akuloov.github.io/personal-practise/dist/index.html",
        },
        {
          name: "My webpack assembly",
          link: "https://github.com/akuloov/my-assembly-webpack",
        }
      ],
      image: {
        src: personalWebsite,
        alt: "Personal website",
      },
      animateClassName: "animate-delay-[600ms]",
    },
    {
      title: "Pet store",
      description: "This is a pet store app which I developed at student practice",
      technologies: ["Laravel", "Laravel Mix", "SCSS"],
      projectLinks: [
        {
          name: "Github repository",
          link: "https://github.com/akuloov/project-task_laravel",
        },
      ],
      image: {
        src: petStoreApp,
        alt: "Pet store app",
      },
      animateClassName: "animate-delay-[900ms]",
    },
    {
      title: "Landing page",
      description: "This is a landing page for a honey store for my father who is a beekeeper",
      technologies: ["Webpack", "SCSS"],
      projectLinks: [
        {
          name: "Github repository",
          link: "https://github.com/akuloov/Akulov-Honey",
        },
        {
          name: "Live Demo",
          link: "https://akuloov.github.io/Akulov-Honey/",
        }
      ],
      image: {
        src: honeyStore,
        alt: "Landing page",
      },
      animateClassName: "animate-delay-[1200ms]",
    },
    {
      title: "TODO app",
      description: "This is an another TODO app, but created using only React JS",
      technologies: ["React JS"],
      projectLinks: [
        {
          name: "Github repository",
          link: "https://github.com/akuloov/Todo-App-React-JS",
        },
        {
          name: "Live Demo",
          link: "https://akuloov.github.io/Todo-App-React-JS/build/index.html",
        }
      ],
      image: {
        src: todoReactApp,
        alt: "TODO app",
      },
      animateClassName: "animate-delay-[1500ms]",
    },
  ], []);
  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <Link href={"/"} className="block w-fit">
        <LinkCard className="animate-fade-down" themeColor={themeColor}>
          Back
        </LinkCard>
      </Link>
      {workExamples.map((workExample, index) => (
        <Card themeColor={themeColor}
              className={cn("flex flex-col items-center sm:items-start sm:flex-row mt-6 animate-fade-up md:animate-fade-left animate-once animate-ease-in-out p-4 sm:p-6 h-full sm:justify-between sm:gap-4", workExample.animateClassName)}
              key={index}>
          <div className="flex flex-col justify-between gap-2 mr-auto sm:mr-0 sm:min-h-[400px]">
            <div className="flex flex-col w-full">
              <h2 className="text-xl font-bold">{workExample.title}</h2>
              <p className="font-light mb-4 text-sm">{workExample.description}</p>
              <h2 className="text-base font-medium">Technologies that I used:</h2>
              <ul className="list-disc list-inside text-sm">
                {workExample.technologies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              className={cn("bg-gray-300 p-4 max-w-[230px] rounded mb-10 sm:mb-0", {"bg-darkslate-400": darkMode})}>
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
          <Image src={workExample.image.src} className="rounded min-w-[300px] max-w-[300px] h-[400px]"
                 alt={workExample.image.alt}/>
        </Card>
      ))}
    </main>
  );
};

export default Works;