import React from 'react';
const paths = {
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M22 21v-2a4 4 0 0 0-3-4', 'M16 3a4 4 0 0 1 0 8'],
  overview: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
  wallet: ['M20 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a1 1 0 0 0 1 1h15a2 2 0 0 0 2-2v-6', 'M3 8h18v7h-6a3.5 3.5 0 0 1 0-7', 'M16 11.5h.01'],
  arrowup: ['M7 17 17 7', 'M7 7h10v10'],
  arrowdown: ['M17 7 7 17', 'M7 7v10h10'],
  transfer: ['M4 7h15m-4-4 4 4-4 4', 'M20 17H5m4-4-4 4 4 4'],
  card: ['M3 5h18v14H3z', 'M3 10h18', 'M7 15h3'],
  plus: ['M12 5v14M5 12h14'],
  search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
  chevron: ['m9 18 6-6-6-6'],
  down: ['m6 9 6 6 6-6'],
  panel: ['M3 4h18v16H3z', 'M9 4v16'],
  menu: ['M4 6h16M4 12h16M4 18h16'],
  bell: ['M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9', 'M10 21h4'],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'],
  eyeoff: ['m3 3 18 18', 'M10 5.2A12 12 0 0 1 22 12s-1.5 2.7-4 4.5', 'M6 6.7C3.3 8.7 2 12 2 12s3.5 7 10 7c1.4 0 2.6-.3 3.7-.8'],
  calendar: ['M3 5h18v16H3z', 'M3 10h18M8 3v4m8-4v4'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20', 'M9 9a3 3 0 1 1 4 2.8c-1 .5-1 1.2-1 2.2', 'M12 17h.01'],
  close: ['m6 6 12 12M18 6 6 18'],
  check: ['m5 12 4 4L19 6'],
  shield: ['M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6z', 'm8 12 3 3 5-6'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20', 'M12 6v6l4 2'],
  bank: ['M3 9 12 3l9 6H3', 'M5 11v7m7-7v7m7-7v7M3 21h18'],
  dots: ['M5 12h.01M12 12h.01M19 12h.01'],
  download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
  filter: ['M4 7h16M7 12h10m-7 5h4'],
  grid: ['M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
  upi: ['M7 4 14 12 7 20', 'M12 4 19 12 12 20'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20', 'M12 11v5m0-8h.01'],
  back: ['m15 18-6-6 6-6'],
  refresh: ['M20 11a8 8 0 1 0-2 6', 'M20 4v7h-7'],
  lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3'],
  alert: ['M12 3 2 21h20L12 3', 'M12 9v5m0 3h.01'],
  external: ['M14 3h7v7m0-7-11 11', 'M10 3H3v18h18v-7']
};
export function Icon({ name, size = 20, className = '' }) {
  return <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.65}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={true}
  >
    {(paths[name] || paths.info).map((d, i) => <path d={d} key={i} />)}
  </svg>;
}
