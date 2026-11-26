import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Minus, Plus, RotateCcw, ShoppingCart, Truck } from 'lucide-react'
import Button from '../components/ui/Button'
import Rating from '../components/ui/Rating'
import ProductGrid from '../components/product/ProductGrid'
import NotFound from './NotFound'
import { categories, getProductBySlug, products } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../hooks/useCart'
import { usePageTitle } from '../hooks/usePageTitle'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  usePageTitle(product?.name ?? 'Produit introuvable', product?.description)

  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return <NotFound />

  const category = categories.find((item) => item.id === product.category)
  const suggestions = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <div className="container py-8 md:py-12">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-cendre">
          <ol className="flex flex-wrap gap-2">
            <li><Link to="/" className="hover:underline">Accueil</Link> /</li>
            <li><Link to="/boutique" className="hover:underline">Boutique</Link> /</li>
            <li><Link to={`/boutique?categorie=${category.id}`} className="hover:underline">{category.label}</Link> /</li>
            <li aria-current="page" className="text-basalte">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <div className="overflow-hidden rounded-carte bg-brume">
            <img src={product.image} alt={product.imageAlt} width="800" height="1000" className="aspect-[4/5] w-full object-cover" />
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-cendre">{category.label}</p>
            <h1 className="mt-2 font-titre text-[32px] font-bold leading-tight tracking-titre md:text-[40px]">{product.name}</h1>
            <div className="mt-3">
              <Rating value={product.rating} count={product.reviewCount} />
            </div>
            <p className="mt-5 font-titre text-3xl font-bold tabular-nums">{formatPrice(product.price)}</p>
            <p className="mt-5 text-cendre">{product.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {product.features.map((feature) => (
                <li key={feature} className="rounded-full border border-ligne px-3 py-1 text-[13px] font-semibold">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-bouton border border-ligne" role="group" aria-label="Quantité">
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center disabled:text-cendre-clair"
                  onClick={() => setQuantity((value) => value - 1)}
                  disabled={quantity <= 1}
                  aria-label="Retirer un article"
                >
                  <Minus size={16} />
                </button>
                <output className="w-8 text-center font-semibold" aria-live="polite">{quantity}</output>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Ajouter un article"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button onClick={handleAdd} className="flex-1">
                {added ? <Check size={18} aria-hidden="true" /> : <ShoppingCart size={18} aria-hidden="true" />}
                {added ? 'Ajouté au panier' : 'Ajouter au panier'}
              </Button>
            </div>

            <ul className="mt-8 space-y-3 border-t border-ligne pt-6 text-sm">
              <li className="flex items-center gap-3">
                <Truck size={18} className="text-cendre" aria-hidden="true" />
                Livraison gratuite dès 49 €, expédition sous 48 h
              </li>
              <li className="flex items-center gap-3">
                <RotateCcw size={18} className="text-cendre" aria-hidden="true" />
                Retours gratuits pendant 30 jours
              </li>
            </ul>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <section aria-labelledby="suggestions" className="border-t border-ligne py-10 md:py-16">
          <div className="container">
            <h2 id="suggestions" className="mb-8 font-titre text-[26px] font-bold tracking-titre">
              Tu aimeras aussi
            </h2>
            <ProductGrid products={suggestions} />
          </div>
        </section>
      )}
    </>
  )
}
