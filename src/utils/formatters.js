export const formatValue = (value, fallback = 'N/A') => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return value;
};

export const formatAltitude = (altitude) => {
  if (altitude === 'ground') return 'On Ground';
  if (typeof altitude === 'number') return `${altitude} ft`;
  return formatValue(altitude, 'Unknown');
};

export const formatSpeed = (speed) => {
  if (typeof speed === 'number') return `${speed} kts`;
  return formatValue(speed, 'Unknown');
};

export const formatHeading = (heading) => {
  if (typeof heading === 'number') return `${Math.round(heading)}°`;
  return formatValue(heading, 'Unknown');
};

export const formatTime = (date) => {
  if (!date) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);
};
