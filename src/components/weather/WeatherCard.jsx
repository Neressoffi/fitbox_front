import { CloudRain, CloudSun, Cloudy, Snowflake, Sun, CloudLightning, CloudFog } from 'lucide-react'

function WeatherIcon({ code }) {
  const props = { size: 36, 'aria-hidden': true, strokeWidth: 1.75 }

  if (code === 0) return <Sun {...props} />
  if (code <= 2) return <CloudSun {...props} />
  if (code === 3) return <Cloudy {...props} />
  if (code === 45 || code === 48) return <CloudFog {...props} />
  if (code >= 71 && code <= 86 && ![80, 81, 82].includes(code)) return <Snowflake {...props} />
  if (code >= 95) return <CloudLightning {...props} />
  return <CloudRain {...props} />
}

function formatTime(isoDate) {
  const date = new Date(isoDate)
  return `${date.getHours()} h ${String(date.getMinutes()).padStart(2, '0')}`
}

export default function WeatherCard({ weather, city }) {
  return (
    <div className="flex h-full flex-col rounded-carte border border-[#3A3F47] bg-ardoise p-6 text-white">
      <p className="flex items-center gap-3 font-titre text-5xl font-bold tracking-titre">
        <WeatherIcon code={weather.code} />
        {weather.temperature} °C
      </p>
      <p className="mt-4 font-semibold">
        {weather.label} · ressenti {weather.feelsLike} °C
      </p>
      <p className="mt-3 text-sm leading-relaxed text-cendre-clair">
        Vent {weather.windSpeed} km/h · Humidité {weather.humidity} %
        <br />
        {city} · prévisions de 7 h à 19 h
      </p>
      <p className="mt-auto border-t border-[#3A3F47] pt-4 text-xs text-cendre-clair">
        Données météo :{' '}
        <a href="https://open-meteo.com/" className="underline hover:text-white" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>{' '}
        · mise à jour {formatTime(weather.updatedAt)}
      </p>
    </div>
  )
}
