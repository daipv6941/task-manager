import React, { memo } from 'react';

export const StatsDisplay = memo(({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Active</span>
        <span className="stat-value active">{stats.active}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Completed</span>
        <span className="stat-value completed">{stats.completed}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Overdue</span>
        <span className="stat-value overdue">{stats.overdue}</span>
      </div>
    </div>
  );
});