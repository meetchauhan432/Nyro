import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
export function UnavailableServiceDrawer({ state, actions }) {
  const close = actions.close;
  return <Drawer
    title={state.unavailable === 'bill' ? 'Credit card bill payment' : 'RuPay UPI'}
    subtitle="Reference service · Not connected"
    onClose={close}
  >
    <div className="notice">
      <Icon name="info" size={22} />
      <div>
        <b>Outside this prototype</b>
        <p>This service is shown for navigation and design exploration only. Actual workflows and backend APIs require company approval.</p>
      </div>
    </div>
    <Button label="Back to workspace" onClick={close} className="btn primary-btn wide" />
  </Drawer>;
}
