import React, { useEffect, useMemo, useState } from 'react';
import { Search, CheckCircle } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';

// === AI-ASSISTED COMMENT (Granite):
// The state shape and filtering logic were refactored for clarity and performance
// (memoized selectors + consolidated filters) based on AI suggestions.

const DEFAULT_FILTERS = {
  status: 'all', // all | active | completed
  category: 'all',
  sort: 'created-desc', // created-desc | due-asc | due-desc | priority-desc
};

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useLocalStorage('filters', DEFAULT_FILTERS);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Apply theme to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const categories = useMemo(() => {
    const set = new Set(['General', 'Work', 'Personal', 'Study', 'Health', 'Finance', 'Shopping', 'Travel']);
    todos.forEach(t => t.category && set.add(t.category));
    return Array.from(set);
  }, [todos]);

  const addTodo = (todo) => {
    setTodos(prev => [{
      id: crypto.randomUUID(),
      title: todo.title.trim(),
      description: todo.description?.trim() || '',
      category: todo.category?.trim() || 'General',
      dueDate: todo.dueDate || null,
      priority: todo.priority || 'normal', // low | normal | high
      completed: false,
      createdAt: Date.now()
    }, ...prev]);
  };

  const updateTodo = (id, updates) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const filtered = useMemo(() => {
    let list = [...todos];

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    // status filter
    if (filters.status === 'active') list = list.filter(t => !t.completed);
    if (filters.status === 'completed') list = list.filter(t => t.completed);

    // category
    if (filters.category !== 'all') list = list.filter(t => t.category === filters.category);

    // sorting
    switch (filters.sort) {
      case 'due-asc':
        list.sort((a, b) => (a.dueDate || Infinity) - (b.dueDate || Infinity));
        break;
      case 'due-desc':
        list.sort((a, b) => (b.dueDate || 0) - (a.dueDate || 0));
        break;
      case 'priority-desc':
        const rank = { high: 3, normal: 2, low: 1 };
        list.sort((a, b) => rank[b.priority] - rank[a.priority]);
        break;
      default: // created-desc
        list.sort((a, b) => b.createdAt - a.createdAt);
    }

    return list;
  }, [todos, query, filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2 text-xl font-bold">
            <CheckCircle className="w-6 h-6" />
            Smart To‑Do
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tasks..."
                className="pl-9 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 outline-none"
              />
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TodoForm onAdd={addTodo} categories={categories} />
          </div>
          <StatsBar todos={todos} clearCompleted={clearCompleted} />
        </div>

        <div className="mt-4">
          <FilterBar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        <div className="mt-4">
          <TodoList
            todos={filtered}
            onToggle={toggleComplete}
            onDelete={removeTodo}
            onUpdate={updateTodo}
          />
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-10 text-sm opacity-70">
        Alwi @ Capstone Project 2025.
      </footer>
    </div>
  );
}