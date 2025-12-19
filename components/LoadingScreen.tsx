
import React from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  progress: number;
  total: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, total }) => {
  const percentage = Math.round((progress / total) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1E1E1E] text-[#F4F2EE] px-8">
      <div className="mb-12 text-center flex flex-col items-center">
        <Logo size="lg" className="mb-6" />
        <h2 className="text-4xl uppercase tracking-[0.3em] font-light heading-font">PERSONAL BRAND</h2>
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-between mb-4 text-sm tracking-widest text-[#B8B6B2] uppercase">
          <span>Initializing Experience</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-[1px] w-full bg-[#2B2B2B] relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#F4F2EE] transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      <div className="mt-24 text-[10px] uppercase tracking-[0.5em] text-[#5F6654]">
        Crafting cinematic clarity
      </div>
    </div>
  );
};
