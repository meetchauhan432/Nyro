export const stats = [
  { label: 'Total Team Members', value: '12,354', trend: '+12.1%', sub: 'Vs last month: 8,554' },
  { label: 'Customer Satisfaction', value: '94%', trend: '+12.1%', sub: 'Vs last month: 20%' },
  { label: 'New Team Members', value: '4,544', trend: '+18.6%', sub: 'Vs last month: 3,830' },
];
export const leads = [{ label: 'Active Leads', value: '248', trend: '+12.1%' }, { label: 'Converted Leads', value: '192', trend: '+9.1%' }];
export const performance = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Team 1', data: [40, 55, 45, 70, 60, 85] }, { name: 'Team 2', data: [30, 40, 60, 50, 75, 65] }, { name: 'Team 3', data: [20, 35, 30, 45, 40, 55] },
  ],
};
export const projects = [
  { name: 'CRM Revamp System', deadline: '31 Oct 2025', done: 58, total: 70 },
  { name: 'Customer Onboarding Flow', deadline: '05 Nov 2025', done: 39, total: 60 },
  { name: 'Lead Tracker Automation', deadline: '10 Nov 2025', done: 52, total: 100 },
  { name: 'Support Chatbot Upgrade', deadline: '08 Nov 2025', done: 73, total: 100 },
];
export const control = [
  ['Emma Johnson', 5], ['Liam Smith', 8], ['Olivia Brown', 6], ['Noah Davis', 9], ['Sophia Wilson', 7],
].map(([name, tasks]) => ({ name, tasks }));
export const members = [
  ['Emma Johnson', 'CRM Manager', 62, 51, '82%', '1.3 hrs', 4.9, 'Active'],
  ['Liam Anderson', 'Sales Executive', 55, 42, '76%', '1.8 hrs', 4.7, 'Active'],
  ['Olivia Brown', 'Support Specialist', 49, 39, '79%', '1.5 hrs', 4.8, 'Active'],
  ['Noah Wilson', 'Lead Nurturer', 46, 31, '67%', '2.2 hrs', 4.5, 'Active'],
  ['Sophia Taylor', 'Customer Support', 43, 34, '79%', '1.6 hrs', 4.7, 'Active'],
  ['James Miller', 'Data Entry Operator', 38, 0, '—', '1.1 hrs', 4.2, 'On Leave'],
  ['Mia Thompson', 'Sales Executive', 41, 29, '71%', '1.9 hrs', 4.4, 'Active'],
  ['Lucas Garcia', 'Support Specialist', 36, 27, '75%', '1.7 hrs', 4.6, 'Active'],
  ['Amelia Clark', 'CRM Manager', 52, 40, '77%', '1.4 hrs', 4.8, 'Active'],
  ['Ethan Davis', 'Lead Nurturer', 33, 21, '64%', '2.4 hrs', 4.3, 'On Leave'],
].map(([name, role, assigned, converted, rate, response, rating, status], id) => ({ id, name, role, assigned, converted, rate, response, rating, status }));
