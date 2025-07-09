import { create } from 'zustand'
import { getCurrentWeather, getForecast, getWeatherByCoords } from '../services/weatherService'
import { DEFAULT_CITY } from '../utils/constants'

const useWeatherStore = create((set) => ({
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  unit: 'celsius',
  recentSearches: [],

  fetchWeather: async (city) => {
    set({ loading: true, error: null })
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ])
      set({ 
        currentWeather: current,
        forecast,
        loading: false
      })
      useWeatherStore.getState().addRecentSearch(city)
    } catch (err) {
      set({ 
        error: err.message,
        loading: false
      })
    }
  },

  fetchWeatherByLocation: async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const weather = await getWeatherByCoords(latitude, longitude)
          useWeatherStore.getState().fetchWeather(weather.name)
        },
        () => useWeatherStore.getState().fetchWeather(DEFAULT_CITY)
      )
    } else {
      useWeatherStore.getState().fetchWeather(DEFAULT_CITY)
    }
  },

  toggleUnit: () => set((state) => ({
    unit: state.unit === 'celsius' ? 'fahrenheit' : 'celsius'
  })),

  addRecentSearch: (city) => set((state) => {
    const updatedSearches = [
      city,
      ...state.recentSearches.filter(c => c !== city)
    ].slice(0, 5)
    return { recentSearches: updatedSearches }
  }),

  clearError: () => set({ error: null })
}))

export default useWeatherStore