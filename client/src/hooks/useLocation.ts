import { Coordinates } from '@/types/coordinates';
import { useState, useEffect } from 'react';

export default function useLocation() {
  const [location, setLocation] = useState<Coordinates>();
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setLocation({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { location, error };
}
