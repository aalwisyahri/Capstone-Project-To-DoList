# 📝 Smart To-Do App

Aplikasi manajemen tugas modern berbasis **React + TailwindCSS**, dirancang untuk membantu pengguna mengatur pekerjaan, mengelompokkan berdasarkan kategori, memberi prioritas, serta mendukung mode gelap/terang. Data disimpan secara **localStorage** sehingga tetap tersimpan walau browser ditutup.

---

## 🚀 Fitur Utama
- ✨ **Tambah, edit, hapus, dan tandai selesai** tugas
- 🔎 **Pencarian (search bar)** untuk menemukan tugas dengan cepat
- 📂 **Kategori** (General, Work, Personal, Study, Health, Finance, Shopping, Travel)
- 🏷️ **Filter status** (All / Active / Completed)
- 📊 **Sorting** (Created Date, Due Date, Priority)
- 📈 **Stats bar** (jumlah total, aktif, selesai, tombol clear completed)
- 🌙 **Dark/Light Theme Toggle**
- 💾 **Persistent Storage** via `localStorage`
- ⚡ UI modern dengan **TailwindCSS** + **Lucide React Icons**

---

## 🛠️ Tech Stack
- [React](https://react.dev/) – Frontend framework
- [TailwindCSS](https://tailwindcss.com/) – Styling
- [Lucide React](https://lucide.dev/) – Icon pack
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) – Data persistence

---

## 📂 Struktur Project
src/
├─ components/
│ ├─ FilterBar.jsx
│ ├─ StatsBar.jsx
│ ├─ ThemeToggle.jsx
│ ├─ TodoForm.jsx
│ ├─ TodoList.jsx
│ ├─ TodoRow.jsx
├─ hooks/
│ └─ useLocalStorage.js
├─ App.jsx
├─ index.css
└─ index.js

---

## ▶️ Cara Menjalankan
1. Clone repo:
   ```bash
   git clone https://github.com/aalwisyahri/smart-todo.git
   cd smart-todo

2. Install dependencies:
   ```bash
   npm install

4. Jalankan development server:
   ```bash
   npm start

6. Buka http://localhost:3000 di browser.
