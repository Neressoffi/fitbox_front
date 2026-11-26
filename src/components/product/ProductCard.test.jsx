import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './ProductCard'
import Header from '../layout/Header'
import { renderWithProviders } from '../../test-utils'
import { products } from '../../data/products'

const veste = products[0]

describe('ProductCard', () => {
  it('affiche le nom, le prix et un texte alternatif', () => {
    renderWithProviders(<ProductCard product={veste} />)
    expect(screen.getByRole('heading', { name: veste.name })).toBeInTheDocument()
    expect(screen.getByText(/39,90/)).toBeInTheDocument()
    expect(screen.getByAltText(veste.imageAlt)).toBeInTheDocument()
  })

  it('ajoute le produit au panier et met à jour le compteur', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <Header />
        <ProductCard product={veste} />
      </>,
    )

    await user.click(screen.getByRole('button', { name: `Ajouter ${veste.name} au panier` }))

    expect(screen.getByRole('link', { name: 'Panier, 1 article' })).toBeInTheDocument()
    expect(screen.getByText('Ajouté')).toBeInTheDocument()
  })
})
