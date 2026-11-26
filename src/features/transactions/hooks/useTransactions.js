import { usePatchState } from '@shared/hooks/usePatchState.js';
import { transactionsToCsv } from '../domain/transactionFilters.js';

export function useTransactions(notify) {
  const [state, patch] = usePatchState({ filter: 'All', query: '', sort: 'new', pageNum: 1 });
  function exportCSV(rows) {
    const url = URL.createObjectURL(new Blob([transactionsToCsv(rows)], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nyro-demo-transactions.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    notify('Demo transactions exported.');
  }
  return { state, patch, exportCSV };
}
