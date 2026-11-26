import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ProductGrid from '../product/ProductGrid'
import { getBestSellers } from '../../data/products'

export default function BestSellers() {
  return (
    <section aria-labelledby="meilleures-ventes" className="py-10 md:py-20">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="meilleures-ventes" eyebrow="Meilleures ventes" title="Les plus vendus cette semaine" />
          <Link to="/boutique" className="flex items-center gap-2 font-semibold text-lave hover:underline">
            Voir toute la boutique
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ProductGrid products={getBestSellers()} />
      </div>
    </section>
  )
}
