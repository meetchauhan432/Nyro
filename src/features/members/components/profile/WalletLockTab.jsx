import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
export function WalletLockTab({ state, actions, member, children }) {
  const note = text => <div className="hint-box">
    <Icon name="info" size={17} />
    {text}
  </div>;
  const details = items => <dl className="detail-list">
    {items.map(([a, b]) => <div key={a}>
      <dt>{a}</dt>
      <dd>{b}</dd>
    </div>)}
  </dl>;
  return <div className="member-form">
    <SectionTitle title="Wallet controls" desc="Account wallet restrictions." />
    {details([['Wallet lock', 'Not connected'], ['Wallet balance', 'Not available for this member']])}
    {note('Locking or unlocking real funds requires backend authorization; no wallet changes are made here.')}
  </div>;
}
