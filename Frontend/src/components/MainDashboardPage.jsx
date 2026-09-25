import React, { useState } from 'react';

export default function MainDashboardPage({ navigate = () => {}, notify = () => {} }) {
  const [selectedDay, setSelectedDay] = useState(21);
  const [period, setPeriod] = useState('August, 2025');

  const daysData = [
    { day: 'Mon', num: 17, dots: 2, isBlueDots: false },
    { day: 'Tue', num: 18, dots: 2, isBlueDots: false },
    { day: 'Wed', num: 19, dots: 3, isBlueDots: false },
    { day: 'Thu', num: 20, dots: 2, isBlueDots: false },
    { day: 'Fri', num: 21, dots: 2, isBlueDots: true },
    { day: 'Sat', num: 22, dots: 2, isBlueDots: true },
    { day: 'Sun', num: 23, dots: 4, isBlueDots: true },
  ];

  const meetings = [
    {
      id: 1,
      title: 'Strategy Session with Promaxreed Exe...',
      time: 'Now - 12:30 PM',
      isLive: true,
      attendees: [
        { initials: 'AL', bg: '#ccfbf1', color: '#0f766e' },
        { initials: 'DW', bg: '#fae8ff', color: '#86198f' },
        { initials: 'JC', bg: '#e2e8f0', color: '#334155' },
      ],
    },
    {
      id: 2,
      title: 'Quarterly Planning Discussion – Promaxreed',
      time: '12:45 PM - 01:45 PM',
      isLive: false,
    },
    {
      id: 3,
      title: 'Budget Alignment Call for 2025 Initiatives',
      time: '02:00 PM - 03:30 PM',
      isLive: false,
    },
    {
      id: 4,
      title: 'Partnership Progress Review with Promaxreed',
      time: '03:45 PM - 05:00 PM',
      isLive: false,
    },
  ];

  const weeklyAttendanceBars = [
    { day: 'Mon', height: '68%', isBlue: false },
    { day: 'Tue', height: '52%', isBlue: false },
    { day: 'Wed', height: '62%', isBlue: false },
    { day: 'Thu', height: '88%', isBlue: true },
    { day: 'Fri', height: '98%', isBlue: true },
    { day: 'Sat', height: '78%', isBlue: true },
    { day: 'Sun', height: '42%', isBlue: false },
  ];

  const dotColumns = [
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ];

  return (
    <div className="main-dashboard-wrapper">
      <div className="main-dashboard-grid">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="main-dash-left-stack">
          
          {/* Card 1: Attendance Overview */}
          <div className="dash-box card-att-overview">
            <div className="att-overview-head">
              <div className="att-overview-title-wrap">
                <div className="att-overview-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                    <path d="M12 6v6l4 2" />
                    <circle cx="9" cy="10" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div className="att-overview-title-text">
                  <h2>Attendance Overview</h2>
                  <p>Monitor daily attendance and track overall workforce performance trends.</p>
                </div>
              </div>

              <button
                className="att-overview-period-btn"
                onClick={() => notify('Filter set to ' + period, 'info')}
              >
                <span>{period}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <div className="att-overview-body">
              {/* Left numbers */}
              <div className="att-overview-stats-col">
                <div className="att-stat-group">
                  <div className="att-stat-big-num">
                    234<small>/250</small>
                  </div>
                  <div className="att-stat-label">Today's Employee Attendances</div>
                </div>

                <div className="att-stat-group">
                  <div className="att-stat-big-num">92%</div>
                  <div className="att-stat-label">Monthly Performances</div>
                </div>
              </div>

              {/* Right chart */}
              <div className="att-overview-chart-box">
                <div className="att-chart-top-bar">
                  <div className="att-avg-hours-label">
                    <b>07:43:23</b> AVERAGE HOURS
                  </div>
                  <button
                    className="att-get-ai-btn"
                    onClick={() => {
                      notify('Navigating to AI Workforce Insights...', 'info');
                      navigate('insights');
                    }}
                  >
                    Get AI Insight
                  </button>
                </div>

                <div className="att-bars-track">
                  {weeklyAttendanceBars.map((b) => (
                    <div key={b.day} className="att-bar-column">
                      <div className="att-bar-shape-wrap">
                        <div
                          className={`att-bar-fill ${b.isBlue ? 'blue' : 'gray'}`}
                          style={{ height: b.height }}
                        />
                      </div>
                      <span className="att-bar-day-name">{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 Split Row: Payroll Snapshot + Engagement & Workload */}
          <div className="main-dash-bottom-split">
            
            {/* 2A: Payroll & Finance Snapshot */}
            <div className="dash-box card-payroll-finance-snap">
              <div>
                <div className="pf-header">
                  <div className="pf-icon-box">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="2" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  </div>
                  <h2>Payroll & Finance Snapshot</h2>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div className="pf-label">Total payout</div>
                  <div className="pf-val-row">
                    <span className="pf-big-val">$2.92M</span>
                    <span className="pf-pill-badge">+2.3%</span>
                  </div>
                  <div className="pf-subtext">With avarage salary is at $3.650</div>
                </div>
              </div>

              {/* Dot Matrix Graphic */}
              <div className="pf-dots-chart">
                {dotColumns.map((col, cIdx) => (
                  <div key={cIdx} className="pf-dot-col">
                    {col.map((dotVal, dIdx) => (
                      <span
                        key={dIdx}
                        className={`pf-circle-dot ${dotVal ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Robot Callout Banner */}
              <div className="pf-robot-banner">
                <div className="pf-robot-icon">🤖</div>
                <span>
                  3 employees 👥 show irregular overtime, which may affect payroll accuracy
                </span>
              </div>
            </div>

            {/* 2B: Engagement Health Score & Workload Balance */}
            <div className="dash-box card-engagement-workload">
              {/* Engagement Section */}
              <div className="eng-section">
                <div className="eng-head">
                  <div className="pf-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  </div>
                  <h2>Engagement Health Score</h2>
                </div>
                <p className="eng-desc">
                  Track how engaged your employees feel based on real-time signals.
                </p>

                <div className="eng-score-row">
                  <div className="eng-score-left">
                    <span className="eng-big-num">82%</span>
                    <span className="eng-score-label">Team Engagement</span>
                  </div>
                  <span className="eng-great-pill">Great!</span>
                </div>
              </div>

              {/* Workload Section */}
              <div className="workload-section">
                <div className="workload-head">
                  <div className="pf-icon-box" style={{ width: 32, height: 32 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </div>
                  <h2>Workload Balance Monitor</h2>
                </div>

                <div className="workload-stat-row">
                  <span className="workload-big-num">5</span>
                  <span className="workload-stat-label">Employees Overloaded</span>
                </div>

                <div className="workload-callout-blue">
                  <span style={{ fontSize: 13 }}>✦</span>
                  <span>AI detects from overtime, meeting density, and project assignments.</span>
                </div>

                <div className="workload-foot-action">
                  <button
                    className="workload-redistribute-btn"
                    onClick={() => notify('Automated workload rebalancing initiated for 5 team members.', 'success')}
                  >
                    Redistribute Tasks
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="main-dash-right-stack">
          
          {/* Card 3: August 2025 Calendar & Schedule */}
          <div className="dash-box card-schedule-meetings">
            <h2 className="schedule-month-title">August 2025</h2>

            {/* Days row */}
            <div className="schedule-days-row">
              {daysData.map((d) => (
                <div
                  key={d.num}
                  className={`schedule-day-cell ${selectedDay === d.num ? 'active' : ''} ${d.isBlueDots ? 'has-blue' : ''}`}
                  onClick={() => setSelectedDay(d.num)}
                >
                  <span className="sched-day-name">{d.day}</span>
                  <div className="sched-day-num">{d.num}</div>
                  <div className="sched-day-dots">
                    {Array.from({ length: d.dots }).map((_, i) => (
                      <span key={i} className="sched-dot" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Meetings list */}
            <div className="schedule-meetings-list">
              {meetings.map((m) => (
                <div
                  key={m.id}
                  className="meeting-row"
                  onClick={() => notify(`Opening details for "${m.title}"`, 'info')}
                >
                  <div className="meeting-row-top">
                    <span className="meeting-title">{m.title}</span>
                    {m.isLive && (
                      <span className="meeting-meet-now-badge">
                        <span style={{ fontSize: 8 }}>●</span> Meet Now
                      </span>
                    )}
                  </div>

                  <div className="meeting-time-row">
                    <span className="meeting-time">{m.time}</span>
                    {m.attendees && (
                      <div className="meeting-attendees-stack">
                        {m.attendees.map((att, i) => (
                          <div
                            key={i}
                            className="meeting-att-avatar"
                            style={{
                              background: att.bg,
                              color: att.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '9.5px',
                              fontWeight: 750,
                            }}
                          >
                            {att.initials}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Recent Attendance */}
          <div className="dash-box card-recent-att-dash">
            <div>
              <div className="recent-att-head">
                <div className="recent-att-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
                  </svg>
                </div>
                <h2>Recent Attendance</h2>
              </div>

              <div className="recent-att-list" style={{ marginTop: '12px' }}>
                {/* Susan Kim */}
                <div
                  className="recent-att-item"
                  onClick={() => {
                    notify('Viewing Susan Kim attendance details', 'info');
                    navigate('asistencia');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="recent-att-item-left">
                    <div
                      className="recent-att-avatar"
                      style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px',
                      }}
                    >
                      SK
                    </div>
                    <div className="recent-att-info">
                      <div className="recent-att-name-row">
                        <span className="recent-att-name">Susan Kim</span>
                        <span className="rec-status-badge late">Arrived Late</span>
                      </div>
                      <div className="recent-att-dept">Creative Division</div>
                    </div>
                  </div>
                  <div className="recent-att-item-right">
                    <div className="recent-att-time">08:12 AM</div>
                    <div className="recent-att-sublabel">Check-in</div>
                  </div>
                </div>

                {/* Jason Stewart */}
                <div
                  className="recent-att-item"
                  onClick={() => {
                    notify('Viewing Jason Stewart attendance details', 'info');
                    navigate('asistencia');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="recent-att-item-left">
                    <div
                      className="recent-att-avatar"
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px',
                      }}
                    >
                      JS
                    </div>
                    <div className="recent-att-info">
                      <div className="recent-att-name-row">
                        <span className="recent-att-name">Jason Stewart</span>
                        <span className="rec-status-badge punctual">Punctual</span>
                      </div>
                      <div className="recent-att-dept">Marketing Division</div>
                    </div>
                  </div>
                  <div className="recent-att-item-right">
                    <div className="recent-att-time">07:00 AM</div>
                    <div className="recent-att-sublabel">Check-in</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="recent-att-footer">
              <span className="recent-att-count-text">
                230+ other attendance records logged today
              </span>
              <button
                className="recent-att-see-all-link"
                onClick={() => navigate('asistencia')}
              >
                See All Attendance
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
