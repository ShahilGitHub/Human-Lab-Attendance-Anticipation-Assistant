export const translations = {
  EN: {
    // Navigation & Header
    navDashboard: 'Dashboard',
    navEmployee: 'Employees',
    navAttendance: 'Attendance',
    navPayroll: 'Payroll',
    navInsights: 'AI Insights',
    searchPlaceholder: 'Search employees, records, metrics...',
    alertsToast: 'Notifications: All operational systems operating normally.',
    notificationsLabel: 'Notifications',
    userRole: 'HR Operations Lead',
    profileLanguage: 'Language',
    profileSettings: 'Settings & Security',
    profileReports: 'Audit Reports',
    profileAssistant: 'AI Guidance & Help',

    // Common
    actions: 'Actions',
    cancel: 'Cancel',
    status: 'Status',
    currentMonthLabel: 'Calendar Overview',

    // Payroll
    payProcessed: 'Processed',
    payDirectDeposit: 'Direct Deposit',
    payPending: 'Pending Approval',
    payPendingWire: 'Pending Wire',
    payMetricGross: 'Total Gross Payroll',
    payMetricGrossSub: 'Across all active departments',
    payMetricDate: 'Next Scheduled Payout',
    payMetricDateSub: 'Bi-weekly scheduled cycle',
    payMetricTaxes: 'Withholding Taxes & FICA',
    payMetricTaxesSub: 'Statutory compliance deduction',
    payMetricDeposit: 'Direct Deposit Rate',
    payMetricDepositSub: 'Automated disbursement routing',
    payTitle: 'Disbursement Records',
    payExportToast: 'Payroll ledger exported to CSV successfully.',
    payExportBtn: 'Export CSV',
    payApproveToast: 'Payroll batch approved and locked for disbursement.',
    payApproveBtn: 'Approve Batch',
    payFilterAll: 'All Disbursements',
    payFilterProcessed: 'Processed',
    payFilterPending: 'Pending',
    payColEmp: 'Employee',
    payColDept: 'Department',
    payColGross: 'Gross Pay',
    payColDeductions: 'Deductions',
    payColNet: 'Net Pay',
    payColStatus: 'Status',
    payColMethod: 'Payment Method',
    payAuditDetails: 'Opening disbursement audit ledger for',
    payEmpty: 'No payroll records matching',

    // Dashboard
    dashLateStatus: 'Late',
    dashPunctualStatus: 'On Time',
    dashAttTitle: 'Attendance Prediction & Staffing Status',
    dashAttDesc: 'Real-time shift adherence prediction against baseline operational demand',
    dashAttToday: "Today's Attendance Rate",
    dashAttMonthly: 'Monthly Average Adherence',
    dashAvgHours: 'avg work hours/day',
    dashAiToast: 'Synthesizing shift patterns and workload recommendations...',
    dashGetAiInsight: 'Analyze Shifts',
    dashPayrollSnap: 'Payroll Snapshot',
    dashTotalPayout: 'Total Payout Scheduled',
    dashAvgSalary: 'Average Net Pay',
    dashOvertimeAlert: 'Alert: 3 operational teams projected to exceed weekly overtime thresholds.',
    dashEngagementTitle: 'Workforce Pulse Index',
    dashEngagementDesc: 'Real-time sentiment aggregated from pulse check-ins and overtime ratios',
    dashTeamEngagement: 'Team Engagement Score',
    dashGreatPill: 'Optimal',
    dashWorkloadTitle: 'Shift Capacity Balance',
    dashOverloaded: 'shifts operating above safe staffing threshold',
    dashWorkloadAiNote: 'AI Suggestion: Reallocate 4 associates from North Facility to relieve afternoon shortage.',
    dashRedistributeToast: 'Shift balancing plan dispatched to Operations Manager for review.',
    dashRedistributeBtn: 'Rebalance Shifts',
    dashJoiningToast: 'Launching shift handoff conference room...',
    dashMeetNow: 'Join Shift Standup',
    dashRecentAtt: 'Real-Time Check-In Feed',
    dashCheckInLabel: 'Check-In',
    dashRecentLogged: 'team members clocked in within expected timeframes',
    dashSeeAllAtt: 'View Full Attendance Log',

    // Attendance
    attStatusPunctual: 'On Time',
    attStatusLateCheckin: 'Late Check-in',
    attStatusOvertime: 'Overtime',
    attStatusRemote: 'Remote',
    attStatusAbsent: 'Absent',
    attAvgTimeTitle: 'Working Hours & Punctuality Analytics',
    attAvgTimeDesc: 'Comprehensive check-in distribution and daily work pattern tracking',
    attAvgCheckInLabel: 'Average Check-In Time',
    attAvgCheckOutLabel: 'Average Check-Out Time',
    attOnTimeRateTitle: 'Punctuality Rate',
    attOnTimeRateDesc: 'Percentage of associates clocking in before grace period cutoffs',
    attInsightTag: 'AI Detection',
    attHistoryTitle: 'Daily Attendance Ledger',
    attAddBtn: '+ Record Entry',
    attShowingAllToast: 'Displaying complete attendance roster for today.',
    attViewAllBtn: 'View All Records',
    attTabToday: "Today's Log",
    attTabAbsent: 'Unexcused Absences',
    attTabLeave: 'Approved Leaves',
    attColName: 'Associate Name',
    attColRole: 'Role / Designation',
    attColCheckIn: 'Clock In',
    attColCheckOut: 'Clock Out',
    attColNotes: 'Operational Notes',

    // Employee
    empFullTime: 'Full-Time',
    empPartTime: 'Part-Time',
    empStatusCheckIn: 'Checked In',
    empStatusAbsent: 'Absent'
  }
};

/**
 * Returns a translation lookup function for English.
 *
 * @param {string} [_lang] - Optional language code (defaults to 'EN')
 * @returns {(key: string, params?: Record<string, string | number>) => string}
 */
export function getT(_lang = 'EN') {
  const dict = translations.EN;

  return function t(key, params) {
    let value = dict[key] ?? key;
    if (params && typeof params === 'object') {
      Object.keys(params).forEach((paramKey) => {
        value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(params[paramKey]));
      });
    }
    return value;
  };
}

export default getT;
