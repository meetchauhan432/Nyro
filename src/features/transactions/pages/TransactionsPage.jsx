import React from 'react';
import { filterTransactions } from '../domain/transactionFilters.js';
import { Button } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { TransactionList } from '@features/transactions/components/TransactionList.jsx';
export function TransactionsPage({ state, actions }) {
  const rows = filterTransactions(state.transactions, state);
  const count = Math.max(1, Math.ceil(rows.length / 6)), page = Math.min(count, state.pageNum);
  return <div className="page-content">
    <div className="page-heading">
      <div>
        <div className="overline">FINANCIAL WORKSPACE</div>
        <h1>Transactions</h1>
        <p>Search, review and export your demo financial activity.</p>
      </div>
      <Button
        label="Export CSV"
        onClick={() => actions.exportCSV(rows)}
        className="btn outline-btn"
        iconName="download"
      />
    </div>
    <section className="surface transaction-page">
      <div className="transaction-toolbar">
        <label className="table-search">
          <Icon name="search" size={18} />
          <input
            value={state.query}
            onChange={e => actions.setState({ query: e.target.value, pageNum: 1 })}
            placeholder="Search name or reference"
            aria-label="Search transactions"
          />
        </label>
        <select
          value={state.filter}
          onChange={e => actions.setState({ filter: e.target.value, pageNum: 1 })}
          aria-label="Filter by status"
        >
          {['All', 'Completed', 'Pending', 'Failed'].map(x => <option key={x} value={x}>
            {x === 'All' ? 'All statuses' : x}
          </option>)}
        </select>
        <select
          value={state.sort}
          onChange={e => actions.setState({ sort: e.target.value, pageNum: 1 })}
          aria-label="Sort transactions"
        >
          <option value="new">Most recent</option>
          <option value="amount">Highest amount</option>
        </select>
      </div>
      <div className="list-meta">{`${rows.length} transaction${rows.length === 1 ? '' : 's'}`}</div>
      <TransactionList
        transactions={rows.slice((page - 1) * 6, page * 6)}
        hidden={state.hidden}
        onDetail={t => actions.detail(t)}
      />
      <div className="pagination">
        <span>{`Page ${page} of ${count}`}</span>
        <Button
          label="Previous"
          onClick={() => actions.setState({ pageNum: page - 1 })}
          className="btn outline-btn"
          {...{ disabled: page === 1 }}
        />
        <Button
          label="Next"
          onClick={() => actions.setState({ pageNum: page + 1 })}
          className="btn outline-btn"
          {...{ disabled: page === count }}
        />
      </div>
    </section>
  </div>;
}
