import { useEffect } from 'react'
import useWeatherStore from './stores/weatherStore'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'

const App = () => {
  const { 
    loading, 
    error, 
    fetchWeatherByLocation 
  } = useWeatherStore()

  useEffect(() => {
    fetchWeatherByLocation()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <SearchBar />
        
        {error && <ErrorMessage />}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <CurrentWeather />
            <Forecast />
          </>
        )}
      </div>
    </div>
  )
}

export default App