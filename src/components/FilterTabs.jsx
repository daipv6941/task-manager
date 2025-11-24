import React, { memo } from 'react';

export const FilterTabs = memo(({ activeFilter, onFilterChange, onSearch, searchQuery }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'high-priority', label: 'High Priority' },
  ];

  return (
    <div className="filter-section">
      <div className="filter-tabs">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
    </div>
  );
});