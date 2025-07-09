import useWeatherStore from '../stores/weatherStore'
import { WEATHER_CONDITIONS } from '../utils/constants'
import { formatTemperature } from '../utils/helpers'

const CurrentWeather = () => {
  const { currentWeather, unit, toggleUnit } = useWeatherStore()

  if (!currentWeather) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">
            {currentWeather.name}, {currentWeather.sys.country}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date(currentWeather.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <button
          onClick={toggleUnit}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
        >
          °{unit === 'celsius' ? 'C' : 'F'}
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <span className="text-5xl mr-4">
            {WEATHER_CONDITIONS[currentWeather.weather[0].main] || '🌈'}
          </span>
          <div>
            <p className="text-4xl font-bold">
              {formatTemperature(currentWeather.main.temp, unit === 'celsius')}
            </p>
            <p className="text-gray-500 dark:text-gray-400 capitalize">
              {currentWeather.weather[0].description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>Humidity</p>
            <p className="font-semibold">{currentWeather.main.humidity}%</p>
          </div>
          <div>
            <p>Wind</p>
            <p className="font-semibold">{currentWeather.wind.speed} m/s</p>
          </div>
          <div>
            <p>Pressure</p>
            <p className="font-semibold">{currentWeather.main.pressure} hPa</p>
          </div>
          <div>
            <p>Visibility</p>
            <p className="font-semibold">{currentWeather.visibility / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather