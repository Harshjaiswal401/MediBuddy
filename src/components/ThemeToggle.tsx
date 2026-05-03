import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isFlipping, setIsFlipping] = useState(false);

  const handleToggle = () => {
    setIsFlipping(true);
    setTimeout(() => {
      toggleTheme();
    }, 300);
    setTimeout(() => {
      setIsFlipping(false);
    }, 700);
  };

  return (
    <button
      onClick={handleToggle}
      className="theme-toggle-fab"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {/* Outer glow ring */}
      <div className={`theme-toggle-glow ${isDark ? 'glow-dark' : 'glow-light'}`} />

      {/* 3D Folding Card */}
      <div className={`theme-toggle-cube ${isFlipping ? 'flipping' : ''}`}>
        {/* Front face */}
        <div className="cube-face cube-front">
          {isDark ? (
            <Sun size={22} className="text-yellow-300 drop-shadow-lg" />
          ) : (
            <Moon size={22} className="text-indigo-600 drop-shadow-lg" />
          )}
        </div>

        {/* Back face */}
        <div className="cube-face cube-back">
          {isDark ? (
            <Moon size={22} className="text-indigo-300 drop-shadow-lg" />
          ) : (
            <Sun size={22} className="text-amber-500 drop-shadow-lg" />
          )}
        </div>
      </div>

      {/* Label tooltip */}
      <div className={`theme-toggle-label ${isDark ? 'label-dark' : 'label-light'}`}>
        <span>{isDark ? 'Light' : 'Dark'}</span>
      </div>
    </button>
  );
}
