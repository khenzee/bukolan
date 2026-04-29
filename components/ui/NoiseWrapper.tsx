"use client";

import React from 'react';
import { Noise } from "react-noise";
import "react-noise/css";

export default function NoiseWrapper() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]" 
      style={{ opacity: 0.18 }}
    >
      <Noise 
        isAnimated={true} 
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}
