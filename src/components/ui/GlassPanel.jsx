import React from 'react';
import './GlassPanel.css';

const GlassPanel = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div 
      className={`glass-panel ${hoverEffect ? 'hover-effect' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
