import {useEffect, useState} from 'react';

export const useInfiniteScroll = (elementRef: string, resolve: () => void) => {
  const [error, setError] = useState('');
  useEffect(() => {
    const footer = document.getElementById(elementRef);
    if (!footer) {
      setError('Element not found.');
      return;
    }
    const obsCallback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver){
      const [entry] = entries;
      if (entry.isIntersecting) {
        resolve();
      }
    }
    const obsOptions = {
      root: null,
      threshold: 1,
    };
    const observer = new IntersectionObserver(obsCallback, obsOptions);
    observer.observe(footer);
    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    error
  };
}
