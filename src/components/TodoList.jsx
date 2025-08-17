import React from 'react';
import TodoRow from './TodoRow';

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (!todos.length) {
    return (
      <div className="p-6 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        No tasks found. Add your first task above.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
      {todos.map((t) => (
        <TodoRow
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
