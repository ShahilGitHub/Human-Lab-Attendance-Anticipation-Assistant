import React, { useState } from 'react';

export default function PayrollPage({ search = '', notify = () => {} }) {
  const [payFilter, setPayFilter] = useState('all'); // 'all' | 'processed' | 'pending'

  const disbursements = [
    {
      id: 'PAY-8901',
      name: 'Maria Moore',
      role: 'Product Designer',
      dept: 'Creative Division',
      gross: '$4,200.00',
      deductions: '-$714.00',
      net: '$3,486.00',
      status: 'Processed',
      statusType: 'processed',
      method: 'Direct Deposit',
      initials: 'MM',
      bg: '#e0e7ff',
      color: '#4338ca'
    },
    {
      id: 'PAY-8902',
      name: 'Stephen Wong',
      role: 'Front-End Developer',
      dept: 'Development Division',
      gross: '$5,100.00',
      deductions: '-$918.00',
      net: '$4,182.00',
      status: 'Processed',
      statusType: 'processed',
      method: 'Direct Deposit',
      initials: 'SW',
      bg: '#fee2e2',
      color: '#dc2626'
    },
    {
      id: 'PAY-8903',
      name: 'Rebecca Miller',
      role: 'Lead HRD',
      dept: 'HR Division',
      gross: '$4,800.00',
      deductions: '-$864.00',
      net: '$3,936.00',
      status: 'Processed',
      statusType: 'processed',
      method: 'Direct Deposit',
      initials: 'RM',
      bg: '#fce7f3',
      color: '#be185d'
    },
    {
      id: 'PAY-8904',
      name: 'Amir Smith',
      role: 'Operations Lead',
      dept: 'Operations Division',
      gross: '$3,900.00',
      deductions: '-$663.00',
      net: '$3,237.00',
      status: 'Pending Review',
      statusType: 'pending',
      method: 'Pending Wire',
      initials: 'AS',
      bg: '#d1fae5',
      color: '#047857'
    },
    {
      id: 'PAY-8905',
      name: 'David Chen',
      role: 'QA Engineer',
      dept: 'Development Division',
      gross: '$4,500.00',
      deductions: '-$765.00',
      net: '$3,735.00',
      status: 'Processed',
      statusType: 'processed',
      method: 'Direct Deposit',
      initials: 'DC',
      bg: '#ede9fe',
      color: '#6d28d9'
    },
    {
      id: 'PAY-8906',
      name: 'Elizabeth King',
      role: 'Marketing Specialist',
      dept: 'Marketing Division',
      gross: '$4,100.00',
      deductions: '-$697.00',
      net: '$3,403.00',
      status: 'Pending Review',
      statusType: 'pending',
      method: 'Direct Deposit',
      initials: 'EK',
      bg: '#ffedd5',
      color: '#c2410c'
    }
  ];

  const filteredDisbursements = disbursements.filter((d) => {
    const matchesSearch = `${d.name} ${d.id} ${d.dept} ${d.role} ${d.method}`.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (payFilter === 'processed') return d.statusType === 'processed';
    if (payFilter === 'pending') return d.statusType === 'pending';
    return true;
  });

  return (
    <div className="payroll-dashboard-container">
      {/* TOP 4-CARD METRICS GRID */}
      <section className="payroll-top-grid">
        {/* Metric 1: Total Payroll Payout */}
        <article className="payroll-metric-card accent-gradient">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </span>
            <span className="payroll-growth-pill">+2.3%</span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Total Payroll Payout</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">$2,458,900</span>
            </div>
            <span className="payroll-metric-sub">Bi-weekly payroll · 250 active employees</span>
          </div>
        </article>

        {/* Metric 2: Next Pay Date */}
        <article className="payroll-metric-card">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Next Pay Date</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">Oct 01, 2026</span>
            </div>
            <span className="payroll-metric-sub">Auto-deposit scheduled in 6 days</span>
          </div>
        </article>

        {/* Metric 3: Taxes & Withholdings */}
        <article className="payroll-metric-card">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="5" x2="5" y2="19" />
                <circle cx="6.5" cy="6.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
            </span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Taxes & Withholdings</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">$482,150</span>
            </div>
            <span className="payroll-metric-sub">Federal, state & medical deductions</span>
          </div>
        </article>

        {/* Metric 4: Direct Deposit Rate */}
        <article className="payroll-metric-card">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Direct Deposit Rate</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">99.2%</span>
            </div>
            <span className="payroll-metric-sub">248 electronic transfers verified</span>
          </div>
        </article>
      </section>

      {/* MAIN CARD: PAYROLL TABLE */}
      <section className="card-payroll-table">
        <div className="payroll-table-top-bar">
          <div className="payroll-title-wrap">
            <span className="payroll-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <div className="payroll-title-heading">
              <h2>Payroll Disbursements & Compensation</h2>
              <p>Track verified salary payouts, automatic tax withholdings, and pay run audits.</p>
            </div>
          </div>

          <div className="payroll-actions">
            <button
              className="payroll-btn-secondary"
              onClick={() => notify('Exported Payroll summary run (CSV)', 'info')}
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export Run</span>
            </button>
            <button
              className="payroll-btn-primary"
              onClick={() => notify('Approved bi-weekly payroll cycle successfully!', 'success')}
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Approve Pay Run</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="payroll-filter-row">
          <button
            className={`payroll-filter-tab ${payFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPayFilter('all')}
            type="button"
          >
            All Disbursements
          </button>
          <button
            className={`payroll-filter-tab ${payFilter === 'processed' ? 'active' : ''}`}
            onClick={() => setPayFilter('processed')}
            type="button"
          >
            Processed
          </button>
          <button
            className={`payroll-filter-tab ${payFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setPayFilter('pending')}
            type="button"
          >
            Pending Review
          </button>
        </div>

        {/* Table */}
        <div className="payroll-table-container">
          <table className="payroll-custom-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role & Division</th>
                <th>Gross Pay</th>
                <th>Deductions</th>
                <th>Net Payout</th>
                <th>Payment Status</th>
                <th>Method</th>
                <th style={{ width: '36px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredDisbursements.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="payroll-name-cell">
                      <span
                        className="sample-avatar-badge lg"
                        style={{ background: emp.bg, color: emp.color }}
                      >
                        {emp.initials}
                      </span>
                      <div className="payroll-name-info">
                        <span className="payroll-emp-name">{emp.name}</span>
                        <span className="payroll-emp-id">{emp.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="payroll-dept-cell">
                      <span className="payroll-dept-title">{emp.role}</span>
                      <span className="payroll-dept-sub">{emp.dept}</span>
                    </div>
                  </td>
                  <td>
                    <span className="payroll-gross-num">{emp.gross}</span>
                  </td>
                  <td>
                    <span className="payroll-deduct-num">{emp.deductions}</span>
                  </td>
                  <td>
                    <span className="payroll-net-num">{emp.net}</span>
                  </td>
                  <td>
                    <span className={`payroll-status-pill ${emp.statusType}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <span className="payroll-method-tag">
                      <span>🏦</span> {emp.method}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="payroll-action-btn"
                      onClick={() => notify(`Auditing disbursement ledger for ${emp.name} (${emp.id})`, 'info')}
                      aria-label="Actions"
                      type="button"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDisbursements.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No payroll disbursements found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
