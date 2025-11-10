import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MantineProvider } from '@mantine/core'
import { Header } from './Header'
import type { CartState } from '../../types'

const mockCart: CartState = {
   items: [
      {
         product: {
            id: 1,
            name: 'Carrots',
            price: 2.99,
            image: 'carrots.jpg',
            category: 'vegetables',
            currency: 'USD',
            featured: false,
            bestseller: true
         },
         quantity: 2
      }
   ],
   total: 5.98,
   itemCount: 2
}

const mockOnClearCart = vi.fn()

const renderWithProvider = (component: React.ReactElement) => {
   return render(
      <MantineProvider>
         {component}
      </MantineProvider>
   )
}

describe('Header', () => {
   it('displays cart information correctly', () => {
      renderWithProvider(<Header cart={mockCart} onClearCart={mockOnClearCart} />)

      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('Cart')).toBeInTheDocument()
   })

   it('clears cart when clear button is clicked', async () => {
      renderWithProvider(<Header cart={mockCart} onClearCart={mockOnClearCart} />)

      // Открываем попап корзины
      const cartButton = screen.getByText('Cart')
      fireEvent.click(cartButton)

      // Ждем пока появится кнопка очистки
      await waitFor(() => {
         expect(screen.getByText('Clear Cart')).toBeInTheDocument()
      })

      // Нажимаем кнопку очистки
      const clearButton = screen.getByText('Clear Cart')
      fireEvent.click(clearButton)

      expect(mockOnClearCart).toHaveBeenCalledTimes(1)
   })
})