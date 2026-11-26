import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { WalletPanel } from '@features/wallets/components/WalletPanel.jsx';
import { ServiceLauncher } from '@features/services/components/ServiceLauncher.jsx';
import { TransactionList } from '@features/transactions/components/TransactionList.jsx';
import { CashFlow } from '../components/CashFlow.jsx';
export function OverviewPage({ state, actions }) {
  return <div className="page-content">
    <div className="page-heading">
      <div>
        <div className="overline">
          <span className="overline-line" />
          {' FINANCIAL WORKSPACE'}
        </div>
        <h1>Your money, in motion.</h1>
        <p>A clearer way to manage funds and everyday payments.</p>
      </div>
      <div className="heading-right">
        <span className="demo-pill">
          <i />
          Demo workspace
        </span>
        <span className="heading-date">Sample data · 25 Nov 2026</span>
      </div>
    </div>
    <WalletPanel
      wallets={state.wallets}
      hidden={state.hidden}
      onToggle={() => actions.setState({ hidden: !state.hidden })}
      onAction={r => actions.navigate(r)}
    />
    <ServiceLauncher onAction={r => actions.navigate(r)} />
    <div className="bottom-grid">
      <section className="surface activity">
        <SectionTitle
          title="Recent activity"
          desc="Latest transactions across your wallets"
          action={<Button
            label="View all"
            onClick={() => actions.navigate('transactions')}
            className="text-btn"
            iconName="chevron"
          />}
        />
        <TransactionList
          transactions={state.transactions}
          hidden={state.hidden}
          limit={4}
          onDetail={t => actions.detail(t)}
        />
      </section>
      <CashFlow range={state.range} setRange={r => actions.setState({ range: r })} hidden={state.hidden} />
    </div>
    <div className="workspace-footer">
      <span>
        <Icon name="shield" size={15} />
        {' Local demonstration · No real money is moved'}
      </span>
      <span>NYRO Technologies © 2026</span>
    </div>
  </div>;
}
