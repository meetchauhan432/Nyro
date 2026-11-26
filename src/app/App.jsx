import React, { useEffect } from 'react';
import { Sidebar } from '@shared/layout/Sidebar.jsx';
import { Header } from '@shared/layout/Header.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { OverviewPage } from '@features/dashboard/pages/OverviewPage.jsx';
import { WalletsPage } from '@features/wallets/pages/WalletsPage.jsx';
import { TransactionsPage } from '@features/transactions/pages/TransactionsPage.jsx';
import { ServicesPage } from '@features/services/pages/ServicesPage.jsx';
import { MembersPage } from '@features/members/pages/MembersPage.jsx';
import { MemberProfilePage } from '@features/members/pages/MemberProfilePage.jsx';
import { useDemoFinance } from '@features/payments/hooks/useDemoFinance.js';
import { useMembers } from '@features/members/hooks/useMembers.js';
import { useTransactions } from '@features/transactions/hooks/useTransactions.js';
import { useWorkspaceLayout } from './hooks/useWorkspaceLayout.js';
import { useWorkspaceKeyboard } from './hooks/useWorkspaceKeyboard.js';
import { WorkspaceDrawers } from './components/WorkspaceDrawers.jsx';

/** Composition root: feature hooks own their state; App only coordinates navigation. */
export function App({ logo }) {
  const layout = useWorkspaceLayout();
  const finance = useDemoFinance();
  const members = useMembers(layout.notify);
  const transactions = useTransactions(layout.notify);
  const ui = layout.state;
  const blocked = () => finance.state.busy || finance.lock.current;

  function open(type, extra) {
    if (!blocked()) layout.open(type, extra);
  }
  function close() {
    if (!blocked()) {
      finance.patch({ error: '' });
      layout.close();
    }
  }
  function selectRole(role) {
    if (blocked()) return;
    members.selectRole(role);
    layout.patch({ rolesOpen: true });
    layout.goTo('members');
  }
  function memberDetail(member) {
    if (blocked()) return;
    members.selectMember(member);
    layout.goTo('member-profile');
  }
  function startCreate() {
    if (!blocked()) {
      members.startCreate();
      open('create-user');
    }
  }
  function createMember(event) {
    if (members.createMember(event)) layout.goTo('members');
  }
  function navigate(route) {
    if (blocked()) return;
    if (route === 'members') {
      selectRole('All');
      return;
    }
    if (['payout', 'add', 'bill', 'upi'].includes(route)) {
      layout.patch({ mobile: false });
      if (route === 'payout') {
        finance.startPayout();
        open('payout');
      }
      else if (route === 'add') {
        finance.startTopUp();
        open('add');
      }
      else open('unavailable', { unavailable: route });
      return;
    }
    if (!['overview', 'wallets', 'transactions', 'services'].includes(route)) return;
    transactions.patch({ pageNum: 1 });
    layout.goTo(route);
  }
  function detail(transaction) {
    open('detail', { selectedTransaction: transaction });
  }
  function resetDemo() {
    if (blocked()) return;
    finance.reset();
    members.reset();
    if (ui.page === 'member-profile') layout.goTo('members'); else close();
    layout.notify('Demo data reset.');
  }

  useWorkspaceKeyboard({ drawer: ui.drawer, busy: finance.state.busy, openSearch: () => open('search'), close, closeMobile: () => layout.patch({ mobile: false }) });
  useEffect(() => {
    layout.scrollMotion.current?.refresh();
  }, [ui.page, members.state.memberRole]);

  const walletState = { wallets: finance.state.wallets, transactions: finance.state.transactions, hidden: ui.hidden, range: ui.range };
  const walletActions = { setState: layout.patch, navigate, detail };
  const memberActions = { ...members, setState: members.patch, selectRole, memberDetail, startCreate, createMember, close };
  const paymentActions = { setState: finance.patch, lookup: finance.lookup, submitPayout: finance.submitPayout, submitAdd: finance.submitAdd, close };
  const transactionState = { ...transactions.state, transactions: finance.state.transactions, hidden: ui.hidden };
  const transactionActions = { setState: transactions.patch, exportCSV: transactions.exportCSV, detail };

  const pages = {
    overview: <OverviewPage state={walletState} actions={walletActions} />,
    wallets: <WalletsPage state={walletState} actions={walletActions} />,
    transactions: <TransactionsPage state={transactionState} actions={transactionActions} />,
    services: <ServicesPage state={{}} actions={{ navigate }} />,
    members: <MembersPage state={members.state} actions={memberActions} />,
    'member-profile': <MemberProfilePage state={members.state} actions={memberActions} />,
  };

  return (
    <div className={`app ${ui.collapsed ? 'compact-app' : ''} ${ui.ambientMotion ? '' : 'ambient-paused'}`}>
      {ui.mobile && <button
        className="mobile-scrim"
        aria-label="Close navigation overlay"
        onClick={() => layout.patch({ mobile: false })}
      />}
      <Sidebar members={members.state.members} logo={logo} collapsed={ui.collapsed} mobile={ui.mobile}
        page={ui.page} onNav={navigate} onToggle={() => layout.patch({ collapsed: !ui.collapsed })}
        onClose={() => layout.patch({ mobile: false })} onHelp={() => open('help')}
        rolesOpen={ui.rolesOpen} role={members.state.memberRole}
        onRoles={() => layout.patch({ rolesOpen: ui.collapsed ? true : !ui.rolesOpen, collapsed: false })} onRole={selectRole} />
      <main className="main-workspace">
        <Header page={ui.page} onMenu={() => layout.patch({ mobile: true, collapsed: false })}
          onSearch={() => open('search')} onNotify={() => open('notifications')} onProfile={() => open('profile')} />
        <div key={ui.page} className="page-stage">{pages[ui.page] || pages.overview}</div>
      </main>
      <WorkspaceDrawers
        drawer={ui.drawer}
        ui={ui}
        financeState={{ ...finance.state, hidden: ui.hidden }}
        paymentActions={paymentActions}

        memberState={members.state}
        memberActions={memberActions}
        actions={{ setState: layout.patch, close, navigate, resetDemo }}
      />
      {ui.toast && <div className="toast" role="status"><Icon name="check" size={18} />{ui.toast}</div>}
    </div>
  );
}
