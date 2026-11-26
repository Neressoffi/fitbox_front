import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-basalte text-white">
      <picture>
        <source
          type="image/webp"
          srcSet="/images/hero-pluie-1200.webp 1200w, /images/hero-pluie.webp 2400w"
          sizes="100vw"
        />
        <img
          src="/images/hero-pluie.jpg"
          alt=""
          width="2400"
          height="1000"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[80%_center]"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-basalte via-basalte/80 to-basalte/10" aria-hidden="true" />

      <div className="container py-20 md:py-32">
        <div className="max-w-xl">
          <p className="mb-5 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Nouveau · La tenue du jour
          </p>
          <h1 className="font-titre text-[32px] font-bold leading-[1.05] tracking-titre md:text-5xl">
            Habillé pour la météo, équipé pour l'effort.
          </h1>
          <p className="mt-5 text-[17px] text-[#C9CDD3]">
            Vêtements techniques et matériel d'entraînement choisis par des coachs. Chaque matin, FitBox te propose la
            tenue adaptée au temps qu'il fait chez toi.
          </p>
          <Button to="/boutique" className="mt-8">
            Découvrir la boutique
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
