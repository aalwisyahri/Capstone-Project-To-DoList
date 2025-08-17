import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Calendar, Tag, Pencil, Save, X } from 'lucide-react';

export default function TodoRow({ todo, onToggle, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState({
    title: todo.title,
    description: todo.description,
    category: todo.category,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 10) : '',
    priority: todo.priority || 'normal',
  });

  const save = () => {
    onUpdate(todo.id, {
      ...draft,
      dueDate: draft.dueDate ? new Date(draft.dueDate).getTime() : null,
    });
    setEdit(false);
  };

  const overdue = todo.dueDate && !todo.completed && todo.dueDate < Date.now();

  return (
    <div className="p-3 flex gap-3 items-start">
      <button onClick={() => onToggle(todo.id)} className="mt-1">
        {todo.completed ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 opacity-70" />
        )}
      </button>

      <div className="flex-1">
        {edit ? (
          <div className="grid md:grid-cols-2 gap-2">
            <input
              className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
            <select
              className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
              value={draft.priority}
              onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <input
              className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
              value={draft.category}
              onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
            />
            <input
              type="date"
              className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-900"
              value={draft.dueDate}
              onChange={(e) => setDraft((d) => ({ ...d, dueDate: e.target.value }))}
            />
            <textarea
              className="md:col-span-2 px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 min-h-[64px]"
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <div
                className={`font-semibold ${
                  todo.completed ? 'line-through opacity-60' : ''
                }`}
              >
                {todo.title}
              </div>
              {todo.priority === 'high' && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  HIGH
                </span>
              )}
            </div>
            {todo.description && (
              <div
                className={`text-sm mt-1 ${
                  todo.completed ? 'line-through opacity-60' : 'opacity-80'
                }`}
              >
                {todo.description}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs mt-2 opacity-80">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" /> {todo.category}
              </div>
              {todo.dueDate && (
                <div
                  className={`flex items-center gap-1 ${
                    overdue ? 'text-red-600 dark:text-red-400' : ''
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {new Date(todo.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {edit ? (
          <>
            <button
              onClick={save}
              className="px-2 py-1 rounded bg-green-600 text-white flex items-center gap-1 text-sm"
            >
              <Save className="w-4 h-4" /> Save
            </button>
            <button
              onClick={() => setEdit(false)}
              className="px-2 py-1 rounded border flex items-center gap-1 text-sm"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEdit(true)}
              className="px-2 py-1 rounded border flex items-center gap-1 text-sm"
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-2 py-1 rounded bg-red-600 text-white flex items-center gap-1 text-sm"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
