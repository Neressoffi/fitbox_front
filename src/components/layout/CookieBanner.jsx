import { useState } from 'react'
import { Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const STORAGE_KEY = 'fitbox-cookies'

export default function CookieBanner() {
  const [choice, setChoice] = useState(() => localStorage.getItem(STORAGE_KEY))

  if (choice) return null

  const save = (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    setChoice(value)
  }

  return (
    <section
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ligne bg-white shadow-[0_-4px_16px_rgba(27,30,35,0.08)]"
    >
      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="flex items-start gap-3 text-sm text-cendre">
          <Cookie size={20} className="mt-0.5 shrink-0 text-basalte" aria-hidden="true" />
          <span>
            Nous utilisons des cookies pour mémoriser ton panier et mesurer l'audience du site.{' '}
            <Link to="/confidentialite" className="font-semibold text-basalte underline">
              En savoir plus
            </Link>
          </span>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" onClick={() => save('refuse')}>
            Refuser
          </Button>
          <Button variant="dark" onClick={() => save('accepte')}>
            Accepter
          </Button>
        </div>
      </div>
    </section>
  )
}
