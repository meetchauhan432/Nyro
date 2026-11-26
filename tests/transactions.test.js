import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTransactions } from '../src/features/transactions/mocks/transactions.js';
import { filterTransactions, transactionsToCsv } from '../src/features/transactions/domain/transactionFilters.js';

test('transaction filtering and amount sorting do not mutate the source ledger', () => {
  const original = initialTransactions.map(tx => tx.id);
  const rows = filterTransactions(initialTransactions, { filter: 'Completed', query: '', sort: 'amount' });
  assert.ok(rows.every(tx => tx.status === 'Completed'));
  assert.ok(rows.every((tx, i) => i === 0 || rows[i - 1].amount >= tx.amount));
  assert.deepEqual(initialTransactions.map(tx => tx.id), original);
});

test('CSV output escapes quotes and formula-like values', () => {
  const row = { ...initialTransactions[0], name: '=2+2' };
  assert.ok(transactionsToCsv([row]).includes(`"'=2+2"`));
  assert.ok(transactionsToCsv([{ ...row, name: 'A "B"' }]).includes('"A ""B"""'));
});
