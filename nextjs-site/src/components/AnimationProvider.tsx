'use client';

import React, { createContext, useContext, useRef, useCallback } from 'react';

interface AnimationContextType {
  shouldAnimate: (animationId: string) => boolean;
  markAsAnimated: (animationId: string) => void;
  isFirstLoad: () => boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const animatedElements = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);

  const shouldAnimate = useCallback((animationId: string): boolean => {
    return isFirstLoadRef.current && !animatedElements.current.has(animationId);
  }, []);

  const markAsAnimated = useCallback((animationId: string): void => {
    animatedElements.current.add(animationId);
    // After first batch of animations, mark as no longer first load
    if (animatedElements.current.size > 0) {
      isFirstLoadRef.current = false;
    }
  }, []);

  const isFirstLoad = useCallback((): boolean => {
    return isFirstLoadRef.current;
  }, []);

  const value = {
    shouldAnimate,
    markAsAnimated,
    isFirstLoad,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation(): AnimationContextType {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

// Hook for one-time animations
export function useOneTimeAnimation(animationId: string) {
  const { shouldAnimate, markAsAnimated } = useAnimation();

  const shouldRun = shouldAnimate(animationId);

  // Mark as animated when component mounts
  React.useEffect(() => {
    if (shouldRun) {
      markAsAnimated(animationId);
    }
  }, [shouldRun, animationId, markAsAnimated]);

  return {
    shouldAnimate: shouldRun,
    initial: shouldRun ? 'hidden' : 'visible',
    animate: shouldRun ? 'visible' : 'visible',
  };
}
