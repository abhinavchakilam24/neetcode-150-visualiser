import { useEffect } from 'react';

export function useKeyboardNav({
  onNext,
  onPrev,
  onPlayPause,
  onReset,
  onJumpToEnd,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          onNext?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev?.();
          break;
        case ' ':
          e.preventDefault();
          onPlayPause?.();
          break;
        case 'Home':
          e.preventDefault();
          onReset?.();
          break;
        case 'End':
          e.preventDefault();
          onJumpToEnd?.();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev, onPlayPause, onReset, onJumpToEnd, enabled]);
}
