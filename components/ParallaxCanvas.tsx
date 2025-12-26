
import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { FRAME_COUNT } from '../constants';

interface ParallaxCanvasProps {
  images: HTMLImageElement[];
  progress: number; // 0 to 1
  isActive: boolean;
  align?: number; // 0 (left) to 1 (right)
  fit?: 'cover' | 'contain';
  zoom?: number; // 1.0 is standard cover, >1.0 for extra zoom
}

export const ParallaxCanvas: React.FC<ParallaxCanvasProps> = ({ 
  images, 
  progress, 
  isActive,
  align = 0.5,
  fit = 'cover',
  zoom = 1.0
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(images);
  const rafRef = useRef<number>();

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const getValidFrame = (index: number): HTMLImageElement | null => {
    const sequence = imagesRef.current;
    if (!sequence || sequence.length === 0) return null;

    const isValid = (img: HTMLImageElement | undefined) => 
      img && img.complete && img.naturalWidth > 0;

    if (isValid(sequence[index])) return sequence[index];

    let step = 1;
    while (step < 15) {
      const prev = index - step;
      const next = index + step;
      if (prev >= 0 && isValid(sequence[prev])) return sequence[prev];
      if (next < sequence.length && isValid(sequence[next])) return sequence[next];
      step++;
    }
    return null;
  };

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const targetFrameIndex = Math.max(0, Math.min(
      FRAME_COUNT - 1,
      Math.floor(progress * FRAME_COUNT)
    ));
    
    const img = getValidFrame(targetFrameIndex);
    if (!img) return;

    ctx.fillStyle = '#1E1E1E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (fit === 'cover') {
      // Base cover calculation
      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width * zoom;
        drawHeight = (canvas.width / imgAspect) * zoom;
      } else {
        drawWidth = (canvas.height * imgAspect) * zoom;
        drawHeight = canvas.height * zoom;
      }
      // Apply alignment
      offsetX = (canvas.width - drawWidth) * align;
      offsetY = (canvas.height - drawHeight) * 0.5;
    } else {
      // Contain logic
      if (canvasAspect > imgAspect) {
        drawHeight = canvas.height * zoom;
        drawWidth = (canvas.height * imgAspect) * zoom;
      } else {
        drawWidth = canvas.width * zoom;
        drawHeight = (canvas.width / imgAspect) * zoom;
      }
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Depth Vignette
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.9
    );
    gradient.addColorStop(0, 'rgba(30, 30, 30, 0)');
    gradient.addColorStop(1, 'rgba(30, 30, 30, 0.45)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [progress, align, fit, zoom]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  useEffect(() => {
    if (isActive) {
      rafRef.current = requestAnimationFrame(drawFrame);
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [progress, isActive, drawFrame]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ 
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
        zIndex: isActive ? 10 : 0,
        willChange: isActive ? 'opacity' : 'auto'
      }}
    />
  );
};
