import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FiSearch, FiX, FiClock } from 'react-icons/fi';

const SearchBar = ({ onSearch, language, setLanguage, unit, setUnit }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  const [showRecent, setShowRecent] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      // Add to recent searches if not already there
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches].slice(0, 5));
      }
      setQuery('');
      setShowRecent(false);
    }
  };

  const handleRecentSearch = (search) => {
    onSearch(search);
    setQuery('');
    setShowRecent(false);
  };

  const removeRecentSearch = (search, e) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecent(true)}
            placeholder={
              language === 'es' ? 'Buscar ciudad...' :
              language === 'fr' ? 'Rechercher une ville...' :
              language === 'de' ? 'Stadt suchen...' :
              'Search city...'
            }
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          {showRecent && recentSearches.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              <ul>
                {recentSearches.map((search, index) => (
                  <li 
                    key={index}
                    onClick={() => handleRecentSearch(search)}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-gray-400" />
                      <span>{search}</span>
                    </div>
                    <button 
                      onClick={(e) => removeRecentSearch(search, e)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <FiX size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition"
        >
          {language === 'es' ? 'Buscar' :
           language === 'fr' ? 'Rechercher' :
           language === 'de' ? 'Suchen' :
           'Search'}
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
        >
          {Object.entries(language).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setUnit('metric')}
            className={`px-3 py-1 rounded ${unit === 'metric' ? 'bg-primary-light dark:bg-primary-dark text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1 rounded ${unit === 'imperial' ? 'bg-primary-light dark:bg-primary-dark text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;