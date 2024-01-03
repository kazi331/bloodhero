// "use client";

import { useEffect, useState } from "react";

type positionType = {
  lat: Number;
  lon: Number;
} | null;
type errorType = {
  code: Number;
  message: Number;
} | null;

const useGetLocation = () => {
  const [position, setPosition] = useState<positionType>(null);
  const [error, setError] = useState<errorType>(null);

  function success(pos: { coords: { latitude: Number; longitude: Number } }) {
    setPosition({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  }

  function failed(err: any) {
    setError({
      code: err.code,
      message: err.message,
    });
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, failed, {});
  }, []);

  return { position, error };
};

export default useGetLocation;
