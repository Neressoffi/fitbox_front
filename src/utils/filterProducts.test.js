import { filterProducts } from './filterProducts'
import { products } from '../data/products'

describe('filterProducts', () => {
  it('filtre par catégorie', () => {
    const result = filterProducts(products, { categories: ['materiel'] })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((product) => product.category === 'materiel')).toBe(true)
  })

  it('respecte le prix maximum', () => {
    const result = filterProducts(products, { maxPrice: 25 })
    expect(result.every((product) => product.price <= 25)).toBe(true)
  })

  it('trie par prix croissant sans modifier le catalogue', () => {
    const result = filterProducts(products, { sort: 'prix-croissant' })
    const prices = result.map((product) => product.price)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
    expect(products[0].id).toBe(1)
  })
})
