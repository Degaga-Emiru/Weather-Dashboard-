import { formatDate, convertTemp, convertSpeed, getWeatherIcon } from '../utils/helpers';
import WeatherCard from './WeatherCard';

const CurrentWeather = ({ data, unit, language }) => {
  if (!data) return null;

  const { name, sys, main, weather, wind, dt, timezone } = data;
  const weatherCondition = weather[0]?.main;

  return (
    <WeatherCard title={`${name}, ${sys.country}`} weatherCondition={weatherCondition}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-6xl mr-4">{getWeatherIcon(weatherCondition)}</span>
          <div>
            <div className="text-4xl font-bold">
              {convertTemp(main.temp, unit)}{unit === 'metric' ? '°C' : '°F'}
            </div>
            <div className="text-lg capitalize">{weather[0].description}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">
              {language === 'es' ? 'Sensación' :
               language === 'fr' ? 'Ressenti' :
               language === 'de' ? 'Gefühlt' :
               'Feels like'}
            </div>
            <div>{convertTemp(main.feels_like, unit)}{unit === 'metric' ? '°C' : '°F'}</div>
          </div>
          <div>
            <div className="font-semibold">
              {language === 'es' ? 'Humedad' :
               language === 'fr' ? 'Humidité' :
               language === 'de' ? 'Feuchtigkeit' :
               'Humidity'}
            </div>
            <div>{main.humidity}%</div>
          </div>
          <div>
            <div className="font-semibold">
              {language === 'es' ? 'Viento' :
               language === 'fr' ? 'Vent' :
               language === 'de' ? 'Wind' :
               'Wind'}
            </div>
            <div>{convertSpeed(wind.speed, unit)}{unit === 'metric' ? ' km/h' : ' mph'}</div>
          </div>
          <div>
            <div className="font-semibold">
              {language === 'es' ? 'Presión' :
               language === 'fr' ? 'Pression' :
               language === 'de' ? 'Druck' :
               'Pressure'}
            </div>
            <div>{main.pressure} hPa</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm">
        {formatDate(dt + timezone, language)}
      </div>
    </WeatherCard>
  );
};

export default CurrentWeather;