import { useEffect, useRef, useState } from 'react';

// This hook controls presentation only. Finance services always use exact integer paise.
const ENTRANCE_MS = 520;
const UPDATE_MS = 340;

export function useAnimatedBalance(value, hidden) {
  const [display, setDisplay] = useState(0);
  const current = useRef(0);
  const wasHidden = useRef(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = null;
    function update(amount) {
      current.current = amount;
      setDisplay(amount);
    }
    function cancel() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }
    function onMotionChange() {
      if (media.matches) {
        cancel();
        update(hidden ? 0 : value);
      }
    }
    const reset = wasHidden.current;
    wasHidden.current = hidden;
    if (hidden || media.matches) update(hidden ? 0 : value);
    else {
      const from = reset ? 0 : current.current;
      const duration = reset ? ENTRANCE_MS : UPDATE_MS;
      const whole = from % 100 === 0 && value % 100 === 0;
      let start = null;
      update(from);
      function tick(now) {
        if (start === null) start = now;
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 2.4);
        const raw = from + (value - from) * eased;
        update(progress === 1 ? value : whole ? Math.round(raw / 100) * 100 : Math.round(raw));
        if (progress < 1) frame = requestAnimationFrame(tick);
      }
      if (from !== value) frame = requestAnimationFrame(tick);
    }
    if (media.addEventListener) media.addEventListener('change', onMotionChange);
    else media.addListener(onMotionChange);
    return () => {
      cancel();
      if (media.removeEventListener) media.removeEventListener('change', onMotionChange);
      else media.removeListener(onMotionChange);
    };
  }, [value, hidden]);

  return display;
}
