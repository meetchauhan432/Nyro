import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { IconButton } from '@shared/ui/Button.jsx';
import { navGroups } from '@app/navigation.js';
import { RoleNavigation } from './RoleNavigation.jsx';
export function Sidebar({ members, logo, collapsed, mobile, page, onNav, onToggle, onClose, onHelp, rolesOpen, role, onRoles, onRole }) {
  return <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobile ? 'mobile-open' : ''}`} aria-label="Main navigation">
    <div className="brand-row">
      <div className="brand-logo">
        <img src={logo} alt="NYRO Technologies" />
      </div>
      <IconButton name="close" label="Close navigation" onClick={onClose} className="mobile-close icon-btn" />
    </div>
    <div className="workspace">
      <div className="workspace-mark">N</div>
      <div className="workspace-copy">
        <b>Business workspace</b>
        <span>Demo operator</span>
      </div>
    </div>
    <nav className="nav-content">
      {navGroups.map(g => <div className="nav-group" key={g.label}>
        <div className="nav-label">{g.label}</div>
        {g.items.map(([label, name, route]) => <button
          key={route}
          className={`nav-item ${page === route ? 'active' : ''}`}
          onClick={() => onNav(route)}
          title={collapsed ? label : undefined}
          aria-current={page === route ? 'page' : undefined}
        >
          <Icon name={name} size={19} />
          <span className="nav-text">{label}</span>
          {page === route && <i className="active-dot" />}
        </button>)}
      </div>)}
      <RoleNavigation
        members={members}
        open={rolesOpen}
        collapsed={collapsed && !mobile}
        page={page}
        role={role}
        onToggle={onRoles}
        onRole={onRole}
      />
    </nav>
    <div className="sidebar-foot">
      <button className="nav-item help-link" onClick={onHelp} title="About this demo">
        <Icon name="help" size={19} />
        <span className="nav-text">{'Help & information'}</span>
      </button>
      <div className="sidebar-rule" />
      <div className="side-profile">
        <span className="avatar side-avatar">JD</span>
        <div className="profile-text">
          <b>Jordan Davis</b>
          <span>Demo account</span>
        </div>
        <span className="online-dot" />
      </div>
      <button
        className="collapse-control"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <Icon name="panel" size={18} />
        <span className="nav-text">Collapse sidebar</span>
      </button>
    </div>
  </aside>;
}
