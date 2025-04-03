"use client"
import { useState } from 'react';
import ClickableDraggable from './components/ClickableDraggable';
import { SpringProvider } from './context/SpringContext';
import ToggleSwitch from './components/ToggleSwitch';

export default function Home() {
  const [forceEnabled, setForceEnabled] = useState(false);
  
  const handleToggle = (enabled: boolean) => {
    setForceEnabled(enabled);
  };

  return (
    <SpringProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-12 md:p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-2xl font-bold text-center mb-6">
            Spring-Back Draggable Elements
          </h1>

          <div className="mb-8 text-center">
            <div className="bg-gray-800 shadow-lg rounded-xl p-4 mb-6 mx-auto max-w-xl">
              <h2 className="font-semibold mb-2">Instructions:</h2>
              <ul className="text-xs sm:text-sm space-y-2 text-left list-disc pl-5">
                <li>Click a box 5 times to enable dragging</li>
                <li>Once enabled, you can drag it anywhere</li>
                <li>When you release, it springs back to its original position</li>
                <li>After dragging, the 5-click counter resets to 0 - you'll need to click 5 times again to drag</li>
                <li>Use the toggle below to enable drag for all boxes without clicking</li>
              </ul>
            </div>

            <div className="flex justify-center mb-4">
              <ToggleSwitch 
                className="toggle-control"
                onToggle={handleToggle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ClickableDraggable 
              id="box1" 
              backgroundColor="rgb(59, 130, 246)" // Blue
              forceEnabled={forceEnabled}
            >
              <span className="text-lg font-semibold text-white">Box 1</span>
            </ClickableDraggable>
            
            <ClickableDraggable 
              id="box2" 
              backgroundColor="rgb(139, 92, 246)" // Purple
              springStrength={400}
              springDamping={15}
              forceEnabled={forceEnabled}
            >
              <span className="text-lg font-semibold text-white">Box 2</span>
              <span className="text-xs text-white/70">Softer Spring</span>
            </ClickableDraggable>
            
            <ClickableDraggable 
              id="box3" 
              backgroundColor="rgb(236, 72, 153)" // Pink
              springStrength={1000}
              springDamping={30}
              forceEnabled={forceEnabled}
            >
              <span className="text-lg font-semibold text-white">Box 3</span>
              <span className="text-xs text-white/70">Stronger Spring</span>
            </ClickableDraggable>
          </div>
        </div>
      </main>
    </SpringProvider>
  );
}
