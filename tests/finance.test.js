import test from 'node:test';
import assert from 'node:assert/strict';
import { recordPayout, recordTopUp } from '../src/features/payments/services/demoFinanceService.js';
import { beneficiaries } from '../src/features/payments/mocks/beneficiaries.js';
import { initialWallets } from '../src/features/wallets/mocks/wallets.js';

const ledger = () => ({ wallets: { ...initialWallets }, transactions: [], seq: 0 });
const request = outcome => ({ amount: 500000, beneficiary: beneficiaries[0], outcome });

test('completed and pending payouts reserve principal plus fee; failed payouts preserve wallet', () => {
  for (const outcome of ['Completed', 'Pending', 'Failed']) {
    const before = ledger();
    const after = recordPayout(before, request(outcome));
    assert.equal(after.wallets.main, before.wallets.main - (outcome === 'Failed' ? 0 : 501000));
    assert.equal(after.transactions.length, 1);
    assert.equal(after.result.status, outcome);
    assert.equal(before.transactions.length, 0);
    assert.equal(before.wallets.main, initialWallets.main);
  }
});

test('ledger rejects insufficient funds and invalid top-ups', () => {
  const state = { ...ledger(), wallets: { main: 200 } };
  assert.throws(() => recordPayout(state, request('Completed')), /Insufficient/);
  assert.throws(() => recordTopUp(state, 0), /Invalid/);
  assert.throws(() => recordTopUp(state, 10000001), /Invalid/);
});

test('top-up and payout maintain atomic ledger and unique references', () => {
  const toppedUp = recordTopUp(ledger(), 100000);
  const paid = recordPayout(toppedUp, request('Completed'));
  assert.equal(paid.wallets.main, initialWallets.main + 100000 - 501000);
  assert.equal(paid.seq, 2);
  assert.equal(new Set(paid.transactions.map(tx => tx.id)).size, 2);
});
