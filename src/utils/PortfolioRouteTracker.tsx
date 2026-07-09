import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveReturnNavigation, type PortfolioLocationState } from './returnNavigation';
import { getCurrentScrollY } from './smoothScroll';

export function PortfolioRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;

    const state = location.state as PortfolioLocationState | null;
    if (typeof state?.restoreScroll === 'number') return;

    saveReturnNavigation(
      `${location.pathname}${location.search}${location.hash}`,
      getCurrentScrollY()
    );
  }, [location.pathname, location.search, location.hash]);

  return null;
}
