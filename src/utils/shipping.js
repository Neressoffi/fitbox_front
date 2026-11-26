export const FREE_SHIPPING_THRESHOLD = 49
export const SHIPPING_COST = 4.9

export function getShippingCost(subtotal) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return SHIPPING_COST
}
