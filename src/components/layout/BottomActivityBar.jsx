import React from 'react';
import './BottomActivityBar.css';

const BottomActivityBar = ({ lastUpdated, stats }) => {
  return (
    <div className="bottom-bar-container">
      <div className="bottom-bar">
        <span className="bar-label">LIVE AIRSPACE ACTIVITY</span>
        <div className="bar-stats">
          <span>{stats?.total || 0} Aircraft Detected</span>
          <span className="stat-divider">•</span>
          <span className="stat-up">↑ {stats?.climbing || 0} Climbing</span>
          <span className="stat-divider">•</span>
          <span className="stat-down">↓ {stats?.descending || 0} Descending</span>
          <span className="stat-divider">•</span>
          <span className="stat-neutral">→ {stats?.cruising || 0} Cruising</span>
        </div>
        <span className="bar-time">
          Updated {lastUpdated ? lastUpdated.toLocaleTimeString() : '...'}
        </span>
      </div>
    </div>
  );
};

export default BottomActivityBar;
