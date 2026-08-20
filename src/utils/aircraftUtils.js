export const parseAircraftData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data
    .filter(ac => ac.lat !== undefined && ac.lon !== undefined && ac.lat !== null && ac.lon !== null) // MUST have coordinates
    .map(ac => ({
      hex: ac.hex,
      callsign: ac.flight ? ac.flight.trim() : null,
      registration: ac.r,
      type: ac.t,
      lat: ac.lat,
      lon: ac.lon,
      altitude: ac.alt_baro === 'ground' ? 'ground' : ac.alt_baro,
      speed: ac.gs,
      track: ac.track, // heading
      verticalSpeed: ac.baro_rate,
      squawk: ac.squawk,
      category: ac.category,
      seen: ac.seen
    }));
};

export const deduplicateAircraft = (aircraftList) => {
  const seen = new Set();
  return aircraftList.filter(ac => {
    if (seen.has(ac.hex)) return false;
    seen.add(ac.hex);
    return true;
  });
};
