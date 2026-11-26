import React from 'react';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { serviceList } from '../config/services.js';
export function ServiceLauncher({ onAction, full = false }) {
  return <section className="service-section">
    <SectionTitle
      title={full ? 'All services' : 'Quick services'}
      desc={full ? 'Choose a financial service to get started.' : null}
      action={!full && <Button label="All services" onClick={() => onAction('services')} className="text-btn" iconName="grid" />}
    />
    <div className="service-grid">
      {serviceList.map(s => <button key={s.action} className="service-tile" onClick={() => onAction(s.action)}>
        <span className={`service-icon ${s.action === 'payout' ? 'primary-icon' : ''}`}>
          <Icon name={s.icon} size={22} />
        </span>
        <span className="service-copy">
          <b>{s.name}</b>
          <small>{s.desc}</small>
        </span>
        <span className="service-arrow">
          <Icon name="chevron" size={16} />
        </span>
      </button>)}
    </div>
  </section>;
}
