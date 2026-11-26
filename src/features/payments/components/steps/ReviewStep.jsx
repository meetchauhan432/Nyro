import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { money } from '@shared/lib/money.js';
import { parseAmount, feeFor } from '../../domain/paymentRules.js';
export function ReviewStep({ state, actions }) {
  const total = (parseAmount(state.amount) || 0) + feeFor(parseAmount(state.amount) || 0);
  return <div className="step-content">
    <h3 className="form-heading">Review your payout</h3>
    <p className="form-subtitle">Check the details before confirming the simulated transfer.</p>
    <div className="review-amount">
      {money(parseAmount(state.amount) || 0)}
    </div>
    <dl className="detail-list">
      {([['Recipient', state.recipient.name], ['Bank account', `${state.recipient.bank} •••• ${state.recipient.last4}`], ['From', 'Main wallet'], ['Demo fee', money(feeFor(parseAmount(state.amount) || 0))], ['Total debit', money(total)]]).map(([a, b]) => <div key={a}>
        <dt>{a}</dt>
        <dd>{b}</dd>
      </div>)}
    </dl>
    <label className="field">
      <span className="field-label">Demo outcome (for testing)</span>
      <select
        value={state.outcome}
        onChange={e => actions.setState({ outcome: e.target.value })}
        disabled={state.busy}
      >
        {['Completed', 'Pending', 'Failed'].map(x => <option key={x}>{x}</option>)}
      </select>
    </label>
    <div className="hint-box">
      <Icon name="shield" size={17} />
      No real transfer will occur.
    </div>
    <Button
      label={state.busy ? 'Processing simulation…' : 'Confirm demo payout'}
      onClick={() => actions.submitPayout()}
      className="btn primary-btn wide"
      iconName="lock"
      {...{ disabled: state.busy }}
    />
  </div>;
}
