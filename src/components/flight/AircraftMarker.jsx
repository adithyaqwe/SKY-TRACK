import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

const getAircraftIcon = (heading, isSelected) => {
  const rotation = heading || 0;

  // Create a custom SVG icon
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" 
         style="transform: rotate(${rotation}deg); filter: ${isSelected ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' : 'none'};">
      <path fill="#000000" 
            stroke="#FFFFFF" stroke-width="${isSelected ? '2' : '1'}"
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
    ${isSelected ? `
      <div class="radar-ring ring-1"></div>
      <div class="radar-ring ring-2 radar-ring-delay"></div>
    ` : ''}
  `;

  return L.divIcon({
    className: `custom-aircraft-marker ${isSelected ? 'selected' : ''}`,
    html: svgTemplate,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const AircraftMarker = ({ aircraft, isSelected, onClick }) => {
  if (!aircraft.lat || !aircraft.lon) return null;

  return (
    <Marker
      position={[aircraft.lat, aircraft.lon]}
      icon={getAircraftIcon(aircraft.track, isSelected)}
      eventHandlers={{
        click: onClick,
      }}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      {!isSelected && (
        <Tooltip direction="top" offset={[0, -10]} opacity={1} className="premium-tooltip">
          {aircraft.callsign || aircraft.hex}
        </Tooltip>
      )}
    </Marker>
  );
};

export default React.memo(AircraftMarker, (prev, next) => {
  return (
    prev.aircraft.lat === next.aircraft.lat &&
    prev.aircraft.lon === next.aircraft.lon &&
    prev.aircraft.track === next.aircraft.track &&
    prev.isSelected === next.isSelected
  );
});
