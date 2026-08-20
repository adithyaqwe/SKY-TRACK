# ✈️ SkyTrack — Real-Time Flight Tracker

SkyTrack is a modern, real-time flight tracking application built with React and Vite. It visualizes live aircraft data on an interactive map using the public adsb.lol API.

## Features

- **Live Flight Map:** Interactive world map using Leaflet with dark-mode optimized tiles.
- **Real-Time Data:** Fetch and display live aircraft telemetry (altitude, speed, heading, etc.).
- **Dynamic Markers:** Aircraft icons rotate based on their true heading.
- **Flight Details Panel:** Comprehensive data presentation for selected aircraft.
- **Location Selector:** Quickly jump between major global aviation hubs (Ahmedabad, London, New York, etc.).
- **Search:** Search loaded aircraft by callsign, registration, or hex ID.
- **Auto-Refresh:** Automatically updates flight positions every 30 seconds.
- **Modern UI:** Premium dark-mode interface with glassmorphism effects.

## Tech Stack

- **Framework:** React 18, Vite
- **Mapping:** Leaflet, React-Leaflet
- **Data Fetching:** Axios
- **Icons:** Lucide React
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd skytrack/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API

This project utilizes [ADSB.lol](https://adsb.lol/) for live aircraft data.
Please use the service responsibly. The app is configured to fetch data within a 100 NM radius of the selected location to avoid overloading the API.

## Screenshots

*(Screenshots will be added here)*

## Future Improvements

- Historical flight path visualization
- Airport information and weather overlays
- Favorite aircraft and customizable filters
- 3D view of the aircraft trajectory
