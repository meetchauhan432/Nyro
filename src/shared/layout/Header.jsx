import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { IconButton } from '@shared/ui/Button.jsx';
export function Header({ page, onMenu, onSearch, onNotify, onProfile }) {
  return <header className="topbar">
    <div className="header-left">
      <IconButton name="menu" label="Open navigation" onClick={onMenu} className="icon-btn mobile-menu" />
      <span className="crumb">Workspace</span>
      <Icon name="chevron" size={14} />
      <span className="crumb-current">
        {({ overview: 'Overview', wallets: 'Wallets', transactions: 'Transactions', services: 'Services', members: 'Users & roles', 'member-profile': 'Member profile' })[page] || 'Overview'}
      </span>
    </div>
    <div className="header-actions">
      <button className="search-trigger" onClick={onSearch} aria-label="Search workspace">
        <Icon name="search" size={18} />
        <span>Search anything</span>
        <kbd>Ctrl K</kbd>
      </button>
      <IconButton
        name="bell"
        label="Notifications"
        onClick={onNotify}
        className="icon-btn notification-button"
      />
      <span className="header-divider" />
      <button className="profile-trigger" onClick={onProfile} aria-label="Account menu">
        <span className="avatar">JD</span>
        <span className="header-profile-name">Jordan</span>
        <Icon name="down" size={14} />
      </button>
    </div>
  </header>;
}
