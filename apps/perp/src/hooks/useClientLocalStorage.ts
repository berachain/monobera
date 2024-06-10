import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const useClientLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T),
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const initialize = (key: string): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      if (item && item !== "undefined") {
        return JSON.parse(item);
      }
      const value =
        initialValue instanceof Function ? initialValue() : initialValue;
      window.localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  };

  const [state, setState] = useState<T | undefined>(() => initialize(key));

  useEffect(() => {
    setState(initialize(key));
  }, [key]);

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (value: SetStateAction<T | undefined>) => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        setState(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, state],
  );

  return [state, setValue];
};
