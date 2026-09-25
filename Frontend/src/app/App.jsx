import { useState } from 'react';

const navigation = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'employees', label: 'Employees' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'insights', label: 'AI Insights' },
];

const viewContent = {
  dashboard: { eyebrow: 'WORKSPACE OVERVIEW', title: 'Attendance dashboard', description: 'Connect an approved data source to view attendance activity and coverage signals.', emptyTitle: 'No workspace data available', emptyDescription: 'Attendance metrics, coverage alerts, and summaries will appear here once a data source is connected.' },
  employees: { eyebrow: 'PEOPLE', title: 'Employee directory', description: 'Manage employee records from your connected workforce system.', emptyTitle: 'No employee records available', emptyDescription: 'Connect a workforce data source to display employee records here.' },
  attendance: { eyebrow: 'ATTENDANCE', title: 'Attendance activity', description: 'Review confirmed attendance events from your connected system.', emptyTitle: 'No attendance activity available', emptyDescription: 'Attendance events will appear here after an approved source is connected.' },
  payroll: { eyebrow: 'PAYROLL', title: 'Payroll overview', description: 'Review payroll information supplied by your payroll integration.', emptyTitle: 'No payroll data available', emptyDescription: 'Connect a payroll integration to display authorized payroll information.' },
  insights: { eyebrow: 'AI INSIGHTS', title: 'Attendance insights', description: 'Insights are generated only from approved operational data.', emptyTitle: 'No insights available', emptyDescription: 'Connect attendance data and configure the insight service to generate reviewed results.' },
};

function EmptyState({ title, description }) {
  return <section className="surface empty-state" aria-live="polite"><span aria-hidden="true">◌</span><h2>{title}</h2><p>{description}</p></section>;
}

export default function App() {
  const [view, setView] = useState('dashboard');
  const content = viewContent[view];

  return <div className="product-app"><header className="product-sidebar"><div className="product-brand" aria-label="HiumanLab"><span className="logo-mark" aria-hidden="true">H</span><strong>HiumanLab</strong></div><nav className="product-nav" aria-label="Primary navigation">{navigation.map((item) => <button className={view === item.id ? 'current' : ''} key={item.id} onClick={() => setView(item.id)} type="button">{item.label}</button>)}</nav></header><main className="product-main"><section className="page-section"><div className="page-heading"><div><div className="section-kicker">{content.eyebrow}</div><h1>{content.title}</h1><p>{content.description}</p></div></div><EmptyState title={content.emptyTitle} description={content.emptyDescription} /></section></main></div>;
}
