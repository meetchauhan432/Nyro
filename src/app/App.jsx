import React, { useEffect, useState } from 'react';
import { Header } from '@shared/layout/Header.jsx';
import { Sidebar } from '@shared/layout/Sidebar.jsx';
import { DefaultDashboardPage } from '@features/dashboard/pages/DefaultDashboardPage.jsx';
import { FinanceDashboardPage } from '@features/finance/pages/FinanceDashboardPage.jsx';
import { TeamManagementPage } from '@features/team/pages/TeamManagementPage.jsx';
import { pageIds, pages } from './navigation.js';

const views = { default: DefaultDashboardPage, final: FinanceDashboardPage, team: TeamManagementPage };
const read = () => { const id = window.location.hash.replace('#', ''); return pageIds.includes(id) ? id : 'default'; };

/** Composition root: shell (header + sidebar) around the three NexLink pages, routed by hash. */
export function App({ logo, onSignOut }) {
  const [page, setPage] = useState(read);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const sync = () => setPage(read());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  function navigate(id) { window.location.hash = id; setMenuOpen(false); window.scrollTo({ top: 0 }); }
  const View = views[page];
  const crumb = pages.find(item => item.id === page).crumb;

  return (
    <div className={`${menuOpen ? 'sidebar-open' : ''}`}>
      <Sidebar logo={logo} current={page} onNavigate={navigate} />
      <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />
      <Header onMenu={() => setMenuOpen(true)} onSignOut={onSignOut} />
      <div className="app-wrapper">
        <main key={page} className="page-enter">
          <div className="page-head">
            <h4>{crumb}</h4>
            <nav aria-label="breadcrumb"><ol className="breadcrumb mb-0"><li className="breadcrumb-item">Home</li><li className="breadcrumb-item active" aria-current="page">{crumb}</li></ol></nav>
          </div>
          <View />
        </main>
        <footer className="app-footer"><span>© 2026 NYRO Technologies.</span><span>Home · FAQ’s · Support</span></footer>
      </div>
    </div>
  );
}
