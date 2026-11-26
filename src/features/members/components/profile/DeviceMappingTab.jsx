import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
export function DeviceMappingTab({ state, actions, member, children }) {
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
    <SectionTitle title="Device mapping" desc="Registered device information." />
    {details([['Mapped devices', 'Not connected'], ['Device authorization', 'Requires backend integration']])}
    {note('Device registration and security controls are outside the current prototype.')}
  </div>;
}
