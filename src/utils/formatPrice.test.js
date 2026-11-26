import { formatPrice } from './formatPrice'

const normalize = (text) => text.replace(/\s/g, ' ')

describe('formatPrice', () => {
  it('affiche le prix au format français', () => {
    expect(normalize(formatPrice(39.9))).toBe('39,90 €')
  })

  it('sépare les milliers', () => {
    expect(normalize(formatPrice(1250))).toBe('1 250,00 €')
  })
})
