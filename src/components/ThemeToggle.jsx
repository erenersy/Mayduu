import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  

  return (
    <label
      htmlFor="theme-toggle"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        marginLeft: "10px",
      }}
    >
      {/* Gizli checkbox */}
      <input
        id="theme-toggle"
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        style={{ display: 'none' }}
      />

      {/* Slider */}
      <span
        style={{
          width: 50,
          height: 24,
          backgroundColor: theme === 'dark' ?  '#00b9e7ff' : '#2b2b2bff',
          borderRadius: 12,
          position: 'relative',
          transition: 'background-color 0.3s',
          marginRight: 8,
          display: 'inline-block',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: theme === 'dark' ? 26 : 2,
            width: 20,
            height: 20,
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.3s',
          }}
        />
      </span>

      {/* Emoji */}
      <span style={{ fontSize: 18 }}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </label>
  );
}

export default ThemeToggle;
