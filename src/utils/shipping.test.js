import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, getShippingCost } from './shipping'

describe('getShippingCost', () => {
  it('facture la livraison sous le seuil de gratuité', () => {
    expect(getShippingCost(30)).toBe(SHIPPING_COST)
  })

  it('offre la livraison à partir du seuil', () => {
    expect(getShippingCost(FREE_SHIPPING_THRESHOLD)).toBe(0)
  })

  it('ne facture rien pour un panier vide', () => {
    expect(getShippingCost(0)).toBe(0)
  })
})
