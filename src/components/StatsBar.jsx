import React, { useMemo } from 'react';

export default function StatsBar({ todos, clearCompleted }) {
  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const active = total - done;
    const overdue = todos.filter(
      (t) => t.dueDate && !t.completed && t.dueDate < Date.now()
    ).length;
    return { total, done, active, overdue };
  }, [todos]);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2">
      <div className="font-semibold">Stats</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="p-2 rounded bg-gray-100 dark:bg-gray-900">Total: {stats.total}</div>
        <div className="p-2 rounded bg-gray-100 dark:bg-gray-900">Active: {stats.active}</div>
        <div className="p-2 rounded bg-gray-100 dark:bg-gray-900">Completed: {stats.done}</div>
        <div className="p-2 rounded bg-gray-100 dark:bg-gray-900">Overdue: {stats.overdue}</div>
      </div>
      <button
        onClick={clearCompleted}
        className="mt-2 px-3 py-2 rounded bg-amber-600 text-white text-sm hover:bg-amber-700"
      >
        Clear Completed
      </button>
    </div>
  );
}
