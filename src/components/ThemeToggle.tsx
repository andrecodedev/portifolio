import { useState, useEffect } from 'react';
import '../styles/toggleTheme.css';

export const ThemeToggle = () => {
const [darkMode, setDarkMode] = useState(() => {
const saved = localStorage.getItem('theme');
return saved ? saved === 'dark' : true;
});

useEffect(() => {
const theme = darkMode ? 'dark' : 'light';
document.body.className = `${theme}-theme`;
localStorage.setItem('theme', theme);
}, [darkMode]);

const toggleTheme = () => {
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