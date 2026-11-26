import React, { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, Menu, Search, Wallet, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar.jsx';
import { visiblePages } from '@app/navigation.js';
import { money } from '@features/operations/domain/demoWorkspace.js';
export function Header({ onMenu, onSignOut, mode, onMode, onNavigate, balance }) {
    const [pop, setPop] = useState(''), [query, setQuery] = useState('');
    const ref = useRef(null), search = useRef(null);
    useEffect(() => { const close = e => { if (!ref.current?.contains(e.target))
        setPop(''); }; const key = e => { if (e.key === 'Escape')
        setPop(''); if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        search.current?.focus();
    } }; document.addEventListener('pointerdown', close); document.addEventListener('keydown', key); return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', key); }; }, []);
    const toggle = x => setPop(v => v === x ? '' : x);
    const go = id => { onNavigate(id); setPop(''); setQuery(''); };
    return <header className="app-header ops-header" ref={ref}><button className="icon-btn" onClick={onMenu} aria-label="Toggle navigation"><Menu size={21}/></button><div className="search ops-search"><Search size={16}/><input ref={search} className="form-control" placeholder="Search pages…" aria-label="Search pages" value={query} onFocus={() => setPop('search')} onChange={e => { setQuery(e.target.value); setPop('search'); }}/>{pop === 'search' && <div className="menu-pop ops-search-results">{visiblePages(mode).filter(x => `${x.label} ${x.group}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8).map(x => <button key={x.id} onClick={() => go(x.id)}>{x.label}<small className="ms-auto">{x.group}</small></button>)}</div>}</div><div className="ms-auto d-flex align-items-center gap-2"><button className="ops-balance" onClick={() => go('statement-main')}><Wallet size={17}/><span>{money(balance)}</span></button><div className="position-relative"><button className="icon-btn" onClick={() => toggle('bell')} aria-label="Notifications" aria-expanded={pop === 'bell'}><Bell size={20}/><i className="ops-notification-dot"/></button>{pop === 'bell' && <div className="menu-pop"><strong className="d-block p-2">Notifications</strong><p className="p-2 mb-0">Demo workspace ready. No live alerts.</p></div>}</div><div className="position-relative"><button className="ops-account" aria-label="Account menu" aria-expanded={pop === 'account'} onClick={() => toggle('account')}><Avatar name="NYRO Admin" size={36}/><span className="d-none d-md-block text-start"><strong>NYRO {mode === 'admin' ? 'Admin' : 'Operator'}</strong><small className="d-block">Demo preview</small></span><ChevronDown size={15}/></button>{pop === 'account' && <div className="menu-pop"><div className="p-2 text-muted text-xs">DEMO WORKSPACE VIEW</div>{['admin', 'operator'].map(x => <button key={x} onClick={() => { onMode(x); setPop(''); }}>{x === 'admin' ? 'Administrator' : 'Operator'} {mode === x ? '✓' : ''}</button>)}<hr className="my-1"/><button onClick={onSignOut}><LogOut size={16}/>Sign out</button></div>}</div></div></header>;
}
