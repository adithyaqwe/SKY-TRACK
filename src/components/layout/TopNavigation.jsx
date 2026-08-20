import React from 'react';
import { Search, Settings, RotateCw, Plane } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import StatusIndicator from '../ui/StatusIndicator';
import AnimatedButton from '../ui/AnimatedButton';
import './TopNavigation.css';

const TopNavigation = ({ 
  isRefreshing, 
  onRefresh, 
  onSearchClick,
  locationName 
}) => {
  return (
    <nav className="top-nav-container">
      <GlassPanel className="top-nav-panel">
        <div className="nav-left">
          <div className="brand-logo">
            <Plane size={24} className="brand-icon" />
            <div className="brand-text">
              <h1>SKYTRACK</h1>
              <span>Aviation Intelligence</span>
            </div>
          </div>
        </div>

        <div className="nav-center">
          <button className="search-trigger" onClick={onSearchClick}>
            <Search size={16} className="search-icon" />
            <span className="search-placeholder">Search flights, callsigns, registration...</span>
            <div className="shortcut-hint">
              <span className="key">⌘</span><span className="key">K</span>
            </div>
          </button>
        </div>

        <div className="nav-right">
          <StatusIndicator status={isRefreshing ? 'syncing' : 'live'} />
          
          <div className="nav-actions">
            <AnimatedButton 
              variant="ghost" 
              className="btn-icon"
              onClick={onRefresh}
            >
              <RotateCw size={18} className={isRefreshing ? 'spinning' : ''} />
            </AnimatedButton>
            <AnimatedButton variant="ghost" className="btn-icon">
              <Settings size={18} />
            </AnimatedButton>
          </div>
        </div>
      </GlassPanel>
    </nav>
  );
};

export default TopNavigation;
