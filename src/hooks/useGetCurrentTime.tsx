import { useEffect, useMemo, useState, useCallback } from "react";

export default function useGetCurrentTime() {
 const options: Intl.DateTimeFormatOptions = useMemo(() => ({
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  }), []);

  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString('en-US', options)
  );

  const updateTime = useCallback(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', options));
  }, [options]);

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  return useMemo(() => ({ currentTime }), [currentTime]);
}