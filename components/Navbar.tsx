
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
        <button className="group relative overflow-hidden text-[10px] uppercase tracking-[0.4em] font-bold text-[#F4F2EE] px-10 py-4 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#5F6654] to-[#454B3E] hover:shadow-[0_15px_40px_rgba(95,102,84,0.4)]">
          {/* Shimmer Effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <span className="relative z-10">Inquiry</span>
        </button>
      </div>
    </nav>
  );
};
