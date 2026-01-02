import React, { Suspense, lazy } from 'react';

// Lazy load heavy components
const LazyParallaxCanvas = lazy(() => 
  import('./ParallaxCanvas').then(module => ({ default: module.ParallaxCanvas }))
);

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback = <div className="fixed inset-0 bg-[#1E1E1E]" /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export { LazyParallaxCanvas };
