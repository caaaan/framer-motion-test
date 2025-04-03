"use client"
import { useState } from 'react';
import { motion, useSpring, MotionValue } from 'framer-motion';

interface PullPhysicsDraggableProps {
  initialPosition?: { x: number; y: number };
  className?: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  springStrength?: number; // Higher = stronger pull
  springDamping?: number; // Higher = less oscillation
  dragElastic?: number; // 0-1 range for elasticity during drag
  children?: React.ReactNode;
  springBack?: boolean; // New prop to control spring back behavior
}

const PullPhysicsDraggable = ({
  initialPosition = { x: 0, y: 0 },
  className = '',
  width = 150,
  height = 150,
  backgroundColor = 'rgb(59, 130, 246)',
  springStrength = 300,
  springDamping = 25,
  dragElastic = 0.8,
  children,
  springBack = true, // Default to spring back behavior
}: PullPhysicsDraggableProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  // Spring configuration for realistic physics
  const springConfig = { 
    stiffness: springStrength, 
    damping: springDamping 
  };

  // Create springy motion values
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

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
      dragElastic={dragElastic}
      dragConstraints={springBack ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined}
      dragTransition={{ bounceStiffness: springStrength, bounceDamping: springDamping }}
      whileDrag={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        if (springBack) {
          // Spring back to initial position
          setPosition(initialPosition);
          x.set(initialPosition.x);
          y.set(initialPosition.y);
        } else {
          // Stay where it was dropped
          setPosition({ 
            x: position.x + info.offset.x, 
            y: position.y + info.offset.y 
          });
        }
      }}
      onDrag={(e, info) => {
        x.set(position.x + info.offset.x);
        y.set(position.y + info.offset.y);
      }}
    >
      {children || (
        <span className="font-semibold text-white">Drag Me</span>
      )}
      
      {/* Optional visual elements that respond to drag */}
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

export default PullPhysicsDraggable; 