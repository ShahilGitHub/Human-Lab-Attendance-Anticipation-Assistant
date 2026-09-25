import { useMemo, useRef, useState } from 'react';
import AiInsightsPage from '../components/AiInsightsPage.jsx';
import AssistantPage from '../components/AssistantPage.jsx';
import AttendancePage from '../components/AttendancePage.jsx';
import EmployeePage from '../components/EmployeePage.jsx';
import MainDashboardPage from '../components/MainDashboardPage.jsx';
import PayrollPage from '../components/PayrollPage.jsx';
import ReportsPage from '../components/ReportsPage.jsx';
import SettingsPage from '../components/SettingsPage.jsx';

const initialAlerts = [
  { id: 'ALT-2048', center: 'Norte · CT Monterrey', shift: 'Turno nocturno', when: 'Vie, 25 sep · 22:00–06:00', need: 50, expected: 44, risk: 85, level: 'Alto', confidence: 81, people: 6, drivers: ['Patrón histórico de ausencias los viernes', '4 retrasos recientes en el turno posterior al descanso', '2 ausencias programadas'], policy: 'Revisar disponibilidad de reemplazo según el procedimiento de cobertura del centro.' },
  { id: 'ALT-2043', center: 'Este · Centro Mérida', shift: 'Turno matutino', when: 'Mañana · 06:00–14:00', need: 40, expected: 36, risk: 72, level: 'Alto', confidence: 76, people: 4, drivers: ['Aumento de ausencias en este centro durante las últimas 3 semanas', 'Cobertura prevista por debajo del mínimo operativo'], policy: 'Consultar al supervisor del centro antes de reasignar personal.' },
  { id: 'ALT-2039', center: 'Norte · CT Monterrey', shift: 'Turno vespertino', when: 'Hoy · 14:00–22:00', need: 50, expected: 46, risk: 58, level: 'Medio', confidence: 73, people: 4, drivers: ['2 retrasos recurrentes en el equipo asignado', 'Una ausencia programada en un rol crítico'], policy: 'Confirmar cobertura cruzada disponible con el equipo de operaciones.' },
];

const navigation = [
  { id: 'inicio', label: 'Dashboard' },
  { id: 'personas', label: 'Employee' },
  { id: 'asistencia', label: 'Attendance' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'insights', label: 'AI Insights' },
];

const attendanceRecords = [
  { id: 'EMP-24172', name: 'María Moore', role: 'Diseñadora de producto', checkIn: '08:12', checkOut: '17:06', status: 'Retraso', note: '12 min después del horario' },
  { id: 'EMP-24161', name: 'Stephen Wong', role: 'Desarrollador front-end', checkIn: '07:00', checkOut: '16:55', status: 'A tiempo', note: 'Sin incidencias' },
  { id: 'EMP-24123', name: 'Rebecca Miller', role: 'Líder de RR. HH.', checkIn: '08:05', checkOut: '17:00', status: 'A tiempo', note: 'Horario regular' },
  { id: 'EMP-24098', name: 'Amir Smith', role: 'Operaciones', checkIn: '—', checkOut: '—', status: 'Ausencia', note: 'Pendiente de validación' },
];
const employeePredictions = [
  { id: 'EMP-24172', center: 'Norte · CT Monterrey', shift: 'Nocturno · Vie 22:00', absence: 78, delay: 64, confidence: 81, drivers: ['4 retrasos en 3 semanas', 'Turno posterior al día de descanso'] },
  { id: 'EMP-24161', center: 'Este · Centro Mérida', shift: 'Matutino · Sáb 06:00', absence: 63, delay: 42, confidence: 76, drivers: ['Patrón de inasistencia en sábado', 'Cobertura del equipo bajo el mínimo'] },
  { id: 'EMP-24123', center: 'Norte · CT Monterrey', shift: 'Vespertino · Vie 14:00', absence: 51, delay: 39, confidence: 73, drivers: ['2 retrasos recientes', 'Una ausencia programada en el equipo'] },
  { id: 'EMP-24098', center: 'Oeste · CT Tijuana', shift: 'Nocturno · Dom 22:00', absence: 32, delay: 27, confidence: 69, drivers: ['Sin señal fuerte en el historial reciente'] },
];

