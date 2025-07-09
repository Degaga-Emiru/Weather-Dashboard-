import { weatherConditions } from './constants';

export const getWeatherIcon = (condition) => {
  return weatherConditions[condition]?.icon || '🌤️';
};

export const getWeatherBackground = (condition) => {
  return weatherConditions[condition]?.bg || 'bg-gray-300';
};

export const getWeatherTextColor = (condition) => {
  return weatherConditions[condition]?.text || 'text-gray-900';
};

export const formatDate = (timestamp, language = 'en') => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(timestamp * 1000).toLocaleDateString(language, options);
};

export const formatTime = (timestamp, language = 'en') => {
  const options = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(timestamp * 1000).toLocaleTimeString(language, options);
};

export const convertTemp = (temp, unit) => {
  if (unit === 'imperial') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

export const convertSpeed = (speed, unit) => {
  if (unit === 'imperial') {
    return Math.round(speed * 2.237);
  }
  return Math.round(speed * 3.6);
};