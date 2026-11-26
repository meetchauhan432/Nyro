import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { StatusBadge } from '@shared/ui/StatusBadge.jsx';
import { money } from '@shared/lib/money.js';
export function TransactionList({ transactions, onDetail, hidden, limit }) {
  const data = limit ? transactions.slice(0, limit) : transactions;
  return <div className="transaction-list">
    {data.length === 0 ? <div className="empty-state">
      <Icon name="search" size={28} />
      <h3>No matching transactions</h3>
      <p>Try a different filter or search.</p>
    </div> : data.map(t => <button
      key={t.id}
      className="transaction-row"
      onClick={() => onDetail(t)}
      aria-label={`View ${t.id}, ${t.name}`}
    >
      <span className={`tx-icon ${t.direction === 'in' ? 'incoming' : ''}`}>
        <Icon name={t.type === 'Bill payment' ? 'card' : t.direction === 'in' ? 'arrowdown' : 'arrowup'} size={19} />
      </span>
      <span className="tx-info">
        <b>{t.name}</b>
        <small>{`${t.type} · ${t.date}`}</small>
      </span>
      <span className="tx-amount">
        <b className={t.direction === 'in' ? 'positive' : ''}>
          {hidden ? '₹ ••••' : `${t.direction === 'in' ? '+' : '−'} ${money(t.amount)}`}
        </b>
        <StatusBadge status={t.status} />
      </span>
      <span className="tx-chevron">
        <Icon name="chevron" size={15} />
      </span>
    </button>)}
  </div>;
}
