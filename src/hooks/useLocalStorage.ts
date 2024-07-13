import { useState, useEffect } from 'react';

const useLocalStorage = (initialValue?: string) => {
  const keyLocalStorage = 'cinema-name';
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyLocalStorage);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(keyLocalStorage, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
