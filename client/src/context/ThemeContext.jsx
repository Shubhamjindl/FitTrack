import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('fittrack_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('fittrack_accent') || 'green';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fittrack_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('fittrack_accent', accent);

    // Dynamically update browser tab favicon to match active accent color
    let link = document.querySelector("#app-favicon") || document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.id = 'app-favicon';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }
    link.href = accent === 'red' ? '/favicon-red.svg' : '/favicon.svg';
  }, [accent]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleAccent = () => {
    setAccent((prev) => (prev === 'green' ? 'red' : 'green'));
  };

  const accentColor = accent === 'red' ? '#ef4444' : '#10b981';

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      accent,
      setAccent,
      toggleAccent,
      accentColor,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
