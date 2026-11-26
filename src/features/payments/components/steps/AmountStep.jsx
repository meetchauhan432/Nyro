import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { Field } from '@shared/ui/Field.jsx';
import { money } from '@shared/lib/money.js';
import { parseAmount, validatePayout, feeFor } from '../../domain/paymentRules.js';
export function AmountStep({ state, actions }) {
  const total = (parseAmount(state.amount) || 0) + feeFor(parseAmount(state.amount) || 0);
  return <form onSubmit={e => {
    e.preventDefault();
    const err = validatePayout(state.amount, state.wallets.main);
    actions.setState(err ? { error: err } : { step: 3, error: '' });
  }}>
    <h3 className="form-heading">How much would you like to send?</h3>
    <p className="form-subtitle">{`To ${state.recipient.name} · ${state.recipient.bank} •••• ${state.recipient.last4}`}</p>
    <div className="available-strip">
      <span>Available main wallet</span>
      <b>
        {state.hidden ? 'Hidden' : money(state.wallets.main)}
      </b>
    </div>
    <Field
      label="Amount (INR)"
      value={state.amount}
      onChange={v => actions.setState({ amount: v, error: '' })}
      placeholder="0.00"
      inputMode="decimal"
      error={state.error}
    />
    <dl className="detail-list compact">
      <div>
        <dt>Demo transfer fee</dt>
        <dd>
          {money(feeFor(parseAmount(state.amount) || 0))}
        </dd>
      </div>
      <div>
        <dt>Total debit</dt>
        <dd>
          {money(total)}
        </dd>
      </div>
    </dl>
    <button type="submit" className="btn primary-btn wide">
      Review payout
      <Icon name="chevron" size={18} />
    </button>
  </form>;
}
