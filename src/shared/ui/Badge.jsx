import React from 'react';

const tones = {
  Active: 'success', Completed: 'success', Paid: 'info', Pending: 'warning', 'On Leave': 'danger', Expense: 'danger', Revenue: 'success',
};

export function Badge({ children, tone }) {
  const t = tone || tones[children] || 'secondary';
  return <span className={`badge-soft bg-${t}-subtle text-${t}-emphasis`}>{children}</span>;
}
