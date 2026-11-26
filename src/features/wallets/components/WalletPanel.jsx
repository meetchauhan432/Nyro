import React from 'react';
import { Button, IconButton } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { AnimatedBalance } from './AnimatedBalance.jsx';
export function WalletPanel({ wallets, hidden, onToggle, onAction }) {
  const format = v => <AnimatedBalance value={v} hidden={hidden} />;
  return <section className="wallet-grid">
    <article className="balance-card">
      <div className="wallet-decoration" aria-hidden={true} />
      <div className="wallet-ribbon" aria-hidden={true} />
      <div className="balance-top">
        <span className="balance-tag">
          <i className="tiny-dot" />
          {' MAIN WALLET'}
        </span>
        <IconButton
          name={hidden ? 'eyeoff' : 'eye'}
          label={hidden ? 'Show balances' : 'Hide balances'}
          onClick={onToggle}
          className="balance-eye"
        />
      </div>
      <div className="balance-label">Available balance</div>
      <div className="balance-value">
        {format(wallets.main)}
      </div>
      <div className="balance-currency">
        {'INR '}
        <span>• Indian Rupee</span>
      </div>
      <div className="balance-actions">
        <Button label="Add money" onClick={() => onAction('add')} className="btn wallet-light" iconName="plus" />
        <Button
          label="Payout"
          onClick={() => onAction('payout')}
          className="btn wallet-secondary"
          iconName="arrowup"
        />
      </div>
      <div className="balance-card-index">01 / 03</div>
    </article>
    <article className="wallet-secondary-card">
      <div className="wallet-secondary-title">
        <span className="eyebrow">YOUR OTHER WALLETS</span>
        <span className="count-label">02</span>
      </div>
      {[['settlement', 'Settlement wallet', 'bank', 'Funds awaiting settlement'], ['upi', 'UPI wallet', 'upi', 'Collection balance']].map(([k, label, ic, desc]) => <div className="secondary-wallet" key={k}>
        <span className="wallet-icon">
          <Icon name={ic} size={20} />
        </span>
        <div className="wallet-text">
          <span className="wallet-name">{label}</span>
          <b className="secondary-value">
            {format(wallets[k])}
          </b>
          <span className="wallet-description">{desc}</span>
        </div>
        <span className="wallet-currency">INR</span>
      </div>)}
    </article>
  </section>;
}
