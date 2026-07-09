import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getCurrentScrollY() {
  if (lenisInstance) {
    return lenisInstance.scroll;
  }

  return window.scrollY;
}

export function scrollToY(y: number, immediate = true) {
  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(y, { immediate });
    return;
  }

  window.scrollTo({ top: y, behavior: immediate ? 'instant' : 'smooth' });
}
