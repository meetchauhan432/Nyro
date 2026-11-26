import React, { useEffect, useState } from 'react';
import { Header } from '@shared/layout/Header.jsx';
import { Sidebar } from '@shared/layout/Sidebar.jsx';
import { FinanceDashboardPage } from '@features/finance/pages/FinanceDashboardPage.jsx';
import { TeamManagementPage } from '@features/team/pages/TeamManagementPage.jsx';
import { WorkspaceProvider, useWorkspace } from '@features/operations/WorkspaceContext.jsx';
import { OperationsDashboard } from '@features/operations/pages/OperationsDashboard.jsx';
import { PaymentPage } from '@features/operations/pages/PaymentPage.jsx';
import { ReportTable } from '@features/operations/components/ReportTable.jsx';
import { MembersPage, MemberProfile } from '@features/members/MembersPage.jsx';
import { SchemesPage, MasterPlaceholder } from '@features/masters/SchemesPage.jsx';
import { pageIds, pages } from './navigation.js';
const read = () => { const [id, memberId] = window.location.hash.slice(1).split('/'); return { id: pageIds.includes(id) ? id : 'default', memberId: memberId || '' }; };
function Shell({ logo, onSignOut }) {
    const { data } = useWorkspace();
    const [route, setRoute] = useState(read), [mode, setMode] = useState('admin'), [menuOpen, setMenuOpen] = useState(false), [collapsed, setCollapsed] = useState(false);
    const page = route.id;
    const item = pages.find(p => p.id === page);
    useEffect(() => { const sync = () => setRoute(read()); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
    useEffect(() => { const esc = e => { if (e.key === 'Escape')
        setMenuOpen(false); }; window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc); }, []);
    function navigate(id, memberId = '') { const next = { id, memberId }; setRoute(next); window.location.hash = id + (memberId ? `/${memberId}` : ''); setMenuOpen(false); window.scrollTo({ top: 0 }); }
    function changeMode(next) { setMode(next); navigate('default'); }
    const blocked = mode === 'operator' && item.mode === 'admin';
    let content;
    if (blocked)
        content = <OperationsDashboard onNavigate={navigate} mode={mode}/>;
    else if (page === 'default')
        content = <OperationsDashboard onNavigate={navigate} mode={mode}/>;
    else if (page === 'final')
        content = <FinanceDashboardPage />;
    else if (page === 'team')
        content = <TeamManagementPage />;
    else if (page === 'schemes')
        content = <SchemesPage />;
    else if (page.startsWith('master-'))
        content = <MasterPlaceholder title={item.label}/>;
    else if (page.startsWith('member-'))
        content = <MembersPage page={page} onProfile={id => navigate('profile', id)}/>;
    else if (page === 'profile') {
        const m = data.members.find(x => x.id === route.memberId);
        content = <MemberProfile memberId={route.memberId} onBack={() => navigate(m ? pages.find(x => x.label === m.role).id : 'member-0')}/>;
    }
    else if (page === 'reports' || page.startsWith('statement-'))
        content = <ReportTable wallet={page === 'reports' ? '' : { 'statement-main': 'Main', 'statement-settlement': 'Settlement', 'statement-upi': 'UPI' }[page]}/>;
    else
        content = <PaymentPage page={page} onNavigate={navigate}/>;
    return <div className={`ops-app ${menuOpen ? 'sidebar-open' : ''} ${collapsed ? 'ops-collapsed' : ''}`}><Sidebar logo={logo} current={page} onNavigate={navigate} mode={mode} onClose={() => setMenuOpen(false)}/><div className="sidebar-backdrop" onClick={() => setMenuOpen(false)}/><Header onMenu={() => window.matchMedia('(min-width:992px)').matches ? setCollapsed(x => !x) : setMenuOpen(x => !x)} onSignOut={onSignOut} mode={mode} onMode={changeMode} onNavigate={navigate} balance={data.wallets.Main}/><div className="app-wrapper"><main className="page-enter" key={`${mode}-${page}-${route.memberId}`}><div className="page-head ops-page-head"><div><h4>{blocked ? 'Dashboard' : item.crumb}</h4><nav aria-label="breadcrumb"><ol className="breadcrumb mb-0"><li className="breadcrumb-item">Home</li><li className="breadcrumb-item active" aria-current="page">{blocked ? 'Dashboard' : item.crumb}</li></ol></nav></div><span className="ops-demo-badge"><span /> Demo environment</span></div>{content}</main><footer className="app-footer"><span>© 2026 NYRO Technologies.</span><span>Demo data · API integration pending</span></footer></div></div>;
}
export function App(props) { return <WorkspaceProvider><Shell {...props}/></WorkspaceProvider>; }
