import { cartReducer } from './cartReducer'
import { products } from '../data/products'

const [veste, legging] = products

describe('cartReducer', () => {
  it('ajoute un produit puis augmente sa quantité', () => {
    let cart = cartReducer([], { type: 'add', product: veste, quantity: 1 })
    cart = cartReducer(cart, { type: 'add', product: veste, quantity: 2 })
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(3)
  })

  it('retire un article quand sa quantité passe à zéro', () => {
    const cart = cartReducer(
      [
        { ...veste, quantity: 1 },
        { ...legging, quantity: 2 },
      ],
      { type: 'update', id: veste.id, quantity: 0 },
    )
    expect(cart.map((item) => item.id)).toEqual([legging.id])
  })

  it('vide le panier', () => {
    expect(cartReducer([{ ...veste, quantity: 1 }], { type: 'clear' })).toEqual([])
  })
})
