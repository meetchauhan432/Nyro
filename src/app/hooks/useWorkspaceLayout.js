import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePatchState } from '@shared/hooks/usePatchState.js';
import { installScrollMotion } from '@shared/hooks/scrollMotion.js';

export function useWorkspaceLayout() {
  const [state, patch] = usePatchState({
    page: 'overview', collapsed: false, mobile: false, rolesOpen: false,
    hidden: false, ambientMotion: true, range: '7D', drawer: null,
    search: '', unavailable: null, selectedTransaction: null, toast: '',
  });
  const previousFocus = useRef(null);
  const toastTimer = useRef(null);
  const scrollMotion = useRef(null);

  useLayoutEffect(() => {
    scrollMotion.current = installScrollMotion();
    return () => scrollMotion.current?.dispose();
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!state.drawer) return;
    document.body.classList.add('modal-open');
    const frame = requestAnimationFrame(() => document.querySelector('[role="dialog"]')?.focus());
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove('modal-open');
      if (previousFocus.current && document.contains(previousFocus.current)) previousFocus.current.focus();
    };
  }, [state.drawer]);

  function open(drawer, extra = {}) {
    if (!state.drawer) previousFocus.current = document.activeElement;
    patch({ drawer, search: '', ...extra });
  }
  function close() {
    patch({ drawer: null });
  }
  function goTo(page) {
    patch({ page, drawer: null, mobile: false });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function notify(toast) {
    clearTimeout(toastTimer.current);
    patch({ toast });
    toastTimer.current = setTimeout(() => patch({ toast: '' }), 3600);
  }

  return { state, patch, open, close, goTo, notify, scrollMotion };
}
