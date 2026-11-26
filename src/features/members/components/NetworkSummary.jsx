import React from 'react';
import { roleName } from '../domain/roles.js';

export function NetworkSummary({ members, role }) {
  const metrics = [
    [members.length, 'Members'],
    [members.filter(member => member.status === 'Active').length, 'Active'],
    [members.filter(member => member.kyc === 'Pending').length, 'KYC pending'],
  ];
  return (
    <section className="surface network-overview">
      <div className="network-intro">
        <span className="eyebrow">NETWORK SUMMARY</span>
        <h2>{role === 'All' ? 'Member overview' : `${roleName(role)} overview`}</h2>
        <p>Monitor account and verification status.</p>
      </div>
      <div className="network-stats">
        {metrics.map(([value, label]) => (
          <div key={label}><b>{value}</b><span>{label}</span></div>
        ))}
      </div>
    </section>
  );
}
