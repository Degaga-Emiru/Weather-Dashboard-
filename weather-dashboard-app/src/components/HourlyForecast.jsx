import { formatTime, convertTemp, getWeatherIcon } from '../utils/helpers';
import WeatherCard from './WeatherCard';

const HourlyForecast = ({ data, unit, language }) => {
  if (!data || !data.hourly) return null;

  // Get next 12 hours of forecast
  const hourlyData = data.hourly.slice(0, 12);
  const weatherCondition = data.current.weather[0]?.main;

  return (
    <WeatherCard 
      title={
        language === 'es' ? 'Pronóstico por horas' :
        language === 'fr' ? 'Prévisions horaires' :
        language === 'de' ? 'Stündliche Vorhersage' :
        'Hourly Forecast'
      } 
      weatherCondition={weatherCondition}
    >
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2">
          {hourlyData.map((hour, index) => (
            <div key={index} className="flex flex-col items-center min-w-max">
              <div className="font-medium">
                {index === 0 ? 
                  (language === 'es' ? 'Ahora' :
                   language === 'fr' ? 'Maintenant' :
                   language === 'de' ? 'Jetzt' :
                   'Now') : 
                  formatTime(hour.dt + data.timezone_offset, language)}
              </div>
              <div className="text-2xl my-1">{getWeatherIcon(hour.weather[0].main)}</div>
              <div className="font-bold">{convertTemp(hour.temp, unit)}°</div>
              <div className="text-xs opacity-80">{hour.pop > 0 ? `${Math.round(hour.pop * 100)}%` : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </WeatherCard>
  );
};

export default HourlyForecast;