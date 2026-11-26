import { useEffect, useMemo, useReducer } from 'react'
import { CartContext } from './cartContext'
import { cartReducer } from './cartReducer'

const STORAGE_KEY = 'fitbox-cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

    return {
      items,
      count,
      subtotal,
      addItem: (product, quantity = 1) => dispatch({ type: 'add', product, quantity }),
      addItems: (productList) =>
        productList.forEach((product) => dispatch({ type: 'add', product, quantity: 1 })),
      updateQuantity: (id, quantity) => dispatch({ type: 'update', id, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
