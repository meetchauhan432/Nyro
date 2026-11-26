import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { StatusBadge } from '@shared/ui/StatusBadge.jsx';
import { money } from '@shared/lib/money.js';
export function TransactionReceipt({ tx, hidden }) {
  return <div className="receipt">
    <div className="receipt-hero">
      <span className={`receipt-icon ${tx.status.toLowerCase()}`}>
        <Icon name={tx.status === 'Completed' ? 'check' : tx.status === 'Pending' ? 'clock' : 'alert'} size={27} />
      </span>
      <div className="receipt-amount">
        {hidden ? '₹ ••••' : money(tx.amount)}
      </div>
      <StatusBadge status={tx.status} />
      <p>Demonstration transaction</p>
    </div>
    <dl className="detail-list">
      {([['Reference', tx.id], ['Type', tx.type], ['Recipient / description', tx.name], ['Date', tx.date], ...(tx.bank ? [['Bank', tx.bank], ['Account', `•••• ${tx.last4}`]] : []), ['Amount', hidden ? 'Hidden' : money(tx.amount)], ['Fee', hidden ? 'Hidden' : money(tx.fee || 0)], ['Status', tx.status]]).map(([a, b]) => <div key={a}>
        <dt>{a}</dt>
        <dd>{b}</dd>
      </div>)}
    </dl>
  </div>;
}
