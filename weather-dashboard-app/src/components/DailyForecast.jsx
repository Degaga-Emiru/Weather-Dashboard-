import { formatDate, convertTemp, getWeatherIcon } from '../utils/helpers';
import WeatherCard from './WeatherCard';

const DailyForecast = ({ data, unit, language }) => {
  if (!data || !data.daily) return null;

  // Skip current day (index 0) and show next 7 days
  const dailyData = data.daily.slice(1, 8);
  const weatherCondition = data.current.weather[0]?.main;

  return (
    <WeatherCard 
      title={
        language === 'es' ? 'Pronóstico de 7 días' :
        language === 'fr' ? 'Prévisions sur 7 jours' :
        language === 'de' ? '7-Tage-Vorhersage' :
        '7-Day Forecast'
      } 
      weatherCondition={weatherCondition}
    >
      <div className="space-y-2">
        {dailyData.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-300 dark:border-gray-600 last:border-0">
            <div className="w-24">
              {formatDate(day.dt + data.timezone_offset, language).split(',')[0]}
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">{getWeatherIcon(day.weather[0].main)}</span>
              <span className="text-sm capitalize w-24">{day.weather[0].description}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-bold">{convertTemp(day.temp.max, unit)}°</span>
              <span className="opacity-70">{convertTemp(day.temp.min, unit)}°</span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                {Math.round(day.pop * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </WeatherCard>
  );
};

export default DailyForecast;