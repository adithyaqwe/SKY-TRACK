import React from 'react';
import './StatusIndicator.css';

const StatusIndicator = ({ status = 'live', label = 'LIVE' }) => {
  // status can be 'live', 'syncing', 'offline'
  return (
    <div className="status-indicator">
      <div className={`live-indicator-dot ${status}`} />
      <span className="status-label">{label}</span>
    </div>
  );
};

export default StatusIndicator;
