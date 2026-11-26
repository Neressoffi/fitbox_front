import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingCart } from 'lucide-react'
import Button from '../ui/Button'
import Rating from '../ui/Rating'
import { categories } from '../../data/products'
import { formatPrice } from '../../utils/formatPrice'
import { useCart } from '../../hooks/useCart'

function getCategoryLabel(id) {
  return categories.find((category) => category.id === id)?.label ?? ''
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-carte border border-ligne bg-white">
      <Link to={`/produit/${product.slug}`} className="group block aspect-[4/5] overflow-hidden bg-brume">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          width="400"
          height="500"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-cendre">
            {getCategoryLabel(product.category)}
          </p>
          <Rating value={product.rating} />
        </div>
        <h3 className="font-semibold leading-snug">
          <Link to={`/produit/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mb-3 font-bold tabular-nums">{formatPrice(product.price)}</p>

        <Button onClick={handleAdd} className="mt-auto w-full" aria-label={`Ajouter ${product.name} au panier`}>
          {added ? <Check size={18} aria-hidden="true" /> : <ShoppingCart size={18} aria-hidden="true" />}
          {added ? 'Ajouté' : 'Ajouter au panier'}
        </Button>
      </div>
    </article>
  )
}
