import { useCallback, useState } from 'react';

/** Merge a partial patch into one feature's state. Functional updates are atomic. */
export function usePatchState(initialState) {
  const [state, setState] = useState(initialState);
  const patch = useCallback(update => {
    setState(previous => ({ ...previous, ...(typeof update === 'function' ? update(previous) : update) }));
  }, []);
  return [state, patch];
}
