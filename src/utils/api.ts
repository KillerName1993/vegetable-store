import type { Product } from '../types';

const API_URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const fetchProducts = async (): Promise<Product[]> => {
   try {

      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch(API_URL);

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      return data;
   } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
   }
};