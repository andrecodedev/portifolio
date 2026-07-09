import type { NavigateFunction } from 'react-router-dom';
import { getCurrentScrollY, scrollToY } from './smoothScroll';

const RETURN_KEY = 'portfolio-return-navigation';

export interface ReturnNavigation {
  path: string;
  scrollY: number;
}

export type ReturnNavigationState = {
  returnTo?: ReturnNavigation;
};

export type PortfolioLocationState = ReturnNavigationState & {
  restoreScroll?: number;
  skipIntro?: boolean;
};

export function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function saveReturnNavigation(path: string, scrollY = getCurrentScrollY()) {
  const data: ReturnNavigation = {
    path: path || '/',
    scrollY,
  };
  localStorage.setItem(RETURN_KEY, JSON.stringify(data));
  return data;
}

export function captureReturnNavigation(): ReturnNavigation {
  return saveReturnNavigation(getCurrentPath(), getCurrentScrollY());
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

function isValidReturnPath(path: string) {
  return path !== '/admin' && !path.startsWith('/admin/');
}

export function restoreScrollPosition(scrollY: number) {
  const restore = () => scrollToY(scrollY, true);

  restore();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      restore();
      setTimeout(restore, 50);
      setTimeout(restore, 150);
      setTimeout(restore, 300);
      setTimeout(restore, 600);
      setTimeout(restore, 1000);
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
    navigate(saved.path, {
      state: {
        restoreScroll: saved.scrollY,
        skipIntro: saved.path === '/',
      },
    });
    clearReturnNavigation();
    return;
  }

  clearReturnNavigation();

  if (window.history.length > 1) {
    navigate(-1);
    return;
  }

  navigate('/');
}
