import React from 'react';
import { LayoutDashboard, Landmark, Users } from 'lucide-react';
import { pages } from '@app/navigation.js';

const icons = { default: LayoutDashboard, final: Landmark, team: Users };

export function Sidebar({ logo, current, onNavigate }) {
  const groups = [...new Set(pages.map(page => page.group))];
  return (
    <aside className="app-sidebar" aria-label="Primary">
      <div className="brand"><img src={logo} alt="NYRO Technologies" /></div>
      <nav>
        {groups.map(group => (
          <div key={group}>
            <div className="nav-label">{group}</div>
            {pages.filter(page => page.group === group).map(page => {
              const Icon = icons[page.id];
              return (
                <button key={page.id} type="button" className={`nav-item-btn ${current === page.id ? 'active' : ''}`}
                  aria-current={current === page.id ? 'page' : undefined} onClick={() => onNavigate(page.id)}>
                  <Icon size={18} />{page.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
