import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

/** React replacement for the template's DataTables: client-side pagination with "Showing x to y of n entries". */
export function DataTable({ columns, rows, pageSize = 6, total }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  useEffect(() => { if (page > pages - 1) setPage(pages - 1); }, [pages, page]);
  const slice = useMemo(() => rows.slice(page * pageSize, page * pageSize + pageSize), [rows, page, pageSize]);
  const count = total ?? rows.length;
  const from = rows.length ? page * pageSize + 1 : 0;
  const to = Math.min(rows.length, (page + 1) * pageSize);
  const go = next => setPage(Math.min(pages - 1, Math.max(0, next)));

  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr>{columns.map(c => <th key={c.label} scope="col">{c.label}</th>)}</tr></thead>
          <tbody>
            {slice.map((row, index) => (
              <tr key={row.id ?? index}>{columns.map(c => <td key={c.label}>{c.render ? c.render(row) : row[c.key]}</td>)}</tr>
            ))}
            {!slice.length && <tr><td colSpan={columns.length} className="text-center text-muted py-4">No results</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
        <div className="text-muted" role="status">Showing {from} to {to} of {count} entries</div>
        <ul className="pagination mb-0">
          <li className={`page-item ${page === 0 ? 'disabled' : ''}`}><button className="page-link" aria-label="First" onClick={() => go(0)}><ChevronsLeft size={16} /></button></li>
          <li className={`page-item ${page === 0 ? 'disabled' : ''}`}><button className="page-link" aria-label="Previous" onClick={() => go(page - 1)}><ChevronLeft size={16} /></button></li>
          {Array.from({ length: pages }, (_, i) => (
            <li key={i} className={`page-item ${i === page ? 'active' : ''}`}><button className="page-link" onClick={() => go(i)}>{i + 1}</button></li>
          ))}
          <li className={`page-item ${page === pages - 1 ? 'disabled' : ''}`}><button className="page-link" aria-label="Next" onClick={() => go(page + 1)}><ChevronRight size={16} /></button></li>
          <li className={`page-item ${page === pages - 1 ? 'disabled' : ''}`}><button className="page-link" aria-label="Last" onClick={() => go(pages - 1)}><ChevronsRight size={16} /></button></li>
        </ul>
      </div>
    </>
  );
}
