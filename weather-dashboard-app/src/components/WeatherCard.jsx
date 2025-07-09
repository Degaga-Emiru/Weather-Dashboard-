import { getWeatherBackground, getWeatherTextColor } from '../utils/helpers';

const WeatherCard = ({ title, children, weatherCondition }) => {
  const bgClass = weatherCondition ? getWeatherBackground(weatherCondition) : 'bg-gray-200 dark:bg-gray-700';
  const textClass = weatherCondition ? getWeatherTextColor(weatherCondition) : 'text-gray-900 dark:text-gray-100';

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${bgClass} ${textClass}`}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default WeatherCard;