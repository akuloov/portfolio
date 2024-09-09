import {useEffect, useState} from "react";

export default function useGetCurrentTime() {
  const options: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short'};
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', options));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', options));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return {
    currentTime
  };
}