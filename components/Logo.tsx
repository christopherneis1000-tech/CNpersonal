
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs border-[1.5px]',
    md: 'w-10 h-10 text-sm border-2',
    lg: 'w-16 h-16 text-2xl border-2',
    xl: 'w-24 h-24 text-4xl border-[3px]',
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Enhanced Pop out glow effect */}
      <div className={`absolute inset-0 bg-[#5F6654]/40 blur-3xl rounded-sm scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100`} />
      
      <div 
        className={`${sizeClasses[size]} border-[#5F6654] flex items-center justify-center heading-font font-light tracking-tighter transition-all duration-500 bg-transparent text-[#F4F2EE] relative z-10 animate-float-ultra`}
        style={{
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(95, 102, 84, 0.3)',
        }}
      >
        CN
      </div>

      <style>{`
        @keyframes float-ultra {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-25px) rotate(2deg); }
          50% { transform: translateY(-45px) rotate(0deg); }
          75% { transform: translateY(-25px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-ultra {
          animation: float-ultra 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
