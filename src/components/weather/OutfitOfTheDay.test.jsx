import { screen } from '@testing-library/react'
import OutfitOfTheDay from './OutfitOfTheDay'
import { renderWithProviders } from '../../test-utils'

const forecast = {
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
    time: ['2026-11-26T07:00', '2026-11-26T12:00'],
    temperature_2m: [4, 9],
  },
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('OutfitOfTheDay', () => {
  it('affiche la météo puis la tenue recommandée', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(forecast) }))
    renderWithProviders(<OutfitOfTheDay />)

    expect(screen.getByText('Chargement de la météo…')).toBeInTheDocument()
    expect(await screen.findByText('Pluie légère · ressenti 5 °C')).toBeInTheDocument()
    expect(screen.getByText('Veste coupe-vent déperlante')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ajouter la tenue au panier/ })).toBeInTheDocument()
  })

  it('affiche un message clair si l\'API ne répond pas', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    renderWithProviders(<OutfitOfTheDay />)

    expect(await screen.findByText("La météo n'a pas pu être chargée.")).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voir la boutique' })).toBeInTheDocument()
  })
})
