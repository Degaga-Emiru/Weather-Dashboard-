export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_API_KEY = 'ef715bd9dd0f529b6ad7bb03ca9b087b';
 // Replace with your actual API key

export const weatherConditions = {
  Thunderstorm: {
    icon: '⚡',
    bg: 'bg-gray-700',
    text: 'text-gray-100',
  },
  Drizzle: {
    icon: '🌧️',
    bg: 'bg-blue-400',
    text: 'text-blue-900',
  },
  Rain: {
    icon: '🌧️',
    bg: 'bg-blue-500',
    text: 'text-blue-100',
  },
  Snow: {
    icon: '❄️',
    bg: 'bg-blue-200',
    text: 'text-blue-900',
  },
  Clear: {
    icon: '☀️',
    bg: 'bg-yellow-300',
    text: 'text-yellow-900',
  },
  Clouds: {
    icon: '☁️',
    bg: 'bg-gray-400',
    text: 'text-gray-900',
  },
  Mist: {
    icon: '🌫️',
    bg: 'bg-gray-300',
    text: 'text-gray-700',
  },
  Smoke: {
    icon: '💨',
    bg: 'bg-gray-500',
    text: 'text-gray-100',
  },
  Haze: {
    icon: '🌫️',
    bg: 'bg-gray-400',
    text: 'text-gray-800',
  },
  Dust: {
    icon: '💨',
    bg: 'bg-amber-400',
    text: 'text-amber-900',
  },
  Fog: {
    icon: '🌁',
    bg: 'bg-gray-300',
    text: 'text-gray-700',
  },
  Sand: {
    icon: '🌪️',
    bg: 'bg-amber-300',
    text: 'text-amber-900',
  },
  Ash: {
    icon: '🌋',
    bg: 'bg-gray-500',
    text: 'text-gray-100',
  },
  Squall: {
    icon: '🌬️',
    bg: 'bg-blue-600',
    text: 'text-blue-100',
  },
  Tornado: {
    icon: '🌪️',
    bg: 'bg-gray-600',
    text: 'text-gray-100',
  },
};

export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
};

export const units = {
  metric: {
    temp: '°C',
    speed: 'km/h',
  },
  imperial: {
    temp: '°F',
    speed: 'mph',
  },
};