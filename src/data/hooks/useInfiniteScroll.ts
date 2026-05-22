import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectProductState} from '../../redux/product/product.selector';

export const useInfiniteScroll = (elementRef: string, resolve: () => void) => {
  const [error, setError] = useState('');
  const {isLastPage, isFiltering} = useSelector(selectProductState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const footer = document.getElementById(elementRef);
    if (!footer) {
      setError('Element not found.');
      return;
    }
    const obsCallback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver){
      const [entry] = entries;
      if (entry.intersectionRatio === 0) {
        setLoading(false);
      }
      if (isLastPage) {
        setLoading(false);
        observer.unobserve(footer);
      }
      if (entry.isIntersecting && !isFiltering) {
        setLoading(true);
        resolve();
      }
    }
    const obsOptions = {
      root: null,
      threshold: 1,
      delay: 100
    };
    const observer = new IntersectionObserver(obsCallback, obsOptions);
    observer.observe(footer);
    return () => {
      setLoading(false);
      observer.disconnect();
    };
  }, [isLastPage, isFiltering]);

  return {
    error,
    loading
  };
}
