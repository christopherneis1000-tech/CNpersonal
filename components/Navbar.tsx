
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
        <button className="text-[10px] uppercase tracking-[0.3em] bg-[#5F6654] text-[#F4F2EE] px-10 py-4 rounded-full hover:bg-[#6a725e] hover:scale-105 transition-all duration-500 font-bold shadow-lg shadow-black/20">
          Inquiry
        </button>
      </div>
    </nav>
  );
};
