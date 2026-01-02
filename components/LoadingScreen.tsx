import React from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  progress: number;
  total: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, total }) => {
  const percentage = Math.round((progress / total) * 100);

  return (
    <div className="loading-screen">
      <div className="mb-12 text-center flex flex-col items-center">
        <Logo size="lg" className="mb-6" />
        <h2 className="text-4xl uppercase tracking-03 font-light heading-font">PERSONAL BRAND</h2>
      </div>

      <div className="progress-bar-container">
        <div className="flex justify-between mb-4 text-sm tracking-widest text-stone-grey uppercase">
          <span>Initializing Experience</span>
          <span>{percentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      <div className="mt-24 text-olive" style={{ fontSize: '10px', letterSpacing: '0.5em', textTransform: 'uppercase' }}>
        Crafting cinematic clarity
      </div>
    </div>
  );
};
