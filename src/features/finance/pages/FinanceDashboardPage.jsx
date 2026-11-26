import React, { useState } from 'react';
import { Banknote, FileClock, TrendingDown, TrendingUp } from 'lucide-react';
import { Avatar } from '@shared/ui/Avatar.jsx';
import { Badge } from '@shared/ui/Badge.jsx';
import { Card, Tabs } from '@shared/ui/Card.jsx';
import { Chart } from '@shared/ui/Chart.jsx';
import { DataTable } from '@shared/ui/DataTable.jsx';
import { breakdown, compare, months, stats, transactions } from '../mocks/finance.js';

const statIcons = [Banknote, TrendingDown, TrendingUp, FileClock];
const slices = ['#5955d1', '#38bdf8', '#f59e0b', '#22c55e'];

export function FinanceDashboardPage() {
  const [year, setYear] = useState('This Year');
  const series = compare[year];
  const columns = [
    { label: 'Name', render: r => <div className="d-flex align-items-center gap-2"><Avatar name={r.name} size={36} /><span className="fw-medium text-body-emphasis">{r.name}</span></div> },
    { label: 'Date', key: 'date' }, { label: 'Description', key: 'description' },
    { label: 'Category', render: r => <Badge>{r.category}</Badge> },
    { label: 'Amount', render: r => <strong className={r.amount.startsWith('-') ? 'text-danger' : 'text-success'}>{r.amount}</strong> },
    { label: 'Status', render: r => <Badge>{r.status}</Badge> },
  ];

  return (
    <div className="row g-4">
      {stats.map((s, i) => {
        const Icon = statIcons[i];
        return (
          <div className="col-xl-3 col-md-6" key={s.label}>
            <Card bodyClass="d-flex align-items-center gap-3">
              <span className="stat-icon"><Icon size={20} /></span>
              <div><div className="text-muted">{s.label}</div><h4 className="mb-0">{s.value}</h4></div>
            </Card>
          </div>
        );
      })}

      <div className="col-xl-8">
        <Card title="Revenue vs Expenses" menu={false} actions={<Tabs options={['This Year', 'Last Year']} value={year} onChange={setYear} />}>
          <Chart type="area" height={300} series={[{ name: 'Revenue', data: series.revenue }, { name: 'Expenses', data: series.expenses }]} options={{
            colors: ['#5955d1', '#38bdf8'], stroke: { curve: 'smooth', width: 2 }, legend: { show: true, position: 'top', horizontalAlign: 'right' },
            fill: { type: 'gradient', gradient: { opacityFrom: 0.28, opacityTo: 0.02 } },
            xaxis: { categories: months, axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { formatter: v => `${v}K` } },
          }} />
        </Card>
      </div>

      <div className="col-xl-4">
        <Card title="Expense Breakdown">
          <Chart type="donut" height={210} series={breakdown.map(b => b.value)} options={{
            labels: breakdown.map(b => b.name), colors: slices, stroke: { width: 3, colors: ['#fff'] }, plotOptions: { pie: { donut: { size: '70%' } } },
          }} />
          {breakdown.map((b, i) => (
            <div key={b.name} className="d-flex align-items-center gap-2 py-1">
              <span className="rounded-circle" style={{ width: 10, height: 10, background: slices[i] }} />
              <span className="flex-grow-1">{b.name}</span><strong className="text-body-emphasis">{b.value}%</strong>
            </div>
          ))}
        </Card>
      </div>

      <div className="col-xl-4">
        <Card title="Monthly Target">
          <div className="text-center">
            <Chart type="radialBar" height={220} series={[92]} options={{
              plotOptions: { radialBar: { hollow: { size: '66%' }, track: { background: '#eef0f6' }, dataLabels: { name: { show: false }, value: { fontSize: '1.7rem', fontWeight: 600, offsetY: 8, formatter: v => `${v}%` } } } },
              stroke: { lineCap: 'round' },
            }} />
            <p className="text-success fw-medium mb-3">+15% vs last month</p>
            <p className="mb-3">673 Orders — you earn <strong className="text-body-emphasis">$7540</strong> today, it’s higher than last month. Keep up your good trends!</p>
          </div>
          <div className="row text-center g-2">
            {[['Target', '$75K'], ['Revenue', '$15k'], ['Today', '$8.5k']].map(([l, v]) => <div className="col-4" key={l}><div className="text-xs">{l}</div><strong className="text-body-emphasis">{v}</strong></div>)}
          </div>
        </Card>
      </div>

      <div className="col-xl-8">
        <Card title="Recent Transactions" menu={false}><DataTable columns={columns} rows={transactions} pageSize={5} /></Card>
      </div>
    </div>
  );
}
