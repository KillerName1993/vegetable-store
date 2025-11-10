import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MantineProvider } from '@mantine/core'
import { ProductCard } from './ProductCard'
import type { Product } from '../../types'

const mockProduct: Product = {
   id: 1,
   name: 'Fresh Carrots - 1 Kg',
   price: 4.99,
   image: 'https://example.com/carrots.jpg',
   category: 'vegetables',
   bestseller: true,
   currency: 'USD',
   featured: false
}

const mockOnAddToCart = vi.fn()

// Обертка с MantineProvider
const renderWithProvider = (component: React.ReactElement) => {
   return render(
      <MantineProvider>
         {component}
      </MantineProvider>
   )
}

describe('ProductCard', () => {
   // Тест 1: Рендеринг информации о товаре
   it('renders product information correctly', () => {
      renderWithProvider(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)

      expect(screen.getByText('Fresh Carrots')).toBeInTheDocument()
      expect(screen.getByText('$4.99')).toBeInTheDocument()
      expect(screen.getByText('Bestseller')).toBeInTheDocument()
      expect(screen.getByText('Add to Cart')).toBeInTheDocument()
   })

   // Тест 2: Добавление в корзину с правильным количеством
   it('adds product to cart with correct quantity', () => {
      renderWithProvider(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)

      // Находим кнопку плюс по иконке
      const plusButton = screen.getByLabelText('increment')
      fireEvent.click(plusButton)
      fireEvent.click(plusButton)

      // Нажимаем кнопку добавления в корзину
      const addButton = screen.getByText('Add to Cart')
      fireEvent.click(addButton)

      expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 3)
   })
})