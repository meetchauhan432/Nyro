import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { WalletPanel } from '@features/wallets/components/WalletPanel.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { TransactionList } from '@features/transactions/components/TransactionList.jsx';
export function WalletsPage({ state, actions }) {
  return <div className="page-content">
    <div className="page-heading">
      <div>
        <div className="overline">FINANCIAL WORKSPACE</div>
        <h1>Wallets</h1>
        <p>Manage and review your three wallet balances.</p>
      </div>
      <span className="demo-pill">
        <i />
        Demo workspace
      </span>
    </div>
    <WalletPanel
      wallets={state.wallets}
      hidden={state.hidden}
      onToggle={() => actions.setState({ hidden: !state.hidden })}
      onAction={r => actions.navigate(r)}
    />
    <section className="surface wallet-note">
      <Icon name="info" size={22} />
      <div>
        <h2>About your balances</h2>
        <p>This local demo uses fictional wallet balances. Pending payouts reserve their total amount; failed payouts do not reduce the balance.</p>
      </div>
    </section>
    <section className="surface activity">
      <SectionTitle title="Wallet activity" action={<Button
        label="View all"
        onClick={() => actions.navigate('transactions')}
        className="text-btn"
        iconName="chevron"
      />} />
      <TransactionList
        transactions={state.transactions}
        hidden={state.hidden}
        limit={6}
        onDetail={t => actions.detail(t)}
      />
    </section>
  </div>;
}
