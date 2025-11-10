import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
   // Тест 1: Базовый рендеринг приложения
   it('renders the vegetable store app', () => {
      render(<App />)

      // Проверяем основные элементы приложения
      expect(screen.getByText('Vegetable')).toBeInTheDocument()
      expect(screen.getByText('shop')).toBeInTheDocument()
      expect(screen.getByText('Catalog')).toBeInTheDocument()
      expect(screen.getByText('Cart')).toBeInTheDocument()
   })
})