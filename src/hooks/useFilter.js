import { useMemo } from 'react';

/**
 * Custom hook để lọc danh sách tasks
 * Optimize với useMemo
 */
export const useFilter = (items, filterType, searchQuery) => {
  return useMemo(() => {
    let filtered = [...items];

    // Lọc theo search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo loại
    switch (filterType) {
      case 'active':
        return filtered.filter(item => !item.completed);
      case 'completed':
        return filtered.filter(item => item.completed);
      case 'overdue':
        return filtered.filter(item => {
          if (item.completed || !item.dueDate) return false;
          return new Date(item.dueDate) < new Date();
        });
      case 'high-priority':
        return filtered.filter(item => item.priority === 'high');
      default:
        return filtered;
    }
  }, [items, filterType, searchQuery]);
};