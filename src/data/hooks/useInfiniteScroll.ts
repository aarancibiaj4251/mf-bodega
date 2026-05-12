import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectProductState} from '../../redux/product/product.selector';

export const useInfiniteScroll = (elementRef: string, resolve: () => void) => {
  const [error, setError] = useState('');
  const {isLastPage, isFiltering} = useSelector(selectProductState);
  useEffect(() => {
    const footer = document.getElementById(elementRef);
    if (!footer) {
      setError('Element not found.');
      return;
    }
    const obsCallback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver){
      const [entry] = entries;
      if (isLastPage) {
        observer.unobserve(footer);
      }
      if (entry.isIntersecting && !isFiltering) {
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
  }, [isLastPage, isFiltering]);

  return {
    error
  };
}
