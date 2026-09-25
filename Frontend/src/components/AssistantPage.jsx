import React, { useState } from 'react';

export default function AssistantPage({
  chatInput = '',
  setChatInput = () => {},
  chatMessages = [],
  setChatMessages = () => {},
  askAssistant = () => {},
  notify = () => {}
}) {
  const quickPrompts = [
    'Which shifts are below the minimum staffing threshold?',
    'What does policy dictate for emergency replacement coverage?',
    'Summarize North coverage risk for the upcoming 72 hours.',
    'Are there irregular overtime hours flagged in this pay run?'
  ];

  const handleSelectPrompt = (prompt) => {
    setChatInput(prompt);
  };

  return (
    <div className="subpage-dashboard-container">
      {/* Header */}
      <div className="subpage-head-bar">
        <div className="subpage-head-title-wrap">
          <span className="subpage-kicker">Conversational Operations Assistant</span>
          <h1>Ask AI Assistant</h1>
          <p>Query workforce scheduling policies, coverage risks, and shift rosters in natural language.</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="assistant-grid-layout">
        {/* Left: Chat Card */}
        <section className="subpage-card assistant-chat-card">
          <div className="assistant-card-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="subpage-icon-box" style={{ width: 32, height: 32 }}>
                <span style={{ fontSize: 15, color: '#4d88ec' }}>✦</span>
              </div>
              <div>
                <b style={{ fontSize: 13.5, color: '#1e293b' }}>Operational AI Advisor</b>
                <small style={{ display: 'block', fontSize: 11, color: '#64748b' }}>
                  Grounded in North · México documentation
                </small>
              </div>
            </div>

            <span className="assistant-head-badge">
              <span style={{ fontSize: 8 }}>●</span> Tenant Scoped
            </span>
          </div>

          {/* Thread */}
          <div className="assistant-chat-thread">
            {chatMessages.length === 0 ? (
              <div style={{ textAlign: 'center', margin: 'auto 0', padding: '20px' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#eff6ff',
                    color: '#4d88ec',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontSize: 22
                  }}
                >
                  ✦
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 6px' }}>
                  How can I assist your operations today?
                </h3>
                <p style={{ fontSize: 12.5, color: '#64748b', maxWidth: 440, margin: '0 auto 18px' }}>
                  Ask questions about staffing coverage, shift risks, overtime audits, or official company attendance policies.
                </p>

                <div className="assistant-quick-prompts">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      className="assistant-prompt-chip"
                      onClick={() => handleSelectPrompt(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-bubble-row ${msg.role === 'user' ? 'user' : 'ai'}`}
                >
                  <div className={`chat-msg-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
                    {msg.role === 'user' ? 'AD' : '✦'}
                  </div>
                  <div className="chat-msg-content">
                    <div className="chat-msg-bubble">{msg.text}</div>
                    {msg.citation && (
                      <span className="chat-citation-tag">
                        <span>▤</span>
                        <span>{msg.citation}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form className="assistant-chat-form" onSubmit={askAssistant}>
            <input
              type="text"
              className="assistant-chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question about coverage, overtime, or attendance policies..."
              aria-label="Assistant question input"
            />
            <button
              type="submit"
              className="assistant-send-btn"
              disabled={!chatInput.trim()}
              title="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </section>

        {/* Right: Tenant Knowledge Sources */}
        <div className="assistant-sidebar-stack">
          <section className="subpage-card">
            <div className="subpage-card-header">
              <div className="subpage-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div>
                <h2>Verified Sources</h2>
                <p>Real-time indexed knowledge.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="assistant-source-item">
                <div className="assistant-source-item-left">
                  <span style={{ fontSize: 16 }}>▤</span>
                  <div>
                    <b>Attendance Policy v4.2</b>
                    <small>Official Tenant Rules</small>
                  </div>
                </div>
                <span style={{ color: '#10b981', fontSize: 12 }}>● Live</span>
              </div>

              <div className="assistant-source-item">
                <div className="assistant-source-item-left">
                  <span style={{ fontSize: 16 }}>◷</span>
                  <div>
                    <b>Coverage Risk Horizon</b>
                    <small>Next 24–72 hours</small>
                  </div>
                </div>
                <span style={{ color: '#10b981', fontSize: 12 }}>● Live</span>
              </div>

              <div className="assistant-source-item">
                <div className="assistant-source-item-left">
                  <span style={{ fontSize: 16 }}>👥</span>
                  <div>
                    <b>Workforce Roster</b>
                    <small>250 Active Profiles</small>
                  </div>
                </div>
                <span style={{ color: '#10b981', fontSize: 12 }}>● Live</span>
              </div>
            </div>
          </section>

          <div className="settings-privacy-banner">
            <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
            <div>
              <b>Isolated Enterprise Context</b>
              <p style={{ margin: '4px 0 0 0', lineHeight: 1.4 }}>
                This assistant queries strictly North · México workspace data. Outputs must be verified against official policy before taking staffing decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
