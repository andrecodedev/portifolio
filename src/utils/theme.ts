export type Theme = 'dark' | 'light';

export function getSavedTheme(): Theme {
  const saved = localStorage.getItem('theme');
  return saved === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.remove('dark-theme', 'light-theme');
  document.documentElement.classList.add(`${theme}-theme`);
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.style.removeProperty('background-color');
  document.body.style.removeProperty('color');
  localStorage.setItem('theme', theme);
}
