export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const revenueSeries = {
  Today: { labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm'], data: [12, 28, 45, 30, 52, 38] },
  Week: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [120, 210, 180, 260, 300, 150, 90] },
  Month: { labels: months, data: [120, 350, 450, 120, 200, 180, 300, 120, 250, 350, 250, 180] },
};

export const trafficSources = [
  { name: 'Organic Search', value: 41.5 }, { name: 'Direct Traffic', value: 27 }, { name: 'Referral Traffic', value: 18 },
  { name: 'Social Media', value: 10.3 }, { name: 'Email Traffic', value: 3.2 },
];

export const retention = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'SMEs', data: [40, 80, 70, 20, 20, 25] },
    { name: 'Startups', data: [20, 25, 25, 50, 20, 20] },
    { name: 'Enterprises', data: [20, 20, 20, 20, 15, 15] },
  ],
};

export const earnings = [
  { label: '673 Orders', value: '$2.78m' }, { label: '245 Pickups', value: '$65,823' }, { label: '120 Shipment', value: '$12,480' },
];

export const heatDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const heatmap = [
  { name: '4pm', data: [10, 14, 9, 18, 20, 15, 12] },
  { name: '2pm', data: [15, 18, 12, 22, 28, 25, 14] },
  { name: '12pm', data: [30, 28, 22, 50, 25, 20, 18] },
  { name: '10am', data: [20, 25, 18, 30, 12, 15, 10] },
  { name: '8am', data: [10, 12, 8, 15, 5, 7, 9] },
];

export const meetings = [
  { title: 'Team Stand Up', team: 'Marketing' }, { title: 'All Hands Meeting', team: 'Manager' }, { title: 'Sprint Planning', team: 'HR' },
  { title: 'Team Stand Up', team: 'Marketing' },
].map((meeting, id) => ({ ...meeting, id, time: '06:00 - 07:00' }));

export const deals = [
  { label: 'Closed Deals', value: '27', delta: '+10 Deals' }, { label: 'Pipeline Value', value: '$5.2M', delta: '+$270K' },
  { label: 'Conversion Rate', value: '16%', delta: '-2%' },
];

export const pipeline = [
  { label: 'Leads', value: 120 }, { label: 'Prospects', value: 85 }, { label: 'Opportunities', value: 40 }, { label: 'Closed Deals', value: 20 },
];

export const customers = [
  ['William Johnson', '+1 555 123 4567', 'johndoe1@example.com', '2 Days', 'Active'],
  ['Benjamin Martinez', '+91 98765 43210', 'janedoe2@example.com', '1st Half Day', 'Active'],
  ['Alexander Brown', '+44 7700 900123', 'testuser3@example.com', '4 Days', 'Pending'],
  ['Michael Davis', '+61 412 345 678', 'randomuser4@example.com', '2nd Half Day', 'Active'],
  ['David Wilson', '+81 90 1234 5678', 'demoaccount5@example.com', '1 Days', 'Pending'],
  ['Benjamin Martinez', '+971 50 123 4567', 'samplemail6@example.com', '1 Days', 'Pending'],
  ['Sophia Taylor', '+1 555 987 6543', 'sample7@example.com', '3 Days', 'Active'],
  ['Liam Anderson', '+44 7700 900456', 'sample8@example.com', '1 Days', 'Active'],
  ['Olivia Brown', '+61 412 111 222', 'sample9@example.com', '2 Days', 'Pending'],
  ['Noah Wilson', '+91 99887 76655', 'sample10@example.com', '5 Days', 'Active'],
  ['Emma Johnson', '+81 90 4321 8765', 'sample11@example.com', '1 Days', 'Active'],
  ['James Miller', '+971 50 765 4321', 'sample12@example.com', '2 Days', 'Pending'],
].map(([name, phone, email, days, status], id) => ({ id, name, phone, email, days, status }));

export const initialTasks = [
  'Prepare monthly financial report', 'Develop new marketing strategy', 'Reply to customer emails', 'Update website content', 'Review employee performance',
].map((title, id) => ({ id, title, time: '04:25PM', done: false }));
