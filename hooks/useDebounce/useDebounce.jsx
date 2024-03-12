"use client";

import { useEffect, useRef, useState } from "react";

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
