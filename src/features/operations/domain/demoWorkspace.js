export const roles = ['Sub Admin', 'NSM/ZSH', 'SH', 'CNF', 'Master Distributor', 'Distributor', 'Retailer'];
export const products = ['Payout', 'Credit Card', 'Rupay UPI', 'Add Money', 'BBPS', 'Prepaid', 'Postpaid', 'DTH', 'Dynamic QR', 'UPI Payout'];
export const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
export const today = () => new Date().toISOString().slice(0, 10);
export const sampleMembers = roles.flatMap((role, i) => Array.from({ length: 3 }, (_, j) => ({ id: `NY${1001 + i * 3 + j}`, name: ['Aarav Demo', 'Diya Demo', 'Kabir Demo'][j] + ` ${i + 1}`, role, mobile: `900000${String(i * 3 + j + 1).padStart(4, '0')}`, email: `member${i * 3 + j + 1}@example.test`, business: `Demo outlet ${i * 3 + j + 1}`, status: j === 2 ? 'Pending' : 'Active', scheme: 'Default Scheme', parent: i ? `NY${1001 + (i - 1) * 3}` : '', locked: false, kyc: j === 2 ? 'Pending' : 'Verified' })));
export const sampleSchemes = ['Default Scheme', 'Special Offer', 'Retailer Plus'].map((name, i) => ({ id: `SC${i + 1}`, name, active: true, rates: {} }));
export const sampleTransactions = [
    { id: 'NY-T1001', service: 'Payout', party: 'Demo beneficiary A', amount: 2500, status: 'Completed', date: today(), wallet: 'Main' },
    { id: 'NY-T1002', service: 'Add Money', party: 'Demo top-up', amount: 10000, status: 'Completed', date: today(), wallet: 'Main' },
    { id: 'NY-T1003', service: 'Credit Card', party: 'Demo card', amount: 1450, status: 'Pending', date: today(), wallet: 'Main' },
    { id: 'NY-T1004', service: 'Rupay UPI', party: 'Demo collection', amount: 780, status: 'Completed', date: today(), wallet: 'UPI' },
    { id: 'NY-T1005', service: 'Payout', party: 'Demo beneficiary B', amount: 900, status: 'Failed', date: today(), wallet: 'Main' },
];
export function initialWorkspace() { return { wallets: { Main: 48500, Settlement: 12750, UPI: 8250 }, transactions: sampleTransactions.map(x => ({ ...x })), members: sampleMembers.map(x => ({ ...x })), schemes: sampleSchemes.map(x => ({ ...x, rates: {} })), beneficiaries: [{ id: 'BEN1', name: 'Demo beneficiary A', bank: 'Demo Bank', account: '000000001234', ifsc: 'DEMO0000001' }] }; }
export function executeDemo(state, { service, amount, party, wallet = 'Main', outcome = 'Completed' }) {
    const cents = Math.round(Number(amount) * 100);
    const validWallet = Object.hasOwn(state.wallets, wallet);
    if (!validWallet || !Number.isFinite(cents) || cents <= 0 || cents > 100000000 || !['Completed', 'Pending', 'Failed'].includes(outcome) || !['Add Money', 'Payout', 'Credit Card', 'Rupay UPI'].includes(service))
        return { error: 'Enter a valid demo transaction.' };
    const credit = ['Add Money', 'Rupay UPI'].includes(service);
    const balance = Math.round(state.wallets[wallet] * 100);
    if (!credit && cents > balance)
        return { error: 'Insufficient demo wallet balance.' };
    const tx = { id: `NY-T${1006 + state.transactions.length - 5}`, service, amount: cents / 100, party, wallet, status: outcome, date: today() };
    const wallets = outcome === 'Completed' ? { ...state.wallets, [wallet]: (balance + (credit ? cents : -cents)) / 100 } : state.wallets;
    return { state: { ...state, wallets, transactions: [tx, ...state.transactions] }, transaction: tx };
}
export function filterTransactions(rows, { query = '', service = '', status = '', from = '', to = '', wallet = '' } = {}) { const q = query.toLowerCase().trim(); return rows.filter(r => (!q || `${r.id} ${r.service} ${r.party}`.toLowerCase().includes(q)) && (!service || r.service === service) && (!status || r.status === status) && (!wallet || r.wallet === wallet) && (!from || r.date >= from) && (!to || r.date <= to)); }
