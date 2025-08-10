// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

/**
 * @description A custom hook for managing state in localStorage.
 * It synchronizes state between the component and localStorage.
 * @param key - The key to use for storing the value in localStorage.
 * @param initialValue - The initial value to use if nothing is in localStorage.
 * @returns A stateful value and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(storedValue);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
