import { Package } from 'lucide-react'
import Button from '../ui/Button'
import { formatPrice } from '../../utils/formatPrice'

export default function BoxPromo() {
  return (
    <section aria-labelledby="box-saison" className="bg-basalte py-10 text-white md:py-20">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <img
          src="/images/box-saison.jpg"
          alt="Veste coupe-vent de la box d'hiver portée en extérieur"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-carte object-cover"
        />
        <div>
          <p className="mb-4 inline-block rounded-full bg-ardoise px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            L'offre phare
          </p>
          <h2 id="box-saison" className="font-titre text-[26px] font-bold tracking-titre md:text-[32px]">
            La Box de saison · Hiver
          </h2>
          <p className="mt-3 text-cendre-clair">
            Chaque mois, un vêtement technique et deux accessoires d'entraînement choisis selon la saison et ta pratique.
          </p>
          <p className="mt-6 font-titre text-3xl font-bold">
            {formatPrice(34.9)} <span className="font-texte text-sm font-normal text-cendre-clair">/ par mois, sans engagement</span>
          </p>
          <Button to="/la-box" variant="light" className="mt-6">
            <Package size={18} aria-hidden="true" />
            S'abonner à la Box
          </Button>
        </div>
      </div>
    </section>
  )
}
