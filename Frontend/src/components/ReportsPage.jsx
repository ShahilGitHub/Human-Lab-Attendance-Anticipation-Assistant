import React from 'react';

export default function ReportsPage({ exportReport = () => {}, navigate = () => {}, notify = () => {} }) {
  const centers = [
    { name: 'Norte · CT Monterrey', score: 88, shifts: 4, tone: 'green' },
    { name: 'Este · Centro Mérida', score: 82, shifts: 3, tone: 'coral' },
    { name: 'Oeste · CT Tijuana', score: 94, shifts: 5, tone: 'green' },
    { name: 'Sur · Centro Puebla', score: 96, shifts: 4, tone: 'green' },
  ];

  const auditLogs = [
    {
      id: 1,
      title: 'Bi-Weekly Pay Run Approved',
      time: 'Today · 11:20 AM',
      detail: '248 direct deposits approved totaling $2,458,900 by Admin.',
      type: 'success'
    },
    {
      id: 2,
      title: 'Automated Workload Rebalance',
      time: 'Today · 09:45 AM',
      detail: '5 overloaded team members redistributed across Creative & Development divisions.',
      type: 'default'
    },
    {
      id: 3,
      title: 'Alert ALT-2048 Attended',
      time: 'Yesterday · 04:15 PM',
      detail: 'Night shift replacement verified with CT Monterrey supervisor.',
      type: 'success'
    },
    {
      id: 4,
      title: 'Policy v4.2 Coverage Threshold Synced',
      time: 'Sep 23 · 02:00 PM',
      detail: 'Minimum staffing threshold set to 70% confidence across North region.',
      type: 'warning'
    }
  ];

  return (
    <div className="subpage-dashboard-container">
      {/* Header */}
      <div className="subpage-head-bar">
        <div className="subpage-head-title-wrap">
          <span className="subpage-kicker">Operational Audit & Pilot Governance</span>
          <h1>Reports & Audit Ledger</h1>
          <p>Real-time pilot performance benchmarks, regional center coverage, and compliance records.</p>
        </div>
        <div className="subpage-head-actions">
          <button
            className="subpage-btn-primary"
            onClick={exportReport}
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export Audit Data (CSV)</span>
          </button>
        </div>
      </div>

      {/* Top 3 KPI Benchmark Cards */}
      <section className="reports-kpis-grid">
        {/* KPI 1 */}
        <article className="subpage-card reports-kpi-card">
          <div className="reports-kpi-val-row">
            <span className="reports-kpi-num">64.2%</span>
            <span className="reports-kpi-target-tag">Target ≥ 60% · K1</span>
          </div>
          <div className="reports-progress-track">
            <div className="reports-progress-fill green" style={{ width: '64.2%' }} />
          </div>
          <p className="reports-kpi-note">Absence Anticipation (≥24h ahead of shift start)</p>
        </article>

        {/* KPI 2 */}
        <article className="subpage-card reports-kpi-card">
          <div className="reports-kpi-val-row">
            <span className="reports-kpi-num">78.5%</span>
            <span className="reports-kpi-target-tag">Target ≥ 70% · K2</span>
          </div>
          <div className="reports-progress-track">
            <div className="reports-progress-fill" style={{ width: '78.5%' }} />
          </div>
          <p className="reports-kpi-note">Prediction Model Precision on High-Risk Shifts</p>
        </article>

        {/* KPI 3 */}
        <article className="subpage-card reports-kpi-card">
          <div className="reports-kpi-val-row">
            <span className="reports-kpi-num">54.0%</span>
            <span className="reports-kpi-target-tag">Target ≥ 50% · K3</span>
          </div>
          <div className="reports-progress-track">
            <div className="reports-progress-fill green" style={{ width: '54%' }} />
          </div>
          <p className="reports-kpi-note">Alerts with Proactive Staffing Action Logged</p>
        </article>
      </section>

      {/* Bottom Grid: Regional Coverage + Audit Event Log */}
      <div className="reports-bottom-grid">
        {/* Center Coverage */}
        <section className="subpage-card">
          <div className="subpage-card-header">
            <div className="subpage-icon-box">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <h2>Regional Center Coverage</h2>
              <p>Workforce staffing fulfillment by operational facility.</p>
            </div>
          </div>

          <div className="center-coverage-list">
            {centers.map((c) => (
              <div key={c.name} className="center-coverage-item">
                <div className="center-cov-left">
                  <span className={`center-cov-dot ${c.tone}`} />
                  <div>
                    <span className="center-cov-name">{c.name}</span>
                    <span className="center-cov-shifts">· {c.shifts} shifts monitored</span>
                  </div>
                </div>
                <span className="center-cov-score">{c.score}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance & Audit Ledger */}
        <section className="subpage-card">
          <div className="subpage-card-header">
            <div className="subpage-icon-box">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h2>Compliance & Audit Trail</h2>
              <p>Tamper-evident log of operational decisions and model updates.</p>
            </div>
          </div>

          <div className="audit-events-list">
            {auditLogs.map((log) => (
              <div key={log.id} className={`audit-event-row ${log.type}`}>
                <div className="audit-event-info">
                  <div className="audit-event-title-row">
                    <span className="audit-event-title">{log.title}</span>
                    <span className="audit-event-time">{log.time}</span>
                  </div>
                  <span className="audit-event-detail">{log.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
