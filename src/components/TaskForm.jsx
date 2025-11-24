import React, { useState, useEffect, useRef, memo } from 'react';
import { Plus } from 'lucide-react';

export const TaskForm = memo(({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  
  // Sử dụng useRef để auto-focus vào input
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, priority, dueDate || null);
      setTitle('');
      setDueDate('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="task-form">
      <div className="form-row">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit(e);
          }}
          placeholder="What needs to be done?"
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="form-row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          <Plus size={18} />
          Add Task
        </button>
      </div>
    </div>
  );
});