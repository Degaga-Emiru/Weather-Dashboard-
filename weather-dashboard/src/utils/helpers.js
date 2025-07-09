export const formatTemperature = (temp, isCelsius = true) => {
    return isCelsius 
      ? `${Math.round(temp)}°C` 
      : `${Math.round((temp * 9/5) + 32)}°F`
  }
  
  export const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }