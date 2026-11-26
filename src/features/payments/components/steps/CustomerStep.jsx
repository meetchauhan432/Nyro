import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { Field } from '@shared/ui/Field.jsx';
export function CustomerStep({ state, actions }) {
  return <form onSubmit={e => actions.lookup(e)}>
    <h3 className="form-heading">Who are you paying?</h3>
    <p className="form-subtitle">Look up a customer using the fictional demo number.</p>
    <Field
      label="Mobile number"
      value={state.mobileNumber}
      onChange={v => actions.setState({ mobileNumber: v, error: '' })}
      placeholder="Enter demo mobile number"
      inputMode="numeric"
      error={state.error}
    />
    <div className="hint-box">
      <Icon name="info" size={17} />
      <span>
        {'Demo customer: '}
        <b>9000000000</b>
      </span>
    </div>
    <button className="btn primary-btn wide" type="submit">
      Find customer
      <Icon name="chevron" size={18} />
    </button>
  </form>;
}
