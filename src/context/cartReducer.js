export function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((item) => item.id === action.product.id)
      if (existing) {
        return items.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + action.quantity }
            : item,
        )
      }
      const { id, slug, name, price, image, imageAlt } = action.product
      return [...items, { id, slug, name, price, image, imageAlt, quantity: action.quantity }]
    }
    case 'update':
      return items
        .map((item) => (item.id === action.id ? { ...item, quantity: action.quantity } : item))
        .filter((item) => item.quantity > 0)
    case 'remove':
      return items.filter((item) => item.id !== action.id)
    case 'clear':
      return []
    default:
      throw new Error(`Action inconnue : ${action.type}`)
  }
}
