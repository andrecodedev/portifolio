import { useState, useEffect } from 'react';
import { hapticFeedback } from '../utils/haptics';
import { applyTheme, getSavedTheme } from '../utils/theme';
import '../styles/toggleTheme.css';

export const ThemeToggle = () => {
const [darkMode, setDarkMode] = useState(() => getSavedTheme() === 'dark');

useEffect(() => {
applyTheme(darkMode ? 'dark' : 'light');
}, [darkMode]);

  const toggleTheme = () => {
    hapticFeedback.light();
    setDarkMode(prev => !prev);
  };

return (
<label className="switch">
<input
type="checkbox"
checked={darkMode}
onChange={toggleTheme}
/>
<span className="slider">
<span className="circle"></span>
</span>
</label>
);
};         