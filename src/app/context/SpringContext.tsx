"use client"
import { createContext, useState, useContext, ReactNode } from 'react';

interface SpringContextProps {
  clickedComponents: Record<string, number>;
  incrementClickCount: (id: string) => void;
  resetComponentClicks: (id: string) => void;
  resetAllClicks: () => void;
  isEnabled: (id: string) => boolean;
}

const SpringContext = createContext<SpringContextProps | undefined>(undefined);

export const SpringProvider = ({ children }: { children: ReactNode }) => {
  // Track clicks per component
  const [clickedComponents, setClickedComponents] = useState<Record<string, number>>({});
  
  // Increment click count for a specific component
  const incrementClickCount = (id: string) => {
    setClickedComponents(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };
  
  // Reset clicks for a specific component
  const resetComponentClicks = (id: string) => {
    setClickedComponents(prev => ({
      ...prev,
      [id]: 0
    }));
  };
  
  // Reset all click counts
  const resetAllClicks = () => {
    setClickedComponents({});
  };
  
  // Check if a component is enabled (has 5+ clicks)
  const isEnabled = (id: string) => {
    return (clickedComponents[id] || 0) >= 5;
  };

  return (
    <SpringContext.Provider 
      value={{ 
        clickedComponents,
        incrementClickCount,
        resetComponentClicks,
        resetAllClicks,
        isEnabled
      }}
    >
      {children}
    </SpringContext.Provider>
  );
};

export const useSpringContext = () => {
  const context = useContext(SpringContext);
  if (context === undefined) {
    throw new Error('useSpringContext must be used within a SpringProvider');
  }
  return context;
}; 