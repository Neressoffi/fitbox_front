import { getProductBySlug } from '../data/products'

const WINDY_THRESHOLD = 15

function pickOuterLayer(weather) {
  if (weather.rainy || weather.windSpeed >= WINDY_THRESHOLD) {
    const reasons = []
    if (weather.rainy) reasons.push(weather.label.toLowerCase())
    if (weather.windSpeed >= WINDY_THRESHOLD) reasons.push(`vent à ${weather.windSpeed} km/h`)
    const reason = reasons.join(' et ')
    return { slug: 'veste-coupe-vent-deperlante', reason: reason.charAt(0).toUpperCase() + reason.slice(1) }
  }

  if (weather.temperature <= 12) {
    return { slug: 'polaire-zippee-legere', reason: `${weather.temperature} °C, temps sec` }
  }

  return { slug: 'tshirt-technique-respirant', reason: `${weather.temperature} °C, temps sec` }
}

function pickBottom(weather) {
  const reason = `${weather.temperature} °C, ressenti ${weather.feelsLike} °C`

  if (weather.temperature <= 10) {
    return { slug: 'legging-running-thermique', reason }
  }
  if (weather.temperature >= 18) {
    return { slug: 'short-running-2-en-1', reason }
  }
  return { slug: 'legging-running-thermique', reason }
}

function pickAccessory(weather) {
  const { coldest } = weather

  if (coldest.temperature <= 6) {
    return {
      slug: 'bonnet-gants-thermiques',
      reason: `Départ tôt : ${coldest.temperature} °C à ${coldest.hour} h`,
    }
  }

  return { slug: 'gourde-isotherme-750ml', reason: 'Pense à bien t\'hydrater' }
}

export function buildOutfit(weather) {
  return [pickOuterLayer(weather), pickBottom(weather), pickAccessory(weather)].map(
    ({ slug, reason }) => ({ product: getProductBySlug(slug), reason }),
  )
}
