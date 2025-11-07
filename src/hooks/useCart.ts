import { useState, useCallback } from 'react';
import type { Product, CartItem, CartState } from '../types';

export const useCart = () => {
   const [cart, setCart] = useState<CartState>({
      items: [],
      total: 0,
      itemCount: 0,
   });

   const addToCart = useCallback((product: Product, quantity: number) => {
      setCart(prev => {
         const existingItemIndex = prev.items.findIndex(
            item => item.product.id === product.id
         );

         let newItems: CartItem[];

         if (existingItemIndex >= 0) {
            newItems = prev.items.map((item, index) =>
               index === existingItemIndex
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
            );
         } else {
            newItems = [...prev.items, { product, quantity }];
         }

         const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
         );

         const itemCount = newItems.reduce(
            (count, item) => count + item.quantity,
            0
         );

         return { items: newItems, total, itemCount };
      });
   }, []);

   const removeFromCart = useCallback((productId: number) => {
      setCart(prev => {
         const newItems = prev.items.filter(item => item.product.id !== productId);

         const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
         );

         const itemCount = newItems.reduce(
            (count, item) => count + item.quantity,
            0
         );

         return { items: newItems, total, itemCount };
      });
   }, []);

   const updateQuantity = useCallback((productId: number, quantity: number) => {
      if (quantity <= 0) {
         removeFromCart(productId);
         return;
      }

      setCart(prev => {
         const newItems = prev.items.map(item =>
            item.product.id === productId
               ? { ...item, quantity }
               : item
         );

         const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
         );

         const itemCount = newItems.reduce(
            (count, item) => count + item.quantity,
            0
         );

         return { items: newItems, total, itemCount };
      });
   }, [removeFromCart]);

   const clearCart = useCallback(() => {
      setCart({ items: [], total: 0, itemCount: 0 });
   }, []);

   return {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
   };
};