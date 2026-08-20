import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css';

const AnimatedButton = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  return (
    <motion.button
      className={`animated-btn btn-${variant} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
