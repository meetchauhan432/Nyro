import React, { useMemo, useState } from 'react';
import { Pencil, Star, Trash2, UserRoundCheck, UsersRound, UserRoundPlus } from 'lucide-react';
import { Avatar } from '@shared/ui/Avatar.jsx';
import { Badge } from '@shared/ui/Badge.jsx';
import { Card, Trend } from '@shared/ui/Card.jsx';
import { Chart } from '@shared/ui/Chart.jsx';
import { DataTable } from '@shared/ui/DataTable.jsx';
import { control, leads, members as initialMembers, performance, projects, stats } from '../mocks/team.js';

const icons = [UsersRound, UserRoundCheck, UserRoundPlus];

export function TeamManagementPage() {
  const [members, setMembers] = useState(initialMembers);
  const [query, setQuery] = useState('');
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? members.filter(m => `${m.name} ${m.role}`.toLowerCase().includes(q)) : members;
  }, [members, query]);

  const columns = [
    { label: 'Member Name', render: r => <div className="d-flex align-items-center gap-2"><Avatar name={r.name} size={36} /><span className="fw-medium text-body-emphasis">{r.name}</span></div> },
    { label: 'Role', key: 'role' }, { label: 'Assigned', key: 'assigned' }, { label: 'Converted', key: 'converted' },
    { label: 'Conversion Rate', key: 'rate' }, { label: 'Response Time', key: 'response' },
    { label: 'Rating', render: r => <span className="d-inline-flex align-items-center gap-1"><Star size={14} fill="#f59e0b" stroke="#f59e0b" />Rating ({r.rating})</span> },
    { label: 'Status', render: r => <Badge>{r.status}</Badge> },
    { label: 'Action', render: r => (
      <div className="d-flex gap-1">
        <button type="button" className="icon-btn" style={{ width: 32, height: 32 }} aria-label={`Edit ${r.name}`}><Pencil size={15} /></button>
        <button type="button" className="icon-btn text-danger" style={{ width: 32, height: 32 }} aria-label={`Delete ${r.name}`}
          onClick={() => setMembers(prev => prev.filter(m => m.id !== r.id))}><Trash2 size={15} /></button>
      </div>
    ) },
  ];

  return (
    <div className="row g-4">
      {stats.map((s, i) => {
        const Icon = icons[i];
        return (
          <div className="col-xl-3 col-md-6" key={s.label}>
            <Card bodyClass="d-flex gap-3">
              <span className="stat-icon"><Icon size={20} /></span>
              <div><div className="text-muted">{s.label}</div><div className="d-flex align-items-center gap-2"><h4 className="mb-0">{s.value}</h4><Trend value={s.trend} /></div><div className="text-xs mt-1">{s.sub}</div></div>
            </Card>
          </div>
        );
      })}
      <div className="col-xl-3 col-md-6">
        <Card bodyClass="d-flex flex-column justify-content-center gap-3">
          {leads.map(l => <div key={l.label} className="d-flex justify-content-between align-items-center"><div><div className="text-muted">{l.label}</div><h5 className="mb-0">{l.value}</h5></div><Trend value={l.trend} /></div>)}
        </Card>
      </div>

      <div className="col-xl-8">
        <Card title="Team Performances">
          <Chart type="line" height={290} series={performance.series} options={{
            colors: ['#5955d1', '#38bdf8', '#f59e0b'], stroke: { curve: 'smooth', width: 3 }, legend: { show: true, position: 'top', horizontalAlign: 'right' },
            xaxis: { categories: performance.labels, axisBorder: { show: false }, axisTicks: { show: false } }, yaxis: { labels: { formatter: v => `${v}%`, }, max: 100 },
          }} />
        </Card>
      </div>
      <div className="col-xl-4">
        <Card title="Team Control">
          {control.map(m => (
            <div key={m.name} className="d-flex align-items-center gap-3 py-2">
              <Avatar name={m.name} size={40} />
              <div className="flex-grow-1"><div className="fw-semibold text-body-emphasis">{m.name}</div><div className="text-xs">{m.tasks} Tasks Handled</div></div>
            </div>
          ))}
        </Card>
      </div>

      {projects.map(p => {
        const pct = Math.round((p.done / p.total) * 100);
        return (
          <div className="col-xl-3 col-md-6" key={p.name}>
            <Card title={p.name}>
              <div className="text-xs mb-3">Deadline: {p.deadline}</div>
              <div className="d-flex justify-content-between mb-1"><span><strong className="text-body-emphasis">{p.done}</strong>/{p.total} Tasks</span><strong>{pct}%</strong></div>
              <div className="progress pro-bar" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100" aria-label={`${p.name} progress`}>
                <div className="progress-bar bg-primary rounded" style={{ width: `${pct}%` }} />
              </div>
            </Card>
          </div>
        );
      })}

      <div className="col-12">
        <Card title="Team Performance List" menu={false}
          actions={<input className="form-control form-control-sm" style={{ width: 200 }} type="search" placeholder="Search members…" aria-label="Search members" value={query} onChange={e => setQuery(e.target.value)} />}>
          <DataTable columns={columns} rows={rows} pageSize={6} />
        </Card>
      </div>
    </div>
  );
}
