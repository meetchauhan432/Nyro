import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { ServiceLauncher } from '@features/services/components/ServiceLauncher.jsx';
export function ServicesPage({ state, actions }) {
  return <div className="page-content">
    <div className="page-heading">
      <div>
        <div className="overline">FINANCIAL WORKSPACE</div>
        <h1>Services</h1>
        <p>Quick access to financial workflows.</p>
      </div>
      <span className="demo-pill">
        <i />
        Demo workspace
      </span>
    </div>
    <ServiceLauncher onAction={r => actions.navigate(r)} full={true} />
    <section className="surface wallet-note">
      <Icon name="info" size={22} />
      <div>
        <h2>Prototype scope</h2>
        <p>Payout and Add Money are fully simulated. Credit card bill payment and RuPay UPI are visible as reference services only; their backend requirements have not been confirmed.</p>
      </div>
    </section>
  </div>;
}
