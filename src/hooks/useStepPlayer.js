import { useState, useEffect, useRef, useCallback } from 'react';

export function useStepPlayer(steps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);
  const stepsRef = useRef(steps);

  useEffect(() => {
    stepsRef.current = steps;
    setCurrentStep(0);
    setIsPlaying(false);
  }, [steps]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (currentStep >= stepsRef.current.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [currentStep]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(s => Math.min(s + 1, stepsRef.current.length - 1));
  }, []);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(s => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  const jumpToEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(stepsRef.current.length - 1);
  }, []);

  const scrubTo = useCallback((index) => {
    setIsPlaying(false);
    setCurrentStep(Math.max(0, Math.min(index, stepsRef.current.length - 1)));
  }, []);

  useEffect(() => {
    clearTimer();
    if (isPlaying) {
      const interval = 2000 / speed;
      timerRef.current = setInterval(() => {
        setCurrentStep(s => {
          if (s >= stepsRef.current.length - 1) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, interval);
    }
    return clearTimer;
  }, [isPlaying, speed, clearTimer]);

  const totalSteps = steps?.length ?? 0;
  const step = steps?.[currentStep] ?? null;
  const prevStep = steps?.[currentStep - 1] ?? null;

  return {
    currentStep,
    totalSteps,
    step,
    prevStep,
    isPlaying,
    speed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    jumpToEnd,
    scrubTo,
    setSpeed,
  };
}
