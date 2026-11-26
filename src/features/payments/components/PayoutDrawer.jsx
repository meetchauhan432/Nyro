import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
import { CustomerStep } from './steps/CustomerStep.jsx';
import { BeneficiaryStep } from './steps/BeneficiaryStep.jsx';
import { AmountStep } from './steps/AmountStep.jsx';
import { ReviewStep } from './steps/ReviewStep.jsx';
import { ResultStep } from './steps/ResultStep.jsx';

const STEP_COMPONENTS = [CustomerStep, BeneficiaryStep, AmountStep, ReviewStep, ResultStep];
const labels = ['Customer', 'Beneficiary', 'Amount', 'Review'];

export function PayoutDrawer({ state, actions }) {
  const Step = STEP_COMPONENTS[state.step];
  const content = Step ? <Step state={state} actions={actions} /> : null;
  return <Drawer
    title="Payout"
    subtitle="Simulated bank transfer · Demo mode"
    onClose={() => actions.close()}
    busy={state.busy}
  >
    {state.step < 4 && <div className="steps">
      {labels.map((l, i) => <div key={l} className={`step ${i === state.step ? 'current' : i < state.step ? 'done' : ''}`}>
        <span className="step-number">
          {i < state.step ? <Icon name="check" size={12} /> : String(i + 1)}
        </span>
        <span className="step-label">{l}</span>
      </div>)}
    </div>}
    <div key={state.step} className="payout-step-stage">{content}</div>
    {state.step > 0 && state.step < 4 && !state.busy && <Button
      label="Back"
      onClick={() => actions.setState({ step: state.step - 1, error: '' })}
      className="text-btn back-btn"
      iconName="back"
    />}
  </Drawer>;
}
