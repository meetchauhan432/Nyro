import { useLayoutEffect, useRef } from 'react';

const focusableSelector = 'input, button, a[href], select, textarea, [tabindex]';

export function useFocusTrap(dialogRef, onEscape) {
  const escapeHandler = useRef(onEscape);

  useLayoutEffect(() => {
    escapeHandler.current = onEscape;
  }, [onEscape]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function controls() {
      return [...dialog.querySelectorAll(focusableSelector)]
        .filter(element => element.tabIndex >= 0 && !element.disabled && element.getClientRects().length);
    }

    function handleKey(event) {
      if (event.key === 'Escape' && escapeHandler.current) {
        event.preventDefault();
        escapeHandler.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = controls();
      const activeIndex = items.indexOf(document.activeElement);
      if (activeIndex === -1 || (event.shiftKey ? activeIndex === 0 : activeIndex === items.length - 1)) {
        event.preventDefault();
        const endpoint = event.shiftKey ? items.at(-1) : items[0];
        (endpoint || dialog).focus({ preventScroll: true });
      }
    }

    function containFocus(event) {
      if (!dialog.contains(event.target)) (controls()[0] || dialog).focus({ preventScroll: true });
    }

    (controls()[0] || dialog).focus({ preventScroll: true });
    document.addEventListener('keydown', handleKey);
    document.addEventListener('focusin', containFocus);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('focusin', containFocus);
    };
  }, [dialogRef]);
}
