import React from 'react';

export function StatusBadge({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      <i className="status-dot" />
      {status}
    </span>
  );
}
