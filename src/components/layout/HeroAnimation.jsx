import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';
import './HeroAnimation.css';

const HeroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2000); // 2 second display
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="hero-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="hero-content">
            <motion.div 
              className="hero-path"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            <motion.div
              className="hero-plane"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 100, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Plane size={32} />
            </motion.div>

            <motion.div
              className="hero-brand"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1>SKYTRACK</h1>
              <p>LIVE AVIATION INTELLIGENCE</p>
              
              <div className="hero-radar-ring ring-1" />
              <div className="hero-radar-ring ring-2" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroAnimation;
