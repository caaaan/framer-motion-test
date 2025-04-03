"use client"
import { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface DraggableDivProps {
  className?: string;
  dragElastic?: number;
  dragMomentum?: boolean;
  springBack?: boolean;
}

const DraggableDiv = ({
  className = '',
  dragElastic = 0.5,
  dragMomentum = true,
  springBack = true,
}: DraggableDivProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Create spring animations for x and y
  const springConfig = { damping: 20, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  
  return (
    <motion.div
      className={`w-40 h-40 bg-blue-500 rounded-lg cursor-grab flex items-center justify-center text-white font-bold shadow-lg ${isDragging ? 'cursor-grabbing' : ''} ${className}`}
      drag
      dragElastic={dragElastic}
      dragMomentum={dragMomentum}
      dragConstraints={springBack ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        if (springBack) {
          x.set(0);
          y.set(0);
        }
      }}
      style={{ x, y }}
      whileDrag={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onDrag={(_, info) => {
        x.set(info.offset.x);
        y.set(info.offset.y);
      }}
    >
      Drag Me
    </motion.div>
  );
};

export default DraggableDiv; 