import React from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { Drawer } from '@shared/ui/Drawer.jsx';
export function SearchDrawer({ state, actions }) {
  const close = actions.close;
  let options = [['Overview', 'overview', 'overview'], ['Wallets', 'wallet', 'wallets'], ['Transactions', 'transfer', 'transactions'], ['Payout', 'arrowup', 'payout'], ['Add money', 'plus', 'add'], ['Services', 'grid', 'services'], ['Users & roles', 'users', 'members']].filter(([name]) => name.toLowerCase().includes(state.search.toLowerCase()));
  return <Drawer
    title="Search workspace"
    subtitle="Jump to a page or action"
    onClose={close}
    kind="command-dialog"
  >
    <label className="table-search command-search">
      <Icon name="search" size={20} />
      <input
        value={state.search}
        onChange={e => actions.setState({ search: e.target.value })}
        placeholder="Type a page or action…"
        aria-label="Search workspace"
      />
    </label>
    {options.map(([label, ic, r]) => <button key={r} className="command-option" onClick={() => actions.navigate(r)}>
      <Icon name={ic} size={19} />
      {label}
      <Icon name="chevron" size={15} />
    </button>)}
    {!options.length && <p className="muted">No matching actions.</p>}
  </Drawer>;
}
