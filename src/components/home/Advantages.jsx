import { CloudSun, ShieldCheck, Truck } from 'lucide-react'

const advantages = [
  {
    icon: Truck,
    title: 'Livraison gratuite',
    text: "Dès 49 € d'achat en point relais ou à domicile.",
  },
  {
    icon: ShieldCheck,
    title: 'Articles testés',
    text: 'Chaque article est porté et testé par nos coachs avant mise en vente.',
  },
  {
    icon: CloudSun,
    title: 'Tenue selon la météo',
    text: 'Une recommandation quotidienne basée sur les prévisions de ta ville.',
  },
]

export default function Advantages() {
  return (
    <section aria-label="Nos engagements" className="bg-brume">
      <ul className="container grid gap-6 py-8 md:grid-cols-3">
        {advantages.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-basalte text-white" aria-hidden="true">
              <Icon size={20} />
            </span>
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="text-sm text-cendre">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
