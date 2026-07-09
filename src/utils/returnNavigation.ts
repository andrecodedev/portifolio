const RETURN_KEY = 'portfolio-return-navigation';
const SCROLL_RESTORE_KEY = 'portfolio-restore-scroll';

export interface ReturnNavigation {
  path: string;
  scrollY: number;
}

export function saveReturnNavigation(path: string) {
  const data: ReturnNavigation = {
    path: path || '/',
    scrollY: window.scrollY,
  };
  sessionStorage.setItem(RETURN_KEY, JSON.stringify(data));
}

export function getReturnNavigation(): ReturnNavigation | null {
  const raw = sessionStorage.getItem(RETURN_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ReturnNavigation;
  } catch {
    return null;
  }
}

export function clearReturnNavigation() {
  sessionStorage.removeItem(RETURN_KEY);
}

export function queueScrollRestore(scrollY: number) {
  sessionStorage.setItem(SCROLL_RESTORE_KEY, String(scrollY));
}

export function consumeScrollRestore(): number | null {
  const raw = sessionStorage.getItem(SCROLL_RESTORE_KEY);
  if (raw === null) return null;

  sessionStorage.removeItem(SCROLL_RESTORE_KEY);
  const scrollY = Number(raw);
  return Number.isFinite(scrollY) ? scrollY : null;
}

export function navigateBackToPortfolio(navigate: (path: string) => void) {
  const saved = getReturnNavigation();
  const path = saved?.path || '/';
  const scrollY = saved?.scrollY ?? 0;

  queueScrollRestore(scrollY);
  clearReturnNavigation();
  navigate(path);
}
