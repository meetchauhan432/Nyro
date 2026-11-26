// Local demo only. No network or real transfer.
import { feeFor } from '../domain/paymentRules.js';
export function simulatePayout({ amount, beneficiary, outcome, sequence }) {
  if (!Number.isSafeInteger(amount) || amount < 100 || !beneficiary || !['Completed', 'Pending', 'Failed'].includes(outcome)) throw Error('Invalid demo transfer');
  return { id: `NYR-${10500 + sequence}`, name: beneficiary.name, type: 'Payout', amount, fee: feeFor(amount), status: outcome, date: 'Just now', direction: 'out', last4: beneficiary.last4, bank: beneficiary.bank };
}
export function debitFor(tx) {
  return tx.status === 'Completed' || tx.status === 'Pending' ? tx.amount + tx.fee : 0;
}
// Pending demo transfers reserve funds; failed transfers never debit the wallet.

/** Apply the confirmed demo result to both the ledger and the available wallet. */
export function recordPayout(state, request) {
  const transaction = simulatePayout({ ...request, sequence: state.seq + 1 });
  const debit = debitFor(transaction);
  // Reject stale or insufficient balances rather than producing a negative wallet.
  if (transaction.amount + transaction.fee > state.wallets.main) {
    throw new Error('Insufficient available balance, including the demo fee.');
  }
  return recordTransaction(state, transaction, -debit);
}

export function recordTopUp(state, amount) {
  if (!Number.isSafeInteger(amount) || amount < 100 || amount > 10000000) {
    throw new Error('Invalid demo top-up amount.');
  }
  const transaction = {
    id: `NYR-${10500 + state.seq + 1}`,
    name: 'Wallet top-up', type: 'Add money', amount, fee: 0,
    status: 'Completed', date: 'Just now', direction: 'in',
  };
  return recordTransaction(state, transaction, amount);
}

function recordTransaction(state, transaction, delta) {
  return {
    wallets: { ...state.wallets, main: state.wallets.main + delta },
    transactions: [transaction, ...state.transactions],
    seq: state.seq + 1,
    result: transaction,
  };
}
