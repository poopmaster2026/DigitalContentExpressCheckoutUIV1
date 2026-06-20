import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  const delayRef = useRef(delay);
  // eslint-disable-next-line react-hooks/refs
  delayRef.current = delay;

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayRef.current);
    return () => clearTimeout(timer);
  }, [value]);

  return debounced;
}
