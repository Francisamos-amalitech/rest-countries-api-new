import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const changeTheme = () => {
    // Toggle the darkMode state
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    // Add or remove the 'light-theme' class from the body based on darkMode state
    document.body.classList.toggle('light-theme', darkMode);
  }, [darkMode]);

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div>
        <h1>Where in the world?</h1>
      </div>
      <div className="theme-toggle" onClick={changeTheme}>
        {/* Conditional rendering based on darkMode state */}
        <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>{' '}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </div>
    </header>
  );
};

export default Header;
