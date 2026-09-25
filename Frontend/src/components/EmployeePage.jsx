import { useState } from 'react';

export default function EmployeePage({ search = '', onSelect, navigate, notify }) {
  const [perfTab, setPerfTab] = useState('top'); // 'top' | 'attention' | 'insights'
  const [dirTab, setDirTab] = useState('list'); // 'list' | 'leave' | 'today'
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [period, setPeriod] = useState('All Time');
  const [periodOpen, setPeriodOpen] = useState(false);

  const [newEmp, setNewEmp] = useState({
    name: '',
    role: '',
    dept: 'Creative Division',
    type: 'Full-Time',
    phone: '+1234567890'
  });

  // Top Performers, Needs Attention, and AI Insights data
  const topPerformers = [
    {
      name: 'James Carter',
      score: '98%',
      initials: 'JC',
      bg: '#e2e8f0',
      color: '#334155'
    },
    {
      name: 'Amira Lee',
      score: '95%',
      initials: 'AL',
      bg: '#ccfbf1',
      color: '#0f766e'
    },
    {
      name: 'Daniel Wong',
      score: '92%',
      initials: 'DW',
      bg: '#fae8ff',
      color: '#86198f'
    }
  ];

  const attentionList = [
    {
      name: 'Stephen Wong',
      score: '84%',
      initials: 'SW',
      bg: '#fee2e2',
      color: '#dc2626'
    },
    {
      name: 'Amy Smith',
      score: '81%',
      initials: 'AS',
      bg: '#fef3c7',
      color: '#b45309'
    }
  ];

  const aiInsightsList = [
    {
      name: 'Friday Attendance',
      score: '88%',
      avatar: '',
      initials: 'FA',
      bg: '#ede9fe',
      color: '#6d28d9'
    },
    {
      name: 'Design Squad',
      score: '97%',
      avatar: '',
      initials: 'DS',
      bg: '#e0e7ff',
      color: '#4338ca'
    }
  ];

  const currentPerformers = perfTab === 'top' ? topPerformers : perfTab === 'attention' ? attentionList : aiInsightsList;

  // Recent Attendance matching screenshot
  const recentAttendanceList = [
    {
      name: 'Amy Smith',
      role: 'Creative Division',
      status: 'Arrived Late',
      statusType: 'late',
      time: '08:12 AM',
      initials: 'AS',
      bg: '#fef3c7',
      color: '#b45309'
    },
    {
      name: 'Barbara Gray',
      role: 'HR Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '08:00 AM',
      initials: 'BG',
      bg: '#f3e8ff',
      color: '#7e22ce'
    },
    {
      name: 'Donald Simmons',
      role: 'Development Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '08:00 AM',
      initials: 'DS',
      bg: '#e0f2fe',
      color: '#0369a1'
    },
    {
      name: 'Elizabeth King',
      role: 'Marketing Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '07:00 AM',
      initials: 'EK',
      bg: '#ffedd5',
      color: '#c2410c'
    }
  ];

  // Employee Directory matching screenshot
  const [directory, setDirectory] = useState([
    {
      id: 'EP2346172',
      name: 'Maria Moore',
      tag: 'Check-In',
      tagType: 'checkin',
      role: 'Product Designer',
      dept: 'Creative Division',
      score: '98%',
      joined: 'August 23, 2023',
      type: 'Full-Time',
      phone: '+1234567890',
      initials: 'MM',
      bg: '#e6fcf5',
      color: '#0ca678'
    },
    {
      id: 'EP2346121',
      name: 'Stephen Wong',
      tag: 'Absent',
      tagType: 'absent',
      role: 'Front-End Developer',
      dept: 'Development Division',
      score: '89%',
      joined: 'May 12, 2023',
      type: 'Part-Time',
      phone: '+1234567890',
      initials: 'SW',
      bg: '#fef9c3',
      color: '#ca8a04'
    },
    {
      id: 'EP2346123',
      name: 'Rebecca Miller',
      tag: 'Check-In',
      tagType: 'checkin',
      role: 'Lead HRD',
      dept: 'HR Division',
      score: '99%',
      joined: 'January 1, 2021',
      type: 'Full-Time',
      phone: '+1234567890',
      initials: 'RM',
      bg: '#fce7f3',
      color: '#be185d'
    }
  ]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.role) return;
    const initials = newEmp.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
    const item = {
      id: `EP2346${Math.floor(100 + Math.random() * 900)}`,
      name: newEmp.name,
      tag: 'Check-In',
      tagType: 'checkin',
      role: newEmp.role,
      dept: newEmp.dept,
      score: '96%',
      joined: 'Today',
      type: newEmp.type,
      phone: newEmp.phone || '+1234567890',
      avatar: '',
      initials: initials || 'EM',
      bg: '#e0e7ff',
      color: '#4338ca'
    };
    setDirectory([item, ...directory]);
    setAddModalOpen(false);
    setNewEmp({ name: '', role: '', dept: 'Creative Division', type: 'Full-Time', phone: '+1234567890' });
    if (notify) notify(`Created employee profile for ${item.name}`);
  };

  const filteredDirectory = directory.filter((emp) => {
    const q = search.toLowerCase();
    const matchesSearch = `${emp.name} ${emp.role} ${emp.dept} ${emp.id} ${emp.phone}`.toLowerCase().includes(q);
    if (!matchesSearch) return false;
    if (dirTab === 'leave') return emp.tagType === 'absent';
    if (dirTab === 'today') return emp.tagType === 'checkin';
    return true;
  });

  return (
    <div className="employee-dashboard-wrapper">
      {/* =========================================================
          TOP 3-COLUMN SECTION
          ========================================================= */}
      <section className="employee-top-grid">
        {/* ================= COLUMN 1: LEFT STACK ================= */}
        <div className="emp-left-stack">
          {/* Card 1A: Total Employees (Solid Cornflower Blue) */}
          <article className="card-total-emp-blue">
            <div className="total-emp-header">
              <div className="total-emp-title-wrap">
                <span className="total-emp-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <span>Total Employees</span>
              </div>

              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="total-emp-period-btn"
                  onClick={() => setPeriodOpen(!periodOpen)}
                >
                  <span>{period}</span>
                  <small>⌄</small>
                </button>
                {periodOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '6px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      zIndex: 30,
                      minWidth: '120px',
                      padding: '4px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {['All Time', 'This Year', 'This Quarter', 'This Month'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '7px 12px',
                          border: 'none',
                          background: period === p ? '#eff6ff' : 'transparent',
                          color: period === p ? '#2563eb' : '#1e293b',
                          fontSize: '12px',
                          fontWeight: period === p ? 600 : 400,
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setPeriod(p);
                          setPeriodOpen(false);
                          if (notify) notify(`Employee count filtered to ${p}`);
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="total-emp-big-num">250</div>
            <div className="total-emp-subtext">Active attendance count for today</div>
          </article>

          {/* Card 1B: Performance & Attention List (White) */}
          <article className="card-performers-white">
            <div className="perf-mini-pills">
              <button
                type="button"
                className={`perf-mini-pill-btn ${perfTab === 'top' ? 'active' : ''}`}
                onClick={() => setPerfTab('top')}
              >
                Top Performances
              </button>
              <button
                type="button"
                className={`perf-mini-pill-btn ${perfTab === 'attention' ? 'active' : ''}`}
                onClick={() => setPerfTab('attention')}
              >
                Needs Attention
              </button>
              <button
                type="button"
                className={`perf-mini-pill-btn ${perfTab === 'insights' ? 'active' : ''}`}
                onClick={() => setPerfTab('insights')}
              >
                AI Insights
              </button>
            </div>

            <div className="perf-rows-list">
              {currentPerformers.map((item, idx) => (
                <div key={idx} className="perf-row-item">
                  <div className="perf-row-left">
                    <div className="perf-avatar-circle">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: item.bg,
                          color: item.color,
                          fontWeight: 700,
                          fontSize: '11px',
                          borderRadius: '50%'
                        }}
                      >
                        {item.initials}
                      </div>
                    </div>
                    <span className="perf-row-name">{item.name}</span>
                  </div>

                  <div className="perf-row-right">
                    {/* Sparkline mini wave */}
                    <svg className="perf-sparkline-svg" viewBox="0 0 50 18" fill="none">
                      <path
                        d="M 2 14 Q 14 4, 25 10 T 48 3"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="perf-row-score">
                      <b>{item.score}</b> Performance Index
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* ================= COLUMN 2: CENTER (Recent Attendance) ================= */}
        <article className="emp-card card-recent-att-col">
          <div>
            <div className="recent-att-head">
              <span className="recent-att-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                </svg>
              </span>
              <h2>Recent Attendance</h2>
            </div>

            <div className="recent-att-list">
              {recentAttendanceList.map((item, idx) => (
                <div key={idx} className="recent-att-item">
                  <div className="recent-att-item-left">
                    <div className="recent-att-avatar">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: item.bg,
                          color: item.color,
                          fontWeight: 700,
                          fontSize: '12px',
                          borderRadius: '50%'
                        }}
                      >
                        {item.initials}
                      </div>
                    </div>

                    <div className="recent-att-info">
                      <div className="recent-att-name-row">
                        <span className="recent-att-name">{item.name}</span>
                        <span className={`att-status-pill ${item.statusType}`}>{item.status}</span>
                      </div>
                      <span className="recent-att-dept">{item.role}</span>
                    </div>
                  </div>

                  <div className="recent-att-item-right">
                    <span className="recent-att-time">{item.time}</span>
                    <span className="recent-att-sublabel">Check-in</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-att-footer">
            <span className="recent-att-count-text">230+ other attendance records logged today</span>
            <button
              type="button"
              className="recent-att-see-all-link"
              onClick={() => navigate && navigate('asistencia')}
            >
              See All Attendance
            </button>
          </div>
        </article>

        {/* ================= COLUMN 3: RIGHT STACK ================= */}
        <div className="emp-right-stack">
          {/* Card 3A: Today's Attendance Snapshot */}
          <article className="card-snapshot-white">
            <div className="snapshot-header">
              <span className="snapshot-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 18V9" />
                  <path d="M10 18V5" />
                  <path d="M14 18v-7" />
                  <path d="M18 18V3" />
                </svg>
              </span>
              <h2>Today's Attendance Snapshot</h2>
            </div>

            <div className="snapshot-stats-trio">
              <div className="snapshot-col">
                <div className="snapshot-num">235</div>
                <div className="snapshot-label">Checked-In</div>
              </div>
              <div className="snapshot-v-divider" />
              <div className="snapshot-col">
                <div className="snapshot-num">1</div>
                <div className="snapshot-label">Late</div>
              </div>
              <div className="snapshot-v-divider" />
              <div className="snapshot-col">
                <div className="snapshot-num">14</div>
                <div className="snapshot-label">Absent</div>
              </div>
            </div>

            {/* Blue Callout Banner */}
            <div className="snapshot-callout-blue">
              <span>✦</span>
              <span>4% workforce consistently late in the last 2 weeks.</span>
            </div>
          </article>

          {/* Card 3B: Leave Request */}
          <article className="card-leave-white">
            <div className="leave-header">
              <span className="snapshot-icon-box">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h2>Leave Request</h2>
            </div>

            <p className="leave-desc">
              Track pending, approved, and rejected leave requests in real time.
            </p>

            <div className="leave-bottom-row">
              <div className="leave-stat-group">
                <span className="leave-big-num">61</span>
                <span className="leave-pill-badge">+2.3%</span>
              </div>

              <button
                type="button"
                className="leave-view-link"
                onClick={() => notify && notify('Viewing all 61 active leave requests')}
              >
                View All Requests
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          BOTTOM LARGE CARD: Employee Directory Table
          ========================================================= */}
      <section className="emp-card card-emp-directory">
        {/* Directory Head */}
        <div className="directory-head-row">
          <div className="directory-title-wrap">
            <span className="directory-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </span>
            <h2>Employee Directory</h2>
          </div>

          <div className="directory-actions">
            <button
              type="button"
              className="directory-add-btn"
              onClick={() => setAddModalOpen(true)}
            >
              <span>+</span>
              <span>Add New Employee</span>
            </button>

            <button
              type="button"
              className="directory-view-all-link"
              onClick={() => {
                setDirTab('list');
                if (notify) notify('Showing complete employee directory (250 members)');
              }}
            >
              View All
            </button>
          </div>
        </div>

        {/* Directory Filter Pills */}
        <div className="directory-tabs-row">
          <button
            type="button"
            className={`directory-tab-btn ${dirTab === 'list' ? 'active' : ''}`}
            onClick={() => setDirTab('list')}
          >
            Employee List
          </button>
          <button
            type="button"
            className={`directory-tab-btn ${dirTab === 'leave' ? 'active' : ''}`}
            onClick={() => setDirTab('leave')}
          >
            Leave Request
          </button>
          <button
            type="button"
            className={`directory-tab-btn ${dirTab === 'today' ? 'active' : ''}`}
            onClick={() => setDirTab('today')}
          >
            Today's Attendance
          </button>
        </div>

        {/* Directory Table */}
        <div className="directory-table-wrap">
          <table className="directory-custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Productivity Score</th>
                <th>Joined Date</th>
                <th>Employment Type</th>
                <th>Phone Number</th>
                <th style={{ width: '36px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredDirectory.map((emp) => (
                <tr key={emp.id} onClick={() => onSelect && onSelect(emp)} style={{ cursor: 'pointer' }}>
                  {/* Name + Avatar */}
                  <td>
                    <div className="att-user-cell">
                      <div className="att-avatar-wrap">
                        <div
                          className="att-avatar-fallback"
                          style={{ background: emp.bg, color: emp.color }}
                        >
                          {emp.initials}
                        </div>
                      </div>

                      <div className="att-user-details">
                        <div className="att-user-name-row">
                          <span className="att-user-name">{emp.name}</span>
                          <span className={`att-tag-pill ${emp.tagType}`}>{emp.tag}</span>
                        </div>
                        <span className="att-user-id">{emp.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <div className="att-role-cell">
                      <span className="att-role-title">{emp.role}</span>
                      <span className="att-role-dept">{emp.dept}</span>
                    </div>
                  </td>

                  {/* Productivity Score */}
                  <td>
                    <b style={{ fontSize: '13.5px', color: '#1e293b' }}>{emp.score}</b>
                  </td>

                  {/* Joined Date */}
                  <td>
                    <span style={{ fontSize: '12.5px', color: '#64748b' }}>{emp.joined}</span>
                  </td>

                  {/* Employment Type */}
                  <td>
                    <span className="emp-type-badge">{emp.type}</span>
                  </td>

                  {/* Phone Number */}
                  <td>
                    <span style={{ fontSize: '12.5px', color: '#64748b' }}>{emp.phone}</span>
                  </td>

                  {/* Options Menu */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="att-action-dot-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (notify) notify(`Employee profile settings for ${emp.name}`);
                      }}
                      aria-label={`Options for ${emp.name}`}
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDirectory.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No employees found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================
          ADD EMPLOYEE MODAL DIALOG
          ========================================================= */}
      {addModalOpen && (
        <div className="att-modal-scrim" onClick={() => setAddModalOpen(false)}>
          <div className="att-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="att-modal-header">
              <h3>Add New Employee</h3>
              <button
                type="button"
                className="att-modal-close-btn"
                onClick={() => setAddModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddEmployee}>
              <div className="att-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Moore"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  className="att-form-input"
                />
              </div>

              <div className="att-form-group">
                <label>Job Title / Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Designer"
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  className="att-form-input"
                />
              </div>

              <div className="att-form-group">
                <label>Department / Division</label>
                <select
                  value={newEmp.dept}
                  onChange={(e) => setNewEmp({ ...newEmp, dept: e.target.value })}
                  className="att-form-select"
                >
                  <option>Creative Division</option>
                  <option>Development Division</option>
                  <option>HR Division</option>
                  <option>Marketing Division</option>
                  <option>Operations Division</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="att-form-group">
                  <label>Employment Type</label>
                  <select
                    value={newEmp.type}
                    onChange={(e) => setNewEmp({ ...newEmp, type: e.target.value })}
                    className="att-form-select"
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contractor</option>
                  </select>
                </div>
                <div className="att-form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={newEmp.phone}
                    onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                    className="att-form-input"
                  />
                </div>
              </div>

              <div className="att-modal-footer">
                <button
                  type="button"
                  style={{
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="directory-add-btn">
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
