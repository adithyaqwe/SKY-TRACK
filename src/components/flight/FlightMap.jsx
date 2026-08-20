import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import AircraftMarker from './AircraftMarker';
import './FlightMap.css';

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

const FlightMap = ({ location, flights, selectedAircraft, onSelectAircraft }) => {
  const mapRef = useRef(null);

  return (
    <div className="map-container">
      <div className="map-vignette" />
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={location.zoom || 8}
        zoomControl={false}
        className="flight-map"
        ref={mapRef}
      >
        {/* Esri World Imagery Satellite Tiles */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
        
        <MapUpdater center={[location.lat, location.lon]} zoom={location.zoom || 8} />

        {flights.map((flight) => (
          <AircraftMarker
            key={flight.hex}
            aircraft={flight}
            isSelected={selectedAircraft?.hex === flight.hex}
            onClick={() => onSelectAircraft(flight)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default FlightMap;
