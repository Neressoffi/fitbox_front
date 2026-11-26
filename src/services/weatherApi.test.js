import { fetchForecast, getWeatherLabel, parseForecast, searchCity } from './weatherApi'

const apiResponse = {
  current: {
    time: '2026-11-26T06:45',
    temperature_2m: 8.2,
    apparent_temperature: 5.1,
    relative_humidity_2m: 86,
    precipitation: 0.3,
    weather_code: 61,
    wind_speed_10m: 18.4,
  },
  hourly: {
    time: ['2026-11-26T05:00', '2026-11-26T07:00', '2026-11-26T12:00', '2026-11-26T20:00'],
    temperature_2m: [2, 4.2, 9, 1],
  },
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('weatherApi', () => {
  it('traduit les codes météo en français', () => {
    expect(getWeatherLabel(0)).toBe('Ciel dégagé')
    expect(getWeatherLabel(61)).toBe('Pluie légère')
  })

  it('transforme la réponse JSON d\'Open-Meteo', () => {
    const weather = parseForecast(apiResponse)
    expect(weather).toMatchObject({
      temperature: 8,
      feelsLike: 5,
      humidity: 86,
      windSpeed: 18,
      rainy: true,
      coldest: { hour: 7, temperature: 4 },
    })
  })

  it('appelle l\'API avec les coordonnées de la ville', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(apiResponse) })
    vi.stubGlobal('fetch', fetchMock)

    await fetchForecast({ latitude: 45.75, longitude: 4.85 })

    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.hostname).toBe('api.open-meteo.com')
    expect(url.searchParams.get('latitude')).toBe('45.75')
  })

  it('renvoie une erreur claire si l\'API ne répond pas', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(fetchForecast({ latitude: 0, longitude: 0 })).rejects.toThrow('indisponibles')
  })

  it('signale une ville introuvable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) }))
    await expect(searchCity('Xyzville')).rejects.toThrow('Aucune ville trouvée')
  })
})
