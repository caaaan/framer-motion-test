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

          <div className="flex flex-wrap justify-center gap-6">
            <div className="draggable-element flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold">Basic Springy</h2>
              <div className="rounded-lg p-6 h-48 w-48 flex items-center justify-center relative">
                <ClickableDraggable 
                  id="basic" 
                  backgroundColor="rgb(59, 130, 246)" 
                  springStrength={300}
                  springDamping={25}
                  forceEnabled={forceEnabled}
                >
                  <span className="font-semibold text-white">
                    {forceEnabled ? "Drag Me" : "Click 5x to Enable"}
                  </span>
                </ClickableDraggable>
              </div>
            </div>
            
            <div className="draggable-element flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold">Bouncy Spring</h2>
              <div className="rounded-lg p-6 h-48 w-48 flex items-center justify-center relative">
                <ClickableDraggable 
                  id="bouncy" 
                  backgroundColor="rgb(124, 58, 237)" 
                  springStrength={400}
                  springDamping={15}
                  dragElastic={0.9}
                  forceEnabled={forceEnabled}
                >
                  <span className="font-semibold text-white">
                    {forceEnabled ? "Try Me!" : "Click 5x to Enable"}
                  </span>
                </ClickableDraggable>
              </div>
            </div>
            
            <div className="draggable-element flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold">Strong Spring</h2>
              <div className="rounded-lg p-6 h-48 w-48 flex items-center justify-center relative">
                <ClickableDraggable 
                  id="strong-pull" 
                  backgroundColor="rgb(239, 68, 68)" 
                  springStrength={600}
                  springDamping={20}
                  dragElastic={0.7}
                  forceEnabled={forceEnabled}
                >
                  <span className="font-semibold text-white">
                    {forceEnabled ? "Strong Return" : "Click 5x to Enable"}
                  </span>
                </ClickableDraggable>
              </div>
            </div>
            
            <div className="draggable-element flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold">Fast Spring</h2>
              <div className="rounded-lg p-6 h-48 w-48 flex items-center justify-center relative">
                <ClickableDraggable 
                  id="fast" 
                  backgroundColor="rgb(16, 185, 129)" 
                  springStrength={800}
                  springDamping={35}
                  dragElastic={0.4}
                  forceEnabled={forceEnabled}
                >
                  <span className="font-semibold text-white">
                    {forceEnabled ? "Quick Return" : "Click 5x to Enable"}
                  </span>
                </ClickableDraggable>
              </div>
            </div>
            
            <div className="draggable-element flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold">Elastic Bounce</h2>
              <div className="rounded-lg p-6 h-48 w-48 flex items-center justify-center relative">
                <ClickableDraggable 
                  id="elastic" 
                  backgroundColor="rgb(244, 114, 182)" 
                  springStrength={400}
                  springDamping={10}
                  dragElastic={0.8}
                  forceEnabled={forceEnabled}
                >
                  <span className="font-semibold text-white">
                    {forceEnabled ? "Extra Bouncy" : "Click 5x to Enable"}
                  </span>
                </ClickableDraggable>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SpringProvider>
  );
}
