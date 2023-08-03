import React, { useState } from 'react';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const changeTheme = () => {
    // Toggle the darkMode state
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Add or remove the 'light-theme' class from the body based on darkMode state
  document.body.classList.toggle('light-theme', darkMode);

  return (
    <>
      <header className='header'>
        <div>
          <h1>Where in the world?</h1>
        </div>
        <div>
          {/* Conditional rendering based on darkMode state */}
          <i
            className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}
            onClick={changeTheme}
          ></i>{' '}
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </div>
      </header>
    </>
  );
};

export default Header;
