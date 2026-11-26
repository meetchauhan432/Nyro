import test from 'node:test';
import assert from 'node:assert/strict';
import { executeDemo, initialWorkspace, filterTransactions } from '../src/features/operations/domain/demoWorkspace.js';
import { pages, visiblePages } from '../src/app/navigation.js';
test('completed demo top-up credits selected wallet and records transaction without mutating input', () => { const s = initialWorkspace(), r = executeDemo(s, { service: 'Add Money', amount: '500.25', wallet: 'Settlement', party: 'Demo' }); assert.equal(r.state.wallets.Settlement, s.wallets.Settlement + 500.25); assert.equal(r.state.wallets.Main, s.wallets.Main); assert.equal(r.state.transactions.length, s.transactions.length + 1); assert.equal(s.wallets.Settlement, 12750); });
test('completed payout debits wallet; pending and failed payouts leave balances unchanged', () => { const s = initialWorkspace(); for (const outcome of ['Completed', 'Pending', 'Failed']) {
    const r = executeDemo(s, { service: 'Payout', amount: 100, wallet: 'Main', party: 'Demo', outcome });
    assert.equal(r.state.wallets.Main, s.wallets.Main - (outcome === 'Completed' ? 100 : 0));
    assert.equal(r.transaction.status, outcome);
} });
test('reject invalid amount, unavailable wallet, insufficient funds and invalid outcome', () => { const s = initialWorkspace(), p = { service: 'Payout', amount: 100, wallet: 'Main', party: 'Demo' }; for (const patch of [{ amount: -1 }, { amount: NaN }, { amount: 999999 }, { wallet: 'Other' }, { outcome: 'Fake' }])
    assert.ok(executeDemo(s, { ...p, ...patch }).error); });
test('transaction filters combine query, status, wallet and date range', () => { const s = initialWorkspace(); const rows = filterTransactions(s.transactions, { query: 'payout', status: 'Completed', wallet: 'Main', from: '2000-01-01', to: '2099-01-01' }); assert.equal(rows.length, 1); assert.equal(rows[0].service, 'Payout'); assert.equal(filterTransactions(s.transactions, { from: '2099-01-01' }).length, 0); });
test('navigation ids unique; administrative menu hidden in operator preview', () => { assert.equal(new Set(pages.map(p => p.id)).size, pages.length); assert.ok(visiblePages('admin').some(p => p.id === 'schemes')); assert.ok(!visiblePages('operator').some(p => p.id === 'schemes')); assert.ok(visiblePages('operator').some(p => p.id === 'payout')); });
