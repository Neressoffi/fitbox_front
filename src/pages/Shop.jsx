import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import ProductGrid from '../components/product/ProductGrid'
import Button from '../components/ui/Button'
import { categories, products } from '../data/products'
import { filterProducts, sortOptions } from '../utils/filterProducts'
import { formatPrice } from '../utils/formatPrice'
import { usePageTitle } from '../hooks/usePageTitle'

const PRICE_LIMIT = 90

export default function Shop() {
  usePageTitle(
    'Boutique',
    "Vêtements techniques, matériel d'entraînement et accessoires de sport FitBox. Filtre par catégorie et par prix.",
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const selectedCategories = searchParams.getAll('categorie')
  const maxPrice = Number(searchParams.get('prixMax')) || PRICE_LIMIT
  const sort = searchParams.get('tri') ?? 'pertinence'

  const results = filterProducts(products, { categories: selectedCategories, maxPrice, sort })

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, value]) => {
      next.delete(key)
      ;[].concat(value).filter(Boolean).forEach((entry) => next.append(key, entry))
    })
    setSearchParams(next, { replace: true })
  }

  const toggleCategory = (id) => {
    const nextCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((category) => category !== id)
      : [...selectedCategories, id]
    updateParams({ categorie: nextCategories })
  }

  return (
    <>
      <PageHeader
        title="La boutique"
        intro="Vêtements techniques pour toutes les météos et matériel pour s'entraîner chez soi. Chaque article est testé par nos coachs."
      />

      <div className="container grid gap-8 py-10 md:grid-cols-[240px_1fr] md:py-14">
        <Button variant="secondary" className="md:hidden" aria-expanded={filtersOpen} aria-controls="filtres" onClick={() => setFiltersOpen((open) => !open)}>
          <SlidersHorizontal size={18} aria-hidden="true" />
          {filtersOpen ? 'Masquer les filtres' : 'Filtrer les produits'}
        </Button>

        <aside id="filtres" className={`${filtersOpen ? 'block' : 'hidden'} space-y-8 md:block`} aria-label="Filtres">
          <fieldset>
            <legend className="mb-3 font-titre text-lg font-semibold">Catégorie</legend>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex min-h-11 cursor-pointer items-center gap-3 md:min-h-0">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="h-[18px] w-[18px] accent-lave"
                  />
                  {category.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="prix-max" className="mb-3 block font-titre text-lg font-semibold">
              Prix maximum
            </label>
            <input
              id="prix-max"
              type="range"
              min="15"
              max={PRICE_LIMIT}
              step="5"
              value={maxPrice}
              onChange={(event) => updateParams({ prixMax: event.target.value })}
              className="w-full accent-lave"
            />
            <p className="mt-1 text-sm text-cendre">Jusqu'à {formatPrice(maxPrice)}</p>
          </div>

          {(selectedCategories.length > 0 || maxPrice < PRICE_LIMIT) && (
            <button
              type="button"
              onClick={() => setSearchParams({}, { replace: true })}
              className="min-h-11 text-sm font-semibold text-lave underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </aside>

        <section aria-label="Produits">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-cendre" aria-live="polite">
              {results.length} produit{results.length > 1 ? 's' : ''}
            </p>
            <label className="flex items-center gap-2 text-sm">
              Trier par
              <select
                value={sort}
                onChange={(event) => updateParams({ tri: event.target.value })}
                className="rounded-bouton border border-ligne bg-white px-3 py-2"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length > 0 ? (
            <ProductGrid products={results} columns="lg:grid-cols-3" />
          ) : (
            <div className="rounded-carte border border-ligne p-8 text-center">
              <p className="font-semibold">Aucun produit ne correspond à ces filtres.</p>
              <button type="button" onClick={() => setSearchParams({})} className="mt-2 text-sm font-semibold text-lave underline">
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
