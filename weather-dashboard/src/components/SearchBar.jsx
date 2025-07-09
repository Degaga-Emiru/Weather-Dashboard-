import { useState } from 'react'
import useWeatherStore from '../stores/weatherStore'
import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const { fetchWeather, recentSearches } = useWeatherStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      fetchWeather(query)
      setQuery('')
    }
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>

      {recentSearches.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {recentSearches.map((city) => (
            <button
              key={city}
              onClick={() => fetchWeather(city)}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar