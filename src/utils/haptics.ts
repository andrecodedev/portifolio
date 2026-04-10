/**
 * Utility to provide haptic feedback using the Vibration API.
 * Uses patterns that feel natural for different types of interactions.
 */
export const hapticFeedback = {
  /**
   * Fast, subtle vibration for light interactions (clicks, hover).
   */
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },

  /**
   * Medium vibration for selection or toggle.
   */
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },

  /**
   * Double burst for success or opening menus.
   */
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([15, 30, 15]);
    }
  },

  /**
   * Soft warning or error.
   */
  warning: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  }
};
