import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'

export default function OutfitItem({ product, reason }) {
  return (
    <article className="flex h-full overflow-hidden rounded-carte border border-ligne bg-white md:flex-col">
      <Link to={`/produit/${product.slug}`} className="block w-24 shrink-0 bg-brume md:aspect-[4/5] md:w-full">
        <img src={product.image} alt={product.imageAlt} loading="lazy" className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-col justify-center gap-1 p-4">
        <p className="text-xs font-semibold text-lave">{reason}</p>
        <h3 className="font-semibold leading-snug">
          <Link to={`/produit/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm font-bold tabular-nums text-cendre">{formatPrice(product.price)}</p>
      </div>
    </article>
  )
}
