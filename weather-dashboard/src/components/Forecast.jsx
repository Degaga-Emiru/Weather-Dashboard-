import useWeatherStore from '../stores/weatherStore'
import { WEATHER_CONDITIONS } from '../utils/constants'
import { formatDate, formatTemperature } from '../utils/helpers'

const Forecast = () => {
  const { forecast, unit } = useWeatherStore()

  if (!forecast) return null

  // Group forecast by day
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
      <div className="space-y-4">
        {Object.entries(dailyForecast).map(([date, items]) => {
          const dayData = items[0]
          return (
            <div key={date} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <div className="w-24">
                <p className="font-medium">
                  {formatDate(dayData.dt)}
                </p>
              </div>
              <div className="flex-1 flex items-center">
                <span className="text-2xl mr-3">
                  {WEATHER_CONDITIONS[dayData.weather[0].main] || '🌈'}
                </span>
                <p className="capitalize">
                  {dayData.weather[0].description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatTemperature(dayData.main.temp_max, unit === 'celsius')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatTemperature(dayData.main.temp_min, unit === 'celsius')}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Forecast