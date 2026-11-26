import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { initials } from '@shared/lib/initials.js';
import { roleName } from '../domain/roles.js';

export function MemberTable({ rows, members, onSelect, onClear }) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <Icon name="users" size={28} />
        <h3>No matching members</h3>
        <p>Try a different search or filter.</p>
        <Button label="Clear filters" onClick={onClear} className="text-btn" />
      </div>
    );
  }
  const memberNames = new Map(members.map(member => [member.id, member.name]));
  return (
    <div className="member-table">
      <div className="member-table-head">
        {['Member', 'Role', 'Reports to', 'Account', 'KYC', ''].map((label, index) => <span key={index}>{label}</span>)}
      </div>
      {rows.map((member, index) => (
        <button key={member.id} className="member-row" style={{ '--row-delay': `${Math.min(index, 7) * 25}ms` }}
          onClick={() => onSelect(member)} aria-label={`View member ${member.name}`}>
          <span className="member-identity">
            <span className="member-avatar">{initials(member.name)}</span>
            <span className="member-name"><b>{member.name}</b><small>{`${member.id} · ${member.region}`}</small></span>
          </span>
          <span className="member-role">{roleName(member.role)}</span>
          <span className="member-parent">{memberNames.get(member.parent) || '—'}</span>
          <span className={`member-status ${member.status.toLowerCase()}`}><i className="status-dot" />{member.status}</span>
          <span className={`member-kyc ${member.kyc.toLowerCase()}`}><Icon name={member.kyc === 'Verified' ? 'shield' : 'clock'} size={14} />{member.kyc}</span>
          <span className="member-open"><Icon name="chevron" size={16} /></span>
        </button>
      ))}
    </div>
  );
}
