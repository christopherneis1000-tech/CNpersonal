
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { SectionId } from './types';
import { SEQUENCES, getFrameUrl, FRAME_COUNT } from './constants';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Logo } from './components/Logo';

// Lazy load ParallaxCanvas for code splitting
const ParallaxCanvas = lazy(() => 
  import('./components/ParallaxCanvas').then(module => ({ default: module.ParallaxCanvas }))
);

// Premium High-Impact Icons
const BrainIcon = () => (
  <div className="relative mb-12 flex justify-center items-center animate-float-slow">
    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150" />
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
      <path d="M12 4.5V3a2 2 0 0 0-4.002-.263l-.01.077c-.503.04-.997.16-1.46.353a4 4 0 0 0-5.463 5.464 4 4 0 0 0 1.503 5.922l.142.06c.414.168.69.57.69 1.015v1.312a3 3 0 0 0 3 3h.31a3 3 0 0 0 2.822-2H12"/>
      <path d="M12 4.5V3a2 2 0 0 1 4.002-.263l.01.077c.503.04.997.16 1.46.353a4 4 0 0 1 5.463 5.464 4 4 0 0 1-1.503 5.922l-.142.06c-.414.168-.69.57-.69 1.015v1.312a3 3 0 0 1-3 3h-.31a3 3 0 0 1-2.822-2H12"/>
      <path d="M9 13a3 3 0 1 0 6 0"/>
    </svg>
  </div>
);

const ToothIcon = () => (
  <div className="relative mb-12 flex justify-center items-center animate-float-slow">
    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150" />
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
      <path d="M8 2C6.5 2 5 3.5 5 6c0 3-1 5-1 8 0 2 1 4 2 5 1 1 2 1 2 1s0-2 1-3c1-1 1-2 1-2s0 1 1 2c1 1 1 3 1 3s1 0 2-1c1-1 2-3 2-5 0-3-1-5-1-8 0-2.5-1.5-4-3-4s-3 1.5-3 4c0-2.5-1.5-4-3-4z"/>
    </svg>
  </div>
);

const EnvelopeIcon = () => (
  <div className="relative mb-12 flex justify-center items-center animate-float-alt">
    <div className="absolute inset-0 bg-[#F4F2EE]/5 blur-2xl rounded-full scale-125" />
    <svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  </div>
);

