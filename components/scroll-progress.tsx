"use client"

import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  color = 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  height = 3,
  position = 'top'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${scrollPx / winHeightPx * 100}%`;
      
      setScrollProgress(scrollPx / winHeightPx * 100);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize on mount
    updateScrollProgress();
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
  
  return (
    <div 
      className={`fixed left-0 right-0 z-50 ${position === 'top' ? 'top-0' : 'bottom-0'}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`h-full ${color} transition-all duration-200 ease-out`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
