
import React from 'react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference">
      <div className="flex items-center">
        <Logo size="md" className="mr-4" />
        <div className="hidden sm:block text-xs md:text-sm font-light tracking-[0.3em] heading-font uppercase text-[#F4F2EE] leading-none">
          Personal
        </div>
      </div>

      <div className="hidden lg:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-semibold text-[#F4F2EE]">
        <a href="#hero" className="hover:opacity-60 transition-opacity">Vision</a>
        <a href="#style" className="hover:opacity-60 transition-opacity">Style</a>
        <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
      </div>

      <div className="flex items-center h-10 md:h-12">
        <button className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] bg-[#F4F2EE] text-[#1E1E1E] px-5 md:px-8 py-2 md:py-3 rounded-full hover:bg-white hover:scale-105 transition-all duration-500 font-black shadow-lg">
          Inquiry
        </button>
      </div>
    </nav>
  );
};
