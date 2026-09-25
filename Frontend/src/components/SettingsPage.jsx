import React, { useState } from 'react';

export default function SettingsPage({
  threshold = 70,
  setThreshold = () => {},
  inAppAlerts = true,
  setInAppAlerts = () => {},
  emailAlerts = true,
  setEmailAlerts = () => {},
  lang = 'EN',
  setLang = () => {},
  LANGUAGES = [],
  notify = () => {}
}) {
  const [anomalyDetection, setAnomalyDetection] = useState(true);
  const [autoRebalance, setAutoRebalance] = useState(false);
  const [shiftHorizon, setShiftHorizon] = useState('72h');

  return (
    <div className="subpage-dashboard-container">
      {/* Page Header */}
      <div className="subpage-head-bar">
        <div className="subpage-head-title-wrap">
          <span className="subpage-kicker">Workspace Preferences</span>
          <h1>Settings & Preferences</h1>
          <p>Configure model confidence thresholds, tenant notifications, and operational parameters.</p>
        </div>
        <div className="subpage-head-actions">
          <button
            className="subpage-btn-primary"
            onClick={() => notify('Settings saved successfully across North · México', 'success')}
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="settings-grid-layout">
        {/* Left Column: Settings Configuration Card */}
        <section className="subpage-card">
          <div className="subpage-card-header">
            <div className="subpage-icon-box">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div>
              <h2>Operational AI Preferences</h2>
              <p>Tune prediction sensitivities and notification channels.</p>
            </div>
          </div>

          <div className="settings-rows-list">
            {/* Setting 1: Interface Language */}
            <div className="settings-item-row">
              <div className="settings-item-info">
                <h3>Interface Language</h3>
                <p>Select your default workspace display language.</p>
              </div>
              <select
                className="settings-select-input"
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value);
                  const found = LANGUAGES.find((l) => l.code === e.target.value);
                  notify(`Language set to ${found ? found.name : e.target.value}`, 'info');
                }}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Setting 2: Anticipation Horizon */}
            <div className="settings-item-row">
              <div className="settings-item-info">
                <h3>Prediction Horizon</h3>
                <p>Forecasting range for upcoming absence and delay signals.</p>
              </div>
              <select
                className="settings-select-input"
                value={shiftHorizon}
                onChange={(e) => {
                  setShiftHorizon(e.target.value);
                  notify(`Forecast horizon set to ${e.target.value}`, 'info');
                }}
              >
                <option value="24h">Next 24 Hours</option>
                <option value="48h">Next 48 Hours</option>
                <option value="72h">Next 72 Hours (Recommended)</option>
                <option value="7d">Next 7 Days</option>
              </select>
            </div>

            {/* Setting 3: Minimum Confidence Threshold Slider */}
            <div className="settings-item-row">
              <div className="settings-item-info">
                <h3>Minimum Confidence Threshold</h3>
                <p>Signals below this certainty score will be suppressed to prevent alert fatigue.</p>
              </div>
              <div className="settings-slider-wrap">
                <span className="settings-slider-value">{threshold}%</span>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="settings-range-slider"
                  aria-label="Confidence threshold"
                />
                <div className="settings-slider-labels">
                  <span>50% (More alerts)</span>
                  <span>95% (Strict)</span>
                </div>
              </div>
            </div>

            {/* Setting 4: In-App Operational Notifications */}
            <div className="settings-item-row">
              <div className="settings-item-info">
                <h3>In-App Operational Alerts</h3>
                <p>Receive real-time banners when shifts fall below minimum required staffing.</p>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${inAppAlerts ? 'active' : ''}`}
                onClick={() => setInAppAlerts(!inAppAlerts)}
                aria-label="Toggle In-App Alerts"
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>

            {/* Setting 5: Morning Email Digest */}
            <div className="settings-item-row">
              <div className="settings-item-info">
                <h3>Morning Executive Email Digest</h3>
                <p>Send daily 06:00 AM summary of regional coverage to HR coordinators.</p>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${emailAlerts ? 'active' : ''}`}
                onClick={() => setEmailAlerts(!emailAlerts)}
                aria-label="Toggle Email Digest"
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>

            {/* Setting 6: Irregular Overtime Detection */}
            <div className="settings-item-row">
              <div className="settings-item-info">
                <h3>Irregular Overtime & Payroll Anomaly Detection</h3>
                <p>AI flags unexpected shift overtime before payroll settlement.</p>
              </div>
              <button
                type="button"
                className={`settings-toggle-btn ${anomalyDetection ? 'active' : ''}`}
                onClick={() => setAnomalyDetection(!anomalyDetection)}
                aria-label="Toggle Anomaly Detection"
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Governance, Privacy & Scope */}
        <div className="settings-sidebar-stack">
          {/* Tenant Scope Card */}
          <div className="subpage-card">
            <div className="subpage-card-header">
              <div className="subpage-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h2>Tenant & Data Scope</h2>
                <p>Active workspace boundaries.</p>
              </div>
            </div>

            <div className="settings-scope-box">
              <div className="settings-scope-row">
                <span>Organization</span>
                <b>North · México</b>
              </div>
              <div className="settings-scope-row">
                <span>Workforce Size</span>
                <b>250 Employees</b>
              </div>
              <div className="settings-scope-row">
                <span>AI Engine</span>
                <b>HireSense Anticipation v2.4</b>
              </div>
              <div className="settings-scope-row">
                <span>Timezone</span>
                <b>America/Mexico_City (GMT-6)</b>
              </div>
            </div>
          </div>

          {/* Ethical AI & Human Review Banner */}
          <div className="settings-privacy-banner">
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🛡</span>
            <div>
              <b>Mandatory Human-in-the-Loop Governance</b>
              <p style={{ margin: '4px 0 0 0', lineHeight: 1.4 }}>
                Anticipated attendance predictions are strictly advisory for proactive shift coverage planning. Predictions may never be used for punitive or automated disciplinary actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
