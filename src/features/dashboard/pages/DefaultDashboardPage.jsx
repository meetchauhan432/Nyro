import React, { useState } from 'react';
import { Plus, Video } from 'lucide-react';
import { Avatar } from '@shared/ui/Avatar.jsx';
import { Badge } from '@shared/ui/Badge.jsx';
import { Card, Tabs, Trend } from '@shared/ui/Card.jsx';
import { Chart } from '@shared/ui/Chart.jsx';
import { DataTable } from '@shared/ui/DataTable.jsx';
import * as d from '../mocks/defaultDashboard.js';

const shades = [0.1, 0.25, 0.5, 0.75, 1].map(a => `rgba(89,85,209,${a})`);

function TasksOverview() {
  return (
    <Card title="Tasks Overview">
      <div className="d-flex align-items-center gap-3">
        <div style={{ width: 150 }}>
          <Chart type="radialBar" height={170} series={[25]} options={{
            plotOptions: { radialBar: { hollow: { size: '62%' }, track: { background: '#eef0f6' }, dataLabels: { name: { show: false }, value: { fontSize: '1.6rem', fontWeight: 600, offsetY: 8, formatter: v => `${v}` } } } },
            stroke: { lineCap: 'round' },
          }} />
        </div>
        <div>
          <div className="text-muted mb-2">Tasks Done</div>
          {[['Follow-ups', 'primary'], ['In Progress', 'info'], ['Pending', 'warning']].map(([label, tone]) => (
            <div key={label} className="d-flex align-items-center gap-2 mb-1"><span className={`rounded-circle bg-${tone}`} style={{ width: 9, height: 9 }} />{label}</div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Revenue() {
  const [range, setRange] = useState('Month');
  const { labels, data } = d.revenueSeries[range];
  return (
    <Card title="Revenue" actions={<Tabs options={['Today', 'Week', 'Month']} value={range} onChange={setRange} />}>
      <div className="d-flex align-items-baseline gap-3 mb-2">
        <h3 className="mb-0">$2,56,054.50</h3><Trend value="+20% vs last month" />
      </div>
      <Chart type="bar" height={260} series={[{ name: 'Revenue', data }]} options={{
        xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
        plotOptions: { bar: { borderRadius: 6, columnWidth: '42%' } },
        yaxis: { labels: { formatter: v => `${v}K` } },
      }} />
    </Card>
  );
}

function TrafficSources() {
  return (
    <Card title="Traffic Sources">
      <div className="d-flex rounded overflow-hidden mb-4" style={{ height: 40 }} role="img" aria-label="Traffic share by source">
        {d.trafficSources.map((s, i) => <div key={s.name} style={{ width: `${s.value}%`, background: shades[i] }} title={`${s.name} ${s.value}%`} />)}
      </div>
      {d.trafficSources.map((s, i) => (
        <div key={s.name} className="d-flex align-items-center gap-2 mb-2">
          <span className="rounded-circle" style={{ width: 10, height: 10, background: shades[i] }} />
          <span className="flex-grow-1">{s.name}</span><span className="fw-semibold text-body-emphasis">{s.value}%</span>
        </div>
      ))}
      <button type="button" className="btn btn-soft w-100 mt-3">Download annual report</button>
    </Card>
  );
}

function Retention() {
  return (
    <Card title="Retention Rate">
      <div className="d-flex align-items-baseline gap-3"><h3 className="mb-0">92%</h3><Trend value="+15% vs last month" /></div>
      <Chart type="bar" height={250} series={d.retention.series} options={{
        chart: { stacked: true }, colors: ['#5955d1', 'rgba(89,85,209,.4)', 'rgba(89,85,209,.12)'],
        xaxis: { categories: d.retention.labels, axisBorder: { show: false }, axisTicks: { show: false } },
        plotOptions: { bar: { columnWidth: '45%', borderRadius: 4 } }, legend: { show: true, position: 'bottom' },
      }} />
    </Card>
  );
}

function TotalEarning() {
  return (
    <Card title="Total Earning">
      <div className="text-center">
        <Chart type="radialBar" height={190} series={[35]} options={{
          plotOptions: { radialBar: { startAngle: -110, endAngle: 110, hollow: { size: '68%' }, track: { background: '#eef0f6' },
            dataLabels: { name: { show: false }, value: { fontSize: '1.5rem', fontWeight: 600, offsetY: 6, formatter: () => '$5.7m' } } } },
          stroke: { lineCap: 'round' },
        }} />
      </div>
      {d.earnings.map(e => <div key={e.label} className="d-flex justify-content-between py-2 border-top"><span>{e.label}</span><strong className="text-body-emphasis">{e.value}</strong></div>)}
      <div className="d-flex gap-3 mt-2 text-xs">{[['Paid', '70%'], ['Cancelled', '25%'], ['Refunded', '5%']].map(([l, v]) => <span key={l}>{l} <strong>{v}</strong></span>)}</div>
    </Card>
  );
}

function OrderByTime() {
  return (
    <Card title="Order By Time">
      <Chart type="heatmap" height={270} series={d.heatmap} options={{
        colors: ['#5955d1'], xaxis: { categories: d.heatDays }, plotOptions: { heatmap: { radius: 6, shadeIntensity: 0.6 } }, stroke: { width: 2, colors: ['#fff'] },
      }} />
    </Card>
  );
}

function Meetings() {
  return (
    <Card title="Upcoming Meetings">
      {d.meetings.map(m => (
        <div key={m.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
          <span className="stat-icon"><Video size={18} /></span>
          <div className="flex-grow-1"><div className="fw-semibold text-body-emphasis">{m.title}</div><div className="text-xs">On Google Meet · {m.team}</div></div>
          <span className="text-xs text-nowrap">{m.time}</span>
        </div>
      ))}
    </Card>
  );
}

function TaskUpdate() {
  const [tasks, setTasks] = useState(d.initialTasks);
  const [text, setText] = useState('');
  function add(event) {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks(prev => [{ id: Date.now(), title, time: 'Now', done: false }, ...prev]);
    setText('');
  }
  return (
    <Card title="Task Update" menu={false}>
      <form className="d-flex gap-2 mb-3" onSubmit={add}>
        <input className="form-control" placeholder="New Task" aria-label="New task" value={text} onChange={e => setText(e.target.value)} />
        <button className="btn btn-primary d-flex align-items-center gap-1" type="submit"><Plus size={16} />Add</button>
      </form>
      {tasks.map(t => (
        <label key={t.id} className="d-flex align-items-center gap-2 py-2 border-bottom">
          <input type="checkbox" className="form-check-input mt-0" checked={t.done} onChange={() => setTasks(prev => prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} />
          <span className={`flex-grow-1 ${t.done ? 'text-decoration-line-through text-muted' : ''}`}>{t.title}</span><span className="text-xs">{t.time}</span>
        </label>
      ))}
    </Card>
  );
}

function DealsOverview() {
  return (
    <Card title="Deals Overview" actions={<Trend value="+15% vs last month" />}>
      <Chart type="area" height={200} series={[{ name: 'Growth', data: [30, 10, 30, 5, 30, 0, 22, 8, 18] }]} options={{
        colors: ['#38bdf8'], stroke: { curve: 'smooth', width: 2 }, fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0.02 } },
        xaxis: { labels: { show: false }, axisTicks: { show: false } }, yaxis: { show: false }, grid: { show: false },
      }} />
      <div className="row text-center g-2">
        {d.deals.map(x => (
          <div className="col-4" key={x.label}><div className="text-xs">{x.label}</div><div className="h5 mb-0">{x.value}</div><Trend value={x.delta} /></div>
        ))}
      </div>
    </Card>
  );
}

function Pipeline() {
  return (
    <Card title="Sales Pipeline Overview">
      <div className="d-flex align-items-baseline gap-3"><h3 className="mb-0">$2,56,054.50</h3><Trend value="+20% vs last month" /></div>
      <Chart type="bar" height={210} series={[{ name: 'Count', data: d.pipeline.map(p => p.value) }]} options={{
        plotOptions: { bar: { horizontal: true, distributed: true, borderRadius: 6, barHeight: '60%' } }, colors: shades.slice(1),
        xaxis: { categories: d.pipeline.map(p => p.label) }, grid: { show: false },
      }} />
      <button type="button" className="btn btn-soft w-100 mt-2">Download annual report</button>
    </Card>
  );
}

function NewCustomers() {
  const columns = [
    { label: 'Name', render: r => <div className="d-flex align-items-center gap-2"><Avatar name={r.name} size={36} /><span className="fw-medium text-body-emphasis">{r.name}</span></div> },
    { label: 'Phone', key: 'phone' }, { label: 'Email', key: 'email' }, { label: 'Days', key: 'days' },
    { label: 'Status', render: r => <Badge>{r.status}</Badge> },
  ];
  return (
    <Card title="New Customers" menu={false} actions={<button type="button" className="btn btn-primary btn-sm d-flex align-items-center gap-1"><Plus size={14} />Add New</button>}>
      <DataTable columns={columns} rows={d.customers} pageSize={6} />
    </Card>
  );
}

export function DefaultDashboardPage() {
  return (
    <div className="row g-4">
      <div className="col-xl-4 col-md-6"><TasksOverview /></div>
      <div className="col-xl-8"><Revenue /></div>
      <div className="col-xl-4 col-md-6"><TrafficSources /></div>
      <div className="col-xl-4 col-md-6"><Retention /></div>
      <div className="col-xl-4 col-md-6"><TotalEarning /></div>
      <div className="col-xl-4 col-md-6"><OrderByTime /></div>
      <div className="col-xl-4 col-md-6"><Meetings /></div>
      <div className="col-xl-4 col-md-6"><TaskUpdate /></div>
      <div className="col-xl-6"><DealsOverview /></div>
      <div className="col-xl-6"><Pipeline /></div>
      <div className="col-12"><NewCustomers /></div>
    </div>
  );
}
