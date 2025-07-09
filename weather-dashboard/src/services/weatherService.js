/* eslint-disable no-unused-vars */
import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
    return response.data
  } catch (error) {
    throw new Error('City not found')
  }
}

export const getForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=7`
    )
    return response.data
  } catch (error) {
    throw new Error('Forecast not available')
  }
}

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    return response.data
  } catch (error) {
    throw new Error('Location weather not available')
  }
}