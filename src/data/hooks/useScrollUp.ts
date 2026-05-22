import {useEffect} from 'react';

export const useScrollUp = () => {
  useEffect(() => {
    const header = document.getElementById('header');
    const obsCallback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver){
      const [entry] = entries;
      const scrollUpButton = document.getElementById('button-scrollUp')
      scrollUpButton.hidden = entry.isIntersecting;
    }
    const obsOptions = {
      root: null,
      threshold: 0,
      rootMargin: '100px',
    };
    const observer = new IntersectionObserver(obsCallback, obsOptions);
    observer.observe(header);
    return () => {
      observer.disconnect();
    }
  }, [])
  return {

  };
};
