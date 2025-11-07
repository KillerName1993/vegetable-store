import React from 'react';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
   products: Product[];
   loading: boolean;
   error: string | null;
   onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
   products,
   loading,
   error,
   onAddToCart,
}) => {
   if (error) {
      return (
         <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            variant="filled"
         >
            Failed to load products: {error}
         </Alert>
      );
   }

   // Если загружаем, показываем 8 скелетонов
   if (loading) {
      return (
         <div style={{
            position: 'relative',
            marginTop: '30px',
         }}>
            <div style={{
               display: 'flex',
               flexWrap: 'wrap',
               gap: '24px',
               justifyContent: 'center'
            }}>
               {Array.from({ length: 8 }, (_, index) => (
                  <ProductCard
                     key={`skeleton-${index}`}
                     product={null}
                     onAddToCart={onAddToCart}
                     loading={true}
                  />
               ))}
            </div>
         </div>
      );
   }

   // Когда загрузилось, показываем реальные продукты
   return (
      <div style={{
         position: 'relative',
         marginTop: '30px',
      }}>
         <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center'
         }}>
            {products.map((product) => (
               <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  loading={false}
               />
            ))}
         </div>
      </div>
   );
};