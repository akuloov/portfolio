import useGetCurrentTime from "@/hooks/useGetCurrentTime";
import React from "react";

function CurrentTime() {
  const {currentTime} = useGetCurrentTime();

  return (
    <>
      <h6 className="font-bold">Your local time</h6>
      <div className="text-xl italic font-extralight">{currentTime}</div>
    </>
  )
}

export default React.memo(CurrentTime);