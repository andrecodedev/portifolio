import type { NavigateFunction } from 'react-router-dom';
import { isIntroVisible } from './introState';
import { getCurrentScrollY, scrollToY } from './smoothScroll';

const RETURN_KEY = 'portfolio-return-navigation';
const LEGACY_RETURN_KEY = 'portfolio-return-navigation';

export interface ReturnNavigation {
  path: string;
  scrollY: number;
  introActive?: boolean;
}

export type ReturnNavigationState = {
  returnTo?: ReturnNavigation;
};

export type PortfolioLocationState = ReturnNavigationState & {
  restoreScroll?: number;
  skipIntro?: boolean;
  resetIntro?: number;
};

export function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function saveReturnNavigation(
  path: string,
  scrollY = getCurrentScrollY(),
  introActive = false
) {
  const data: ReturnNavigation = {
    path: path || '/',
    scrollY: introActive ? 0 : scrollY,
    introActive,
  };
  sessionStorage.setItem(RETURN_KEY, JSON.stringify(data));
  return data;
}

export function captureReturnNavigation(): ReturnNavigation {
  const path = getCurrentPath();
  const introActive = path === '/' && isIntroVisible();

  return saveReturnNavigation(
    path,
    introActive ? 0 : getCurrentScrollY(),
    introActive
  );
}

// Limpa dado legado que podia restaurar /about indevidamente
try {
  localStorage.removeItem(LEGACY_RETURN_KEY);
} catch {
  // ignore
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
  const saved = getReturnNavigation() ?? fromState;

  if (!saved?.path || !isValidReturnPath(saved.path)) {
    clearReturnNavigation();
    navigate('/');
    return;
  }

  const { path, scrollY, introActive } = saved;
  clearReturnNavigation();

  // Hero = rota /. Só reabre a intro se o usuário saiu durante ela
  if (path === '/') {
    if (introActive) {
      navigate('/', {
        replace: true,
        state: { resetIntro: Date.now() },
      });
    } else {
      navigate('/', {
        state: {
          restoreScroll: scrollY,
          skipIntro: true,
        },
      });
    }
    return;
  }

  navigate(path, {
    state: { restoreScroll: scrollY },
  });
}
