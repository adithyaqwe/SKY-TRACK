import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import MetricCard from '../ui/MetricCard';
import { Plane, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import './LeftPanel.css';

const LeftPanel = ({ totalFlights, altitudeStats, speedStats }) => {
  return (
    <div className="left-panel-container">
      <GlassPanel className="left-panel">
        <div className="panel-header">
          <h2>LIVE INTELLIGENCE</h2>
          <p>Real-Time Airspace Activity</p>
        </div>

        <div className="metrics-grid">
          <MetricCard 
            label="Active Aircraft"
            value={totalFlights || 0}
            icon={Plane}
            delay={0.1}
          />
          
          <MetricCard 
            label="High Altitude"
            value={altitudeStats?.high || 0}
            trend="up"
            trendValue="> 30k ft"
            icon={ArrowUpRight}
            delay={0.2}
          />

          <MetricCard 
            label="Avg Speed"
            value={speedStats?.avg || 0}
            unit="kts"
            icon={Activity}
            delay={0.3}
          />
        </div>
      </GlassPanel>
    </div>
  );
};

export default LeftPanel;
