import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClass = `logo-${size}`;

  return (
    <div className={`logo-container ${className}`}>
      <div className="logo-glow" />
      <div className={`logo ${sizeClass} animate-float-ultra`}>
        CN
      </div>
    </div>
  );
};
