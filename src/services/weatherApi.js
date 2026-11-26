const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export const DEFAULT_CITY = {
  name: 'Paris',
  latitude: 48.8566,
  longitude: 2.3522,
}

const weatherLabels = [
  { codes: [0], label: 'Ciel dégagé' },
  { codes: [1, 2], label: 'Peu nuageux' },
  { codes: [3], label: 'Couvert' },
  { codes: [45, 48], label: 'Brouillard' },
  { codes: [51, 53, 55, 56, 57], label: 'Bruine' },
  { codes: [61, 80], label: 'Pluie légère' },
  { codes: [63, 65, 66, 67, 81, 82], label: 'Pluie' },
  { codes: [71, 73, 75, 77, 85, 86], label: 'Neige' },
  { codes: [95, 96, 99], label: 'Orage' },
]

const RAIN_CODES = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]

export function getWeatherLabel(code) {
  const match = weatherLabels.find((entry) => entry.codes.includes(code))
  return match ? match.label : 'Conditions variables'
}

export function isRainy(code) {
  return RAIN_CODES.includes(code)
}

export async function searchCity(name) {
  const params = new URLSearchParams({ name, count: '1', language: 'fr', format: 'json' })
  const response = await fetch(`${GEOCODING_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Le service de recherche de ville ne répond pas.')
  }

  const data = await response.json()
  if (!data.results || data.results.length === 0) {
    throw new Error(`Aucune ville trouvée pour « ${name} ».`)
  }

  const [city] = data.results
  return { name: city.name, latitude: city.latitude, longitude: city.longitude }
}

export function parseForecast(data) {
  const { current, hourly } = data

  const daytime = hourly.time
    .map((time, index) => ({ hour: new Date(time).getHours(), temperature: hourly.temperature_2m[index] }))
    .filter(({ hour }) => hour >= 7 && hour <= 19)

  const coldest = daytime.reduce(
    (min, slot) => (slot.temperature < min.temperature ? slot : min),
    daytime[0] ?? { hour: 7, temperature: current.temperature_2m },
  )

  return {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Math.round(current.wind_speed_10m),
    code: current.weather_code,
    label: getWeatherLabel(current.weather_code),
    rainy: isRainy(current.weather_code) || current.precipitation > 0,
    coldest: { hour: coldest.hour, temperature: Math.round(coldest.temperature) },
    updatedAt: current.time,
  }
}

export async function fetchForecast({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    hourly: 'temperature_2m',
    forecast_days: '1',
    timezone: 'auto',
  })

  const response = await fetch(`${FORECAST_URL}?${params}`)
  if (!response.ok) {
    throw new Error('Les prévisions météo sont indisponibles pour le moment.')
  }

  return parseForecast(await response.json())
}
