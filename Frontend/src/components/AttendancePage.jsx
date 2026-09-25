import { useState } from 'react';

export default function AttendancePage({ search = '', navigate, notify }) {
  const [timeRange, setTimeRange] = useState('Last 6 months');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState('today'); // 'today' | 'absent' | 'leave'
  const [insightIndex, setInsightIndex] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Employee log modal form state
  const [newLog, setNewLog] = useState({
    name: '',
    role: '',
    dept: 'Creative Division',
    checkIn: '08:00 AM',
    checkOut: '05:00 PM',
    status: 'Punctual',
    statusType: 'punctual',
    notes: 'On schedule'
  });

  // Insights carousel data matching reference
  const insights = [
    {
      value: '12%',
      label: 'Attendance Risk (Next 7 Days)',
      desc: 'AI forecasts a possible rise in late arrivals and absences over the next week, influenced by patterns such as Friday backlogs, weather conditions, and recent attendance history.'
    },
    {
      value: '94%',
      label: 'On-Time Reliability Index',
      desc: 'Mid-week shifts demonstrate the strongest punctuality record. Arrival buffers in morning transit windows have reduced delay spikes by 18%.'
    },
    {
      value: '4.2h',
      label: 'Overtime Allocation Balance',
      desc: 'Engineering and Product teams maintained healthy workload limits with no severe burnout signals detected across the current pay period.'
    },
    {
      value: '98%',
      label: 'Remote Check-In Verification',
      desc: 'Geolocation and mobile biometric stamps verified all remote and field logs with zero compliance anomalies detected this cycle.'
    }
  ];

  // Records matching the exact screenshot
  const [records, setRecords] = useState([
    {
      id: 'EP2346172',
      name: 'Maria Moore',
      role: 'Product Designer',
      dept: 'Creative Division',
      checkIn: '08:12 AM',
      checkOut: '05:06 PM',
      tag: 'Check-In',
      tagType: 'checkin',
      status: 'Late Check-in',
      statusType: 'late',
      notes: 'Arrived 12 mins late',
      initials: 'MM',
      bg: '#e6fcf5',
      color: '#0ca678',
      category: 'today'
    },
    {
      id: 'EP2346121',
      name: 'Stephen Wong',
      role: 'Front-End Developer',
      dept: 'Development Division',
      checkIn: '07:00 AM',
      checkOut: '04:55 PM',
      tag: 'Absent',
      tagType: 'absent',
      status: 'Punctual',
      statusType: 'punctual',
      notes: 'On schedule',
      initials: 'SW',
      bg: '#fef9c3',
      color: '#ca8a04',
      category: 'absent'
    },
    {
      id: 'EP2346123',
      name: 'Rebecca Miller',
      role: 'Lead HRD',
      dept: 'HR Division',
      checkIn: '08:45 AM',
      checkOut: '06:30 PM',
      tag: 'Check-In',
      tagType: 'checkin',
      status: 'Overtime',
      statusType: 'overtime',
      notes: 'Worked extra 1h 30m',
      initials: 'RM',
      bg: '#fce7f3',
      color: '#be185d',
      category: 'today'
    },
    {
      id: 'EP2346123',
      name: 'Rebecca Miller',
      role: 'Lead HRD',
      dept: 'HR Division',
      checkIn: '08:05 AM',
      checkOut: '05:00 PM',
      tag: 'Check-In',
      tagType: 'checkin',
      status: 'Remote Check-in',
      statusType: 'remote',
      notes: 'Verified via mobile app',
      initials: 'RM',
      bg: '#fce7f3',
      color: '#be185d',
      category: 'today'
    }
  ]);

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newLog.name || !newLog.role) return;
    const initials = newLog.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() || 'EM';
    const isAbsent = newLog.status === 'Absent';
    const newEntry = {
      id: `EP2346${Math.floor(100 + Math.random() * 900)}`,
      name: newLog.name,
      role: newLog.role,
      dept: newLog.dept,
      checkIn: newLog.checkIn,
      checkOut: newLog.checkOut,
      tag: isAbsent ? 'Absent' : 'Check-In',
      tagType: isAbsent ? 'absent' : 'checkin',
      status: newLog.status,
      statusType: newLog.statusType,
      notes: newLog.notes || 'Manually logged by admin',
      avatar: '',
      initials,
      bg: '#e0e7ff',
      color: '#4338ca',
      category: isAbsent ? 'absent' : 'today'
    };
    setRecords([newEntry, ...records]);
    setAddModalOpen(false);
    setNewLog({
      name: '',
      role: '',
      dept: 'Creative Division',
      checkIn: '08:00 AM',
      checkOut: '05:00 PM',
      status: 'Punctual',
      statusType: 'punctual',
      notes: 'On schedule'
    });
    if (notify) notify(`Logged attendance for ${newEntry.name}`);
  };

  const filteredRecords = records.filter((r) => {
    const query = search.toLowerCase();
    const matchesSearch = `${r.name} ${r.role} ${r.dept} ${r.id} ${r.notes}`.toLowerCase().includes(query);
    if (!matchesSearch) return false;
    if (historyTab === 'today') return true;
    if (historyTab === 'absent') return r.category === 'absent' || r.tagType === 'absent';
    if (historyTab === 'leave') return r.statusType === 'remote' || r.notes.toLowerCase().includes('leave');
    return true;
  });

  return (
    <div className="attendance-dashboard-wrapper">
      {/* =========================================================
          TOP 3-CARD ROW
          ========================================================= */}
      <section className="attendance-top-grid">
        {/* CARD 1: Average Check-In/Out Time */}
        <article className="att-card card-avg-time">
          <div className="avg-time-header">
            <div className="avg-time-title-wrap">
              <span className="avg-time-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="14" />
                  <path d="M5 6h14" />
                  <circle cx="12" cy="18" r="4" />
                </svg>
              </span>
              <div className="avg-time-heading-text">
                <h2>Avarage Check-In/Out Time</h2>
                <p>Monitor daily attendance and track overall workforce performance trends.</p>
              </div>
            </div>

            {/* Time range dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="avg-time-dropdown-btn"
                onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
              >
                <span>{timeRange}</span>
                <small>⌄</small>
              </button>

              {timeDropdownOpen && (
                <div className="avg-time-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  {['Last 6 months', 'Last 30 days', 'This week', 'Year to date'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`avg-time-dropdown-item ${timeRange === opt ? 'active' : ''}`}
                      onClick={() => {
                        setTimeRange(opt);
                        setTimeDropdownOpen(false);
                        if (notify) notify(`Filtered check-in trends to ${opt}`);
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="avg-time-body">
            {/* Left Stats */}
            <div className="avg-time-stats-col">
              <div className="avg-time-stat-block">
                <div className="avg-time-val">
                  06:55 <small>AM</small>
                </div>
                <div className="avg-time-label">Avg. Monthly Check-In Time</div>
              </div>

              <div className="avg-time-stat-block">
                <div className="avg-time-val">
                  05:12 <small>PM</small>
                </div>
                <div className="avg-time-label">Avg. Monthly Check-Out Time</div>
              </div>
            </div>

            {/* Right Smooth Line Chart with Tooltip Node */}
            <div className="avg-time-chart-box">
              <div className="avg-time-svg-wrap">
                <svg className="avg-time-svg" viewBox="0 0 350 90" preserveAspectRatio="none">
                  {/* Connecting Smooth Path */}
                  <path
                    d="M 25 64 C 50 54, 65 48, 80 50 S 125 58, 140 54 S 180 40, 195 36 S 240 24, 255 18 S 285 36, 305 30 S 325 44, 335 50"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Circular hollow nodes at Jan, Feb, Mar, Apr */}
                  <circle cx="25" cy="64" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                  <circle cx="80" cy="50" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                  <circle cx="140" cy="54" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                  <circle cx="195" cy="36" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />

                  {/* May Active Point with Vertical Guide and Floating Pill */}
                  <line
                    x1="255"
                    y1="18"
                    x2="255"
                    y2="88"
                    stroke="#3b82f6"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                    opacity="0.6"
                  />
                  <circle cx="255" cy="18" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />

                  {/* Pill Tooltip Badge for 07:03 AM */}
                  <g transform="translate(225, -12)">
                    <rect width="60" height="22" rx="11" fill="#0f172a" />
                    <text x="30" y="15" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle">
                      07:03 AM
                    </text>
                  </g>

                  {/* Jun and Jul nodes */}
                  <circle cx="305" cy="30" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                  <circle cx="335" cy="50" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                </svg>
              </div>

              {/* Month Labels */}
              <div className="avg-time-months-row">
                <span className="avg-time-month-label">Jan</span>
                <span className="avg-time-month-label">Feb</span>
                <span className="avg-time-month-label">Mar</span>
                <span className="avg-time-month-label">Apr</span>
                <span className="avg-time-month-label active">May</span>
                <span className="avg-time-month-label">Jun</span>
                <span className="avg-time-month-label">Jul</span>
              </div>
            </div>
          </div>
        </article>

        {/* CARD 2: On-Time Rate */}
        <article className="att-card card-ontime-rate">
          <div>
            <div className="ontime-header">
              <span className="ontime-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 14 10" />
                </svg>
              </span>
              <div className="ontime-heading-text">
                <h2>On-Time Rate</h2>
                <p>Measures how many check-ins happened on schedule</p>
              </div>
            </div>

            <div className="ontime-metric-row">
              <div className="ontime-big-val">92%</div>
              <span className="ontime-pill-badge">+2.3%</span>
            </div>
          </div>

          <div className="ontime-chart-wrap">
            <div className="ontime-svg-box">
              <svg className="ontime-svg" viewBox="0 0 280 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ontimeWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5 44 Q 25 18, 45 40 T 85 24 T 125 42 T 165 18 T 205 38 T 245 14 T 275 22"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M 5 44 Q 25 18, 45 40 T 85 24 T 125 42 T 165 18 T 205 38 T 245 14 T 275 22 L 275 60 L 5 60 Z"
                  fill="url(#ontimeWaveGrad)"
                />
              </svg>
            </div>

            <div className="ontime-days-row">
              <span className="ontime-day-label">M</span>
              <span className="ontime-day-label">T</span>
              <span className="ontime-day-label">W</span>
              <span className="ontime-day-label">T</span>
              <span className="ontime-day-label active">F</span>
              <span className="ontime-day-label">S</span>
              <span className="ontime-day-label">S</span>
            </div>
          </div>
        </article>

        {/* CARD 3: Attendance Insight (Vibrant Solid Cornflower Blue) */}
        <article className="card-att-insight-blue">
          <div>
            <div className="att-insight-top-pill">
              <span>✦</span>
              <span>Attendance Insight</span>
            </div>

            <div className="att-insight-big-val">{insights[insightIndex].value}</div>
            <div className="att-insight-title">{insights[insightIndex].label}</div>
            <p className="att-insight-desc">{insights[insightIndex].desc}</p>
          </div>

          <div className="att-insight-controls">
            <button
              type="button"
              className="att-insight-arrow"
              onClick={() => setInsightIndex((insightIndex - 1 + insights.length) % insights.length)}
              aria-label="Previous insight"
            >
              ‹
            </button>

            <div className="att-insight-dots-track">
              {insights.map((_, i) => (
                <span
                  key={i}
                  className={`att-insight-dash ${insightIndex === i ? 'active' : ''}`}
                  onClick={() => setInsightIndex(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="att-insight-arrow"
              onClick={() => setInsightIndex((insightIndex + 1) % insights.length)}
              aria-label="Next insight"
            >
              ›
            </button>
          </div>
        </article>
      </section>

      {/* =========================================================
          BOTTOM SECTION: CHECK-IN/OUT HISTORY TABLE
          ========================================================= */}
      <section className="att-card card-att-history">
        {/* Top Header Row */}
        <div className="att-history-top-row">
          <div className="att-history-title-wrap">
            <span className="att-history-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 15 15" />
              </svg>
            </span>
            <h2>Check-in/out History</h2>
          </div>

          <div className="att-history-actions">
            <button
              type="button"
              className="att-add-emp-btn"
              onClick={() => setAddModalOpen(true)}
            >
              <span>+</span>
              <span>Add New Employee</span>
            </button>

            <button
              type="button"
              className="att-view-all-link"
              onClick={() => {
                setHistoryTab('today');
                if (notify) notify('Showing all verified attendance records');
              }}
            >
              View All
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="att-filter-pills-row">
          <button
            type="button"
            className={`att-filter-pill-btn ${historyTab === 'today' ? 'active' : ''}`}
            onClick={() => setHistoryTab('today')}
          >
            Today
          </button>
          <button
            type="button"
            className={`att-filter-pill-btn ${historyTab === 'absent' ? 'active' : ''}`}
            onClick={() => setHistoryTab('absent')}
          >
            Absent
          </button>
          <button
            type="button"
            className={`att-filter-pill-btn ${historyTab === 'leave' ? 'active' : ''}`}
            onClick={() => setHistoryTab('leave')}
          >
            Request Leave
          </button>
        </div>

        {/* Attendance Records Table */}
        <div className="att-table-container">
          <table className="att-history-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Check-in Time</th>
                <th>Check-out Time</th>
                <th>Status</th>
                <th>Notes</th>
                <th style={{ width: '36px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item, idx) => (
                <tr key={`${item.id}-${idx}`}>
                  {/* Name & Avatar */}
                  <td>
                    <div className="att-user-cell">
                      <div className="att-avatar-wrap">
                        <div
                          className="att-avatar-fallback"
                          style={{ background: item.bg, color: item.color }}
                        >
                          {item.initials}
                        </div>
                      </div>

                      <div className="att-user-details">
                        <div className="att-user-name-row">
                          <span className="att-user-name">{item.name}</span>
                          <span className={`att-tag-pill ${item.tagType}`}>{item.tag}</span>
                        </div>
                        <span className="att-user-id">{item.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <div className="att-role-cell">
                      <span className="att-role-title">{item.role}</span>
                      <span className="att-role-dept">{item.dept}</span>
                    </div>
                  </td>

                  {/* Check-in Time */}
                  <td>
                    <span className="att-time-val">{item.checkIn}</span>
                  </td>

                  {/* Check-out Time */}
                  <td>
                    <span className="att-time-val">{item.checkOut}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`att-status-pill ${item.statusType}`}>{item.status}</span>
                  </td>

                  {/* Notes */}
                  <td>
                    <span className="att-notes-text">{item.notes}</span>
                  </td>

                  {/* Options Menu */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="att-action-dot-btn"
                      onClick={() => notify && notify(`Audit attendance trail for ${item.name}`)}
                      aria-label={`Options for ${item.name}`}
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No attendance records found matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================
          ADD EMPLOYEE / RECORD MODAL
          ========================================================= */}
      {addModalOpen && (
        <div className="att-modal-scrim" onClick={() => setAddModalOpen(false)}>
          <div className="att-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="att-modal-header">
              <h3>Log Attendance Record</h3>
              <button
                type="button"
                className="att-modal-close-btn"
                onClick={() => setAddModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddRecord}>
              <div className="att-form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Moore"
                  value={newLog.name}
                  onChange={(e) => setNewLog({ ...newLog, name: e.target.value })}
                  className="att-form-input"
                />
              </div>

              <div className="att-form-group">
                <label>Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Designer"
                  value={newLog.role}
                  onChange={(e) => setNewLog({ ...newLog, role: e.target.value })}
                  className="att-form-input"
                />
              </div>

              <div className="att-form-group">
                <label>Division / Department</label>
                <select
                  value={newLog.dept}
                  onChange={(e) => setNewLog({ ...newLog, dept: e.target.value })}
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
                  <label>Check-in Time</label>
                  <input
                    type="text"
                    value={newLog.checkIn}
                    onChange={(e) => setNewLog({ ...newLog, checkIn: e.target.value })}
                    className="att-form-input"
                  />
                </div>
                <div className="att-form-group">
                  <label>Check-out Time</label>
                  <input
                    type="text"
                    value={newLog.checkOut}
                    onChange={(e) => setNewLog({ ...newLog, checkOut: e.target.value })}
                    className="att-form-input"
                  />
                </div>
              </div>

              <div className="att-form-group">
                <label>Status</label>
                <select
                  value={newLog.status}
                  onChange={(e) => {
                    const st = e.target.value;
                    let type = 'punctual';
                    if (st === 'Late Check-in') type = 'late';
                    if (st === 'Overtime') type = 'overtime';
                    if (st === 'Remote Check-in') type = 'remote';
                    if (st === 'Absent') type = 'absent';
                    setNewLog({ ...newLog, status: st, statusType: type });
                  }}
                  className="att-form-select"
                >
                  <option>Punctual</option>
                  <option>Late Check-in</option>
                  <option>Overtime</option>
                  <option>Remote Check-in</option>
                  <option>Absent</option>
                </select>
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
                <button
                  type="submit"
                  className="att-add-emp-btn"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
