import { useEffect, useState } from 'react'
import { fetchForecast } from '../services/weatherApi'

export function useWeather(city) {
  const [result, setResult] = useState({ city: null, weather: null, error: null })

  useEffect(() => {
    let ignore = false

    fetchForecast(city)
      .then((weather) => {
        if (!ignore) setResult({ city, weather, error: null })
      })
      .catch((error) => {
        if (!ignore) setResult({ city, weather: null, error: error.message })
      })

    return () => {
      ignore = true
    }
  }, [city])

  if (result.city !== city) {
    return { weather: null, status: 'loading', error: null }
  }

  return {
    weather: result.weather,
    status: result.error ? 'error' : 'success',
    error: result.error,
  }
}
