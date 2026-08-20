import { useEffect, useRef } from 'react';
import { REFRESH_INTERVAL_MS } from '../utils/constants';

export const useAutoRefresh = (callback, isEnabled = true) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isEnabled) return;

    const intervalId = setInterval(() => {
      savedCallback.current();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isEnabled]);
};
