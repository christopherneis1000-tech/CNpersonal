import React from 'react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar md-px-12 md-py-8" role="navigation" aria-label="Main navigation">
      <div className="flex items-center">
        <Logo size="md" className="mr-4" />
        <div className="hidden sm-block text-xs md-text-sm font-light tracking-03 heading-font uppercase text-ivory leading-none">
          Personal
        </div>
      </div>

      <div className="hidden lg-flex space-x-12 text-olive font-semibold" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
        <a href="#hero" className="nav-link" aria-label="Navigate to vision section">Vision</a>
        <a href="#style" className="nav-link" aria-label="Navigate to style section">Style</a>
        <a href="#contact" className="nav-link" aria-label="Navigate to contact section">Contact</a>
      </div>

      <div className="flex items-center md-h-12" style={{ height: '2.5rem' }}>
        <button className="btn btn-filled transition-all duration-500 hover-scale-105 active-scale-95 shadow-hover-olive" style={{ fontSize: '10px', letterSpacing: '0.4em' }} aria-label="Make an inquiry">
          <span className="btn-shimmer" />
          <span className="relative z-10">Inquiry</span>
        </button>
      </div>
    </nav>
  );
};
