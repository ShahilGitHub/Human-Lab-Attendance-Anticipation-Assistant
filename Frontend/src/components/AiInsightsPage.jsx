import { useState } from 'react';

export default function AiInsightsPage({ navigate, notify }) {
  // Card 1: Performance & Growth Predictions state
  const [perfTab, setPerfTab] = useState('top'); // 'top' | 'skill' | 'absence'
  const [selectedMonth, setSelectedMonth] = useState('Apr');

  // Card 2A: Attendance Insight Carousel state
  const [insightIndex, setInsightIndex] = useState(0);

  // Card 4: Recommendations Panel checkboxes state
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: 'Address workload concerns in Marketing',
      tag: 'Recommended Action',
      signal: 'Risk of 2 resignations within the next quarter.',
      checked: false,
    },
    {
      id: 2,
      title: 'Launch cross-training between Sales & Customer Support',
      tag: null,
      signal: 'Projected to improve resolution speed by 15% and boost client retention.',
      checked: false,
    },
  ]);

  const toggleRecommendation = (id) => {
    setRecommendations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.checked;
          if (notify) {
            notify(
              nextState
                ? `Completed: "${item.title}"`
                : `Action marked as pending: "${item.title}"`
            );
          }
          return { ...item, checked: nextState };
        }
        return item;
      })
    );
  };

  const insightsList = [
    {
      score: '82%',
      label: 'Engagement Score (Company-wide)',
      description:
        'This score reflects how engaged employees are in daily work activities and collaboration. AI calculates it from attendance patterns, productivity signals, and sentiment analysis. A rising score suggests healthier morale and stronger long-term retention.',
    },
    {
      score: '94%',
      label: 'Team Cohesion Index',
      description:
        'Cross-functional alignment between Product Design and Engineering teams remains strong. Autonomous task resolution velocity improved by 12% across primary squads.',
    },
    {
      score: '1.8h',
      label: 'Weekly Productivity Buffer',
      description:
        'Buffer allocation prevents burnout during deployment cycles. Overtime risk has reduced in 4 out of 5 operational units following recent schedule adjustments.',
    },
    {
      score: '96.4%',
      label: 'Punctual Attendance Rate',
      description:
        'Morning shift punctuality increased across all distribution centers. Automated transit advisory signals contributed to fewer transit-related delays.',
    },
    {
      score: '3.1%',
      label: 'Unplanned Absence Rate',
      description:
        'Down 1.4% from last quarter. Predictive staffing models successfully pre-empted coverage gaps during peak seasonal volume.',
    },
    {
      score: '89%',
      label: 'Shift Satisfaction Rating',
      description:
        'Feedback gathered across regional units shows positive reception to flexible rotation schedules implemented this month.',
    },
  ];

  const currentInsight = insightsList[insightIndex];

  const nextInsight = () => {
    setInsightIndex((prev) => (prev + 1) % insightsList.length);
  };

  const prevInsight = () => {
    setInsightIndex((prev) => (prev - 1 + insightsList.length) % insightsList.length);
  };

  return (
    <div className="hiresense-dashboard-wrapper">
      <div className="hiresense-dashboard-grid">
        {/* =========================================================
            LEFT COLUMN (~58% width)
            ========================================================= */}
        <div className="hiresense-dashboard-left-col">
          {/* CARD 1: Performance & Growth Predictions */}
          <article className="hiresense-card card-perf-growth-full">
            {/* Header */}
            <div className="hiresense-card-header">
              <span className="hiresense-card-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                  <circle cx="19" cy="9" r="1.5" />
                </svg>
              </span>
              <div className="hiresense-card-header-text">
                <h2>Performance & Growth Predictions</h2>
                <p>Monitor daily attendance and track overall workforce performance trends.</p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="perf-growth-pill-tabs">
              <button
                type="button"
                className={`perf-growth-pill-btn ${perfTab === 'top' ? 'active' : ''}`}
                onClick={() => {
                  setPerfTab('top');
                  if (notify) notify('Viewing Top Performance metrics');
                }}
              >
                Top Performance
              </button>
              <button
                type="button"
                className={`perf-growth-pill-btn ${perfTab === 'skill' ? 'active' : ''}`}
                onClick={() => {
                  setPerfTab('skill');
                  if (notify) notify('Viewing Skill Gap Analysis');
                }}
              >
                Skill Gap Analysis
              </button>
              <button
                type="button"
                className={`perf-growth-pill-btn ${perfTab === 'absence' ? 'active' : ''}`}
                onClick={() => {
                  setPerfTab('absence');
                  if (notify) notify('Viewing Absence Prediction trends');
                }}
              >
                Absence Prediction
              </button>
            </div>

            {/* Card Body: Left Employee Profiles + Right Line Chart */}
            <div className="perf-growth-grid-body">
              {/* Left Employees */}
              <div className="perf-growth-employees">
                {/* Employee 1: Maria Moore */}
                <div className="perf-growth-emp-item">
                  <div className="perf-emp-avatar-wrap">
                    <div
                      className="perf-emp-avatar-fallback"
                      style={{ background: '#e6fcf5', color: '#0ca678' }}
                    >
                      MM
                    </div>
                  </div>
                  <div className="perf-emp-info-wrap">
                    <span className="perf-emp-name">Maria Moore</span>
                    <span className="perf-emp-stat-line">
                      <b className="kpi-blue">99%</b> KPI Projection
                    </span>
                    <span className="perf-emp-stat-line">
                      <b className="promo-green">90%</b> Promotion Probability
                    </span>
                  </div>
                </div>

                {/* Employee 2: Daniel Wong */}
                <div className="perf-growth-emp-item">
                  <div className="perf-emp-avatar-wrap">
                    <div
                      className="perf-emp-avatar-fallback"
                      style={{ background: '#fef9c3', color: '#ca8a04' }}
                    >
                      DW
                    </div>
                  </div>
                  <div className="perf-emp-info-wrap">
                    <span className="perf-emp-name">Daniel Wong</span>
                    <span className="perf-emp-stat-line">
                      <b className="kpi-blue">98%</b> KPI Projection
                    </span>
                    <span className="perf-emp-stat-line">
                      <b className="promo-green">78%</b> Promotion Probability
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Dual Line Chart */}
              <div className="perf-chart-container">
                <div className="perf-chart-svg-box">
                  <svg
                    className="perf-chart-svg"
                    viewBox="0 0 370 120"
                    preserveAspectRatio="none"
                  >
                    {/* Vertical guideline at Apr (x=185) */}
                    <line
                      x1="185"
                      y1="8"
                      x2="185"
                      y2="114"
                      stroke="#e2e8f0"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />

                    {/* Curve 1: Maria Moore (Cyan/Mint Green #2dd4bf) */}
                    <path
                      d="M 20 88 C 45 76, 55 70, 75 68 S 110 63, 130 62 S 165 58, 185 56 S 220 55, 240 54 S 275 50, 295 46 S 330 32, 350 26"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    {/* Cyan Points */}
                    {[
                      [20, 88],
                      [75, 68],
                      [130, 62],
                      [185, 56],
                      [240, 54],
                      [295, 46],
                      [350, 26],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={`c1-${i}`}
                        cx={cx}
                        cy={cy}
                        r="3.5"
                        fill="#ffffff"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                    ))}

                    {/* Curve 2: Daniel Wong (Yellow/Amber #fbbf24) */}
                    <path
                      d="M 20 98 C 45 88, 55 83, 75 82 S 110 88, 130 86 S 165 74, 185 72 S 220 88, 240 86 S 275 88, 295 86 S 330 72, 350 66"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    {/* Yellow Points */}
                    {[
                      [20, 98],
                      [75, 82],
                      [130, 86],
                      [185, 72],
                      [240, 86],
                      [295, 86],
                      [350, 66],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={`c2-${i}`}
                        cx={cx}
                        cy={cy}
                        r="3.5"
                        fill="#ffffff"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                </div>

                {/* Month labels */}
                <div className="perf-chart-months">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
                    <span
                      key={m}
                      className={`perf-month-tick ${selectedMonth === m ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedMonth(m);
                        if (notify) notify(`Highlighted workforce trend for ${m}`);
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* BOTTOM ROW: Attendance Insight + Attrition Forecast */}
          <div className="hiresense-bottom-left-split">
            {/* CARD 2A: Attendance Insight (Solid Cornflower Blue Card) */}
            <article className="card-attendance-insight-blue">
              <div>
                <div className="insight-top-pill">
                  <span className="insight-top-sparkle">✦</span>
                  <span>Attendance Insight</span>
                </div>

                <div className="insight-big-percentage">{currentInsight.score}</div>
                <div className="insight-score-title">{currentInsight.label}</div>
                <p className="insight-score-description">{currentInsight.description}</p>
              </div>

              {/* Bottom Carousel Navigation */}
              <div className="insight-carousel-controls">
                <button
                  type="button"
                  className="insight-nav-arrow"
                  onClick={prevInsight}
                  aria-label="Previous insight"
                >
                  ‹
                </button>

                <div className="insight-dashes-track">
                  {insightsList.map((_, idx) => (
                    <span
                      key={idx}
                      className={`insight-dash ${insightIndex === idx ? 'active' : ''}`}
                      onClick={() => setInsightIndex(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="insight-nav-arrow"
                  onClick={nextInsight}
                  aria-label="Next insight"
                >
                  ›
                </button>
              </div>
            </article>

            {/* CARD 2B: Attrition Forecast (White Card) */}
            <article className="hiresense-card card-attrition-white">
              <div>
                <div className="hiresense-card-header" style={{ marginBottom: '10px' }}>
                  <span className="hiresense-card-icon-box" style={{ width: '34px', height: '34px' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 10" />
                    </svg>
                  </span>
                  <div className="hiresense-card-header-text">
                    <h2>Attrition Forecast</h2>
                    <p>Company retention expected at the next querter</p>
                  </div>
                </div>

                <div className="attrition-stat-row">
                  <span className="attrition-big-number">87%</span>
                  <span className="attrition-pill-badge">+2.3%</span>
                </div>
              </div>

              {/* Area Wave Chart */}
              <div className="attrition-chart-container">
                <div className="attrition-svg-wrap">
                  <svg className="attrition-svg" viewBox="0 0 280 75" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="attritionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.32" />
                        <stop offset="50%" stopColor="#ec4899" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area */}
                    <path
                      d="M 10 52 Q 30 24, 52 46 T 94 32 T 136 50 T 178 24 T 220 44 T 265 28 L 265 75 L 10 75 Z"
                      fill="url(#attritionGradient)"
                    />
                    {/* Stroke Wave */}
                    <path
                      d="M 10 52 Q 30 24, 52 46 T 94 32 T 136 50 T 178 24 T 220 44 T 265 28"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="attrition-months-row">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
                    <span
                      key={m}
                      className={`attrition-month-label ${m === 'May' ? 'active' : ''}`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN (~42% width)
            ========================================================= */}
        <div className="hiresense-dashboard-right-col">
          {/* CARD 3: Diversity & Inclusion Insights */}
          <article className="hiresense-card card-diversity-inclusion">
            <div className="hiresense-card-header">
              <span className="hiresense-card-icon-box">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 18V9" />
                  <path d="M10 18V5" />
                  <path d="M14 18v-7" />
                  <path d="M18 18V3" />
                </svg>
              </span>
              <div className="hiresense-card-header-text">
                <h2>Diversity & Inclusion Insights</h2>
                <p>AI highlights representation trends and their impact on engagement and performance.</p>
              </div>
            </div>

            {/* Segmented Dual Bar */}
            <div className="diversity-bar-container">
              <div className="diversity-seg-green" style={{ width: '54%' }} />
              <div className="diversity-seg-blue" style={{ width: '46%' }} />
            </div>

            {/* Breakdown Stats */}
            <div className="diversity-stats-list">
              <div className="diversity-stat-row">
                <div className="diversity-stat-left">
                  <span className="diversity-color-chip green" />
                  <span className="diversity-stat-pct">54%</span>
                  <span className="diversity-stat-pill">+2.3%</span>
                </div>
                <span className="diversity-stat-label">Male Employee</span>
              </div>

              <div className="diversity-stat-row">
                <div className="diversity-stat-left">
                  <span className="diversity-color-chip blue" />
                  <span className="diversity-stat-pct">46%</span>
                  <span className="diversity-stat-pill">+1.3%</span>
                </div>
                <span className="diversity-stat-label">Female Employee</span>
              </div>
            </div>

            {/* AI Callout Banner */}
            <div className="diversity-ai-callout">
              <span className="diversity-ai-sparkle">✦</span>
              <p className="diversity-ai-text">
                Employee sentiment analysis indicates higher engagement in diverse teams, with productivity up by 7% compared to less diverse groups.
              </p>
            </div>
          </article>

          {/* CARD 4: Recommendations Panel */}
          <article className="hiresense-card card-recommendations-panel">
            <div className="recom-header-top-row">
              <div className="recom-title-wrap">
                <span className="hiresense-card-icon-box" style={{ width: '34px', height: '34px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <h2>Recommendations Panel</h2>
              </div>
              <span className="recom-ai-beta-pill">AI BETA</span>
            </div>
            <p className="recom-subtitle">Find the best actions to improve workforce performance with AI-driven analysis.</p>

            {/* Recommendations List */}
            <div className="recom-cards-list">
              {recommendations.map((item) => (
                <div key={item.id} className="recom-action-card">
                  <button
                    type="button"
                    className={`recom-checkbox ${item.checked ? 'checked' : ''}`}
                    onClick={() => toggleRecommendation(item.id)}
                    aria-label={`Toggle action: ${item.title}`}
                  >
                    {item.checked && '✓'}
                  </button>
                  <div className="recom-action-content">
                    <div className="recom-action-title-row">
                      <span
                        className="recom-action-title"
                        style={{
                          textDecoration: item.checked ? 'line-through' : 'none',
                          opacity: item.checked ? 0.6 : 1,
                        }}
                      >
                        {item.title}
                      </span>
                      {item.tag && <span className="recom-tag-pill">{item.tag}</span>}
                    </div>
                    <span className="recom-action-signal">
                      <span>✦</span> {item.signal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* CARD 5: Payroll & Cost Efficiency */}
          <article className="hiresense-card card-payroll-efficiency">
            <div className="hiresense-card-header" style={{ marginBottom: '10px' }}>
              <span className="hiresense-card-icon-box">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <div className="hiresense-card-header-text">
                <h2>Payroll & Cost Efficiency</h2>
                <p>Track how engaged your employees feel based on real-time signals.</p>
              </div>
            </div>

            <div className="payroll-eff-body">
              <div className="payroll-eff-stat-box">
                <span className="payroll-eff-number">+8%</span>
                <span className="payroll-eff-label">Overtime Trend This Quarter</span>
              </div>

              <div className="payroll-eff-chart-box">
                <div className="payroll-eff-svg-wrap">
                  <svg className="payroll-eff-svg" viewBox="0 0 280 75" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="payrollGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Vertical grid lines at Mar (x=90) and Jun (x=210) */}
                    <line
                      x1="90"
                      y1="8"
                      x2="90"
                      y2="68"
                      stroke="#3b82f6"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      opacity="0.5"
                    />
                    <line
                      x1="210"
                      y1="8"
                      x2="210"
                      y2="68"
                      stroke="#3b82f6"
                      strokeWidth="1.3"
                      opacity="0.7"
                    />

                    {/* Gradient Area Fill */}
                    <path
                      d="M 15 54 C 45 52, 65 44, 90 38 S 135 48, 155 42 S 185 24, 210 16 S 245 28, 268 30 L 268 75 L 15 75 Z"
                      fill="url(#payrollGrad)"
                    />

                    {/* Area Wave Stroke */}
                    <path
                      d="M 15 54 C 45 52, 65 44, 90 38 S 135 48, 155 42 S 185 24, 210 16 S 245 28, 268 30"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />

                    {/* Peak Point on Mar */}
                    <circle cx="90" cy="38" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.2" />

                    {/* Highlighted Peak Point on Jun */}
                    <circle cx="210" cy="16" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
                  </svg>
                </div>

                <div className="payroll-eff-months-row">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
                    <span
                      key={m}
                      className={`payroll-eff-month-label ${m === 'Mar' || m === 'Jun' ? 'active' : ''}`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
