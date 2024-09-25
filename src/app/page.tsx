"use client"

import Card from "@/components/Card";
import GithubIcon from "@/components/icons/GithubIcon";
import Image from "next/image";
import avatar from "../../public/avatar.webp";
import LinkCard from "@/components/LinkCard";
import {useCallback, useMemo, useState} from "react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import MailIcon from "@/components/icons/MailIcon";
import Slider from "@/components/Slider";
import GameIcon from "@/components/icons/GameIcon";
import useThemeColor from "@/hooks/useThemeColor";
import ThemeIcon from "@/components/icons/ThemeIcon";
import {cn} from "@/utils/cn";
import LinkIcon from "@/components/icons/LinkIcon";
import Link from "next/link";
import CurrentTime from "@/components/CurrentTime";
import useDarkMode from "@/hooks/useDarkMode";

export default function Home() {
  const {themeColor, setThemeColor} = useThemeColor();
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const {darkMode, toggleDarkMode} = useDarkMode();

  const phrases = useMemo(() => ["", "Clicked again?", "Still here?", "Persistent, aren't you?", "What's up?", "Again?", "Really?", "You're curious!", "Not cool!", "Give it a break", "That's annoying!", "Hands off!!!", "No more clicks!", "Seriously?!", "Ouch! That hurts!", "Why the curiosity?", "I got tired!", "I'm bored!", "Find another hobby!", "Stop, please!", "Enough!", "Stop it!", "I'm out of phrases!"], []);

  const handleClick = useCallback(() => {
    setPhraseIndex((prevIndex) => {
      if (prevIndex >= phrases.length - 1) {
        return phrases.length - 1; // Stay at the last phrase
      }
      return prevIndex + 1;
    });
    setIsClicked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicked(false);
  }, []);

  return (
    <main
      className={cn("grid gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-6xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4", {"bg-white md:rounded-xl": !darkMode})}>
      <Card themeColor={themeColor}
            className="flex md:pr-0 md:col-span-3 md:row-span-4 animate-fade-down animate-once animate-delay-200 animate-ease-in-out">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">welcome</h2>
          <p className="font-light">
            Hi, I&apos;m <span className="font-bold">Maksym Akulov</span>. I&apos;m a software engineer based in
            Ringebu,
            Norway. I&apos;m passionate about building
            software that solves real-world problems and improves people&apos;s lives.
          </p>
          <p className="font-light mt-2 mb-20">Feel free to reach out to me if you have any projects in mind,
            or just to say hello.</p>
          <div className="flex flex-wrap gap-3">
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
            <div className="relative flex flex-col">
              {isClicked && (
                <LinkCard themeColor={themeColor}
                          className="absolute bottom-14 left-1/2 -translate-x-1/2 -translate-y-26 min-[400px]:whitespace-nowrap"
                          message={true}
                >
                  {phrases[phraseIndex]}
                </LinkCard>
              )
              }
              <LinkCard themeColor={themeColor}
                        target="_blank"
                        onPointerDown={handleClick}
                        onPointerUp={handleMouseUp}
              >
                <GameIcon color={themeColor}/>
              </LinkCard>
            </div>
            <LinkCard themeColor={themeColor} onClick={() => {
              toggleDarkMode(!darkMode);
            }}>
              <ThemeIcon color={themeColor}/>
            </LinkCard>
          </div>
        </div>
        <Image src={avatar} alt="avatar"
               className="h-fit select-none absolute right-[-60px] bottom-[-20px] z-[-1] opacity-50 md:opacity-100 md:relative md:right-auto md:bottom-auto md:z-auto pointer-events-none min-[937px]:mt-auto"
               width={300}
               height={300}
        />
      </Card>
      <Card themeColor={themeColor}
            className="md:col-span-1 md:row-span-6 animate-fade-up md:animate-fade-right animate-once animate-delay-500 animate-ease-in-out">
        <h2 className="text-xl font-bold">About me</h2>
        <p className="text-sm mb-4">Hi, I&apos;m Maksym, a front-end software developer from Ukraine. Currently in
          Norway. I have a bachelor&apos;s degree in software engineering.</p>
        <p className="text-sm">My primary tools of choice includes:</p>
        <ul className="list-disc list-inside mb-2">
          <li>React</li>
          <li>Next JS</li>
          <li>Javascript</li>
          <li>Typescript</li>
          <li>Tailwind css</li>
        </ul>
        <p className="text-sm mb-2">Beyond coding, I&apos;m passionate about design, illustration, animation and
          traveling.</p>
        <p className="text-sm">While I have some preferred tools, I always choose the best one for the job, even if
          it&apos;s not on my usual list. My goal is to find the right solution for each project.</p>
      </Card>
      <Slider themeColor={themeColor}
              className="min-w-full md:min-w-[auto] md:max-w-[245px] md:row-span-2 md:col-start-2 md:row-start-5 animate-fade-up animate-once animate-delay-[800ms] md:animate-delay-1000 animate-ease-in-out"/>
      <Card themeColor={themeColor}
            className="md:col-start-2 md:row-start-7 md:max-w-[245px] md:row-span-4 animate-fade-up animate-once animate-delay-[1100ms] md:animate-delay-[1600ms] animate-ease-in-out">
        <h2 className="text-xl font-bold mb-4">Let&apos;s start working together!</h2>
        {/*<h6 className="text-sm text-darkslate-300 font-light">Contact details</h6>*/}
        <a href="mailto:maxim.akulovka@gmail.com"
           className="font-light hover:opacity-70 transition-all">maxim.akulovka@gmail.com</a>
        <p className="font-light text-sm mb-4">Norway</p>
        <h2 className="text-xl font-bold">Socials</h2>
        <div className="flex flex-col">
          <a href="https://github.com/akuloov"
             target="_blank"
             className="font-light w-fit flex items-center gap-1 hover:opacity-70 transition-all">Github<LinkIcon
            color={darkMode} width="16" height="16"/></a>
          <a href="https://www.facebook.com/profile.php?id=100048220174173"
             target="_blank"
             className="font-light w-fit flex items-center gap-1 hover:opacity-70 transition-all">Facebook<LinkIcon
            color={darkMode} width="16" height="16"/></a>
          <a href="https://discordapp.com/users/539807215264202775/"
             target="_blank"
             className="font-light w-fit flex items-center gap-1 hover:opacity-70 transition-all">Discord<LinkIcon
            color={darkMode} width="16" height="16"/></a>
        </div>
      </Card>
      <Card themeColor={themeColor}
            className="workExamples cursor-pointer p-0 animate-fade-up md:animate-fade-left animate-once animate-delay-[1400ms] md:animate-delay-[1300ms] animate-ease-in-out">
        <Link href={"/works"}>
          <div className="flex items-center justify-between p-6 hover:opacity-70 transition-all h-full">
            <h2 className="text-xl font-bold">Work examples</h2>
            <LinkIcon color={darkMode}/>
          </div>
        </Link>
      </Card>
      <Card themeColor={themeColor}
            className="font-light flex items-center text-center justify-center animate-fade-up md:animate-fade-left animate-once animate-delay-[1700ms] md:animate-delay-[1900ms] animate-ease-in-out">
              <span className="absolute right-3 top-3 flex h-3 w-3">
                <span
                  className="animate-ping animate-infinite absolute inline-flex h-full w-full rounded-full bg-ThemeGreen opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-ThemeGreen"></span>
              </span>
        <div className="flex items-center gap-1 md:flex-col min-[874px]:flex-row">
          Currently practiсing at <a href="https://abaris.no/" target="_blank"
                                     className="font-bold w-fit flex items-center gap-1 hover:opacity-70 transition-all">Abaris<LinkIcon
          color={darkMode} width="16" height="16"/></a>
        </div>
      </Card>
      <Card themeColor={themeColor}
            className="flex flex-col justify-center items-center md:col-start-3 md:row-start-5 animate-fade-up md:animate-fade-left animate-once animate-delay-[2000ms] md:animate-delay-[800ms] animate-ease-in-out">
        <CurrentTime/>
      </Card>
      <Card themeColor={themeColor}
            className="p-3 flex items-center justify-between animate-fade-up md:animate-fade-left animate-once animate-delay-[2300ms] md:animate-delay-[2200ms] animate-ease-in-out">
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
      <Card themeColor={themeColor}
            className="flex items-center justify-center text-sm md:row-span-2 animate-fade-up md:animate-fade-left animate-once animate-delay-[2600ms] md:animate-delay-[2500ms] animate-ease-in-out">
        © 2024 · Crafted with ♥️ using Next JS by Maksym Akulov.
      </Card>
    </main>
  );
}
