import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';
import './MetricCard.css';

const MetricCard = ({ label, value, unit, trend, trendValue, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <GlassPanel className="metric-card" hoverEffect>
        <div className="metric-header">
          <span className="metric-label">{label}</span>
          {Icon && <Icon size={14} className="metric-icon" />}
        </div>
        <div className="metric-body">
          <span className="metric-value">
            {value}
            {unit && <span className="metric-unit">{unit}</span>}
          </span>
          {trend && (
            <span className={`metric-trend trend-${trend}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default MetricCard;
