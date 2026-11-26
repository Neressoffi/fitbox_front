import { useState } from 'react'
import Button from '../ui/Button'

export default function CityForm({ onSubmit, onCancel, error, pending }) {
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const city = name.trim()
    if (city) onSubmit(city)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end" noValidate>
      <div className="flex-1">
        <label htmlFor="ville" className="mb-1.5 block text-sm font-semibold">
          Ta ville
        </label>
        <input
          id="ville"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex. : Lyon"
          autoComplete="address-level2"
          aria-describedby={error ? 'ville-erreur' : undefined}
          className="w-full rounded-bouton border border-ligne px-3 py-2.5 outline-none focus:border-basalte focus-visible:outline focus-visible:outline-2 focus-visible:outline-lave-clair"
        />
      </div>
      <Button type="submit" variant="dark" disabled={pending}>
        {pending ? 'Recherche…' : 'Valider'}
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Annuler
      </Button>
      {error && (
        <p id="ville-erreur" role="alert" className="text-sm text-[#B42318] sm:basis-full">
          {error}
        </p>
      )}
    </form>
  )
}
