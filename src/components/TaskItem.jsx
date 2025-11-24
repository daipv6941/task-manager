import React, { useState, useEffect, useRef, memo } from 'react';
import { Trash2, Edit2, Calendar, AlertCircle } from 'lucide-react';

export const TaskItem = memo(({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, { title: editTitle });
    }
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            className="task-edit-input"
          />
        ) : (
          <div className="task-info">
            <span className="task-title">{task.title}</span>
            <div className="task-meta">
              <span className={`priority-badge priority-${task.priority}`}>
                {task.priority}
              </span>
              {task.dueDate && (
                <span className="due-date">
                  <Calendar size={14} />
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              {isOverdue && (
                <span className="overdue-badge">
                  <AlertCircle size={14} />
                  Overdue
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="task-actions">
        {!isEditing && !task.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-icon"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="btn-icon btn-danger"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
});