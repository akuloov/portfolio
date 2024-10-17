"use client"

import {useQuery} from "@tanstack/react-query";
import {BORED_URL} from "@/constants/constants";
import {BoredDataType} from "@/types/BoredDataType";
import useDarkMode from "@/hooks/useDarkMode";
import useThemeColor from "@/hooks/useThemeColor";
import LinkCard from "@/components/LinkCard";
import Link from "next/link";
import Card from "@/components/Card";
import {useMemo, useState} from "react";
import LoadingStatus from "@/components/LoadingStatus";
import Modal from "@/components/Modal";

const Playground = () => {
  const {darkMode} = useDarkMode();
  const {themeColor} = useThemeColor();

  const [showModal, setShowModal] = useState(false);

  const {isLoading, data, isFetching, refetch} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(BORED_URL).then((res) =>
        res.json(),
      ),
    enabled: false,
  })

  const activityIsLoading = useMemo(() => isLoading || isFetching, [isLoading, isFetching])
  const activityText = useMemo(() => data?.activity, [data])

  function renderActivity() {
    const textStyles = "h-8"
    if (activityIsLoading) {
      return <LoadingStatus/>
    }
    if (activityText) {
      return <p className={textStyles}>{activityText}</p>
    }
    return <p className={textStyles}>Error fetching advice</p>
  }

  const handleGetAdvice = () => {
    setShowModal(true);
    refetch(); // Trigger fetch manually
  };

  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-white m-auto p-2 max-w-xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <Link href={"/"} className="block w-fit">
        <LinkCard className="animate-fade-down" themeColor={themeColor}>
          Back
        </LinkCard>
      </Link>
      <Card themeColor={themeColor} className="animate-fade-down mt-5">
        <div>
          <h2 className="text-xl font-bold">Are you bored?</h2>
          <p className="font-light">Get advice on what you can do!</p>
          <div className="flex items-center justify-center mt-4">
            <LinkCard className="animate-fade-down" themeColor={themeColor} onClick={handleGetAdvice}>
              Get advice
            </LinkCard>
          </div>
        </div>
      </Card>
      <Modal show={showModal} onClose={() => setShowModal(false)} text={activityText}>
        <div className={"min-w-[300px] items-center flex flex-col gap-4"}>
          {renderActivity()}
          <LinkCard themeColor={themeColor} onClick={() => refetch()}>
            New activity
          </LinkCard>
        </div>
      </Modal>
    </main>
  );
}

export default Playground;