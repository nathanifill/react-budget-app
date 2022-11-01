import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    // returns parsed value if it is not null in local storage
    if (jsonValue !== null) return JSON.parse(jsonValue);

    // if no value for key, return default value
    if (typeof defaultValue === "function") {
      return defaultValue(); // returns as function if default value is a function
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
