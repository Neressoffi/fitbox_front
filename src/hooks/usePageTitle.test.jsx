import { renderHook } from '@testing-library/react'
import { usePageTitle } from './usePageTitle'

describe('usePageTitle', () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="description" content="" />'
  })

  it("met à jour le titre de l'onglet et la description de la page", () => {
    renderHook(() => usePageTitle('Boutique', 'Tous les produits FitBox.'))

    expect(document.title).toBe('Boutique · FitBox')
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Tous les produits FitBox.')
  })

  it("utilise le titre par défaut sur la page d'accueil", () => {
    renderHook(() => usePageTitle())

    expect(document.title).toBe('FitBox · Vêtements de sport selon la météo')
  })
})
