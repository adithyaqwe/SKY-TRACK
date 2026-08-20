import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plane, MapPin } from 'lucide-react';
import { LOCATIONS } from '../../config/locations';
import './CommandPalette.css';

const CommandPalette = ({ 
  isOpen, 
  onClose, 
  query, 
  onQueryChange, 
  results, 
  onSelectResult,
  onSelectLocation,
  cityResults,
  isSearchingCity
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="command-palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="palette-input-wrapper">
              <Search size={20} className="palette-icon" />
              <input
                ref={inputRef}
                className="palette-input"
                placeholder="Search flights, callsigns, registration..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
              />
              <div className="palette-esc">ESC</div>
            </div>

            {results && results.length > 0 && (
              <div className="palette-results">
                {results.map((result) => (
                  <div 
                    key={result.hex} 
                    className="palette-item"
                    onClick={() => {
                      onSelectResult(result);
                      onClose();
                    }}
                  >
                    <div className="item-icon">
                      <Plane size={16} />
                    </div>
                    <div className="item-content">
                      <span className="item-title">{result.callsign || result.hex}</span>
                      <span className="item-subtitle">{result.type || 'Unknown'} · {result.registration || 'No Reg'}</span>
                    </div>
                    <span className="item-action">Select ↵</span>
                  </div>
                ))}
              </div>
            )}
            
            {cityResults && cityResults.length > 0 && (
              <div className="palette-results">
                <div className="hint-section">
                  <h4>CITY SEARCH RESULTS</h4>
                  {cityResults.map((city, idx) => (
                    <div 
                      key={idx} 
                      className="palette-item"
                      onClick={() => {
                        onSelectLocation({ name: city.name, lat: city.lat, lon: city.lon });
                        onClose();
                      }}
                    >
                      <div className="item-icon">
                        <MapPin size={16} />
                      </div>
                      <div className="item-content">
                        <span className="item-title">{city.name}</span>
                        <span className="item-subtitle">{city.fullName}</span>
                      </div>
                      <span className="item-action">Jump ↵</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isSearchingCity && (
              <div className="palette-empty" style={{ opacity: 0.5 }}>
                Searching global locations...
              </div>
            )}
            
            {query && (!results || results.length === 0) && (!cityResults || cityResults.length === 0) && !isSearchingCity && (
              <div className="palette-empty">
                No matching aircraft or cities found.
              </div>
            )}
            
            {!query && (
              <div className="palette-hints">
                <div className="hint-section">
                  <h4>JUMP TO LOCATION</h4>
                  {LOCATIONS.map((loc) => (
                    <div 
                      key={loc.name} 
                      className="palette-item" 
                      onClick={() => {
                        onSelectLocation(loc);
                        onClose();
                      }}
                    >
                      <MapPin size={16} className="hint-icon" /> {loc.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
