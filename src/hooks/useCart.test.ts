import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCart } from './useCart'
import type { Product } from '../types'

// Мок данные товара
const mockProduct: Product = {
   id: 1,
   name: 'Carrots',
   price: 2.99,
   image: 'carrots.jpg',
   category: 'vegetables',
   currency: 'USD',
   featured: false,
   bestseller: true
}

describe('useCart', () => {
   // Тест 1: Добавление товара в корзину
   it('adds product to cart', () => {
      const { result } = renderHook(() => useCart())

      // Добавляем товар
      act(() => {
         result.current.addToCart(mockProduct, 2)
      })

      // Проверяем что товар добавился
      expect(result.current.cart.items).toHaveLength(1)
      expect(result.current.cart.items[0].product.id).toBe(1)
      expect(result.current.cart.items[0].quantity).toBe(2)
      expect(result.current.cart.total).toBe(5.98) // 2.99 * 2
      expect(result.current.cart.itemCount).toBe(2)
   })

   // Тест 2: Очистка корзины
   it('clears cart', () => {
      const { result } = renderHook(() => useCart())

      // Сначала добавляем товар
      act(() => {
         result.current.addToCart(mockProduct, 1)
      })

      // Проверяем что корзина не пустая
      expect(result.current.cart.items).toHaveLength(1)

      // Очищаем корзину
      act(() => {
         result.current.clearCart()
      })

      // Проверяем что корзина пустая
      expect(result.current.cart.items).toHaveLength(0)
      expect(result.current.cart.total).toBe(0)
      expect(result.current.cart.itemCount).toBe(0)
   })
})