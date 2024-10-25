"use client";

import {useQuery} from "@tanstack/react-query";
import LinkCard from "@/components/LinkCard";
import Card from "@/components/Card";
import useThemeColor from "@/hooks/useThemeColor";
import {useState} from "react";
import CustomModal from "@/components/getIP/CustomModal";
import DadJokesSkeleton from "@/components/dadJokes/DadJokesSkeleton";
import LoadingStatus from "@/components/LoadingStatus";
import HandleFetchStatus from "@/components/HandleFetchStatus";
import {DadJokesType} from "@/types/DadJokesType";

const DadJokes = () => {
  const {themeColor} = useThemeColor();
  const [showModal, setShowModal] = useState(false);

  const DADJOKES_URL = process.env.NEXT_PUBLIC_DADJOKES_URL;

  const {data, isFetching, refetch, isPaused} = useQuery<DadJokesType>({
    queryKey: ['dadJokesData'],
    queryFn: () =>
      fetch(DADJOKES_URL!, {
        headers: {
          'Accept': 'application/json'
        }
      }).then((res) =>
        res.json(),
      ),
    enabled: !!DADJOKES_URL,
    refetchOnWindowFocus: false,
  })

  const handleGetJoke = () => {
    setShowModal(true);
    if (!data) {
      refetch(); // Trigger fetch manually only if data is not available
    }
  };

  return (
    <>
      <Card themeColor={themeColor} className="animate-fade-down">
        <div>
          <h2 className="text-xl font-bold">Dad jokes</h2>
          <div className="flex items-center justify-center mt-4">
            <LinkCard className="animate-fade-down" themeColor={themeColor} onClick={handleGetJoke}>
              Get joke
            </LinkCard>
          </div>
        </div>
      </Card>
      <CustomModal show={showModal} onClose={() => setShowModal(false)}>
        <div className={"min-w-[250px] items-center flex flex-col gap-4"}>
          {isFetching ? (
            <LoadingStatus/>
          ) : (
            <>
              <p>{data?.joke}</p>
              <LinkCard themeColor={themeColor} onClick={() => refetch()}>
                New joke
              </LinkCard>
            </>
          )}
        </div>
        {isPaused &&
            <HandleFetchStatus isPaused={isPaused} textError="Could not fetch a new joke" className="mt-3"/>
        }
      </CustomModal>
    </>
  );
}

export default DadJokes;