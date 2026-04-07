import {useEffect, useState} from 'react';

export const useWindowsSizeHeight = () => {
  const [windowSize, setWindowSize] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 601);

  const handleResizeEvent = () => {
    setWindowSize(window.innerWidth);
    setIsMobile(window.innerWidth < 601);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResizeEvent);
    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, [])
  return {
    windowSize,
    isMobile,
  }
}
