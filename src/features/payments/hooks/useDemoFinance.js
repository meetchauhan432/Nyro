import { useEffect, useRef } from 'react';
import { usePatchState } from '@shared/hooks/usePatchState.js';
import { initialWallets } from '@features/wallets/mocks/wallets.js';
import { initialTransactions } from '@features/transactions/mocks/transactions.js';
import { parseAmount, validatePayout } from '../domain/paymentRules.js';
import { recordPayout, recordTopUp } from '../services/demoFinanceService.js';

const createInitialState = () => ({
  wallets: { ...initialWallets },
  transactions: initialTransactions.map(transaction => ({ ...transaction })),
  seq: 0, step: 0, mobileNumber: '', recipient: null,
  amount: '', error: '', outcome: 'Completed', busy: false, result: null,
});

/** Owns the demo wallet ledger and the two financial forms. No real payment API. */
export function useDemoFinance() {
  const [state, patch] = usePatchState(createInitialState);
  const lock = useRef(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  function reset() {
    if (!lock.current) patch(createInitialState());
  }

  function startPayout() {
    patch({ step: 0, mobileNumber: '', recipient: null, amount: '', outcome: 'Completed', result: null, error: '' });
  }

  function startTopUp() {
    patch({ amount: '', step: 0, result: null, error: '' });
  }

  function lookup(event) {
    event.preventDefault();
    if (state.mobileNumber !== '9000000000') {
      patch({ error: 'No demo customer found. Use the fictional number 9000000000.' });
      return;
    }
    patch({ step: 1, error: '' });
  }

  function runSimulation(operation, nextStep, delay) {
    if (lock.current || state.busy) return;
    lock.current = true;
    patch({ busy: true, error: '' });
    timer.current = setTimeout(() => {
      patch(previous => {
        try {
          return { ...operation(previous), step: nextStep, busy: false };
        } catch (error) {
          return { busy: false, error: error.message, step: nextStep === 4 ? 2 : 0 };
        }
      });
      lock.current = false;
    }, delay);
  }

  function submitPayout() {
    if (lock.current || state.busy) return;
    const error = validatePayout(state.amount, state.wallets.main);
    if (error || !state.recipient) {
      patch({ error: error || 'Choose a beneficiary.', step: 2 });
      return;
    }
    // Capture the reviewed request; never read editable form values after confirmation.
    const request = { amount: parseAmount(state.amount), beneficiary: state.recipient, outcome: state.outcome };
    runSimulation(previous => recordPayout(previous, request), 4, 850);
  }

  function submitAdd() {
    if (lock.current || state.busy) return;
    const amount = parseAmount(state.amount);
    if (amount === null || amount < 100 || amount > 10000000) {
      patch({ error: 'Enter a demo amount between ₹1 and ₹1,00,000.' });
      return;
    }
    runSimulation(previous => recordTopUp(previous, amount), 1, 650);
  }

  return { state, patch, reset, startPayout, startTopUp, lookup, submitPayout, submitAdd, lock };
}
