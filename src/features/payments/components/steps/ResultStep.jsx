import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { TransactionReceipt } from '@features/transactions/components/TransactionReceipt.jsx';
export function ResultStep({ state, actions }) {
  return <div className="step-content">
    <TransactionReceipt tx={state.result} hidden={state.hidden} />
    <div className="hint-box">
      <Icon name="info" size={17} />
      {state.result.status === 'Pending' ? 'Demo funds are reserved while pending.' : state.result.status === 'Failed' ? 'No amount was deducted.' : 'The fictional wallet and activity list have been updated.'}
    </div>
    <Button label="Done" onClick={() => actions.close()} className="btn primary-btn wide" />
  </div>;
}
