import React from 'react';
import ReactApexChart from 'react-apexcharts';

const base = {
  chart: { toolbar: { show: false }, fontFamily: 'Inter, system-ui, sans-serif', foreColor: '#6b7280', animations: { speed: 500 } },
  colors: ['#5955d1', '#38bdf8', '#f59e0b', '#ef4444', '#22c55e'],
  dataLabels: { enabled: false },
  grid: { borderColor: '#eef0f5', strokeDashArray: 4 },
  legend: { show: false },
  stroke: { width: 2 },
};

function merge(a, b) {
  const out = { ...a };
  for (const key of Object.keys(b || {})) {
    out[key] = b[key] && typeof b[key] === 'object' && !Array.isArray(b[key]) ? merge(a?.[key] || {}, b[key]) : b[key];
  }
  return out;
}

/** Thin wrapper over react-apexcharts with NexLink-like defaults. */
export function Chart({ type, series, options, height = 280 }) {
  return <ReactApexChart type={type} series={series} options={merge(base, options)} height={height} width="100%" />;
}
