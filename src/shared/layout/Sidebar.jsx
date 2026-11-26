import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Landmark, Users, Settings, Wallet, ArrowLeftRight, FileText, ChevronDown, ChevronRight, PanelLeftClose } from 'lucide-react';
import { visiblePages } from '@app/navigation.js';
const icons = { 'Overview': LayoutDashboard, 'Master': Settings, 'Members': Users, 'Fund': Wallet, 'Services': ArrowLeftRight, 'Transaction Report': FileText, 'Account Statement': Landmark };
export function Sidebar({ logo, current, onNavigate, mode, onClose }) {
    const list = visiblePages(mode), groups = [...new Set(list.map(x => x.group))];
    const [expanded, setExpanded] = useState({ 'Overview': true, 'Services': true, 'Fund': true });
    useEffect(() => { const group = list.find(x => x.id === current)?.group; if (group)
        setExpanded(x => ({ ...x, [group]: true })); }, [current, mode]);
    return <aside className="app-sidebar ops-sidebar" aria-label="Primary"><div className="brand"><img src={logo} alt="NYRO Technologies"/><button className="icon-btn d-lg-none" onClick={onClose} aria-label="Close menu"><PanelLeftClose size={19}/></button></div><div className="ops-side-caption">WORKSPACE <span>DEMO</span></div><nav>{groups.map(group => { const Icon = icons[group]; const children = list.filter(x => x.group === group); return <div key={group} className="ops-nav-group"><button className={`ops-group-toggle ${expanded[group] ? 'expanded' : ''}`} type="button" onClick={() => setExpanded(x => ({ ...x, [group]: !x[group] }))} aria-expanded={!!expanded[group]}><Icon size={18}/><span>{group}</span><ChevronDown size={15} className="ops-chevron"/></button><div className={`ops-nav-collapse ${expanded[group] ? 'open' : ''}`}><div>{children.map(p => <button key={p.id} type="button" className={`nav-item-btn ${current === p.id ? 'active' : ''}`} aria-current={current === p.id ? 'page' : undefined} onClick={() => onNavigate(p.id)}><ChevronRight size={13}/><span>{p.label}</span></button>)}</div></div></div>; })}</nav><div className="ops-sidebar-foot"><span className="ops-online-dot"/>Demo workspace · no live transfers</div></aside>;
}
