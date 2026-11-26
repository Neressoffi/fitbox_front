import { buildOutfit } from './outfit'

const rainyMorning = {
  temperature: 8,
  feelsLike: 5,
  windSpeed: 18,
  humidity: 86,
  label: 'Pluie légère',
  rainy: true,
  coldest: { hour: 7, temperature: 4 },
}

describe('buildOutfit', () => {
  it('propose la veste, le legging et les gants par temps froid et pluvieux', () => {
    const outfit = buildOutfit(rainyMorning)
    expect(outfit.map((item) => item.product.slug)).toEqual([
      'veste-coupe-vent-deperlante',
      'legging-running-thermique',
      'bonnet-gants-thermiques',
    ])
    expect(outfit[0].reason).toBe('Pluie légère et vent à 18 km/h')
    expect(outfit[2].reason).toBe('Départ tôt : 4 °C à 7 h')
  })

  it('propose une tenue légère quand il fait chaud et sec', () => {
    const outfit = buildOutfit({
      ...rainyMorning,
      temperature: 22,
      feelsLike: 22,
      windSpeed: 5,
      rainy: false,
      coldest: { hour: 7, temperature: 15 },
    })
    expect(outfit.map((item) => item.product.slug)).toEqual([
      'tshirt-technique-respirant',
      'short-running-2-en-1',
      'gourde-isotherme-750ml',
    ])
  })
})
