import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { roleLevels } from '../domain/roles.js';

export function MemberFilters({ filters, onChange }) {
  return (
    <div className="transaction-toolbar member-toolbar">
      <label className="table-search">
        <Icon name="search" size={18} />
        <input value={filters.memberQuery} onChange={event => onChange({ memberQuery: event.target.value })}
          placeholder="Search name, ID or mobile" aria-label="Search members" />
      </label>
      <select
        value={filters.memberRole}
        onChange={event => onChange({ memberRole: event.target.value })}
        aria-label="Filter by role"
      >
        <option value="All">All roles</option>
        {roleLevels.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select>
      <select
        value={filters.memberStatus}
        onChange={event => onChange({ memberStatus: event.target.value })}
        aria-label="Filter by account status"
      >
        {['All', 'Active', 'Inactive'].map(status => <option key={status} value={status}>{status === 'All' ? 'All accounts' : status}</option>)}
      </select>
      <select
        value={filters.memberKyc}
        onChange={event => onChange({ memberKyc: event.target.value })}
        aria-label="Filter by KYC"
      >
        {['All', 'Verified', 'Pending'].map(status => <option key={status} value={status}>{status === 'All' ? 'All KYC' : status}</option>)}
      </select>
    </div>
  );
}
