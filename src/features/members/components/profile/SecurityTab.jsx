import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
export function SecurityTab({ state, actions, member, children }) {
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
    <SectionTitle title="Account security" desc="Security controls require backend authorization." />
    {details([['Account status', member.status], ['Password management', 'Not connected'], ['Authentication', 'Not connected']])}
    {note('No passwords, OTPs or production access are managed by this prototype.')}
  </div>;
}
