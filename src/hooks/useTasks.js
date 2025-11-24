import { useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook quản lý toàn bộ logic tasks
 * Bao gồm: CRUD operations và statistics
 */
export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Thêm task mới
  const addTask = useCallback((title, priority = 'medium', dueDate = null) => {
    if (!title.trim()) return;
    
    const newTask = {
      id: Date.now() + Math.random(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate,
    };
    
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  // Sửa task
  const editTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, [setTasks]);

  // Xóa task
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  // Toggle trạng thái hoàn thành
  const toggleComplete = useCallback((id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, [setTasks]);

  // Xóa tất cả task đã hoàn thành
  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, [setTasks]);

  // Tính toán thống kê - sử dụng useMemo để tối ưu
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    
    // Tính số task overdue (quá hạn)
    const now = new Date();
    const overdue = tasks.filter(t => 
      !t.completed && t.dueDate && new Date(t.dueDate) < now
    ).length;

    return { total, completed, active, overdue };
  }, [tasks]);

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
    stats
  };
};