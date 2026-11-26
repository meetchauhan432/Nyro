export const feeFor = amount => amount > 0 ? 1000 : 0;
export function parseAmount(text) {
  const raw = String(text).trim();
  if (!/^\d{1,9}(\.\d{1,2})?$/.test(raw)) return null;
  const [whole, decimal = ''] = raw.split('.');
  return Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
}
export function validatePayout(text, balance) {
  const amount = parseAmount(text);
  if (amount === null || amount < 100) return 'Enter an amount of at least ₹1 with up to two decimal places.';
  if (amount + feeFor(amount) > balance) return 'Insufficient available balance, including the demo fee.';
  return '';
}
