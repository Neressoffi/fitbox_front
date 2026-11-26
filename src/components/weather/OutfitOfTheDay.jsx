import { useMemo, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import WeatherCard from './WeatherCard'
import OutfitItem from './OutfitItem'
import CityForm from './CityForm'
import { useWeather } from '../../hooks/useWeather'
import { useCart } from '../../hooks/useCart'
import { DEFAULT_CITY, searchCity } from '../../services/weatherApi'
import { buildOutfit } from '../../utils/outfit'
import { formatPrice } from '../../utils/formatPrice'

export default function OutfitOfTheDay() {
  const [city, setCity] = useState(DEFAULT_CITY)
  const [editingCity, setEditingCity] = useState(false)
  const [cityError, setCityError] = useState(null)
  const [searching, setSearching] = useState(false)
  const [added, setAdded] = useState(false)

  const { weather, status, error } = useWeather(city)
  const { addItems } = useCart()

  const outfit = useMemo(() => (weather ? buildOutfit(weather) : []), [weather])
  const total = outfit.reduce((sum, item) => sum + item.product.price, 0)

  const handleCitySubmit = async (name) => {
    setSearching(true)
    setCityError(null)
    try {
      setCity(await searchCity(name))
      setEditingCity(false)
    } catch (searchError) {
      setCityError(searchError.message)
    } finally {
      setSearching(false)
    }
  }

  const handleAddOutfit = () => {
    addItems(outfit.map((item) => item.product))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section aria-labelledby="tenue-du-jour" className="py-10 md:py-20">
      <div className="container">
        <SectionHeading
          id="tenue-du-jour"
          eyebrow="Tenue du jour"
          title="Quoi porter aujourd'hui ?"
          intro="Chaque matin, FitBox lit les prévisions de ta ville et compose une tenue adaptée : température, pluie et vent sont pris en compte."
        />

        <div className="mt-8" aria-live="polite">
          {status === 'loading' && (
            <div className="grid gap-4 md:grid-cols-4" aria-busy="true">
              <p className="sr-only">Chargement de la météo…</p>
              {[1, 2, 3, 4].map((key) => (
                <div key={key} className="h-72 animate-pulse rounded-carte bg-brume" />
              ))}
            </div>
          )}

          {status === 'error' && (
            <div role="alert" className="rounded-carte border border-ligne bg-brume p-6">
              <p className="font-semibold">La météo n'a pas pu être chargée.</p>
              <p className="mt-1 text-sm text-cendre">{error} Tu peux réessayer dans quelques instants ou parcourir la boutique.</p>
              <Button to="/boutique" variant="secondary" className="mt-4">
                Voir la boutique
              </Button>
            </div>
          )}

          {status === 'success' && (
            <div className="grid gap-4 md:grid-cols-4">
              <WeatherCard weather={weather} city={city.name} />
              {outfit.map(({ product, reason }) => (
                <OutfitItem key={product.id} product={product} reason={reason} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          {editingCity ? (
            <CityForm
              onSubmit={handleCitySubmit}
              onCancel={() => {
                setEditingCity(false)
                setCityError(null)
              }}
              error={cityError}
              pending={searching}
            />
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              {status === 'success' && (
                <Button onClick={handleAddOutfit}>
                  <ShoppingCart size={18} aria-hidden="true" />
                  {added ? 'Tenue ajoutée au panier' : `Ajouter la tenue au panier · ${formatPrice(total)}`}
                </Button>
              )}
              <button
                type="button"
                onClick={() => setEditingCity(true)}
                className="min-h-11 text-left text-[15px] font-semibold text-lave underline-offset-4 hover:underline"
              >
                Changer de ville
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
