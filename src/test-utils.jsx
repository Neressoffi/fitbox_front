import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>,
  )
}
