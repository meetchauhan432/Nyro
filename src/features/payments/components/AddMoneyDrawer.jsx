import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
import { Field } from '@shared/ui/Field.jsx';
import { money } from '@shared/lib/money.js';
import { TransactionReceipt } from '@features/transactions/components/TransactionReceipt.jsx';
export function AddMoneyDrawer({ state, actions }) {
  const close = actions.close;
  return <Drawer title="Add money" subtitle="Fund your main wallet · Demo mode" onClose={close} busy={state.busy}>
    {state.step === 1 ? <div>
      <TransactionReceipt tx={state.result} hidden={state.hidden} />
      <Button label="Done" onClick={close} className="btn primary-btn wide" />
    </div> : <form onSubmit={e => {
      e.preventDefault();
      actions.submitAdd();
    }}>
      <h3 className="form-heading">Choose an amount</h3>
      <p className="form-subtitle">Simulate adding money without a gateway or real payment.</p>
      <Field
        label="Amount (INR)"
        value={state.amount}
        onChange={v => actions.setState({ amount: v, error: '' })}
        placeholder="0.00"
        inputMode="decimal"
        error={state.error}
      />
      <div className="amount-presets">
        {[1000, 5000, 10000].map(x => <button
          type="button"
          key={x}
          className="btn outline-btn"
          onClick={() => actions.setState({ amount: String(x), error: '' })}
        >
          {money(x * 100, true)}
        </button>)}
      </div>
      <div className="hint-box">
        <Icon name="shield" size={17} />
        This only updates the local fictional balance.
      </div>
      <button type="submit" disabled={state.busy} className="btn primary-btn wide">
        {state.busy ? 'Processing simulation…' : 'Confirm demo top-up'}
      </button>
    </form>}
  </Drawer>;
}
