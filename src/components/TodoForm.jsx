import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const empty = {
  title: '',
  description: '',
  category: 'General',
  dueDate: '',
  priority: 'normal',
};

export default function TodoForm({ onAdd, categories }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  // === AI-ASSISTED SNIPPET (Granite): basic validation helper
  const validate = () => {
    if (!form.title.trim()) return 'Judul tugas wajib diisi';
    if (form.title.length > 100) return 'Judul terlalu panjang (maks 100)';
    if (form.description.length > 500) return 'Deskripsi terlalu panjang (maks 500)';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);

    onAdd({
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).getTime() : null,
    });
    setForm(empty);
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Plus className="w-5 h-5" />
        <h2 className="font-semibold">Add Task</h2>
      </div>

      {!!error && (
        <div className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        <input
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-blue-500 outline-none"
          placeholder="Title *"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          maxLength={100}
          required
        />
        <select
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 focus:outline-none"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          {[...new Set(['General', ...categories])].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900"
          value={form.dueDate}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
        />
        <select
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900"
          value={form.priority}
          onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <textarea
        className="w-full mt-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 min-h-[84px]"
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        maxLength={500}
      />

      <div className="mt-3 flex items-center gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setError('');
          }}
          className="px-3 py-2 rounded-lg border"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
