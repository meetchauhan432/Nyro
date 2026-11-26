export function filterTransactions(transactions, { filter, query, sort }) {
  const search = query.toLowerCase();
  const rows = transactions.filter(transaction => (filter === 'All' || transaction.status === filter) && `${transaction.name} ${transaction.id} ${transaction.type}`.toLowerCase().includes(search));
  if (sort === 'amount') rows.sort((a, b) => b.amount - a.amount);
  return rows;
}

// Escape spreadsheet formulas in user-controlled text as well as CSV quotes.
export function transactionsToCsv(rows) {
  const quote = value => {
    const text = String(value);
    const safe = /^[=+\-@\t\r\n]/.test(text) ? `'${text}` : text;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  return [
    ['Reference', 'Description', 'Type', 'Amount INR', 'Status', 'Date'],
    ...rows.map(transaction => [transaction.id, transaction.name, transaction.type, (transaction.amount / 100).toFixed(2), transaction.status, transaction.date]),
  ].map(row => row.map(quote).join(',')).join('\n');
}
