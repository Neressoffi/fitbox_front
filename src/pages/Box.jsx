import { useState } from 'react'
import { Check } from 'lucide-react'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import { boxFaq, boxPlans, boxSteps } from '../data/boxPlans'
import { formatPrice } from '../utils/formatPrice'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Box() {
  usePageTitle(
    'La Box',
    "La Box FitBox : chaque mois, une sélection de vêtements et d'accessoires de sport adaptés à la saison. Sans engagement.",
  )
  const [selectedPlan, setSelectedPlan] = useState('trimestrielle')
  const [confirmation, setConfirmation] = useState(null)

  const handleSubscribe = () => {
    const plan = boxPlans.find((item) => item.id === selectedPlan)
    setConfirmation(plan)
  }

  return (
    <>
      <section className="bg-basalte text-white">
        <div className="container grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-cendre-clair">Abonnement mensuel</p>
            <h1 className="font-titre text-[32px] font-bold leading-tight tracking-titre md:text-5xl">
              La Box FitBox, ta tenue de saison livrée chaque mois.
            </h1>
            <p className="mt-5 text-[17px] text-cendre-clair">
              Un vêtement technique et deux accessoires d'entraînement, choisis par nos coachs selon la saison et ton sport.
            </p>
            <Button href="#formules" variant="light" className="mt-8">
              Voir les formules
            </Button>
          </div>
          <picture>
            <source type="image/webp" srcSet="/images/box-saison.webp" />
            <img
              src="/images/box-saison.jpg"
              alt="Veste coupe-vent de la box d'hiver portée sur un sol de roche volcanique"
              width="900"
              height="900"
              className="aspect-[4/3] w-full rounded-carte object-cover"
            />
          </picture>
        </div>
      </section>

      <section aria-labelledby="fonctionnement" className="py-10 md:py-20">
        <div className="container">
          <SectionHeading id="fonctionnement" eyebrow="Comment ça marche" title="Trois étapes, sans surprise" />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {boxSteps.map((step, index) => (
              <li key={step.title} className="rounded-carte border border-ligne p-6">
                <span className="font-titre text-4xl font-bold text-cendre-clair">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-titre text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-cendre">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="formules" aria-labelledby="titre-formules" className="scroll-mt-20 bg-brume py-10 md:py-20">
        <div className="container">
          <SectionHeading id="titre-formules" eyebrow="Tarifs" title="Choisis ta formule" align="center" />

          <fieldset className="mt-10">
            <legend className="sr-only">Formule d'abonnement</legend>
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {boxPlans.map((plan) => {
                const selected = plan.id === selectedPlan
                return (
                  <label
                    key={plan.id}
                    className={`relative flex cursor-pointer flex-col rounded-carte border-2 bg-white p-6 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-lave-clair ${
                      selected ? 'border-basalte' : 'border-ligne hover:border-cendre-clair'
                    }`}
                  >
                    <input
                      type="radio"
                      name="formule"
                      value={plan.id}
                      checked={selected}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="sr-only"
                    />
                    {plan.featured && (
                      <span className="absolute -top-3 left-6 rounded-full bg-basalte px-3 py-1 text-xs font-semibold text-white">
                        La plus choisie
                      </span>
                    )}
                    <span className="font-titre text-xl font-semibold">{plan.name}</span>
                    <span className="mt-4 font-titre text-3xl font-bold tabular-nums">{formatPrice(plan.price)}</span>
                    <span className="text-sm text-cendre">{plan.period}</span>
                    <span className="mt-4 text-[15px] text-cendre">{plan.description}</span>
                    {selected && <Check className="absolute right-5 top-5 text-lave" aria-hidden="true" />}
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-8 text-center" aria-live="polite">
            <Button variant="dark" onClick={handleSubscribe}>
              S'abonner à la Box
            </Button>
            {confirmation && (
              <p className="mt-4 font-semibold">
                Formule « {confirmation.name} » sélectionnée. Le paiement sera disponible à l'ouverture des abonnements.
              </p>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="py-10 md:py-20">
        <div className="container max-w-3xl">
          <SectionHeading id="faq" eyebrow="Questions fréquentes" title="Tout savoir sur la Box" />
          <div className="mt-8 divide-y divide-ligne border-y border-ligne">
            {boxFaq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-semibold">
                  {item.question}
                  <span className="text-xl text-lave transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2 text-cendre">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
