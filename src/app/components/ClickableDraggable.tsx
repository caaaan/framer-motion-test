"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useSpringContext } from '../context/SpringContext';

interface ClickableDraggableProps {
  id: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  springStrength?: number;
  springDamping?: number;
  dragElastic?: number;
  children?: React.ReactNode;
  consecutiveClickTimeWindow?: number; // ms
  forceEnabled?: boolean; // New prop to support the global toggle
}

const ClickableDraggable = ({
  id,
  className = '',
  width = 150,
  height = 150,
  backgroundColor = 'rgb(99, 102, 241)', // Indigo
  springStrength = 600,
  springDamping = 20,
  dragElastic = 0.7,
  children,
  consecutiveClickTimeWindow = 2000, // 2 seconds
  forceEnabled = false, // Default is disabled
}: ClickableDraggableProps) => {
  const { 
    clickedComponents,
    incrementClickCount, 
    resetComponentClicks,
    isEnabled
  } = useSpringContext();
  
  const [isDragging, setIsDragging] = useState(false);
  const [showClickEffect, setShowClickEffect] = useState(false);
  const lastClickTime = useRef<number>(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get current click count for this component
  const clickCount = clickedComponents[id] || 0;
  // Component is draggable if it has 5+ clicks OR if forceEnabled is true
  const isDraggableEnabled = isEnabled(id) || forceEnabled;
  
  // Spring configuration
  const springConfig = {
    stiffness: springStrength,
    damping: springDamping,
    restDelta: 0.001
  };

  // Create spring animations that will always return to 0
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  // Reset click count after time window expires
  const resetClickCountAfterDelay = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      resetComponentClicks(id);
    }, consecutiveClickTimeWindow);
  };

  // Handle clicks
  const handleClick = () => {
    // Skip if force enabled
    if (forceEnabled) return;
    
    // Allow clicking even if already enabled
    const now = Date.now();
    const isConsecutive = (now - lastClickTime.current) < consecutiveClickTimeWindow;
    
    if (isConsecutive || clickCount === 0) {
      incrementClickCount(id);
      setShowClickEffect(true);
      setTimeout(() => setShowClickEffect(false), 300);
      resetClickCountAfterDelay();
    } else {
      // Not consecutive, reset count
      resetComponentClicks(id);
      incrementClickCount(id);
      resetClickCountAfterDelay();
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
        isDragging ? 'cursor-grabbing z-10' : isDraggableEnabled ? 'cursor-grab' : 'cursor-pointer'
      } relative ${className}`}
      style={{ 
        x: springX,
        y: springY,
        width, 
        height, 
        backgroundColor,
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={handleClick}
      
      // Enable drag directly when enabled (no press/hold requirement)
      drag={isDraggableEnabled}
      // Always use spring contraints
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={dragElastic}
      dragTransition={{ 
        bounceStiffness: springStrength, 
        bounceDamping: springDamping 
      }}
      
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDrag={(_, info) => {
        // Update springs during drag for smooth motion
        springX.set(info.offset.x);
        springY.set(info.offset.y);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        
        // Spring back to center
        springX.set(0);
        springY.set(0);
        
        // Reset clicks on drag end to require 5 clicks again
        if (!forceEnabled) {
          resetComponentClicks(id);
        }
      }}
      
      animate={{
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        {children}
        
        {/* Draggable state indicator */}
        <motion.div
          className={`absolute top-2 right-2 w-2 h-2 rounded-full ${isDraggableEnabled ? 'bg-green-500' : 'bg-red-500'}`}
          animate={{ 
            scale: isDraggableEnabled ? [1, 1.5, 1] : 1,
            opacity: 1
          }}
          transition={{ 
            repeat: isDraggableEnabled ? Infinity : 0, 
            duration: 2 
          }}
        />
      </div>
      
      {/* Click counter */}
      {!forceEnabled && clickCount > 0 && clickCount < 5 && (
        <motion.div
          className="absolute bottom-2 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {clickCount}/5
          </span>
        </motion.div>
      )}
      
      {/* Click effect */}
      <AnimatePresence>
        {showClickEffect && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.7 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white rounded-xl"
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>
      
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

export default ClickableDraggable; 