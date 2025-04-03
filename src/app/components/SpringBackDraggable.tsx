"use client"
import { useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface SpringBackDraggableProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  springStrength?: number; // Higher = stronger pull
  springDamping?: number; // Higher = less oscillation
  dragElastic?: number; // 0-1 range for elasticity during drag
  children?: React.ReactNode;
}

const SpringBackDraggable = ({
  className = '',
  width = 150,
  height = 150,
  backgroundColor = 'rgb(16, 185, 129)', // Green
  springStrength = 500,
  springDamping = 30,
  dragElastic = 0.5,
  children,
}: SpringBackDraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Create motion values that track the current position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Configure spring animation properties
  const springConfig = {
    stiffness: springStrength,
    damping: springDamping,
    restDelta: 0.001 // Makes the spring more precise
  };
  
  return (
    <motion.div
      className={`rounded-xl flex items-center justify-center shadow-lg ${
        isDragging ? 'cursor-grabbing z-10' : 'cursor-grab'
      } ${className}`}
      style={{ 
        x, 
        y,
        width, 
        height, 
        backgroundColor,
        position: 'relative',
        overflow: 'hidden',
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={dragElastic}
      dragTransition={{ 
        bounceStiffness: springStrength, 
        bounceDamping: springDamping 
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        // Spring back to original position
        x.set(0);
        y.set(0);
      }}
      whileDrag={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children || (
        <span className="font-semibold text-white">Spring Back</span>
      )}
      
      {/* Visual effect that shows during drag */}
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

export default SpringBackDraggable; 