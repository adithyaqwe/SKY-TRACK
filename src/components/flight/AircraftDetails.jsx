import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Activity, Compass, Navigation, MapPin } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import AnimatedButton from '../ui/AnimatedButton';
import './AircraftDetails.css';

const DetailRow = ({ label, value }) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value || 'N/A'}</span>
  </div>
);

// Mock routing data generator based on callsign
const getMockRoute = (callsign) => {
  if (!callsign) return { origin: 'N/A', destination: 'N/A', progress: 0 };
  
  const airports = ['LHR (London)', 'JFK (New York)', 'DXB (Dubai)', 'CDG (Paris)', 'FRA (Frankfurt)', 'HND (Tokyo)', 'AMS (Amsterdam)', 'SIN (Singapore)', 'DEL (Delhi)', 'BOM (Mumbai)', 'LAX (Los Angeles)', 'SYD (Sydney)'];
  
  let seed = 0;
  for (let i = 0; i < callsign.length; i++) {
    seed += callsign.charCodeAt(i);
  }
  
  const originIdx = seed % airports.length;
  const destIdx = (seed + 5) % airports.length;
  const progress = (seed % 100);
  
  return {
    origin: airports[originIdx],
    destination: airports[destIdx],
    progress: progress
  };
};

const AircraftDetails = ({ aircraft, onClose }) => {
  if (!aircraft) return null;

  const route = getMockRoute(aircraft.callsign);

  return (
    <AnimatePresence>
      <motion.div
        className="aircraft-details-container"
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <GlassPanel className="aircraft-details-panel">
          <div className="details-header">
            <div className="header-info">
              <h2>{aircraft.callsign || aircraft.hex}</h2>
              <span className="flight-type">COMMERCIAL FLIGHT</span>
            </div>
            <AnimatedButton variant="ghost" className="btn-icon" onClick={onClose}>
              <X size={20} />
            </AnimatedButton>
          </div>

          <div className="aircraft-viz">
            <Plane size={48} className="viz-icon" />
            <span className="viz-type">{aircraft.type || 'Unknown Aircraft'}</span>
          </div>

          <div className="details-section">
            <h3><MapPin size={14}/> FLIGHT ROUTE (ESTIMATED)</h3>
            <div className="route-viz" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
                <span>{route.origin}</span>
                <Plane size={14} style={{ color: 'var(--color-skytrack)', transform: 'rotate(90deg)' }} />
                <span>{route.destination}</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${route.progress}%`, height: '100%', background: 'var(--color-skytrack)', borderRadius: '2px', transition: 'width 1s ease' }}></div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3><Navigation size={14}/> FLIGHT DATA</h3>
            <div className="details-grid">
              <DetailRow label="CALLSIGN" value={aircraft.callsign} />
              <DetailRow label="REGISTRATION" value={aircraft.registration} />
              <DetailRow label="AIRCRAFT" value={aircraft.type} />
              <DetailRow label="ICAO24" value={aircraft.hex} />
            </div>
          </div>

          <div className="details-section">
            <h3><Activity size={14}/> FLIGHT STATUS</h3>
            <div className="details-grid">
              <DetailRow label="ALTITUDE" value={aircraft.altitude === 'ground' ? 'Ground' : `${aircraft.altitude || 0} ft`} />
              <DetailRow label="GROUND SPEED" value={`${aircraft.speed || 0} kts`} />
              <DetailRow label="HEADING" value={`${aircraft.track || 0}°`} />
              <DetailRow label="VERTICAL SPEED" value={`${aircraft.verticalSpeed || 0} ft/min`} />
              <DetailRow label="SQUAWK" value={aircraft.squawk} />
            </div>
          </div>

          <div className="details-section">
            <h3><Compass size={14}/> POSITION</h3>
            <div className="details-grid">
              <DetailRow label="LATITUDE" value={aircraft.lat?.toFixed(4)} />
              <DetailRow label="LONGITUDE" value={aircraft.lon?.toFixed(4)} />
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </AnimatePresence>
  );
};

export default AircraftDetails;
