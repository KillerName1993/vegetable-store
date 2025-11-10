import { useState } from 'react';
import {
   Card,
   Image,
   Text,
   Group,
   Badge,
   Button,
   ActionIcon,
   Center,
   Skeleton,
} from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../../types';

interface ProductCardProps {
   product: Product | null; // Может быть null при загрузке
   onAddToCart: (product: Product, quantity: number) => void;
   loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
   product,
   onAddToCart,
   loading = false,
}) => {
   const [quantity, setQuantity] = useState(1);
   const [imageLoaded, setImageLoaded] = useState(false);

   const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleDecrement = () => {
      setQuantity((prev) => Math.max(1, prev - 1));
   };

   const handleAddToCart = () => {
      if (product) {
         onAddToCart(product, quantity);
         setQuantity(1);
      }
   };

   const handleImageLoad = () => {
      setImageLoaded(true);
   };

   // Если карточка загружается, показываем скелетон
   if (loading || !product) {
      return (
         <Card
            shadow="sm"
            padding="md"
            radius="md"
            style={{
               width: '280px',
               opacity: 0.7,
            }}
         >
            {/* Скелетон для изображения */}
            <Card.Section style={{ padding: '15px' }}>
               <Center>
                  <Skeleton height={200} width="100%" radius="md" />
               </Center>
            </Card.Section>

            {/* Скелетон для названия и счетчика */}
            <Group justify="space-between" mt="md" wrap="nowrap">
               <div style={{ flex: 1 }}>
                  <Skeleton height={20} width="80%" radius="sm" />
                  <Skeleton height={16} width="40%" mt="xs" radius="sm" />
               </div>
               <Group gap="xs" wrap="nowrap">
                  <Skeleton height={32} width={32} radius="sm" />
                  <Skeleton height={32} width={40} radius="sm" />
                  <Skeleton height={32} width={32} radius="sm" />
               </Group>
            </Group>

            {/* Скелетон для цены и кнопки */}
            <Group justify="space-between" mt="sm" wrap="nowrap" gap="md">
               <div style={{ flexShrink: 0 }}>
                  <Skeleton height={28} width={60} radius="sm" />
                  <Skeleton height={20} width={80} mt="xs" radius="sm" />
               </div>
               <Skeleton height={36} width={120} radius="md" />
            </Group>

            {/* Анимированные точки загрузки */}
            <Center mt="md">
               <div style={{ display: 'flex', gap: '4px' }}>
                  {[0, 1, 2].map((index) => (
                     <div
                        key={index}
                        style={{
                           width: '8px',
                           height: '8px',
                           borderRadius: '50%',
                           backgroundColor: 'var(--mantine-color-green-6)',
                           animation: `bounce 1.4s infinite ease-in-out`,
                           animationDelay: `${index * 0.16}s`,
                           opacity: 0.6,
                        }}
                     />
                  ))}
               </div>
            </Center>

            <style>
               {`
            @keyframes bounce {
              0%, 80%, 100% { 
                transform: scale(0);
              } 
              40% { 
                transform: scale(1);
              }
            }
          `}
            </style>
         </Card>
      );
   }

   // Функция для обрезки " - 1 Kg" из названия
   const getCleanProductName = (name: string) => {
      return name.replace(' - 1 Kg', '').replace(' - 1kg', '');
   };

   // Обычная карточка когда загружена
   return (
      <Card
         shadow="sm"
         padding="md"
         radius="md"
         style={{
            transition: 'transform 0.2s, box-shadow 0.2s',
            width: '280px',
         }}
         onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
         }}
         onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--mantine-shadow-sm)';
         }}
      >
         {/* Адаптивное изображение с лоадером */}
         <Card.Section style={{ padding: '15px' }}>
            <Center>
               {!imageLoaded && (
                  <Skeleton height={200} width="100%" radius="md" />
               )}
               <Image
                  src={product.image}
                  width="100%"
                  height={200}
                  alt={product.name}
                  fit="contain"
                  style={{
                     maxWidth: '200px',
                     objectFit: 'contain',
                     display: imageLoaded ? 'block' : 'none'
                  }}
                  onLoad={handleImageLoad}
               />
            </Center>
         </Card.Section>

         <Group justify="space-between" mt="md" wrap="nowrap">
            <div style={{ flex: 1 }}>
               <Text fw={600} size="lg" lineClamp={1} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{getCleanProductName(product.name)}</span>
                  <Text span size="sm" c="dimmed" style={{ marginLeft: '8px' }}>
                     1kg
                  </Text>
               </Text>
            </div>

            <Group gap="xs" wrap="nowrap">
               <ActionIcon
                  size="sm"
                  variant="light"
                  color="dark"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  aria-label="decrement"
               >
                  <IconMinus size={14} />
               </ActionIcon>

               <Text size="sm" style={{ minWidth: 20, textAlign: 'center' }}>
                  {quantity}
               </Text>

               <ActionIcon size="sm" variant="light" color="dark" onClick={handleIncrement} aria-label="increment">
                  <IconPlus size={14} />
               </ActionIcon>
            </Group>
         </Group>

         <Group justify="space-between" mt="sm" wrap="nowrap" gap="md">
            <div style={{ flexShrink: 0 }}>
               <Text fw={600} size="xl">
                  ${product.price}
               </Text>
               {product.bestseller && (
                  <Badge color="green" variant="light" size="sm">
                     Bestseller
                  </Badge>
               )}
            </div>

            <Button
               variant="light"
               color="green"
               size="sm"
               onClick={handleAddToCart}
               style={{ flex: 1, maxWidth: 'none' }}
               rightSection={<IconShoppingCart size={16} />}
            >
               Add to Cart
            </Button>
         </Group>
      </Card>
   );
};