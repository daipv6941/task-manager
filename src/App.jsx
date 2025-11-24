import React, { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useTasks } from './hooks/useTasks';
import { useFilter } from './hooks/useFilter';
import { ThemeToggle } from './components/ThemeToggle';
import { StatsDisplay } from './components/StatsDisplay';
import { TaskForm } from './components/TaskForm';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import './styles/App.css';

const App = () => {
  const { tasks, addTask, editTask, deleteTask, toggleComplete, clearCompleted, stats } = useTasks();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sử dụng custom hook useFilter để lọc tasks
  const filteredTasks = useFilter(tasks, filterType, searchQuery);

  // Wrap handlers với useCallback để tối ưu performance
  const handleFilterChange = useCallback((filter) => {
    setFilterType(filter);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>📝 Task Manager - Phung Van Dai</h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="app-main">
          <StatsDisplay stats={stats} />
          
          <TaskForm onAdd={addTask} />
          
          <FilterTabs
            activeFilter={filterType}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleComplete}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          {stats.completed > 0 && (
            <div className="footer-actions">
              <button onClick={clearCompleted} className="btn btn-secondary">
                Clear Completed ({stats.completed})
              </button>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;