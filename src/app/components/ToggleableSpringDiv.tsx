"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

interface ToggleableSpringDivProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  springStrength?: number; 
  springDamping?: number;
  dragElastic?: number;
  children?: React.ReactNode;
  consecutiveClicksRequired?: number;
  consecutiveClickTimeWindow?: number; // ms
}

const ToggleableSpringDiv = ({
  className = '',
  width = 150,
  height = 150,
  backgroundColor = 'rgb(99, 102, 241)', // Indigo
  activeBackgroundColor = 'rgb(34, 197, 94)', // Green
  springStrength = 600,
  springDamping = 20,
  dragElastic = 0.7,
  children,
  consecutiveClicksRequired = 5,
  consecutiveClickTimeWindow = 2000, // 2 seconds
}: ToggleableSpringDivProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [springEnabled, setSpringEnabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showClickCounter, setShowClickCounter] = useState(false);
  const lastClickTime = useRef<number>(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configuration
  const springConfig = {
    stiffness: springStrength,
    damping: springDamping,
    restDelta: 0.001
  };

  // Reset click count after time window expires
  const resetClickCount = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
      setShowClickCounter(false);
    }, consecutiveClickTimeWindow);
  };

  // Handle consecutive clicks
  const handleClick = () => {
    const now = Date.now();
    const isConsecutive = (now - lastClickTime.current) < consecutiveClickTimeWindow;
    
    if (isConsecutive || clickCount === 0) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      setShowClickCounter(true);
      
      // Check if we've reached the required number of clicks
      if (newCount >= consecutiveClicksRequired) {
        setSpringEnabled(prev => !prev); // Toggle spring effect
        setClickCount(0);
        setShowClickCounter(false);
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
      } else {
        resetClickCount();
      }
    } else {
      // Not consecutive, reset count
      setClickCount(1);
      setShowClickCounter(true);
      resetClickCount();
    }
    
    lastClickTime.current = now;
  };
  
  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={`rounded-xl flex items-center justify-center shadow-lg ${
        isDragging ? 'cursor-grabbing z-10' : 'cursor-grab'
      } relative ${className}`}
      style={{ 
        x, 
        y,
        width, 
        height, 
        backgroundColor: springEnabled ? activeBackgroundColor : backgroundColor,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      }}
      drag
      dragConstraints={springEnabled ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined}
      dragElastic={dragElastic}
      dragTransition={{ 
        bounceStiffness: springStrength, 
        bounceDamping: springDamping 
      }}
      onClick={handleClick}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        if (springEnabled) {
          // Spring back to original position
          x.set(0);
          y.set(0);
        }
      }}
      whileDrag={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {children || (
          <span className="font-semibold text-white">
            {springEnabled ? "Spring Back Enabled" : "Click 5x to Enable"}
          </span>
        )}
        
        {/* Click counter indicator */}
        <AnimatePresence>
          {showClickCounter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-3 left-0 right-0 text-center"
            >
              <span className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white">
                {clickCount}/{consecutiveClicksRequired}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Spring status indicator */}
        <motion.div
          className="absolute top-3 right-3 w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: springEnabled ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
            boxShadow: springEnabled ? "0 0 8px rgb(34, 197, 94)" : "" 
          }}
          animate={{ scale: springEnabled ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: springEnabled ? Infinity : 0, duration: 2 }}
        />
      </div>
      
      {/* Visual effect for drag */}
      {isDragging && (
        <motion.div
          className="absolute inset-0 bg-white opacity-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default ToggleableSpringDiv; 