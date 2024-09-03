"use client"

import Card from "@/components/Card";
import GithubIcon from "@/components/icons/GithubIcon";
import Image from "next/image";
import avatar from "../../public/avatar.webp";
import LinkCard from "@/components/LinkCard";
import {useEffect, useState} from "react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import MailIcon from "@/components/icons/MailIcon";
import getCurrentTime from "@/utils/getCurrentTime";
import Slider from "@/components/Slider";
import GameIcon from "@/components/icons/GameIcon";


export type ThemeColor = "ThemeRed" | "ThemeBlue" | "ThemeGreen" | "ThemeYellow" | "ThemePurple";

export default function Home() {
  const [themeColor, setThemeColor] = useState<ThemeColor>("ThemeBlue");
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="container flex fill gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full sm:p-4 md:p-6">
      <div className="flex flex-col w-9/12 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
        <Card themeColor={themeColor} className="flex pr-0">
          <div className="flex flex-col">
            <h6 className="text-sm text-darkslate-300 font-light">welcome</h6>
            <p className="font-light">
              Hi, I'm <span className="font-bold">Maksym Akulov</span>. I'm a software engineer based in Ringebu,
              Norway. I'm passionate about building
              software that solves real-world problems and improves people's lives.
            </p>
            <p className="font-light mt-2 mb-20">Feel free to reach out to me if you have any projects in mind,
              or just to say hello.</p>
            <div className="flex gap-3">
              <LinkCard themeColor={themeColor} href="https://github.com/akuloov" target="_blank">
                <GithubIcon color={themeColor}/>
              </LinkCard>
              <LinkCard themeColor={themeColor} href="https://www.facebook.com/profile.php?id=100048220174173"
                        target="_blank">
                <FacebookIcon color={themeColor}/>
              </LinkCard>
              <LinkCard themeColor={themeColor} href="mailto:maxim.akulovka@gmail.com"
                        target="_blank">
                <MailIcon color={themeColor}/>
              </LinkCard>
              {/*<div className="relative flex flex-col">
                <LinkCard themeColor={themeColor}
                          className="absolute bottom-14 left-[-23px]"
                          message={true}
                >
                  fdsfsdfds
                </LinkCard>*/}
                <LinkCard themeColor={themeColor}
                          target="_blank"
                          className="cursor-pointer">
                  <GameIcon color={themeColor}/>
                </LinkCard>
              {/*</div>*/}
            </div>
          </div>
          <Image src={avatar} alt="avatar"
                 className="h-fit select-none absolute right-[-60px] bottom-[-20px] z-[-1] opacity-50 md:opacity-100 md:relative md:right-auto md:bottom-auto md:z-auto pointer-events-none min-[937px]:mt-auto"
                 width={300}
                 height={300}
          />
        </Card>
        <div className="flex gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          <Card
            className="w-4/12" themeColor={themeColor}
          >
            <h2 className="text-xl font-bold mb-4">Let's start working together!</h2>
            <h6 className="text-sm text-darkslate-300 font-light">Contact details</h6>
            <a href="mailto:maxim.akulovka@gmail.com" className="font-light">maxim.akulovka@gmail.com</a>
            <p className="font-light text-sm mb-4">Norway</p>
            <h2 className="text-xl font-bold">Socials</h2>
            <div className="flex flex-col">
              <a href="https://github.com/akuloov"
                 target="_blank"
                 className="font-light w-fit">Github</a>
              <a href="https://www.facebook.com/profile.php?id=100048220174173"
                 target="_blank"
                 className="font-light w-fit">Facebook</a>
              <a href="https://discordapp.com/users/539807215264202775/"
                 target="_blank"
                 className="font-light w-fit">Discord</a>
            </div>
          </Card>
          <div className="flex flex-col justify-between w-4/12 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
            <Card themeColor={themeColor} className="flex flex-col justify-center items-center">
              <h6 className="font-bold">Your local time</h6>
              <div className="text-xl italic font-extralight">{currentTime}</div>
            </Card>
            <Card themeColor={themeColor} className="font-light">
              <span className="relative flex h-3 w-3 ml-auto">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ThemeGreen opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-ThemeGreen"></span>
              </span>
              Currently practiсing at <a href="https://abaris.no/" target="_blank" className="font-bold">Abaris</a>
            </Card>
            <Card themeColor={themeColor} className="p-3 flex items-center justify-between h-20">
              <div className="w-10 h-10 rounded-full cursor-pointer bg-ThemeRed"
                   onClick={() => setThemeColor("ThemeRed")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-ThemeBlue"
                   onClick={() => setThemeColor("ThemeBlue")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-ThemeGreen"
                   onClick={() => setThemeColor("ThemeGreen")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-ThemeYellow"
                   onClick={() => setThemeColor("ThemeYellow")}></div>
              <div className="w-10 h-10 rounded-full cursor-pointer bg-ThemePurple"
                   onClick={() => setThemeColor("ThemePurple")}></div>
            </Card>
          </div>
          <Slider themeColor={themeColor}/>
        </div>
      </div>
      <div className="flex flex-col w-3/12 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
        <Card themeColor={themeColor} className="h-full">
          <h2 className="text-xl font-bold">About me</h2>
          <p className="text-sm mb-4">Hi, I'm Maksym, a front-end software developer from Ukraine. Currently in
            Norway.</p>
          <p className="text-sm">My primary tools of choice includes:</p>
          <ul className="list-disc list-inside mb-2">
            <li>React</li>
            <li>Next JS</li>
            <li>Javascript</li>
            <li>Typescript</li>
            <li>Tailwind css</li>
          </ul>
          <p className="text-sm mb-2">Beyond coding, I'm passionate about design, illustration, animation and
            traveling.</p>
          <p className="text-sm">While I have some preferred tools, I always choose the best one for the job, even if
            it's not on my usual list. My goal is to find the right solution for each project.</p>
        </Card>
        <Card themeColor={themeColor} className="text-sm">
          © 2024 · Crafted with ♥️ using Next JS by Maksym Akulov.
        </Card>
      </div>
    </main>
  );
}
