import { useEffect, useState } from 'react';

// === AI-ASSISTED COMMENT (Granite):
// Hook ini dibuat agar state React otomatis tersimpan ke localStorage.
// Jadi data tetap ada walaupun halaman di-refresh.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (e) {
      console.warn('Failed to parse localStorage for', key);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to set localStorage for', key);
    }
  }, [key, value]);

  return [value, setValue];
}