function Icon({ children, className = '' }) { return <span className={`ui-icon ${className}`} aria-hidden="true">{children}</span>; }
function MetricCard({ icon, label, value, detail, accent, onClick }) { return <button className={`metric-card ${accent || ''}`} onClick={onClick}><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><strong>{value}</strong><span className="metric-detail">{detail}</span></button>; }
function Sparkline({ color = '#7799d1' }) { return <svg className="sparkline" viewBox="0 0 116 36" aria-hidden="true"><path d="M1 30 C14 28 13 17 25 21 S38 31 49 19 S62 22 72 12 S88 20 98 8 S107 12 115 3" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" /><path d="M1 30 C14 28 13 17 25 21 S38 31 49 19 S62 22 72 12 S88 20 98 8 S107 12 115 3 V36 H1Z" fill={color} opacity=".08" /></svg>; }

const LANGUAGES = [
  { code: 'EN', name: 'English', flag: '🇺🇸', label: 'English (US)' },
  { code: 'ES', name: 'Español', flag: '🇪🇸', label: 'Español (MX)' },
];

function HireSenseHeader({ view, navigate, search, setSearch, notify, lang = 'EN', setLang }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [avatarErr, setAvatarErr] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const brandName = lang === 'ES' ? 'HiumanLab' : 'HumanLab';

  return (
    <header className="hiresense-header">
      {/* Brand Logo Pill */}
      <div
        className="hiresense-brand-pill"
        onClick={() => navigate('inicio')}
        title={brandName}
        role="button"
        tabIndex={0}
      >
        <div className="hiresense-logo-icon">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="3.5" width="15" height="17" rx="3" />
            <line x1="8" y1="9" x2="11" y2="9" />
            <line x1="13.8" y1="7.4" x2="17.2" y2="10.8" />
            <line x1="17.2" y1="7.4" x2="13.8" y2="10.8" />
            <line x1="8" y1="15.2" x2="11" y2="15.2" />
            <polyline points="13.6 15.2 15.2 17 17.6 13.6" />
          </svg>
        </div>
        <span className="hiresense-brand-name">{brandName}</span>
      </div>

      {/* Navigation Pills */}
      <nav className="hiresense-nav" aria-label="Main Navigation">
        {navigation.map((item) => {
          const isActive = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`hiresense-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="hiresense-actions">
        <div className="hiresense-search-pill">
          <span className="hiresense-search-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Quick search here..."
            aria-label="Quick search here"
          />
        </div>

        {/* Language Selection Pill */}
        <div className="hiresense-lang-wrap">
          <button
            type="button"
            className="hiresense-lang-btn"
            onClick={() => {
              setLangOpen(!langOpen);
              if (profileOpen) setProfileOpen(false);
            }}
            aria-label="Language selection"
            title={`Current Language: ${currentLang.label}`}
          >
            <span className="hiresense-lang-globe" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </span>
            <span className="hiresense-lang-flag">{currentLang.flag}</span>
            <span className="hiresense-lang-code">{currentLang.code}</span>
            <svg className={`hiresense-lang-chevron ${langOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {langOpen && (
            <div className="hiresense-lang-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="hiresense-lang-dropdown-header">Select Language</div>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={`hiresense-lang-item ${lang === l.code ? 'selected' : ''}`}
                  onClick={() => {
                    if (setLang) setLang(l.code);
                    setLangOpen(false);
                    if (notify) notify(`Language set to ${l.name} (${l.code})`);
                  }}
                >
                  <span className="hiresense-lang-item-flag">{l.flag}</span>
                  <div className="hiresense-lang-info">
                    <b>{l.name}</b>
                    <small>{l.label}</small>
                  </div>
                  {lang === l.code && <span className="hiresense-lang-check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="hiresense-bell-btn"
          onClick={() => notify('3 operational alerts pending review')}
          aria-label="Notifications"
          title="Notifications"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <div className="hiresense-user-wrap" onClick={() => { setProfileOpen(!profileOpen); if (langOpen) setLangOpen(false); }} title="Admin">
          <div className="hiresense-avatar-initials">AD</div>

          {profileOpen && (
            <div className="hiresense-user-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="hiresense-dropdown-user">
                <b>Admin</b>
                <small>System Administrator · North México</small>
              </div>
              <button className="hiresense-dropdown-item" onClick={() => { navigate('configuracion'); setProfileOpen(false); }}>
                ⚙ Settings & Preferences
              </button>
              <button className="hiresense-dropdown-item" onClick={() => { navigate('reportes'); setProfileOpen(false); }}>
                ▤ Reports & Audit
              </button>
              <button className="hiresense-dropdown-item" onClick={() => { navigate('asistente'); setProfileOpen(false); }}>
                ✳ Ask AI Assistant
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


function OldPayrollPage({ search, notify }) {
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
        {/* Metric 1 */}
        <article className="payroll-metric-card accent-gradient">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </span>
            <span className="mock-data-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>Mock Data</span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Total Payroll Payout</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">$2,458,900</span>
              <span className="payroll-growth-pill">+2.3%</span>
            </div>
            <span className="payroll-metric-sub">Bi-weekly payroll · 250 active employees</span>
          </div>
        </article>

        {/* Metric 2 */}
        <article className="payroll-metric-card">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <span className="mock-data-badge">Mock Data</span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Next Pay Date</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">Oct 01, 2026</span>
            </div>
            <span className="payroll-metric-sub">Auto-deposit scheduled in 6 days</span>
          </div>
        </article>

        {/* Metric 3 */}
        <article className="payroll-metric-card">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="5" x2="5" y2="19" />
                <circle cx="6.5" cy="6.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
            </span>
            <span className="mock-data-badge">Mock Data</span>
          </div>
          <div className="payroll-metric-body">
            <span className="payroll-metric-label">Taxes & Withholdings</span>
            <div className="payroll-metric-value-row">
              <span className="payroll-metric-val">$482,150</span>
            </div>
            <span className="payroll-metric-sub">Federal, state & medical deductions</span>
          </div>
        </article>

        {/* Metric 4 */}
        <article className="payroll-metric-card">
          <div className="payroll-card-header">
            <span className="payroll-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="mock-data-badge">Mock Data</span>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <div className="payroll-title-heading">
              <h2>Payroll Disbursements & Compensation</h2>
              <span className="mock-data-badge">Mock Data</span>
            </div>
          </div>

          <div className="payroll-actions">
            <button
              className="payroll-btn-secondary"
              onClick={() => notify && notify('Exported Payroll summary (CSV)')}
              type="button"
            >
              ↓ Export Run
            </button>
            <button
              className="payroll-btn-primary"
              onClick={() => notify && notify('Approved bi-weekly payroll cycle successfully')}
              type="button"
            >
              ✓ Approve Pay Run
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
                <th style={{ width: '30px' }} />
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
                      onClick={() => notify && notify(`Payment audit details for ${emp.name}`)}
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

function OldDashboardPage({ navigate, notify }) {
  const [calDay, setCalDay] = useState(21); // active date Fri 21
  const [period, setPeriod] = useState('August, 2025');
  const [periodOpen, setPeriodOpen] = useState(false);

  const days = [
    { day: 'Mon', date: 17, dots: 2 },
    { day: 'Tue', date: 18, dots: 2 },
    { day: 'Wed', date: 19, dots: 3 },
    { day: 'Thu', date: 20, dots: 2 },
    { day: 'Fri', date: 21, dots: 2, isToday: true },
    { day: 'Sat', date: 22, dots: 2 },
    { day: 'Sun', date: 23, dots: 4 }
  ];

  const meetings = [
    {
      id: 1,
      title: 'Strategy Session with Promaxreed Exe...',
      time: 'Now - 12:30 PM',
      live: true,
      attendees: [
        { initials: 'AL', bg: '#ccfbf1', color: '#0f766e' },
        { initials: 'DW', bg: '#fae8ff', color: '#86198f' },
        { initials: 'JC', bg: '#e2e8f0', color: '#334155' }
      ]
    },
    {
      id: 2,
      title: 'Quarterly Planning Discussion – Promaxreed',
      time: '12:45 PM - 01:45 PM',
      live: false
    },
    {
      id: 3,
      title: 'Budget Alignment Call for 2025 Initiatives',
      time: '02:00 PM - 03:30 PM',
      live: false
    },
    {
      id: 4,
      title: 'Partnership Progress Review with Promaxreed',
      time: '03:45 PM - 05:00 PM',
      live: false
    }
  ];

  const recentAttendances = [
    {
      name: 'Susan Kim',
      dept: 'Creative Division',
      status: 'Arrived Late',
      statusType: 'late',
      time: '08:12 AM',
      initials: 'SK',
      bg: '#fee2e2',
      color: '#dc2626'
    },
    {
      name: 'Jason Stewart',
      dept: 'Marketing Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '07:00 AM',
      initials: 'JS',
      bg: '#e2e8f0',
      color: '#1e293b'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dash-main-grid">
        {/* LEFT COLUMN */}
        <div className="dash-left-col">
          {/* Card 1: Attendance Overview */}
          <article className="card-dash-attendance">
            <div className="dash-att-header">
              <div className="dash-att-title-wrap">
                <span className="dash-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div className="dash-heading-text">
                  <div className="dash-title-row">
                    <h2>Attendance Overview</h2>
                    <span className="mock-data-badge">Mock Data</span>
                  </div>
                  <p>Monitor daily attendance and track overall workforce performance trends.</p>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <button
                  className="dash-dropdown-btn"
                  onClick={() => setPeriodOpen(!periodOpen)}
                  type="button"
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
                      borderRadius: '10px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      zIndex: 20,
                      minWidth: '130px',
                      padding: '4px'
                    }}
                  >
                    {['August, 2025', 'July, 2025', 'June, 2025'].map((p) => (
                      <button
                        key={p}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          background: period === p ? '#f1f5f9' : 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: period === p ? '600' : '400',
                          color: '#1e293b',
                          cursor: 'pointer'
                        }}
                        onClick={() => { setPeriod(p); setPeriodOpen(false); }}
                        type="button"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="dash-att-body">
              <div className="dash-att-metrics-stack">
                <div className="dash-att-metric-item">
                  <div className="dash-att-big-num">
                    234 <small>/250</small>
                  </div>
                  <div className="dash-att-metric-sub">Today's Employee Attendances</div>
                </div>

                <div className="dash-att-metric-item">
                  <div className="dash-att-big-num">92%</div>
                  <div className="dash-att-metric-sub">Monthly Performances</div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="dash-barchart-container">
                <div className="dash-chart-top-bar">
                  <div className="dash-avg-hours-label">
                    07:43:23 <span>AVERAGE HOURS</span>
                  </div>
                  <button
                    className="dash-ai-insight-pill"
                    onClick={() => notify && notify('AI Insight: Peak workforce attendance logged between 09:30 AM and 02:00 PM.')}
                    type="button"
                  >
                    Get AI Insight
                  </button>
                </div>

                <div className="dash-bars-wrap">
                  {[
                    { day: 'Mon', h: 42 },
                    { day: 'Tue', h: 56 },
                    { day: 'Wed', h: 50 },
                    { day: 'Thu', h: 95, highlight: true },
                    { day: 'Fri', h: 88, highlightSecondary: true },
                    { day: 'Sat', h: 22 },
                    { day: 'Sun', h: 10 }
                  ].map((bar) => (
                    <div
                      key={bar.day}
                      className={`dash-bar-col ${bar.highlight ? 'highlight' : ''} ${bar.highlightSecondary ? 'highlight-secondary' : ''}`}
                    >
                      <div className="dash-bar-track">
                        <div className="dash-bar-fill" style={{ height: `${bar.h}%` }} />
                      </div>
                      <span className="dash-day-label">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Bottom Row: Payroll & Engagement */}
          <div className="dash-bottom-row">
            {/* Card 2A: Payroll & Finance Snapshot */}
            <article className="card-payroll-snap">
              <div>
                <div className="snap-card-header">
                  <div className="snap-title-group">
                    <span className="dash-icon-box" style={{ width: '30px', height: '30px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </span>
                    <span className="snap-title">Payroll & Finance Snapshot</span>
                  </div>
                  <span className="mock-data-badge">Mock Data</span>
                </div>

                <div className="snap-payout-box">
                  <span className="snap-payout-label">Total payout</span>
                  <div className="snap-payout-row">
                    <span className="snap-payout-num">$2.92M</span>
                    <span className="snap-growth-pill">+2.3%</span>
                  </div>
                  <span className="snap-salary-avg">With avarage salary is at $3.650</span>
                </div>
              </div>

              {/* Equalizer Matrix Dots */}
              <div className="snap-matrix-dots">
                {[
                  [true, true, false, false],
                  [true, true, true, false],
                  [true, true, false, false],
                  [true, true, true, false],
                  [true, true, true, true],
                  [true, true, true, false],
                  [true, false, false, false],
                  [true, true, false, false],
                  [true, true, true, false],
                  [true, true, true, true]
                ].map((col, idx) => (
                  <div key={idx} className="snap-matrix-col">
                    {col.map((filled, dIdx) => (
                      <span key={dIdx} className={`snap-dot ${filled ? 'active' : ''}`} />
                    ))}
                  </div>
                ))}
              </div>

              {/* AI alert banner */}
              <div className="snap-alert-banner">
                <span>🤖</span>
                <div>
                  <strong>3 employees</strong> show irregular overtime, which may affect payroll accuracy
                </div>
              </div>
            </article>

            {/* Card 2B: Engagement & Workload Monitor */}
            <article className="card-engagement-workload">
              {/* Engagement Section */}
              <div className="eng-section">
                <div className="eng-top-header">
                  <div className="eng-title-wrap">
                    <span className="dash-icon-box" style={{ width: '30px', height: '30px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </span>
                    <span className="eng-title">Engagement Health Score</span>
                  </div>
                  <span className="mock-data-badge">Mock Data</span>
                </div>

                <p className="eng-desc">
                  Track how engaged your employees feel based on real-time signals.
                </p>

                <div className="eng-score-row">
                  <div className="eng-score-left">
                    <span className="eng-score-num">82%</span>
                    <span className="eng-score-label">Team Engagement</span>
                  </div>
                  <span className="eng-great-pill">Great!</span>
                </div>
              </div>

              <div className="eng-divider" />

              {/* Workload Section */}
              <div className="workload-section">
                <div className="workload-header">
                  <span className="dash-icon-box" style={{ width: '28px', height: '28px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="6" y1="3" x2="6" y2="15" />
                      <circle cx="18" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 9a9 9 0 0 1-9 9" />
                    </svg>
                  </span>
                  <span className="workload-title">Workload Balance Monitor</span>
                </div>

                <div className="workload-stat">
                  <strong>5</strong> Employees Overloaded
                </div>

                <div className="workload-callout">
                  <span>✦</span>
                  <div>AI detects from overtime, meeting density, and project assignments.</div>
                </div>

                <button
                  className="workload-action-link"
                  onClick={() => notify && notify('Redistribution suggestions generated for 5 team members')}
                  type="button"
                >
                  Redistribute Tasks
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dash-right-col">
          {/* Card 3: Calendar & Schedule */}
          <article className="card-dash-calendar">
            <div className="cal-header-row">
              <h2 className="cal-header-title">August 2025</h2>
              <span className="mock-data-badge">Mock Data</span>
            </div>

            {/* Days Strip */}
            <div className="cal-days-strip">
              {days.map((item) => (
                <div
                  key={item.date}
                  className={`cal-day-cell ${calDay === item.date ? 'active' : ''}`}
                  onClick={() => setCalDay(item.date)}
                >
                  <span className="cal-day-name">{item.day}</span>
                  <div className="cal-day-num">{item.date}</div>
                  <div className="cal-dots-row">
                    {Array.from({ length: item.dots }).map((_, i) => (
                      <span key={i} className={`cal-tiny-dot ${calDay === item.date ? 'blue' : ''}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Meetings List */}
            <div className="cal-meetings-list">
              {meetings.map((m) => (
                <div key={m.id} className={`cal-meeting-item ${m.live ? 'active-live' : ''}`}>
                  <div className="cal-meeting-top">
                    <span className="cal-meeting-title">{m.title}</span>
                    {m.live && (
                      <button
                        className="cal-meet-now-btn"
                        onClick={() => notify && notify('Joining Strategy Session live room...')}
                        type="button"
                      >
                        Meet Now
                      </button>
                    )}
                  </div>
                  <div className="cal-meeting-bottom">
                    <span className="cal-meeting-time">{m.time}</span>
                    {m.attendees && (
                      <div className="cal-attendees-avatars">
                        {m.attendees.map((att, aIdx) => (
                          <span
                            key={aIdx}
                            className="cal-attendee-badge"
                            style={{ background: att.bg, color: att.color }}
                          >
                            {att.initials}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Card 4: Recent Attendance */}
          <article className="card-dash-recent-att">
            <div className="dash-recent-header">
              <div className="dash-recent-title-wrap">
                <span className="dash-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                  </svg>
                </span>
                <span className="dash-recent-title">Recent Attendance</span>
              </div>
              <span className="mock-data-badge">Mock Data</span>
            </div>

            <div className="dash-recent-list">
              {recentAttendances.map((rec, rIdx) => (
                <div key={rIdx} className="dash-recent-row">
                  <div className="dash-recent-left">
                    <span
                      className="sample-avatar-badge lg"
                      style={{ background: rec.bg, color: rec.color }}
                    >
                      {rec.initials}
                    </span>
                    <div className="dash-recent-info">
                      <div className="dash-recent-name-row">
                        <span className="dash-recent-name">{rec.name}</span>
                        <span className={`status-badge-pill ${rec.statusType}`}>{rec.status}</span>
                      </div>
                      <span className="dash-recent-dept">{rec.dept}</span>
                    </div>
                  </div>
                  <div className="dash-recent-right">
                    <span className="dash-recent-time">{rec.time}</span>
                    <span className="dash-recent-label">Check-in</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="dash-recent-footer">
              <span className="dash-recent-count-text">230+ other attendance records logged today</span>
              <button
                className="dash-see-all-link"
                onClick={() => navigate && navigate('asistencia')}
                type="button"
              >
                See All Attendance
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('inicio');
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [alertFilter, setAlertFilter] = useState('Todas');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [threshold, setThreshold] = useState(70);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [briefOpen, setBriefOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Próximas 72 horas');
  const [lang, setLang] = useState('EN');

  const toastTimerRef = useRef(null);
  const notify = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(''), 3400);
  };
  const activeAlerts = alerts.filter((alert) => !alert.state);
  const displayedAlerts = useMemo(() => alerts.filter((alert) => {
    const matchesSearch = `${alert.center} ${alert.shift} ${alert.id}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = alertFilter === 'Todas' || alert.level === alertFilter;
    return matchesSearch && matchesFilter;
  }), [alerts, alertFilter, search]);

  const navigate = (id) => { setView(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const updateAlert = (alert, state) => {
    setAlerts((current) => current.map((item) => item.id === alert.id ? { ...item, state } : item));
    setSelectedAlert(null);
    notify(state === 'atendida' ? 'Alerta marcada como atendida' : state === 'falso positivo' ? 'Falso positivo registrado' : 'Alerta descartada');
  };
  const askAssistant = (event) => {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;
    setChatMessages((items) => [...items, { role: 'user', text: question }, { role: 'assistant', text: 'Para cubrir un turno con riesgo de quedar por debajo del mínimo, revisa primero la disponibilidad de reemplazos con el supervisor del centro. La política del centro indica validar la cobertura antes de reasignar personal.', citation: 'Política de Asistencia · Sección 4.2', demo: true }]);
    setChatInput('');
  };
  const exportReport = () => {
    const rows = [['ID', 'Centro de trabajo', 'Turno', 'Horario', 'Asistencia prevista', 'Personal requerido', 'Riesgo', 'Nivel', 'Confianza', 'Estado'], ...alerts.map((a) => [a.id, a.center, a.shift, a.when, a.expected, a.need, a.risk + '%', a.level, a.confidence + '%', a.state || 'Pendiente'])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'reporte-riesgo-asistencia.csv'; link.click(); URL.revokeObjectURL(url);
    notify('Reporte CSV descargado');
  };

  return <div className="product-app">
    <HireSenseHeader
      view={view}
      navigate={navigate}
      search={search}
      setSearch={setSearch}
      notify={notify}
      lang={lang}
      setLang={setLang}
    />

    <main className="product-main">
      {view === 'inicio' && <MainDashboardPage navigate={navigate} notify={notify} />}

      {view === 'personas' && <EmployeePage search={search} onSelect={setSelectedPerson} navigate={navigate} notify={notify} />}
      {view === 'asistencia' && <AttendancePage search={search} navigate={navigate} notify={notify} />}
      {view === 'payroll' && <PayrollPage search={search} notify={notify} />}
      {view === 'insights' && <AiInsightsPage navigate={navigate} notify={notify} />}

      {view === 'alertas' && <section className="page-section"><div className="page-heading"><div><div className="section-kicker">SEGUIMIENTO OPERATIVO</div><h1>Alertas de asistencia</h1><p>Revisa el riesgo, la evidencia y registra la decisión del equipo.</p></div><div className="page-actions"><button className="button-secondary" onClick={exportReport}>↓ Exportar CSV</button><select value={alertFilter} onChange={(event) => setAlertFilter(event.target.value)}><option>Todas</option><option>Alto</option><option>Medio</option></select></div></div><div className="surface alerts-table"><div className="table-toolbar"><b>{displayedAlerts.length} alertas</b><span>Horizonte de predicción · 24–72 horas</span></div><div className="alert-table-head"><span>Centro / turno</span><span>Horario</span><span>Personal previsto</span><span>Riesgo</span><span>Confianza</span><span>Estado</span><span /></div>{displayedAlerts.map((alert) => <AlertRow key={alert.id} alert={alert} onClick={() => setSelectedAlert(alert)} detailed />)}{displayedAlerts.length === 0 && <div className="empty-state">No hay alertas que coincidan con tu búsqueda.</div>}</div></section>}

      {view === 'reportes' && (
        <ReportsPage
          exportReport={exportReport}
          navigate={navigate}
          notify={notify}
        />
      )}

      {view === 'asistente' && (
        <AssistantPage
          chatInput={chatInput}
          setChatInput={setChatInput}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          askAssistant={askAssistant}
          notify={notify}
        />
      )}

      {view === 'configuracion' && (
        <SettingsPage
          threshold={threshold}
          setThreshold={setThreshold}
          inAppAlerts={inAppAlerts}
          setInAppAlerts={setInAppAlerts}
          emailAlerts={emailAlerts}
          setEmailAlerts={setEmailAlerts}
          lang={lang}
          setLang={setLang}
          LANGUAGES={LANGUAGES}
          notify={notify}
        />
      )}
    </main>

    {selectedAlert && <AlertModal alert={selectedAlert} close={() => setSelectedAlert(null)} onAction={updateAlert} />}
    {selectedPerson && <PersonModal person={selectedPerson} close={() => setSelectedPerson(null)} navigate={navigate} />}
    {briefOpen && <BriefModal alerts={activeAlerts} close={() => setBriefOpen(false)} notify={notify} onAlert={setSelectedAlert} />}
    <div className={`product-toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">
      <span className="toast-badge-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </span>
      <span className="toast-content">{toast}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={() => setToast('')}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  </div>;
}

function Toggle({ checked, onChange }) { return <button className={`toggle-switch ${checked ? 'checked' : ''}`} onClick={() => onChange(!checked)} role="switch" aria-checked={checked}><span /></button>; }

function AlertRow({ alert, onClick, detailed = false }) {
  return <button className={`alert-row ${detailed ? 'detailed' : ''}`} onClick={onClick}>
    <span className="alert-place"><span className={`risk-symbol ${alert.level === 'Alto' ? 'risk-high' : 'risk-medium'}`}>{alert.level === 'Alto' ? '!' : '•'}</span><span><b>{alert.center}</b><small>{alert.shift} <i>·</i> {alert.id}</small></span></span>
    {detailed && <span className="alert-when">{alert.when}</span>}
    <span className="staffing"><b>{alert.expected} <i>/ {alert.need}</i></b><small>personas previstas</small><span className="staff-bar"><i style={{ width: `${Math.min(100, alert.expected / alert.need * 100)}%` }} /></span></span>
    <span className="risk-cell"><b className={alert.level === 'Alto' ? 'text-high' : 'text-medium'}>{alert.risk}%</b><span className={`level-pill ${alert.level === 'Alto' ? 'high' : 'medium'}`}>{alert.level}</span></span>
    {detailed && <span className="confidence-cell">{alert.confidence}% <small>confianza</small></span>}
    {detailed && <span className="alert-state">{alert.state ? <i className="state-done">{alert.state}</i> : <i className="state-pending">Pendiente</i>}</span>}
    <span className="alert-cta">Ver detalle <b>→</b></span>
  </button>;
}

function CoverageBars({ onSelect }) {
  const centers = [{ name: 'Norte · CT Monterrey', score: 88, shifts: 4, tone: 'blue' }, { name: 'Este · Centro Mérida', score: 82, shifts: 3, tone: 'coral' }, { name: 'Oeste · CT Tijuana', score: 94, shifts: 5, tone: 'green' }, { name: 'Sur · Centro Puebla', score: 96, shifts: 4, tone: 'green' }];
  return <div className="center-coverage">{centers.map((center) => <button className="center-row" key={center.name} onClick={onSelect}><span className="center-name"><i className={`center-dot ${center.tone}`} /><b>{center.name}</b><small>{center.shifts} turnos</small></span><span className="center-progress"><i className={center.tone} style={{ width: `${center.score}%` }} /></span><b className={`center-score ${center.tone}`}>{center.score}%</b><Sparkline color={center.tone === 'coral' ? '#e08369' : center.tone === 'green' ? '#55a88a' : '#6e93c9'} /></button>)}</div>;
}

function AlertModal({ alert, close, onAction }) {
  return <div className="modal-scrim" onMouseDown={close}><section className="alert-modal" onMouseDown={(event) => event.stopPropagation()}><header><div><div className="section-kicker">EXPLICACIÓN DE ALERTA · {alert.id}</div><h2>{alert.center}</h2><p>{alert.shift} <span>·</span> {alert.when}</p></div><button className="modal-x" onClick={close} aria-label="Cerrar">×</button></header><div className="modal-risk-summary"><div><span className={`level-pill ${alert.level === 'Alto' ? 'high' : 'medium'}`}>Riesgo {alert.level.toLowerCase()}</span><strong>{alert.risk}%</strong><small>probabilidad de quedar bajo el mínimo</small></div><div className="modal-stat"><b>{alert.expected} / {alert.need}</b><small>asistencia prevista</small></div><div className="modal-stat"><b>{alert.confidence}%</b><small>confianza del modelo</small></div></div><div className="explanation-box"><div className="explanation-heading"><span>✳</span><b>¿Por qué aparece esta alerta?</b><small>Explicación basada en evidencia</small></div><p>El modelo estima que este turno podría operar con <b>{alert.need - alert.expected} personas menos</b> de las requeridas. El riesgo se relaciona con patrones recientes del turno y ausencias ya programadas.</p><ul>{alert.drivers.map((driver) => <li key={driver}>{driver}</li>)}</ul></div><div className="recommended-action"><span className="action-icon">→</span><div><b>Siguiente paso sugerido</b><p>{alert.policy}</p><small>Confirma el procedimiento en la política del tenant antes de tomar acción.</small></div></div><div className="modal-human-note"><span>ⓘ</span> Esta predicción es apoyo para la planeación operativa. Requiere revisión humana y no debe usarse para decisiones disciplinarias.</div><footer><button className="button-quiet" onClick={() => onAction(alert, 'falso positivo')}>Marcar falso positivo</button><button className="button-secondary" onClick={() => onAction(alert, 'descartada')}>Descartar</button><button className="button-primary" onClick={() => onAction(alert, 'atendida')}>✓ Registrar como atendida</button></footer></section></div>;
}

function BriefModal({ alerts, close, notify, onAlert }) {
  const top = alerts.find((alert) => alert.level === 'Alto') || alerts[0];
  return <div className="modal-scrim" onMouseDown={close}><section className="brief-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-x" onClick={close} aria-label="Cerrar">×</button><div className="section-kicker">RESUMEN DE HOY · NORTH</div><h2>Panorama de cobertura</h2><p className="brief-date">Jueves, 24 de septiembre · preparado a las 06:00</p><div className="brief-summary-stats"><span><b>{alerts.length}</b><small>alertas abiertas</small></span><span><b>2</b><small>centros por revisar</small></span><span><b>24–72 h</b><small>horizonte</small></span></div><div className="brief-copy"><b>Prioridad recomendada</b><p>El turno nocturno de North para el viernes presenta riesgo alto de operar por debajo del mínimo. Se estiman 44 personas disponibles frente a 50 requeridas. El patrón de ausencias de los viernes y retrasos recientes explican parte de la señal.</p><b>Acción para el equipo</b><p>Revisar disponibilidad con el supervisor del centro y validar el procedimiento de cobertura indicado en la política de asistencia.</p></div><div className="brief-source"><span>▤</span><span><b>Fuente operativa</b><small>Predicciones de asistencia · North · actualización diaria</small></span><span className="demo-pill">DATOS SINTÉTICOS</span></div><footer><button className="button-secondary" onClick={close}>Cerrar</button><button className="button-primary" onClick={() => { close(); onAlert(top); }}>Revisar alerta prioritaria →</button></footer><small className="brief-disclaimer">Contenido de demostración. Toda decisión operativa requiere validación humana.</small></section></div>;
}

function OldAttendancePage({ search, navigate, notify }) {
  const [historyTab, setHistoryTab] = useState('today'); // 'today' | 'absent' | 'leave'
  const [timeRange, setTimeRange] = useState('Last 6 months');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
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

  const insights = [
    {
      value: '12%',
      label: 'Attendance Risk (Next 7 Days)',
      desc: 'AI forecasts a possible rise in late arrivals and absences over the next week, influenced by patterns such as Friday backlogs, weather conditions, and recent attendance history.'
    },
    {
      value: '94%',
      label: 'Shift Coverage Confidence',
      desc: 'Core operational and support shifts have high redundancy. Emergency replacement availability is currently verified across all 3 regional hubs.'
    },
    {
      value: '3.2h',
      label: 'Average Overtime per Week',
      desc: 'Overtime accumulation is concentrated in the Development Division during sprint finalizations. Punctuality recovery rate remains well above target.'
    }
  ];

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
      bg: '#e0e7ff',
      color: '#4338ca',
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
      bg: '#fee2e2',
      color: '#dc2626',
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
      id: 'EP2346123-2',
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
      bg: '#ccfbf1',
      color: '#0f766e',
      category: 'today'
    },
    {
      id: 'EP2346098',
      name: 'Amir Smith',
      role: 'Operations Lead',
      dept: 'Operations Division',
      checkIn: '—',
      checkOut: '—',
      tag: 'Check-In',
      tagType: 'checkin',
      status: 'Remote Check-in',
      statusType: 'remote',
      notes: 'Medical leave pending HR approval',
      initials: 'AS',
      bg: '#d1fae5',
      color: '#047857',
      category: 'leave'
    },
    {
      id: 'EP2346219',
      name: 'David Chen',
      role: 'QA Engineer',
      dept: 'Development Division',
      checkIn: '—',
      checkOut: '—',
      tag: 'Absent',
      tagType: 'absent',
      status: 'Absent',
      statusType: 'absent',
      notes: 'Unnotified absence · Supervisor alerted',
      initials: 'DC',
      bg: '#fee2e2',
      color: '#b91c1c',
      category: 'absent'
    }
  ]);

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newLog.name || !newLog.role) return;
    const initials = newLog.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() || 'EM';
    const newEntry = {
      id: `EP2346${Math.floor(100 + Math.random() * 900)}`,
      name: newLog.name,
      role: newLog.role,
      dept: newLog.dept,
      checkIn: newLog.checkIn,
      checkOut: newLog.checkOut,
      tag: newLog.status === 'Absent' ? 'Absent' : 'Check-In',
      tagType: newLog.status === 'Absent' ? 'absent' : 'checkin',
      status: newLog.status,
      statusType: newLog.statusType,
      notes: newLog.notes || 'Manually logged by admin',
      initials,
      bg: '#e0e7ff',
      color: '#4338ca',
      category: newLog.status === 'Absent' ? 'absent' : 'today'
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

  const filteredRecords = records.filter(r => {
    const matchesSearch = `${r.name} ${r.role} ${r.dept} ${r.id} ${r.notes}`.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (historyTab === 'today') return r.category === 'today' || r.category === 'absent';
    if (historyTab === 'absent') return r.category === 'absent' || r.tagType === 'absent';
    if (historyTab === 'leave') return r.category === 'leave';
    return true;
  });

  return (
    <div className="attendance-dashboard-container">
      {/* TOP 3-COLUMN GRID */}
      <section className="attendance-top-grid">
        {/* CARD 1: Average Check-In/Out Time */}
        <article className="card-avg-time">
          <div className="avg-time-header">
            <div className="avg-time-title-wrap">
              <span className="avg-time-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div className="avg-time-heading-text">
                <h2>Avarage Check-In/Out Time</h2>
                <p>Monitor daily attendance and track overall workforce performance trends.</p>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                className="avg-time-period-dropdown"
                onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                type="button"
              >
                <span>{timeRange}</span>
                <small>⌄</small>
              </button>
              {timeDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '6px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 20,
                    minWidth: '140px',
                    padding: '4px'
                  }}
                >
                  {['Last 6 months', 'Last 30 days', 'This week'].map((opt) => (
                    <button
                      key={opt}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        background: timeRange === opt ? '#f1f5f9' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: timeRange === opt ? '600' : '400',
                        color: '#1e293b',
                        cursor: 'pointer'
                      }}
                      onClick={() => { setTimeRange(opt); setTimeDropdownOpen(false); }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="avg-time-content">
            <div className="avg-time-stats">
              <div className="avg-time-stat-block">
                <div className="avg-time-stat-num">
                  06:55 <small>AM</small>
                </div>
                <div className="avg-time-stat-label">Avg. Monthly Check-In Time</div>
              </div>

              <div className="avg-time-stat-block">
                <div className="avg-time-stat-num">
                  05:12 <small>PM</small>
                </div>
                <div className="avg-time-stat-label">Avg. Monthly Check-Out Time</div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="avg-time-chart-wrap">
              <svg className="avg-time-chart-svg" viewBox="0 0 350 80" preserveAspectRatio="none">
                {/* Connecting Line */}
                <path
                  d="M 25 58 C 50 48, 65 42, 80 44 S 125 52, 140 48 S 180 34, 195 30 S 240 18, 255 12 S 285 30, 305 24 S 325 38, 335 44"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Dots along curve */}
                <circle cx="25" cy="58" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                <circle cx="80" cy="44" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                <circle cx="140" cy="48" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                <circle cx="195" cy="30" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />

                {/* May Active Point with Vertical Guide and Pill */}
                <line x1="255" y1="12" x2="255" y2="78" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                <circle cx="255" cy="12" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />

                {/* Pill Tooltip Badge for 07:03 AM */}
                <g transform="translate(225, -14)">
                  <rect width="60" height="22" rx="11" fill="#0f172a" />
                  <text x="30" y="15" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle">07:03 AM</text>
                </g>

                <circle cx="305" cy="24" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                <circle cx="335" cy="44" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
              </svg>

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
        <article className="card-ontime-rate">
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
              <span className="ontime-pill">+2.3%</span>
            </div>
          </div>

          <div className="ontime-sparkline-wrap">
            <svg className="ontime-sparkline-svg" viewBox="0 0 280 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ontimeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 5 38 Q 25 15, 45 35 T 85 20 T 125 36 T 165 14 T 205 32 T 245 10 T 275 18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M 5 38 Q 25 15, 45 35 T 85 20 T 125 36 T 165 14 T 205 32 T 245 10 T 275 18 L 275 50 L 5 50 Z"
                fill="url(#ontimeGrad)"
              />
            </svg>
            <div className="ontime-days-row">
              <span className="ontime-day-label">M</span>
              <span className="ontime-day-label">T</span>
              <span className="ontime-day-label">W</span>
              <span className="ontime-day-label">T</span>
              <span className="ontime-day-label">F</span>
              <span className="ontime-day-label">S</span>
              <span className="ontime-day-label">S</span>
            </div>
          </div>
        </article>

        {/* CARD 3: Attendance Insight */}
        <article className="card-attendance-insight">
          <div>
            <div className="insight-top-tag">
              <span>✦</span>
              <span>Attendance Insight</span>
            </div>

            <div className="insight-big-val">{insights[insightIndex].value}</div>
            <div className="insight-metric-label">{insights[insightIndex].label}</div>
            <p className="insight-desc">{insights[insightIndex].desc}</p>
          </div>

          <div className="insight-pagination">
            <button
              className="insight-nav-btn"
              onClick={() => setInsightIndex((insightIndex - 1 + insights.length) % insights.length)}
              aria-label="Previous insight"
              type="button"
            >
              ‹
            </button>
            <div className="insight-nav-indicator">
              <div className="insight-nav-dot" />
              <div className="insight-nav-line" />
            </div>
            <button
              className="insight-nav-btn"
              onClick={() => setInsightIndex((insightIndex + 1) % insights.length)}
              aria-label="Next insight"
              type="button"
            >
              ›
            </button>
          </div>
        </article>
      </section>

      {/* BOTTOM SECTION: CHECK-IN/OUT HISTORY */}
      <section className="card-attendance-history">
        <div className="history-top-bar">
          <div className="history-title-wrap">
            <span className="history-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 15 15" />
              </svg>
            </span>
            <span className="history-title">Check-in/out History</span>
          </div>

          <div className="history-actions">
            <button className="history-add-btn" onClick={() => setAddModalOpen(true)} type="button">
              <span>+</span>
              <span>Add New Employee</span>
            </button>
            <button
              className="history-view-all-btn"
              onClick={() => { setHistoryTab('today'); if (notify) notify('Showing all 250 attendance records for today'); }}
              type="button"
            >
              View All
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="history-filters-row">
          <button
            className={`history-filter-pill ${historyTab === 'today' ? 'active' : ''}`}
            onClick={() => setHistoryTab('today')}
            type="button"
          >
            Today
          </button>
          <button
            className={`history-filter-pill ${historyTab === 'absent' ? 'active' : ''}`}
            onClick={() => setHistoryTab('absent')}
            type="button"
          >
            Absent
          </button>
          <button
            className={`history-filter-pill ${historyTab === 'leave' ? 'active' : ''}`}
            onClick={() => setHistoryTab('leave')}
            type="button"
          >
            Request Leave
          </button>
        </div>

        {/* Attendance Records Table */}
        <div className="history-table-container">
          <table className="attendance-custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Check-in Time</th>
                <th>Check-out Time</th>
                <th>Status</th>
                <th>Notes</th>
                <th style={{ width: '30px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="att-name-cell">
                      <span
                        className="sample-avatar-badge lg"
                        style={{ background: item.bg, color: item.color }}
                      >
                        {item.initials}
                      </span>
                      <div className="att-name-details">
                        <div className="att-name-top-row">
                          <span className="att-emp-name">{item.name}</span>
                          <span className={`att-tag-pill ${item.tagType}`}>{item.tag}</span>
                        </div>
                        <span className="att-emp-id">{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="att-role-cell">
                      <span className="att-role-title">{item.role}</span>
                      <span className="att-role-dept">{item.dept}</span>
                    </div>
                  </td>
                  <td className="att-time-cell">{item.checkIn}</td>
                  <td className="att-time-cell">{item.checkOut}</td>
                  <td>
                    <span className={`att-status-badge ${item.statusType}`}>{item.status}</span>
                  </td>
                  <td className="att-notes-cell">{item.notes}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="att-action-btn"
                      onClick={() => notify && notify(`Options for ${item.name}`)}
                      aria-label="More options"
                      type="button"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Employee / Attendance Modal */}
      {addModalOpen && (
        <div className="modal-scrim" onMouseDown={() => setAddModalOpen(false)}>
          <div className="employee-add-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="emp-modal-header">
              <div>
                <h2>Add Employee Attendance Record</h2>
                <p>Register a manual check-in, check-out or status change.</p>
              </div>
              <button className="modal-x" onClick={() => setAddModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleAddRecord} className="emp-modal-form">
              <div className="emp-form-group">
                <label>Employee Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Moore"
                  value={newLog.name}
                  onChange={(e) => setNewLog({ ...newLog, name: e.target.value })}
                />
              </div>

              <div className="emp-form-row">
                <div className="emp-form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Product Designer"
                    value={newLog.role}
                    onChange={(e) => setNewLog({ ...newLog, role: e.target.value })}
                  />
                </div>
                <div className="emp-form-group">
                  <label>Department</label>
                  <select
                    value={newLog.dept}
                    onChange={(e) => setNewLog({ ...newLog, dept: e.target.value })}
                  >
                    <option>Creative Division</option>
                    <option>Development Division</option>
                    <option>HR Division</option>
                    <option>Operations Division</option>
                    <option>Marketing Division</option>
                  </select>
                </div>
              </div>

              <div className="emp-form-row">
                <div className="emp-form-group">
                  <label>Check-in Time</label>
                  <input
                    type="text"
                    placeholder="08:00 AM"
                    value={newLog.checkIn}
                    onChange={(e) => setNewLog({ ...newLog, checkIn: e.target.value })}
                  />
                </div>
                <div className="emp-form-group">
                  <label>Check-out Time</label>
                  <input
                    type="text"
                    placeholder="05:00 PM"
                    value={newLog.checkOut}
                    onChange={(e) => setNewLog({ ...newLog, checkOut: e.target.value })}
                  />
                </div>
              </div>

              <div className="emp-form-row">
                <div className="emp-form-group">
                  <label>Attendance Status</label>
                  <select
                    value={newLog.status}
                    onChange={(e) => {
                      const st = e.target.value;
                      let type = 'punctual';
                      if (st === 'Late Check-in') type = 'late';
                      else if (st === 'Overtime') type = 'overtime';
                      else if (st === 'Remote Check-in') type = 'remote';
                      else if (st === 'Absent') type = 'absent';
                      setNewLog({ ...newLog, status: st, statusType: type });
                    }}
                  >
                    <option value="Punctual">Punctual</option>
                    <option value="Late Check-in">Late Check-in</option>
                    <option value="Overtime">Overtime</option>
                    <option value="Remote Check-in">Remote Check-in</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
                <div className="emp-form-group">
                  <label>Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. On schedule"
                    value={newLog.notes}
                    onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="emp-modal-footer">
                <button type="button" className="emp-btn-cancel" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="emp-btn-submit">
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function OldPeoplePage({ search, onSelect, navigate, notify }) {
  const [perfTab, setPerfTab] = useState('top');
  const [dirTab, setDirTab] = useState('list');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', role: '', dept: 'Creative Division', type: 'Full-Time', phone: '+1234567890' });

  const [directory, setDirectory] = useState([
    {
      id: 'EP2346172',
      name: 'Maria Moore',
      role: 'Product Designer',
      dept: 'Creative Division',
      status: 'Check-In',
      score: '98%',
      joined: 'August 23, 2023',
      type: 'Full-Time',
      phone: '+1234567890',
      initials: 'MM',
      bg: '#e0e7ff',
      color: '#4338ca'
    },
    {
      id: 'EP2346121',
      name: 'Stephen Wong',
      role: 'Front-End Developer',
      dept: 'Development Division',
      status: 'Absent',
      score: '89%',
      joined: 'May 12, 2023',
      type: 'Part-Time',
      phone: '+1234567890',
      initials: 'SW',
      bg: '#fee2e2',
      color: '#dc2626'
    },
    {
      id: 'EP2346123',
      name: 'Rebecca Miller',
      role: 'Lead HRD',
      dept: 'HR Division',
      status: 'Check-In',
      score: '99%',
      joined: 'January 1, 2021',
      type: 'Full-Time',
      phone: '+1234567890',
      initials: 'RM',
      bg: '#fce7f3',
      color: '#be185d'
    },
    {
      id: 'EP2346098',
      name: 'Amir Smith',
      role: 'Operations Lead',
      dept: 'Operations Division',
      status: 'Check-In',
      score: '94%',
      joined: 'March 14, 2022',
      type: 'Full-Time',
      phone: '+1234567890',
      initials: 'AS',
      bg: '#d1fae5',
      color: '#047857'
    }
  ]);

  const recentAttendanceList = [
    {
      name: 'Amy Smith',
      dept: 'Creative Division',
      status: 'Arrived Late',
      statusType: 'late',
      time: '08:12 AM',
      type: 'Check-in',
      initials: 'AS',
      bg: '#fef3c7',
      color: '#b45309'
    },
    {
      name: 'Barbara Gray',
      dept: 'HR Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '08:00 AM',
      type: 'Check-in',
      initials: 'BG',
      bg: '#f3e8ff',
      color: '#7e22ce'
    },
    {
      name: 'Donald Simmons',
      dept: 'Development Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '08:00 AM',
      type: 'Check-in',
      initials: 'DS',
      bg: '#e0f2fe',
      color: '#0369a1'
    },
    {
      name: 'Elizabeth King',
      dept: 'Marketing Division',
      status: 'Punctual',
      statusType: 'punctual',
      time: '07:00 AM',
      type: 'Check-in',
      initials: 'EK',
      bg: '#ffedd5',
      color: '#c2410c'
    }
  ];

  const topPerformers = [
    { name: 'James Carter', score: '98% Performance Index', initials: 'JC', bg: '#e2e8f0', color: '#334155' },
    { name: 'Amira Lee', score: '95% Performance Index', initials: 'AL', bg: '#ccfbf1', color: '#0f766e' },
    { name: 'Daniel Wong', score: '92% Performance Index', initials: 'DW', bg: '#fae8ff', color: '#86198f' }
  ];

  const attentionList = [
    { name: 'Stephen Wong', score: 'Absent Risk: High', initials: 'SW', bg: '#fee2e2', color: '#dc2626' },
    { name: 'Amy Smith', score: '3 Late Check-ins', initials: 'AS', bg: '#fef3c7', color: '#b45309' }
  ];

  const aiInsightsList = [
    { name: 'Friday Night Shifts', score: '+12% absence pattern', initials: 'FN', bg: '#ede9fe', color: '#6d28d9' },
    { name: 'Creative Team', score: '96% on-time consistency', initials: 'CT', bg: '#e0e7ff', color: '#4338ca' }
  ];

  const filteredDirectory = directory.filter((emp) =>
    `${emp.name} ${emp.role} ${emp.dept} ${emp.id} ${emp.phone}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.role) return;
    const initials = newEmp.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
    const item = {
      id: `EP2346${Math.floor(100 + Math.random() * 900)}`,
      name: newEmp.name,
      role: newEmp.role,
      dept: newEmp.dept,
      status: 'Check-In',
      score: '96%',
      joined: 'Today',
      type: newEmp.type,
      phone: newEmp.phone || '+1234567890',
      initials: initials || 'EM',
      bg: '#e0e7ff',
      color: '#4338ca'
    };
    setDirectory([item, ...directory]);
    setAddModalOpen(false);
    setNewEmp({ name: '', role: '', dept: 'Creative Division', type: 'Full-Time', phone: '+1234567890' });
    if (notify) notify(`Added employee: ${item.name}`);
  };

  const currentPerformers = perfTab === 'top' ? topPerformers : perfTab === 'attention' ? attentionList : aiInsightsList;

  return (
    <div className="employee-dashboard-container">
      {/* TOP 3-COLUMN SECTION */}
      <section className="employee-top-grid">
        {/* Left Column */}
        <div className="employee-left-col">
          {/* Card 1: Total Employees */}
          <article className="card-total-employees">
            <div className="total-emp-header">
              <div className="total-emp-title-wrap">
                <span className="total-emp-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <span className="total-emp-title">Total Employees</span>
              </div>
              <button className="total-emp-dropdown-btn">
                <span>All Time</span>
                <small>⌄</small>
              </button>
            </div>
            <div>
              <div className="total-emp-number">250</div>
              <div className="total-emp-subtitle">Active attendance count for today</div>
            </div>
          </article>

          {/* Card 2: Top Performances */}
          <article className="card-performances">
            <div className="perf-tabs">
              <button className={`perf-tab-btn ${perfTab === 'top' ? 'active' : ''}`} onClick={() => setPerfTab('top')}>
                Top Performances
              </button>
              <button className={`perf-tab-btn ${perfTab === 'attention' ? 'active' : ''}`} onClick={() => setPerfTab('attention')}>
                Needs Attention
              </button>
              <button className={`perf-tab-btn ${perfTab === 'insights' ? 'active' : ''}`} onClick={() => setPerfTab('insights')}>
                AI Insights
              </button>
            </div>

            <div className="perf-list">
              {currentPerformers.map((item, idx) => (
                <div className="perf-item" key={idx}>
                  <div className="perf-user-info">
                    <span
                      className="sample-avatar-badge sm"
                      style={{ background: item.bg || '#e0e7ff', color: item.color || '#4338ca' }}
                    >
                      {item.initials}
                    </span>
                    <span className="perf-name">{item.name}</span>
                  </div>
                  <div className="perf-score-wrap">
                    <svg className="perf-sparkline" viewBox="0 0 60 22" fill="none">
                      <path d="M2 18 C15 17 25 8 38 12 S50 3 58 2" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                    <span className="perf-score-text">{item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Center Column: Recent Attendance */}
        <article className="card-recent-attendance">
          <div className="recent-att-header">
            <span className="recent-att-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </span>
            <span className="recent-att-title">Recent Attendance</span>
          </div>

          <div className="recent-att-list">
            {recentAttendanceList.map((rec, i) => (
              <div className="recent-att-row" key={i}>
                <div className="recent-att-left">
                  <span
                    className="sample-avatar-badge lg"
                    style={{ background: rec.bg || '#dbeafe', color: rec.color || '#2563eb' }}
                  >
                    {rec.initials}
                  </span>
                  <div className="recent-att-info">
                    <div className="recent-att-name-row">
                      <span className="recent-att-name">{rec.name}</span>
                      <span className={`status-badge-pill ${rec.statusType}`}>{rec.status}</span>
                    </div>
                    <span className="recent-att-dept">{rec.dept}</span>
                  </div>
                </div>
                <div className="recent-att-right">
                  <span className="recent-att-time">{rec.time}</span>
                  <span className="recent-att-type">{rec.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="recent-att-footer">
            <span className="recent-att-foot-text">230+ other attendance records logged today</span>
            <button className="recent-att-foot-link" onClick={() => navigate && navigate('asistencia')}>
              See All Attendance
            </button>
          </div>
        </article>

        {/* Right Column: Attendance Snapshot + Leave Request */}
        <div className="employee-right-col">
          {/* Card 3: Today's Attendance Snapshot */}
          <article className="card-attendance-snapshot">
            <div className="snapshot-header">
              <span className="snapshot-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </span>
              <span className="snapshot-title">Today's Attendance Snapshot</span>
            </div>

            <div className="snapshot-metrics-row">
              <div className="snapshot-stat-item">
                <div className="snapshot-stat-val">235</div>
                <div className="snapshot-stat-label">Checked-In</div>
              </div>
              <div className="snapshot-divider" />
              <div className="snapshot-stat-item">
                <div className="snapshot-stat-val">1</div>
                <div className="snapshot-stat-label">Late</div>
              </div>
              <div className="snapshot-divider" />
              <div className="snapshot-stat-item">
                <div className="snapshot-stat-val">14</div>
                <div className="snapshot-stat-label">Absent</div>
              </div>
            </div>

            <div className="snapshot-callout">
              <span>✦</span>
              <span>4% workforce consistently late in the last 2 weeks.</span>
            </div>
          </article>

          {/* Card 4: Leave Request */}
          <article className="card-leave-request">
            <div>
              <div className="leave-req-header">
                <span className="leave-req-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <span className="leave-req-title">Leave Request</span>
              </div>
              <p className="leave-req-desc">
                Track pending, approved, and rejected leave requests in real time.
              </p>
            </div>

            <div className="leave-req-footer">
              <div className="leave-req-number-wrap">
                <span className="leave-req-val">61</span>
                <span className="leave-req-pill">+2.3%</span>
              </div>
              <button className="leave-req-link" onClick={() => notify && notify('61 pending leave requests loaded')}>
                View All Requests
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* BOTTOM SECTION: EMPLOYEE DIRECTORY */}
      <section className="card-employee-directory">
        <div className="dir-top-bar">
          <div className="dir-title-wrap">
            <span className="dir-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </span>
            <span className="dir-title">Employee Directory</span>
          </div>

          <div className="dir-actions">
            <button className="dir-add-btn" onClick={() => setAddModalOpen(true)}>
              <span>+</span>
              <span>Add New Employee</span>
            </button>
            <button className="dir-view-all-link" onClick={() => notify && notify('Viewing all 250 active employees')}>
              View All
            </button>
          </div>
        </div>

        {/* Directory Tab Pills */}
        <div className="dir-tabs-row">
          <button className={`dir-tab-btn ${dirTab === 'list' ? 'active' : ''}`} onClick={() => setDirTab('list')}>
            Employee List
          </button>
          <button className={`dir-tab-btn ${dirTab === 'leave' ? 'active' : ''}`} onClick={() => setDirTab('leave')}>
            Leave Request
          </button>
          <button className={`dir-tab-btn ${dirTab === 'attendance' ? 'active' : ''}`} onClick={() => setDirTab('attendance')}>
            Today's Attendance
          </button>
        </div>

        {/* Directory Table */}
        <div className="dir-table-wrap">
          <table className="dir-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Productivity Score</th>
                <th>Joined Date</th>
                <th>Employment Type</th>
                <th>Phone Number</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {filteredDirectory.map((emp) => (
                <tr key={emp.id} onClick={() => onSelect && onSelect({ id: emp.id, center: emp.dept, shift: emp.role, absence: 35, delay: 18, confidence: 92, drivers: ['Consistently punctual', 'High performance rating'] })}>
                  <td>
                    <div className="dir-name-cell">
                      <span
                        className="sample-avatar-badge lg"
                        style={{ background: emp.bg || '#e0e7ff', color: emp.color || '#4338ca' }}
                      >
                        {emp.initials}
                      </span>
                      <div className="dir-name-info">
                        <div className="dir-name-row">
                          <span className="dir-emp-name">{emp.name}</span>
                          <span className={`status-badge-pill ${emp.status === 'Check-In' ? 'checkin' : 'absent'}`}>{emp.status}</span>
                        </div>
                        <span className="dir-emp-id">{emp.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="dir-role-info">
                      <span className="dir-role-title">{emp.role}</span>
                      <span className="dir-role-dept">{emp.dept}</span>
                    </div>
                  </td>
                  <td>
                    <span className="dir-score">{emp.score}</span>
                  </td>
                  <td>
                    <span className="dir-date">{emp.joined}</span>
                  </td>
                  <td>
                    <span className="employment-pill">{emp.type}</span>
                  </td>
                  <td>
                    <span className="dir-phone">{emp.phone}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="dir-more-btn" onClick={(e) => { e.stopPropagation(); notify && notify(`Options for ${emp.name}`); }}>
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDirectory.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    No employees matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Employee Modal */}
      {addModalOpen && (
        <div className="modal-scrim" onMouseDown={() => setAddModalOpen(false)}>
          <section className="alert-modal" onMouseDown={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <header>
              <div>
                <div className="section-kicker">WORKFORCE MANAGEMENT</div>
                <h2>Add New Employee</h2>
                <p>Register an employee profile into HireSense directory.</p>
              </div>
              <button className="modal-x" onClick={() => setAddModalOpen(false)}>×</button>
            </header>

            <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--sub)', marginBottom: '5px' }}>Full Name</label>
                <input
                  type="text"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  placeholder="e.g. Maria Moore"
                  required
                  style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid var(--stroke)', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--sub)', marginBottom: '5px' }}>Role / Position</label>
                <input
                  type="text"
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  placeholder="e.g. Product Designer"
                  required
                  style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid var(--stroke)', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--sub)', marginBottom: '5px' }}>Division</label>
                  <select
                    value={newEmp.dept}
                    onChange={(e) => setNewEmp({ ...newEmp, dept: e.target.value })}
                    style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid var(--stroke)', padding: '0 10px', boxSizing: 'border-box' }}
                  >
                    <option>Creative Division</option>
                    <option>Development Division</option>
                    <option>HR Division</option>
                    <option>Operations Division</option>
                    <option>Marketing Division</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--sub)', marginBottom: '5px' }}>Employment Type</label>
                  <select
                    value={newEmp.type}
                    onChange={(e) => setNewEmp({ ...newEmp, type: e.target.value })}
                    style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid var(--stroke)', padding: '0 10px', boxSizing: 'border-box' }}
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--sub)', marginBottom: '5px' }}>Phone Number</label>
                <input
                  type="text"
                  value={newEmp.phone}
                  onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                  placeholder="+1234567890"
                  style={{ width: '100%', height: '38px', borderRadius: '8px', border: '1px solid var(--stroke)', padding: '0 12px', boxSizing: 'border-box' }}
                />
              </div>

              <footer style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="button-secondary" onClick={() => setAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="button-primary">+ Create Profile</button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function InsightsPage({ navigate, notify }) {
  const [perfTab, setPerfTab] = useState('top'); // 'top' | 'skill' | 'absence'
  const [insightSlide, setInsightSlide] = useState(0);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Address workload concerns in Marketing',
      signal: 'Risk of 2 resignations within the next quarter.',
      tag: 'Recommended Action',
      checked: false
    },
    {
      id: 2,
      title: 'Launch cross-training between Sales & Customer Support',
      signal: 'Projected to improve resolution speed by 15% and boost client retention.',
      tag: null,
      checked: false
    }
  ]);

  const insightsCarousel = [
    {
      val: '82%',
      label: 'Engagement Score (Company-wide)',
      desc: 'This score reflects how engaged employees are in daily work activities and collaboration. AI calculates it from attendance patterns, productivity signals, and sentiment analysis. A rising score suggests healthier morale and stronger long-term retention.'
    },
    {
      val: '94%',
      label: 'Team Cohesion Index',
      desc: 'Cross-functional alignment between Product Design and Engineering teams remains strong. Autonomous task resolution velocity improved by 12% across primary squads.'
    },
    {
      val: '1.8h',
      label: 'Weekly Productivity Buffer',
      desc: 'Buffer allocation prevents burnout during deployment cycles. Overtime risk has reduced in 4 out of 5 operational units following recent schedule adjustments.'
    }
  ];

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.checked;
        if (notify) notify(nextState ? `Completed recommendation: "${t.title}"` : `Marked "${t.title}" as pending`);
        return { ...t, checked: nextState };
      }
      return t;
    }));
  };

  return (
    <div className="ai-insights-container">
      <div className="ai-insights-grid">
        {/* LEFT COLUMN */}
        <div className="ai-col-left">
          {/* Card 1: Performance & Growth Predictions */}
          <article className="card-perf-growth">
            <div className="perf-growth-header">
              <span className="ai-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                  <circle cx="19" cy="9" r="1.5" />
                </svg>
              </span>
              <div className="perf-growth-heading-text">
                <h2>Performance & Growth Predictions</h2>
                <p>Monitor daily attendance and track overall workforce performance trends.</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="perf-growth-tabs">
              <button
                className={`perf-growth-tab-btn ${perfTab === 'top' ? 'active' : ''}`}
                onClick={() => setPerfTab('top')}
                type="button"
              >
                Top Performance
              </button>
              <button
                className={`perf-growth-tab-btn ${perfTab === 'skill' ? 'active' : ''}`}
                onClick={() => setPerfTab('skill')}
                type="button"
              >
                Skill Gap Analysis
              </button>
              <button
                className={`perf-growth-tab-btn ${perfTab === 'absence' ? 'active' : ''}`}
                onClick={() => setPerfTab('absence')}
                type="button"
              >
                Absence Prediction
              </button>
            </div>

            {/* Body */}
            <div className="perf-growth-body">
              {/* Left Employees */}
              <div className="perf-growth-employees-list">
                <div className="perf-growth-emp-card">
                  <span
                    className="sample-avatar-badge sm"
                    style={{ background: '#e0e7ff', color: '#4338ca' }}
                  >
                    MM
                  </span>
                  <div className="perf-growth-emp-info">
                    <span className="perf-growth-emp-name">Maria Moore</span>
                    <span className="perf-growth-kpi green">99% KPI Projection</span>
                    <span className="perf-growth-promo">90% Promotion Probability</span>
                  </div>
                </div>

                <div className="perf-growth-emp-card">
                  <span
                    className="sample-avatar-badge sm"
                    style={{ background: '#fae8ff', color: '#86198f' }}
                  >
                    DW
                  </span>
                  <div className="perf-growth-emp-info">
                    <span className="perf-growth-emp-name">Daniel Wong</span>
                    <span className="perf-growth-kpi gold">93% KPI Projection</span>
                    <span className="perf-growth-promo">78% Promotion Probability</span>
                  </div>
                </div>
              </div>

              {/* Right Chart */}
              <div className="perf-growth-chart-wrap">
                <svg className="perf-growth-svg" viewBox="0 0 350 90" preserveAspectRatio="none">
                  {/* Guideline for Apr (x=175) */}
                  <line x1="175" y1="8" x2="175" y2="82" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />

                  {/* Curve 1: Maria Moore (Teal/Green) */}
                  <path
                    d="M 20 64 C 45 56, 60 48, 75 50 S 110 40, 125 42 S 160 52, 175 48 S 210 46, 225 52 S 260 36, 275 30 S 310 18, 330 14"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {[[20, 64], [75, 50], [125, 42], [175, 48], [225, 52], [275, 30], [330, 14]].map(([x, y], idx) => (
                    <circle key={`mm-${idx}`} cx={x} cy={y} r="3.2" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
                  ))}

                  {/* Curve 2: Daniel Wong (Yellow/Gold) */}
                  <path
                    d="M 20 80 C 45 74, 60 70, 75 72 S 110 66, 125 68 S 160 58, 175 56 S 210 70, 225 68 S 260 62, 275 58 S 310 48, 330 46"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {[[20, 80], [75, 72], [125, 68], [175, 56], [225, 68], [275, 58], [330, 46]].map(([x, y], idx) => (
                    <circle key={`dw-${idx}`} cx={x} cy={y} r="3.2" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                  ))}
                </svg>

                {/* Months */}
                <div className="perf-growth-months-row">
                  <span className="perf-growth-month-label">Jan</span>
                  <span className="perf-growth-month-label">Feb</span>
                  <span className="perf-growth-month-label">Mar</span>
                  <span className="perf-growth-month-label active">Apr</span>
                  <span className="perf-growth-month-label">May</span>
                  <span className="perf-growth-month-label">Jun</span>
                  <span className="perf-growth-month-label">Jul</span>
                </div>
              </div>
            </div>
          </article>

          {/* Bottom Left Row: Attendance Insight + Attrition */}
          <div className="ai-bottom-left-row">
            {/* Card 2A: Attendance Insight */}
            <article className="card-ai-attendance-insight">
              <div>
                <div className="ai-insight-top-tag">
                  <span>✦</span>
                  <span>Attendance Insight</span>
                </div>

                <div className="ai-insight-big-val">{insightsCarousel[insightSlide].val}</div>
                <div className="ai-insight-metric-label">{insightsCarousel[insightSlide].label}</div>
                <p className="ai-insight-desc">{insightsCarousel[insightSlide].desc}</p>
              </div>

              <div className="ai-insight-pagination">
                <button
                  className="ai-insight-nav-btn"
                  onClick={() => setInsightSlide((insightSlide - 1 + insightsCarousel.length) % insightsCarousel.length)}
                  aria-label="Previous slide"
                  type="button"
                >
                  ‹
                </button>
                <div className="ai-insight-nav-indicator">
                  <div className="ai-insight-nav-dot" />
                  <div className="ai-insight-nav-line" />
                </div>
                <button
                  className="ai-insight-nav-btn"
                  onClick={() => setInsightSlide((insightSlide + 1) % insightsCarousel.length)}
                  aria-label="Next slide"
                  type="button"
                >
                  ›
                </button>
              </div>
            </article>

            {/* Card 2B: Attrition Forecast */}
            <article className="card-ai-attrition">
              <div>
                <div className="ai-attrition-header">
                  <span className="ai-icon-box" style={{ width: '32px', height: '32px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 10" />
                    </svg>
                  </span>
                  <div className="ai-attrition-heading-text">
                    <h2>Attrition Forecast</h2>
                    <p>Company retention expected at the next quarter</p>
                  </div>
                </div>

                <div className="ai-attrition-stat-row">
                  <span className="ai-attrition-num">87%</span>
                  <span className="ai-attrition-pill">+2.3%</span>
                </div>
              </div>

              {/* Wavy Chart with gradient fill */}
              <div className="ai-attrition-chart-wrap">
                <svg className="ai-attrition-svg" viewBox="0 0 260 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="attritionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 46 Q 30 20, 50 42 T 90 28 T 130 45 T 170 20 T 210 40 T 250 24"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 46 Q 30 20, 50 42 T 90 28 T 130 45 T 170 20 T 210 40 T 250 24 L 250 60 L 10 60 Z"
                    fill="url(#attritionGrad)"
                  />
                </svg>

                <div className="ai-attrition-months-row">
                  <span className="ai-attrition-month-label">Jan</span>
                  <span className="ai-attrition-month-label">Feb</span>
                  <span className="ai-attrition-month-label">Mar</span>
                  <span className="ai-attrition-month-label">Apr</span>
                  <span className="ai-attrition-month-label active">May</span>
                  <span className="ai-attrition-month-label">Jun</span>
                  <span className="ai-attrition-month-label">Jul</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="ai-col-right">
          {/* Card 3: Diversity & Inclusion Insights */}
          <article className="card-ai-diversity">
            <div className="ai-diversity-header">
              <span className="ai-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 18V9" />
                  <path d="M10 18V5" />
                  <path d="M14 18v-7" />
                  <path d="M18 18V3" />
                </svg>
              </span>
              <div className="ai-diversity-heading-text">
                <h2>Diversity & Inclusion Insights</h2>
                <p>AI highlights representation trends and their impact on engagement and performance.</p>
              </div>
            </div>

            {/* Segmented Dual Bar */}
            <div className="ai-diversity-bar">
              <div className="ai-diversity-seg-green" style={{ width: '54%' }} />
              <div className="ai-diversity-seg-blue" style={{ width: '46%' }} />
            </div>

            {/* Representation Rows */}
            <div className="ai-diversity-breakdown">
              <div className="ai-diversity-row">
                <div className="ai-diversity-left">
                  <span className="ai-diversity-dot green" />
                  <span className="ai-diversity-pct">54%</span>
                  <span className="ai-diversity-pill">+2.3%</span>
                </div>
                <span className="ai-diversity-label">Male Employee</span>
              </div>

              <div className="ai-diversity-row">
                <div className="ai-diversity-left">
                  <span className="ai-diversity-dot blue" />
                  <span className="ai-diversity-pct">46%</span>
                  <span className="ai-diversity-pill">+1.3%</span>
                </div>
                <span className="ai-diversity-label">Female Employee</span>
              </div>
            </div>

            {/* AI Sentiment Banner */}
            <div className="ai-diversity-callout">
              <span>✦</span>
              <div>
                Employee sentiment analysis indicates higher engagement in diverse teams, with productivity up by 7% compared to less diverse groups.
              </div>
            </div>
          </article>

          {/* Card 4: Recommendations Panel */}
          <article className="card-ai-recommendations">
            <div className="ai-recom-header">
              <div className="ai-recom-title-wrap">
                <span className="ai-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <div className="ai-recom-heading-text">
                  <h2>Recommendations Panel</h2>
                  <p>Find the best actions to improve workforce performance with AI-driven analysis.</p>
                </div>
              </div>
              <span className="ai-beta-pill">AI BETA</span>
            </div>

            <div className="ai-recom-list">
              {tasks.map((task) => (
                <div key={task.id} className="ai-recom-card">
                  <button
                    className={`ai-recom-checkbox ${task.checked ? 'checked' : ''}`}
                    onClick={() => toggleTask(task.id)}
                    type="button"
                    aria-label={`Toggle ${task.title}`}
                  >
                    {task.checked && '✓'}
                  </button>
                  <div className="ai-recom-content">
                    <div className="ai-recom-top-row">
                      <span className="ai-recom-title" style={{ textDecoration: task.checked ? 'line-through' : 'none', opacity: task.checked ? 0.7 : 1 }}>
                        {task.title}
                      </span>
                      {task.tag && <span className="ai-recom-tag-pill">{task.tag}</span>}
                    </div>
                    <span className="ai-recom-signal">
                      <span>✦</span> {task.signal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Card 5: Payroll & Cost Efficiency */}
          <article className="card-ai-payroll">
            <div className="ai-payroll-header">
              <span className="ai-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <div className="ai-payroll-heading-text">
                <h2>Payroll & Cost Efficiency</h2>
                <p>Track how engaged your employees feel based on real-time signals.</p>
              </div>
            </div>

            <div className="ai-payroll-body">
              <div className="ai-payroll-stat-box">
                <span className="ai-payroll-stat-num">+8%</span>
                <span className="ai-payroll-stat-label">Overtime Trend This Quarter</span>
              </div>

              <div className="ai-payroll-chart-wrap">
                <svg className="ai-payroll-svg" viewBox="0 0 280 65" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="payrollAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Vertical highlight on Jun (x=205) */}
                  <line x1="205" y1="6" x2="205" y2="58" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />

                  {/* Area wave */}
                  <path
                    d="M 15 48 C 45 46, 60 40, 80 44 S 120 32, 140 28 S 180 14, 205 10 S 240 22, 265 24"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 15 48 C 45 46, 60 40, 80 44 S 120 32, 140 28 S 180 14, 205 10 S 240 22, 265 24 L 265 65 L 15 65 Z"
                    fill="url(#payrollAreaGrad)"
                  />

                  {/* Circular points */}
                  <circle cx="80" cy="44" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                  <circle cx="140" cy="28" r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />
                  <circle cx="205" cy="10" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
                </svg>

                <div className="ai-payroll-months-row">
                  <span className="ai-payroll-month-label">Jan</span>
                  <span className="ai-payroll-month-label">Feb</span>
                  <span className="ai-payroll-month-label">Mar</span>
                  <span className="ai-payroll-month-label">Apr</span>
                  <span className="ai-payroll-month-label">May</span>
                  <span className="ai-payroll-month-label active">Jun</span>
                  <span className="ai-payroll-month-label">Jul</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function PersonModal({ person, close, navigate }) {
  return <div className="modal-scrim" onMouseDown={close}><section className="alert-modal person-modal" onMouseDown={(event) => event.stopPropagation()}><header><div><div className="section-kicker">EXPLICACIÓN INDIVIDUAL · DEMO</div><h2>{person.id}</h2><p>{person.center} <span>·</span> {person.shift}</p></div><button className="modal-x" onClick={close} aria-label="Cerrar">×</button></header><div className="modal-risk-summary"><div><span className="level-pill high">Riesgo de ausencia</span><strong>{person.absence}%</strong><small>próximo turno programado</small></div><div className="modal-stat"><b>{person.delay}%</b><small>riesgo de retraso</small></div><div className="modal-stat"><b>{person.confidence}%</b><small>confianza del modelo</small></div></div><div className="explanation-box"><div className="explanation-heading"><span>✳</span><b>Señales que contribuyen</b></div><ul>{person.drivers.map((driver) => <li key={driver}>{driver}</li>)}</ul></div><div className="modal-human-note"><span>ⓘ</span> Información pseudonimizada para planeación de cobertura. Revisa la asignación y el contexto antes de actuar.</div><footer><button className="button-secondary" onClick={close}>Cerrar</button><button className="button-primary" onClick={() => { close(); navigate('alertas'); }}>Ver alertas relacionadas →</button></footer></section></div>;
}