const App: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HERO);
  const [scrollProgress, setScrollProgress] = useState({
    hero: 0,
    style: 0,
    contact: 0
  });

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    style: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  const imagesRef = useRef<{ [key in SectionId]: HTMLImageElement[] }>({
    hero: [],
    style: [],
    contact: []
  });
  const [loadedSections, setLoadedSections] = useState<Set<SectionId>>(new Set());
  const loadingStartedRef = useRef(false);

  useEffect(() => {
    if (loadingStartedRef.current) return;
    loadingStartedRef.current = true;

    const preloadSequence = async (sectionId: SectionId, priority: boolean = false) => {
      const baseUrl = SEQUENCES[sectionId];
      const sectionImages: HTMLImageElement[] = [];

      const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(baseUrl, i);
          img.onload = () => {
            if (priority) setLoadingProgress(prev => Math.min(prev + 1, FRAME_COUNT));
            resolve();
          };
          img.onerror = () => {
            if (priority) setLoadingProgress(prev => Math.min(prev + 1, FRAME_COUNT));
            resolve();
          };
          sectionImages[i] = img;
        });
      });

      await Promise.all(promises);
      imagesRef.current[sectionId] = sectionImages;
      setLoadedSections(prev => new Set(prev).add(sectionId));
    };

    const loadAll = async () => {
      try {
        // Load hero sequence first (priority)
        await preloadSequence(SectionId.HERO, true);
        setIsLoaded(true);
        
        // Lazy-load other sequences in background (no await)
        preloadSequence(SectionId.STYLE, false);
        preloadSequence(SectionId.CONTACT, false);
      } catch (err) {
        console.error("Asset loading failed", err);
        setIsLoaded(true);
      }
    };

    loadAll();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const getSectionProgress = (ref: React.RefObject<HTMLDivElement>, isHero: boolean) => {
            if (!ref.current) return 0;
            const rect = ref.current.getBoundingClientRect();
            if (isHero) {
              const progress = -rect.top / (rect.height - vh);
              return Math.max(0, Math.min(1, progress));
            } else {
              const progress = 1 - (rect.bottom / (vh + rect.height));
              return Math.max(0, Math.min(1, progress));
            }
          };

          const heroProg = getSectionProgress(sectionRefs.hero, true);
          const styleProg = getSectionProgress(sectionRefs.style, false);
          const contactProg = getSectionProgress(sectionRefs.contact, false);

          setScrollProgress({ hero: heroProg, style: styleProg, contact: contactProg });

          if (contactProg > 0.1) {
            setActiveSection(SectionId.CONTACT);
          } else if (heroProg >= 0.99 || styleProg > 0.1) {
            setActiveSection(SectionId.STYLE);
          } else {
            setActiveSection(SectionId.HERO);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  if (!isLoaded) {
    return <LoadingScreen progress={loadingProgress} total={FRAME_COUNT} />;
  }

  const calculateStyleMetrics = (p: number) => {
    let opacity = 0, translateY = 100;
    if (p >= 0.1 && p < 0.4) {
      const localP = (p - 0.1) / 0.3; 
      opacity = localP;
      translateY = (1 - localP) * 100;
    } else if (p >= 0.4 && p <= 1.0) {
      const localP = (p - 0.4) / 0.6; 
      opacity = 1 - localP;
      translateY = -localP * 100;
    }
    return { opacity, translateY };
  };
  const styleMetrics = calculateStyleMetrics(scrollProgress.style);

  return (
    <div className="relative bg-charcoal">
      <Navbar />

      <Suspense fallback={<div className="fixed inset-0 bg-charcoal" />}>
        <div className="fixed inset-0 z-0">
          <ParallaxCanvas images={imagesRef.current.hero} progress={scrollProgress.hero} isActive={activeSection === SectionId.HERO} />
          <ParallaxCanvas images={imagesRef.current.style} progress={scrollProgress.style} isActive={activeSection === SectionId.STYLE} align={0.2} zoom={1.05} />
          <ParallaxCanvas images={imagesRef.current.contact} progress={scrollProgress.contact} isActive={activeSection === SectionId.CONTACT} fit="cover" align={0.5} zoom={1.1} />
        </div>
      </Suspense>

      <main className="relative z-10">
        <section ref={sectionRefs.hero} id="hero" className="section-hero" aria-label="Hero introduction">
          <div className="section-sticky">
            <div 
              className="max-w-4xl transition-all duration-700 flex flex-col items-center"
              style={{ 
                opacity: scrollProgress.hero > 0.8 ? 1 - (scrollProgress.hero - 0.8) * 5 : (scrollProgress.hero > 0.05 ? 1 : 0),
                transform: `translateY(${(1 - scrollProgress.hero) * 50}px)`,
                pointerEvents: scrollProgress.hero > 0.1 ? 'auto' : 'none'
              }}
            >
              <div className="flex items-center justify-center mb-8">
                <Logo size="xl" className="mr-6 md-mr-10" />
                <h1 className="text-5xl md-text-10xl font-bold uppercase heading-font leading-none tracking-tight text-ivory">PERSONAL</h1>
              </div>
              <p className="text-lg md-text-2xl font-light tracking-04 uppercase text-ivory mb-12">Calm Thinking. Clear Direction.</p>
              
              <div className="flex flex-col md-flex-row items-center justify-center space-y-4 md-space-y-0 md-space-x-6">
                <button className="btn btn-outline w-full md-w-56 pointer-events-auto" aria-label="Contact us">
                   <span className="btn-bg" />
                   <span className="relative z-10">Contact</span>
                </button>

                <button 
                  className="btn btn-filled w-full md-w-56 pointer-events-auto"
                  aria-label="View our work portfolio"
                >
                   <span className="btn-shimmer" />
                   <span className="relative z-10">Work</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.style} id="style" className="section-hero" aria-label="Design philosophy and style">
          <div className="style-grid sticky top-0">
            <div className="hidden md-block" />
            <div className="style-content">
              <div className="style-box" style={{ opacity: styleMetrics.opacity, transform: `translateY(${styleMetrics.translateY}%)`, pointerEvents: styleMetrics.opacity > 0.5 ? 'auto' : 'none' }}>
                <div className="style-box-corner" />
                <ToothIcon />
                <h2 className="text-4xl md-text-6xl heading-font mb-10 text-ivory leading-tight font-light">Wieviele Zähne hast du, Batman?</h2>
                <p className="text-lg md-text-xl text-ivory font-normal mb-12 max-w-lg mx-auto" style={{ lineHeight: '2', whiteSpace: 'pre-line' }}>Hány foga van a Batmannek? 
Tizenhat, tizenhat!
Hány foga van a Batmannek? 
Tizenhat, tizenhat!
{'\n'}
Hány foga van a Robinnek? 
Huszonnyolc, huszonnyolc!
Hány foga van a Robinnek? 
Huszonnyolc, huszonnyolc!
{'\n'}
Hány foga van a Jokernak? 
Nulla, nulla!
Hány foga van a Jokernak? 
Nulla, nulla!</p>
                <div className="style-divider space-x-6">
                  <div className="style-divider-line" />
                  <span className="text-xs uppercase tracking-03 text-ivory font-bold">Hány foga van a Batmannek?</span>
                  <div className="style-divider-line" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={sectionRefs.contact} id="contact" className="section-hero" aria-label="Contact information">
          <div className="section-contact-sticky">
            <div 
              className="transition-all duration-700 ease-out flex flex-col items-center"
              style={{ 
                transform: `translateY(${(1 - Math.min(1, scrollProgress.contact * 2)) * 100}px)`,
                opacity: scrollProgress.contact > 0.1 ? (scrollProgress.contact > 0.9 ? 1 - (scrollProgress.contact - 0.9) * 10 : 1) : 0,
                pointerEvents: scrollProgress.contact > 0.2 ? 'auto' : 'none'
              }}
            >
              <div className="text-center flex flex-col items-center">
                 <EnvelopeIcon />
                 <h2 className="text-6xl md-text-10xl font-bold uppercase heading-font leading-none tracking-tight text-ivory mb-12 drop-shadow-heading">Let's Connect</h2>
                 <button className="btn btn-filled px-16 py-8 transition-all duration-700 hover-scale-110 active-scale-95 pointer-events-auto" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)', background: 'linear-gradient(to bottom, #5F6654, #3D4237)' }} aria-label="Send an email to contact us">
                    <span className="btn-shimmer" />
                    <span className="relative z-10" style={{ fontSize: '12px', letterSpacing: '0.6em' }}>Email Me</span>
                 </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" role="contentinfo">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <a 
            href="https://noirdesigner.pages.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="Visit NOIR design studio website"
          >
            NOIR design studio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
