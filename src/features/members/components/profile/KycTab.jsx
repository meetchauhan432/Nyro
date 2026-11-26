import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
export function KycTab({ state, actions, member, children }) {
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
    <SectionTitle title="Verification status" desc="KYC overview for the fictional account." />
    {details([['KYC status', member.kyc], ['PAN', 'Not collected'], ['Aadhaar', 'Not collected'], ['Documents', 'No files collected']])}
    {note('Actual document upload and verification require approved secure APIs. Do not enter real identity information.')}
  </div>;
}
