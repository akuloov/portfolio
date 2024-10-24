"use client";

import LinkCard from "@/components/LinkCard";
import Card from "@/components/Card";
import useThemeColor from "@/hooks/useThemeColor";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {IpType} from "@/types/IpType";
import IpModal from "@/components/getIP/IpModal";
import AdviceModalSkeleton from "@/components/getAdvice/AdviceModalSkeleton";
import Image from "next/image";

const GetIP = () => {
  const {themeColor} = useThemeColor();

  const [showModal, setShowModal] = useState(false);

  const GETIP_URL = process.env.NEXT_PUBLIC_GETIP_URL;

  const {isLoading, data, isFetching, refetch} = useQuery<IpType>({
    queryKey: ['ipData'],
    queryFn: () =>
      fetch(GETIP_URL!).then((res) =>
        res.json(),
      ),
    refetchOnWindowFocus: false,
  })

  const handleGetAdvice = () => {
    setShowModal(true);
    refetch(); // Trigger fetch manually
  };

  return (
    <>
      <Card themeColor={themeColor} className="animate-fade-down mt-5">
        <div>
          <h2 className="text-xl font-bold">Want to get your IP?</h2>
          <p className="font-light">Let&apos;s do it!</p>
          <div className="flex items-center justify-center mt-4">
            <LinkCard className="animate-fade-down" themeColor={themeColor} onClick={handleGetAdvice}>
              Get IP
            </LinkCard>
          </div>
        </div>
      </Card>
      <IpModal show={showModal} onClose={() => setShowModal(false)}>
        <div className={"min-w-[250px] items-center flex flex-col"}>
          {isLoading ? (
            <AdviceModalSkeleton/>
          ) : (
            <>
              <h1>{data?.ip}</h1>
              <h2 className="text-xl font-bold">{data?.country_name}</h2>
              {data?.country_flag &&
                  <Image src={data.country_flag} width={64} height={64} className="mt-1" alt="Country flag"/>}
            </>
          )}
        </div>
      </IpModal>
    </>
  );
}

export default GetIP;