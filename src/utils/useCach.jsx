'use client'

import { useState, useEffect } from "react";

const useCache = () => {
  const [cache, setCache] = useState({});

  const getFromCache = (key) => {
    const cachedItem = cache[key];
    if (cachedItem && cachedItem.expirationTime > Date.now()) {
      // return cachedItem.value;
      return { value: cachedItem.value, timestamp: cachedItem.timestamp };
    }
    return null;
  };

  const setToCache = (key, value, expirationTimeMs = 3600000) => {
    const expirationTime = Date.now() + expirationTimeMs;
    const cachedData = { value, expirationTime, timestamp: Date.now() };
    setCache((prevCache) => ({
      ...prevCache,
      [key]: cachedData,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCache((prevCache) => {
        const updatedCache = { ...prevCache };
        for (const key in updatedCache) {
          if (updatedCache[key].expirationTime <= Date.now()) {
            delete updatedCache[key];
          }
        }
        return updatedCache;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { getFromCache, setToCache };
};

export default useCache;