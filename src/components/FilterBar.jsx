import React from 'react';

export default function FilterBar({ categories, filters, setFilters }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm opacity-70">Status</span>
        <select
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900"
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm opacity-70">Category</span>
        <select
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm opacity-70">Sort</span>
        <select
          className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900"
          value={filters.sort}
          onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
        >
          <option value="created-desc">Newest</option>
          <option value="due-asc">Due (Asc)</option>
          <option value="due-desc">Due (Desc)</option>
          <option value="priority-desc">Priority</option>
        </select>
      </div>
    </div>
  );
}
