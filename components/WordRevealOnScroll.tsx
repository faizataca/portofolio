"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface WordRevealOnScrollProps {
  text: string;
  isDarkMode?: boolean; // Tambahkan prop isDarkMode
}

const WordRevealOnScroll: React.FC<WordRevealOnScrollProps> = ({ text, isDarkMode = false }) => {
  const words = text.split(' ');
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const originalOverflow = useRef<string>('');
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const animationActive = useRef<boolean>(false);
  const revealCompleted = useRef<boolean>(false); // Track if reveal effect is completed
  const lastScrollY = useRef<number>(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const scrollThreshold = useRef<number>(10); // Scroll threshold to trigger next word
  const accumulatedScroll = useRef<number>(0);
  
  // Effect to initialize or resize the wordRefs array based on the number of words
  useEffect(() => {
    wordRefs.current = Array(words.length).fill(null);
  }, [words.length]);
    // Function to lock/unlock scrolling
  const toggleScrollLock = (lock: boolean) => {
    if (lock) {
      // Store the original overflow value if not already stored
      if (!originalOverflow.current) {
        originalOverflow.current = document.body.style.overflow || '';
      }
      document.body.style.overflow = 'hidden';
    } else {
      // Ensure we restore the original overflow
      document.body.style.overflow = originalOverflow.current || '';
      // Reset the stored value after restoring
      originalOverflow.current = '';
    }
  };
    // Function to handle word reveal/hide based on scroll direction and amount
  const handleScrollAnimation = useCallback((deltaY: number) => {
    if (!isAnimating) return;
    
    // Determine scroll direction
    const newDirection = deltaY > 0 ? 'down' : 'up';
    
    // When direction changes, reset accumulated scroll
    if (newDirection !== scrollDirection.current) {
      scrollDirection.current = newDirection;
      accumulatedScroll.current = Math.abs(deltaY);
    } else {
      // Add to accumulated scroll when continuing in same direction
      accumulatedScroll.current += Math.abs(deltaY);
    }
    
    // Adjust threshold based on scroll speed (faster scrolls need more accumulation)
    const dynamicThreshold = Math.max(
      5, 
      scrollThreshold.current - Math.min(100, accumulatedScroll.current / 10)
    );
    
    // Only process if we've scrolled enough to trigger a word change
    if (accumulatedScroll.current < dynamicThreshold) return;
    
    // Reset accumulated scroll (but not completely, to allow for fluid motion)
    accumulatedScroll.current = accumulatedScroll.current * 0.3;
    
    if (scrollDirection.current === 'down') {
      // Reveal next word when scrolling down
      const currentRevealed = revealedIndices.size;
      if (currentRevealed < words.length) {
        setRevealedIndices(prev => {
          const newIndices = new Set(prev);
          newIndices.add(currentRevealed);
          return newIndices;
        });
        
        // If all words revealed, exit animation mode but keep the effect
        if (currentRevealed === words.length - 1) {
          // Force unlock scrolling immediately without delay
          document.body.style.overflow = originalOverflow.current || '';
          setIsAnimating(false);
          animationActive.current = false;
          revealCompleted.current = true; // Mark reveal as completed
          toggleScrollLock(false); // Ensure scroll is unlocked
        }
      }
    } else {
      // Hide words when scrolling up
      const currentRevealed = revealedIndices.size;
      if (currentRevealed > 0) {
        setRevealedIndices(prev => {
          const newIndices = new Set(prev);
          newIndices.delete(currentRevealed - 1);
          return newIndices;
        });
        
        // If all words are hidden, exit animation mode immediately
        if (currentRevealed === 1) {
          // Force unlock scrolling immediately without delay
          document.body.style.overflow = originalOverflow.current || '';
          setIsAnimating(false);
          animationActive.current = false;
          revealCompleted.current = false; // Reset completion status
          toggleScrollLock(false); // Ensure scroll is unlocked
        }
      }
    }
  }, [isAnimating, revealedIndices, words.length]);
  
  // Handle wheel events during animation to control word reveal
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isAnimating) {
      e.preventDefault();
      handleScrollAnimation(e.deltaY);
    }
  }, [isAnimating, handleScrollAnimation]);
  
  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isAnimating) return;
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleScrollAnimation(20); // Simulate scroll down
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleScrollAnimation(-20); // Simulate scroll up
    } else if (e.key === 'Escape') {
      // Skip animation if escape is pressed
      setRevealedIndices(new Set(Array.from({ length: words.length }, (_, i) => i)));
      setIsAnimating(false);
      animationActive.current = false;
      revealCompleted.current = true; // Mark reveal as completed on skip
      toggleScrollLock(false);
    }
  }, [isAnimating, handleScrollAnimation, words.length]);
  
  // Handle scroll to detect when to start animation
  const handleScroll = useCallback(() => {
    if (animationActive.current) return; // Don't process scroll events if animation is active
    if (revealCompleted.current) return; // Don't restart animation if already completed
    
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }
    
    scrollTimer.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.6; // Trigger at 60% of viewport height
      const currentScrollY = window.scrollY;
      
      // If container is visible enough to start animation
      if (rect.top < triggerPoint && rect.bottom > 0 && !isAnimating) {
        // Store current scroll position and direction
        lastScrollY.current = currentScrollY;
        scrollDirection.current = 'down'; // Default to down when starting
        
        // Lock the page and start animation
        animationActive.current = true;
        setIsAnimating(true);
        toggleScrollLock(true);
        
        // Center the container in view
        container.scrollIntoView({
          behavior: 'smooth', 
          block: 'center'
        });
      }
      // Don't reset animation when out of view anymore
    }, 50);
  }, [isAnimating]);
    // Add scroll and wheel event listeners
  useEffect(() => {
    // Passive scroll detection (only for triggering the animation)
    const scrollHandler = () => {
      if (animationActive.current) return;
      
      requestAnimationFrame(() => {
        handleScroll();
      });
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial check after a small delay
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [handleScroll]);  // Add specific event handlers for when animation is active
  useEffect(() => {
    if (!isAnimating) {
      // Make sure to unlock scroll when animation ends
      if (animationActive.current) {
        // Force unlock scrolling immediately
        document.body.style.overflow = originalOverflow.current || '';
        animationActive.current = false;
        toggleScrollLock(false);
      }
      return;
    }
    
    // Non-passive wheel handler (for controlling the animation)
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault(); // Prevent actual scrolling
      handleScrollAnimation(e.deltaY); // Use our custom animation instead
    };
    
    // Handle user leaving page with animation active
    const handleBeforeUnload = () => {
      document.body.style.overflow = ''; // Direct reset without using toggleScrollLock
    };
    
    // Handle visibility change (user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && animationActive.current) {
        document.body.style.overflow = originalOverflow.current || '';
      }
    };
    
    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Set a shorter safety timeout to ensure scrolling is unlocked quickly
    // in case the animation gets stuck for any reason
    const safetyTimeout = setTimeout(() => {
      if (document.body.style.overflow === 'hidden' && animationActive.current) {
        document.body.style.overflow = originalOverflow.current || '';
        animationActive.current = false;
        setIsAnimating(false);
      }
    }, 8000); // 8 seconds max animation time
    
    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(safetyTimeout);
    };
  }, [isAnimating, handleScrollAnimation, handleKeyDown]);  // Reset animation when component unmounts
  useEffect(() => {
    return () => {
      // Always ensure scroll is unlocked when component unmounts
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = originalOverflow.current || '';
      }
      
      // Direct reset to ensure scroll is definitely enabled when component unmounts
      document.body.style.overflow = '';
      animationActive.current = false;
    };
  }, []);
  
  // Responsive classes
  const fontSizeClasses = "text-2xl md:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl";
  const paddingClasses = "p-5 md:p-8 lg:p-4";
  const wordMarginClasses = "mx-1 lg:mx-2.5";
  const wordTransitionClasses = "transition-all duration-150 ease-out transform"; // Kept at 150ms for snappy effect
  
  return (
    <div
      ref={containerRef}
      className={`${paddingClasses} mx-auto my-32 w-full max-w-4xl`}
    >
      <p className={`${fontSizeClasses} leading-relaxed text-center`}>
        {words.map((word, index) => {
          const isRevealed = revealedIndices.has(index);
          return (
            <span
              key={index}
              ref={el => { wordRefs.current[index] = el; }}
              className={`
                inline-block
                ${wordTransitionClasses}
                ${wordMarginClasses}
                ${isRevealed
                  ? `opacity-100 translate-y-0 ${isDarkMode ? 'text-white' : 'text-black'} animate-word-appear`
                  : `opacity-0 translate-y-[28px] ${isDarkMode ? 'text-white/5' : 'text-black/5'}`
                }
              `}
              style={{
                animationDelay: isRevealed ? `0.05s` : '0s',
                transitionDelay: isRevealed 
                  ? `${index * 0.02}s` // Staggered typing delay
                  : `${(words.length - index - 1) * 0.02}s`, // Reverse delay for fade-out
              }}
            >
              {word}
            </span>
          );
        })}
      </p>
      
      {/* Visual indicator for animation state */}
      {isAnimating && (
        <div className="fixed top-0 right-0 m-4 flex items-center space-x-2">
          <div className={`w-2 h-2 ${isDarkMode ? 'bg-white' : 'bg-black'} opacity-40 rounded-full animate-pulse`}></div>
          <span className="text-xs opacity-60">{scrollDirection.current === 'down' ? '↓' : '↑'}</span>
        </div>
      )}
      
      {/* Scroll instruction indicator */}
      {isAnimating && (
        <div className={`fixed bottom-16 left-1/2 transform -translate-x-1/2 text-xs opacity-70 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} px-3 py-1 rounded-full`}>
          Scroll to reveal words
        </div>
      )}
    </div>
  );
};

export default WordRevealOnScroll;
