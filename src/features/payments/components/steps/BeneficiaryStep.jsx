import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { beneficiaries } from '../../mocks/beneficiaries.js';
export function BeneficiaryStep({ state, actions }) {
  return <div className="step-content">
    <h3 className="form-heading">Select a beneficiary</h3>
    <p className="form-subtitle">Choose a saved fictional bank account.</p>
    {beneficiaries.map(b => <button
      key={b.id}
      className={`beneficiary ${state.recipient && state.recipient.id === b.id ? 'chosen' : ''}`}
      aria-pressed={!!(state.recipient && state.recipient.id === b.id)}
      onClick={() => actions.setState({ recipient: b })}
    >
      <span className="beneficiary-avatar">{b.initial}</span>
      <span className="beneficiary-text">
        <b>{b.name}</b>
        <small>{`${b.bank} · •••• ${b.last4}`}</small>
      </span>
      <span className="radio-mark">
        {state.recipient && state.recipient.id === b.id && <Icon name="check" size={14} />}
      </span>
    </button>)}
    <Button
      label="Continue"
      onClick={() => actions.setState({ step: 2, error: '' })}
      className="btn primary-btn wide"
      {...{ disabled: !state.recipient }}
    />
  </div>;
}
