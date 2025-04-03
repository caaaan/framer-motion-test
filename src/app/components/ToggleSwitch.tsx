"use client"
import { motion } from 'framer-motion';
import { useSpringContext } from '../context/SpringContext';
import { useState } from 'react';

interface ToggleSwitchProps {
  className?: string;
  onToggle?: (enabled: boolean) => void;
}

const ToggleSwitch = ({ className = '', onToggle }: ToggleSwitchProps) => {
  const { resetAllClicks } = useSpringContext();
  const [allEnabled, setAllEnabled] = useState(false);

  const handleToggle = () => {
    // Toggle the state
    const newState = !allEnabled;
    setAllEnabled(newState);
    
    // Call the onToggle callback if provided
    if (onToggle) {
      onToggle(newState);
    }
    
    // Reset all click counters when toggling off
    if (allEnabled) {
      resetAllClicks();
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium">
        Force Draggable: {allEnabled ? 'ON' : 'OFF'}
      </span>
      
      <motion.button
        onClick={handleToggle}
        className="relative h-7 w-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center p-1 cursor-pointer"
        animate={{ backgroundColor: allEnabled ? 'rgb(34, 197, 94)' : 'rgb(229, 231, 235)' }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-5 h-5 rounded-full bg-white shadow-md"
          animate={{ x: allEnabled ? 26 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
      
      <span className="text-xs text-gray-500">
        {allEnabled 
          ? "Hold any box to drag (no 5-click needed)" 
          : "Click boxes 5x to enable dragging"}
      </span>
    </div>
  );
};

export default ToggleSwitch; 