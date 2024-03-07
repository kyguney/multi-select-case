import { useEffect, useRef } from 'react';

type Callback = (...args: unknown[]) => void;

/**
 * Custom hook that creates a debounced version of a callback function.
 *
 * @param callback - The callback function to be debounced.
 * @param delay - The delay in milliseconds before invoking the callback.
 * @returns - The debounced callback function.
 */
const useDebounce = (callback: Callback, delay: number) => {

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: Parameters<Callback>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
