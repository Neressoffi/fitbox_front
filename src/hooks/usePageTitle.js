import { useEffect } from 'react'

const DEFAULT_TITLE = 'FitBox · Vêtements de sport selon la météo'
const DEFAULT_DESCRIPTION =
  "FitBox, boutique de vêtements techniques et de matériel d'entraînement. Chaque matin, une tenue adaptée à la météo de ta ville."

// Met à jour le titre de l'onglet et la description lue par les moteurs de recherche.
export function usePageTitle(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} · FitBox` : DEFAULT_TITLE
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
