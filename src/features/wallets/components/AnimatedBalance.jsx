import React from 'react';
import { money } from '@shared/lib/money.js';
import { useAnimatedBalance } from '../hooks/useAnimatedBalance.js';

export function AnimatedBalance({ hidden, value }) {
  const display = useAnimatedBalance(value, hidden);
  return (
    <span className="balance-number" aria-label={hidden ? 'Balance hidden' : money(value)}>
      <span aria-hidden="true">{hidden ? '₹ ••••••' : money(display)}</span>
    </span>
  );
}
