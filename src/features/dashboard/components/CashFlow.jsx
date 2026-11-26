import React from 'react';
import { SectionTitle } from '@shared/ui/SectionTitle.jsx';
import { money } from '@shared/lib/money.js';
import { flowData } from '../mocks/flow.js';
export function CashFlow({ range, setRange, hidden }) {
  const data = flowData[range];
  return <section className="surface cashflow">
    <SectionTitle title="Money flow" desc="Illustrative wallet movement" action={<div className="segmented">
      {['7D', '30D'].map(r => <button
        key={r}
        className={range === r ? 'selected' : ''}
        onClick={() => setRange(r)}
        aria-pressed={range === r}
      >{r}</button>)}
    </div>} />
    <div className="flow-total">
      <div>
        <span className="flow-caption">
          <i className="legend-dot" />
          Inflow
        </span>
        <b>
          {hidden ? '₹ ••••' : money(data.income, true)}
        </b>
      </div>
      <div>
        <span className="flow-caption">
          <i className="legend-dot out" />
          Outflow
        </span>
        <b>
          {hidden ? '₹ ••••' : money(data.outcome, true)}
        </b>
      </div>
    </div>
    <div className="chart-wrap">
      <div className="chart-grid" aria-hidden={true}>
        {['', '', '', ''].map((_, i) => <i key={i} />)}
      </div>
      <div className="chart-bars">
        {data.labels.map((label, i) => <div className="bar-group" key={label}>
          <div
            className="bar-pair"
            tabIndex={0}
            aria-label={hidden ? `${label}: amounts hidden` : `${label}: inflow ${money(data.in[i] * (range === '7D' ? 10000 : 40000), true)}, outflow ${money(data.out[i] * (range === '7D' ? 10000 : 40000), true)}`}
          >
            <span className="bar in" style={{ height: `${data.in[i]}%` }} />
            <span className="bar out" style={{ height: `${data.out[i]}%` }} />
            <span className="bar-tip">
              {hidden ? 'Amounts hidden' : `In ${money(data.in[i] * (range === '7D' ? 10000 : 40000), true)} · Out ${money(data.out[i] * (range === '7D' ? 10000 : 40000), true)}`}
            </span>
          </div>
          <span className="chart-label">{label}</span>
        </div>)}
      </div>
    </div>
    <div className="chart-foot">
      <span className="muted-dot" />
      Sample analytics · not live bank data
    </div>
  </section>;
}
