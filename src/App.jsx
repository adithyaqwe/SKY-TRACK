import { useState, useEffect, useCallback, useMemo } from 'react';
import HeroAnimation from './components/layout/HeroAnimation';
import TopNavigation from './components/layout/TopNavigation';
import LeftPanel from './components/layout/LeftPanel';
import BottomActivityBar from './components/layout/BottomActivityBar';
import FlightMap from './components/flight/FlightMap';
import AircraftDetails from './components/flight/AircraftDetails';
import CommandPalette from './components/ui/CommandPalette';
import CustomCursor from './components/ui/CustomCursor';
import { useFlights } from './hooks/useFlights';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import { DEFAULT_LOCATION } from './config/locations';

function App() {
  const [showHero, setShowHero] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  
  const { flights, loading, error, lastUpdated, getFlights } = useFlights();

  // Initial fetch and fetch on location change
  useEffect(() => {
    getFlights(selectedLocation.lat, selectedLocation.lon);
    setSelectedAircraft(null);
  }, [selectedLocation, getFlights]);

  // Setup auto-refresh
  const handleAutoRefresh = useCallback(() => {
    if (!error) {
      getFlights(selectedLocation.lat, selectedLocation.lon, true);
    }
  }, [selectedLocation, error, getFlights]);

  useAutoRefresh(handleAutoRefresh, !error);

  const handleManualRefresh = () => {
    getFlights(selectedLocation.lat, selectedLocation.lon);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // City Search Debounce
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setCitySearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingCity(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=3`);
        const data = await response.json();
        setCitySearchResults(
          data.map(item => ({
            name: item.display_name.split(',')[0],
            fullName: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon)
          }))
        );
      } catch (err) {
        console.error("City search failed:", err);
      } finally {
        setIsSearchingCity(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Compute stats
  const stats = useMemo(() => {
    if (!flights.length) return null;
    
    let climbing = 0;
    let descending = 0;
    let cruising = 0;
    let highAltitude = 0;
    let totalSpeed = 0;

    flights.forEach(f => {
      if (f.verticalSpeed > 200) climbing++;
      else if (f.verticalSpeed < -200) descending++;
      else cruising++;

      if (f.altitude !== 'ground' && f.altitude > 30000) highAltitude++;
      totalSpeed += (f.speed || 0);
    });

    return {
      total: flights.length,
      climbing,
      descending,
      cruising,
      altitudeStats: { high: highAltitude },
      speedStats: { avg: flights.length ? Math.round(totalSpeed / flights.length) : 0 }
    };
  }, [flights]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery) return null;
    const lowerQuery = searchQuery.toLowerCase();
    return flights.filter(ac => 
      (ac.callsign && ac.callsign.toLowerCase().includes(lowerQuery)) ||
      (ac.registration && ac.registration.toLowerCase().includes(lowerQuery)) ||
      (ac.hex && ac.hex.toLowerCase().includes(lowerQuery)) ||
      (ac.type && ac.type.toLowerCase().includes(lowerQuery))
    ).slice(0, 10);
  }, [searchQuery, flights]);

  return (
    <>
      <CustomCursor />
      {showHero && <HeroAnimation onComplete={() => setShowHero(false)} />}
      
      {!showHero && (
        <>
          <TopNavigation 
            isRefreshing={loading}
            onRefresh={handleManualRefresh}
            onSearchClick={() => setIsCommandPaletteOpen(true)}
            locationName={selectedLocation.name}
          />

          <LeftPanel 
            totalFlights={stats?.total}
            altitudeStats={stats?.altitudeStats}
            speedStats={stats?.speedStats}
          />

          <FlightMap 
            location={selectedLocation} 
            flights={flights}
            selectedAircraft={selectedAircraft}
            onSelectAircraft={setSelectedAircraft}
          />

          <AircraftDetails 
            aircraft={selectedAircraft}
            onClose={() => setSelectedAircraft(null)}
          />

          <BottomActivityBar 
            lastUpdated={lastUpdated}
            stats={stats}
          />

          <CommandPalette 
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            query={searchQuery}
            onQueryChange={setSearchQuery}
            results={searchResults}
            onSelectResult={setSelectedAircraft}
            onSelectLocation={setSelectedLocation}
            cityResults={citySearchResults}
            isSearchingCity={isSearchingCity}
          />

          {error && (
            <div style={{ position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, background: 'var(--color-error)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem' }}>
              Error: {error}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
