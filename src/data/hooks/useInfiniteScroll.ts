import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectProductState} from '../../redux/product/product.selector';
import {setIsLoading} from '../../redux/product/productSlice';

export const useInfiniteScroll = (elementRef: string, resolve: () => void) => {
  const [error, setError] = useState('');
  const {isLastPage, isFiltering, isLoading} = useSelector(selectProductState);
  useEffect(() => {
    const footer = document.getElementById(elementRef);
    if (!footer) {
      setError('Element not found.');
      return;
    }
    const obsCallback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver){
      const [entry] = entries;
      if (entry.intersectionRatio === 0) {
        setIsLoading(false);
      }
      if (isLastPage) {
        setIsLoading(false);
        observer.unobserve(footer);
      }
      if (entry.isIntersecting && !isFiltering) {
        setIsLoading(true);
        resolve();
      }
    }
    const obsOptions = {
      root: null,
      threshold: 0.1,
      delay: 500
    };
    const observer = new IntersectionObserver(obsCallback, obsOptions);
    observer.observe(footer);
    return () => {
      setIsLoading(false);
      observer.disconnect();
    };
  }, [isLastPage, isFiltering]);

  return {
    error,
    isLoading
  };
}
