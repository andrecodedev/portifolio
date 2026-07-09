import type { NavigateFunction } from 'react-router-dom';
import { scrollToY } from './smoothScroll';

const RETURN_KEY = 'portfolio-return-navigation';
const SCROLL_RESTORE_KEY = 'portfolio-restore-scroll';

export interface ReturnNavigation {
  path: string;
  scrollY: number;
}

export type ReturnNavigationState = {
  returnTo?: ReturnNavigation;
};

export function saveReturnNavigation(path: string, scrollY = window.scrollY) {
  const data: ReturnNavigation = {
    path: path || '/',
    scrollY,
  };
  localStorage.setItem(RETURN_KEY, JSON.stringify(data));
}

export function getReturnNavigation(): ReturnNavigation | null {
  const raw = localStorage.getItem(RETURN_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ReturnNavigation;
  } catch {
    return null;
  }
}

export function clearReturnNavigation() {
  localStorage.removeItem(RETURN_KEY);
}

export function queueScrollRestore(scrollY: number) {
  localStorage.setItem(SCROLL_RESTORE_KEY, String(scrollY));
}

export function consumeScrollRestore(): number | null {
  const raw = localStorage.getItem(SCROLL_RESTORE_KEY);
  if (raw === null) return null;

  localStorage.removeItem(SCROLL_RESTORE_KEY);
  const scrollY = Number(raw);
  return Number.isFinite(scrollY) ? scrollY : null;
}

function isValidReturnPath(path: string) {
  return path !== '/admin' && !path.startsWith('/admin/');
}

export function restoreScrollPosition(scrollY: number) {
  const restore = () => scrollToY(scrollY, true);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      restore();
      setTimeout(restore, 50);
      setTimeout(restore, 200);
    });
  });
}

export function navigateBackToPortfolio(
  navigate: NavigateFunction,
  locationState?: unknown
) {
  const fromState = (locationState as ReturnNavigationState | null)?.returnTo;
  const saved = fromState ?? getReturnNavigation();

  if (saved?.path && isValidReturnPath(saved.path)) {
    queueScrollRestore(saved.scrollY);
    clearReturnNavigation();
    navigate(saved.path);
    return;
  }

  clearReturnNavigation();

  if (window.history.length > 1) {
    navigate(-1);
    return;
  }

  navigate('/');
}
