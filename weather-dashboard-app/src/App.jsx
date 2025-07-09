import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WEATHER_API_URL, WEATHER_API_KEY } from './utils/constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useLocalStorage('weatherLanguage', 'en');
  const [unit, setUnit] = useLocalStorage('weatherUnit', 'metric');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const currentWeatherResponse = await axios.get(
        `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=${language}`
      );
      
      const forecastResponse = await axios.get(
        `${WEATHER_API_URL}/onecall?lat=${currentWeatherResponse.data.coord.lat}&lon=${currentWeatherResponse.data.coord.lon}&exclude=minutely,alerts&appid=${WEATHER_API_KEY}&units=metric&lang=${language}`
      );
      
      setCurrentWeather(currentWeatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            setError(null);
            
            const { latitude, longitude } = position.coords;
            
            const currentWeatherResponse = await axios.get(
              `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=${language}`
            );
            
            const forecastResponse = await axios.get(
              `${WEATHER_API_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${WEATHER_API_KEY}&units=metric&lang=${language}`
            );
            
            setCurrentWeather(currentWeatherResponse.data);
            setForecast(forecastResponse.data);
          } catch (err) {
            setError(err.message);
            setCurrentWeather(null);
            setForecast(null);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError(
            language === 'es' ? 'No se pudo obtener su ubicación. Por favor, busque una ciudad manualmente.' :
            language === 'fr' ? 'Impossible d\'obtenir votre position. Veuillez rechercher une ville manuellement.' :
            language === 'de' ? 'Standort konnte nicht ermittelt werden. Bitte suchen Sie manuell nach einer Stadt.' :
            'Could not get your location. Please search for a city manually.'
          );
        }
      );
    } else {
      setError(
        language === 'es' ? 'La geolocalización no es compatible con su navegador.' :
        language === 'fr' ? 'La géolocalisation n\'est pas prise en charge par votre navigateur.' :
        language === 'de' ? 'Geolokalisierung wird von Ihrem Browser nicht unterstützt.' :
        'Geolocation is not supported by your browser.'
      );
    }
  };

  useEffect(() => {
    if (currentWeather && forecast) {
      const interval = setInterval(() => {
        fetchWeather(currentWeather.name);
      }, 15 * 60 * 1000); // Update every 15 minutes
      
      return () => clearInterval(interval);
    }
  }, [currentWeather, forecast]);

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {language === 'es' ? 'Información del tiempo' :
             language === 'fr' ? 'Informations météo' :
             language === 'de' ? 'Wetterinformationen' :
             'Weather Information'}
          </h2>
          <ThemeToggle />
        </div>
        
        <SearchBar 
  onSearch={fetchWeather} 
  language={language} 
  setLanguage={setLanguage}
  unit={unit}
  setUnit={setUnit}
/>

        
        <button
          onClick={handleLocationSearch}
          className="mb-6 px-4 py-2 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg hover:bg-opacity-90 transition"
        >
          {language === 'es' ? 'Obtener mi ubicación' :
           language === 'fr' ? 'Obtenir ma position' :
           language === 'de' ? 'Meinen Standort ermitteln' :
           'Get my location'}
        </button>
        
        <ErrorMessage message={error} language={language} />
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
          </div>
        )}
        
        {currentWeather && (
          <div className="space-y-6">
            <CurrentWeather data={currentWeather} unit={unit} language={language} />
            {forecast && <HourlyForecast data={forecast} unit={unit} language={language} />}
            {forecast && <DailyForecast data={forecast} unit={unit} language={language} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;