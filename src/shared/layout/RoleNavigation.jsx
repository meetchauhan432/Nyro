import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { roleLevels } from '@features/members/domain/roles.js';
export function RoleNavigation({ members, open, collapsed, page, role, onToggle, onRole }) {
  return <div className="nav-group network-nav">
    <div className="nav-label">MANAGEMENT</div>
    <button
      className={`nav-item role-toggle ${['members', 'member-profile'].includes(page) ? 'active' : ''}`}
      onClick={onToggle}
      aria-expanded={open && !collapsed}
      aria-controls="role-tree"
      title={'Users & roles'}
    >
      <Icon name="users" size={19} />
      <span className="nav-text">{'Users & roles'}</span>
      <span className={`role-chevron ${open ? 'rotated' : ''}`}>
        <Icon name="down" size={15} />
      </span>
    </button>
    <div id="role-tree" className={`role-expand ${open && !collapsed ? 'expanded' : ''}`}>
      <div className="role-inner">
        <button
          className={`role-item all-roles ${['members', 'member-profile'].includes(page) && role === 'All' ? 'selected' : ''}`}
          onClick={() => onRole('All')}
          aria-current={['members', 'member-profile'].includes(page) && role === 'All' ? 'page' : undefined}
          tabIndex={open && !collapsed ? 0 : -1}
          disabled={!open || collapsed}
        >
          <i className="role-node" />
          All members
          <small>{members.length}</small>
        </button>
        {roleLevels.map(([id, label]) => <button
          key={id}
          className={`role-item ${['members', 'member-profile'].includes(page) && role === id ? 'selected' : ''}`}
          onClick={() => onRole(id)}
          aria-current={['members', 'member-profile'].includes(page) && role === id ? 'page' : undefined}
          tabIndex={open && !collapsed ? 0 : -1}
          disabled={!open || collapsed}
        >
          <i className="role-node" />
          <span className="role-label">
            {label + (label !== id ? ` (${id})` : '')}
          </span>
          <small>{members.filter(m => m.role === id).length}</small>
        </button>)}
      </div>
    </div>
  </div>;
}
