import { useEffect } from 'react';

export function useWorkspaceKeyboard({ drawer, busy, openSearch, close, closeMobile }) {
  useEffect(() => {
    function handleKey(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!busy) openSearch();
      }
      if (event.key === 'Escape') {
        if (drawer) close(); else closeMobile();
      }
      if (event.key !== 'Tab' || !drawer) return;
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return;
      const controls = Array.from(dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]')).filter(element => element.getClientRects().length);
      if (!controls.length) {
        event.preventDefault();
        return;
      }
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [drawer, busy, openSearch, close, closeMobile]);
}
