import {useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import LoadingStatus from "@/components/LoadingStatus";
import LinkCard from "@/components/LinkCard";
import Card from "@/components/Card";
import useThemeColor from "@/hooks/useThemeColor";
import AdviceModal from "@/components/getAdvice/AdviceModal";

const GetAdvice = () => {
  const {themeColor} = useThemeColor();

  const [showModal, setShowModal] = useState(false);

  const BORED_URL = process.env.NEXT_PUBLIC_BORED_URL;

  const {isLoading, data, isFetching, refetch} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(BORED_URL!).then((res) =>
        res.json(),
      ),
    enabled: !!BORED_URL,
    refetchOnWindowFocus: false,
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
    <>
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
      <AdviceModal show={showModal} onClose={() => setShowModal(false)} text={activityText}>
        <div className={"min-w-[300px] items-center flex flex-col gap-4"}>
          {renderActivity()}
          <LinkCard themeColor={themeColor} onClick={() => refetch()}>
            New activity
          </LinkCard>
        </div>
      </AdviceModal>
    </>
  )
}

export default GetAdvice;