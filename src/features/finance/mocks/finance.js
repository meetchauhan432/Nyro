export const stats = [
  { label: 'Total Revenue', value: '$120,540' }, { label: 'Total Expenses', value: '$84,320' },
  { label: 'Net Profit', value: '$36,220' }, { label: 'Pending Invoices', value: '12' },
];
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
export const compare = {
  'This Year': { revenue: [120, 350, 450, 300, 200, 180, 300, 250, 350], expenses: [80, 210, 300, 220, 150, 120, 200, 180, 240] },
  'Last Year': { revenue: [90, 280, 380, 260, 170, 150, 250, 210, 300], expenses: [70, 190, 270, 200, 140, 110, 180, 160, 210] },
};
export const breakdown = [
  { name: 'Salaries', value: 40 }, { name: 'Rent', value: 30 }, { name: 'Software', value: 20 }, { name: 'Marketing', value: 10 },
];
export const transactions = [
  ['Ava Martinez', '23 Oct 2025', 'Software Subscription', 'Expense', '-$89', 'Pending'],
  ['Emma Johnson', '28 Oct 2025', 'Client Payment - Project Alpha', 'Revenue', '+$2,500', 'Completed'],
  ['Ethan Davis', '22 Oct 2025', 'Consulting Income', 'Revenue', '+$800', 'Completed'],
  ['Isabella Moore', '28 Oct 2025', 'Client Payment - Project Alpha', 'Revenue', '+$2,500', 'Completed'],
  ['James Miller', '26 Oct 2025', 'Office Rent', 'Expense', '-$1,200', 'Paid'],
  ['Sophia Taylor', '21 Oct 2025', 'Marketing Campaign', 'Expense', '-$640', 'Paid'],
  ['Noah Wilson', '20 Oct 2025', 'Retainer Fee', 'Revenue', '+$1,200', 'Completed'],
  ['Olivia Brown', '19 Oct 2025', 'Cloud Hosting', 'Expense', '-$210', 'Pending'],
  ['Liam Anderson', '18 Oct 2025', 'Client Payment - Project Beta', 'Revenue', '+$3,100', 'Completed'],
  ['Mia Thompson', '17 Oct 2025', 'Equipment Purchase', 'Expense', '-$980', 'Paid'],
  ['Lucas Garcia', '16 Oct 2025', 'Consulting Income', 'Revenue', '+$450', 'Completed'],
  ['Amelia Clark', '15 Oct 2025', 'Contractor Payment', 'Expense', '-$1,500', 'Paid'],
].map(([name, date, description, category, amount, status], id) => ({ id, name, date, description, category, amount, status }));
