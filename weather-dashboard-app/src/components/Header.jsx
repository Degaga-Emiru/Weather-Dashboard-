import { FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-primary-light dark:bg-primary-dark text-white">
      <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>
    </header>
  );
};

export default Header;