import { useState, useCallback } from 'react';
import { fetchFlights } from '../api/flightsApi';
import { parseAircraftData, deduplicateAircraft } from '../utils/aircraftUtils';

export const useFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const getFlights = useCallback(async (lat, lon, isBackgroundRefresh = false) => {
    if (!isBackgroundRefresh) {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchFlights(lat, lon);
      if (data && data.ac) {
        const parsed = parseAircraftData(data.ac);
        const unique = deduplicateAircraft(parsed);
        setFlights(unique);
        setLastUpdated(new Date());
      } else {
        setFlights([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { flights, loading, error, lastUpdated, getFlights };
};
