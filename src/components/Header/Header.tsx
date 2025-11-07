import { useState } from 'react';
import {
   Group,
   Title,
   Button,
   Badge,
   Popover,
   Text,
   Stack,
   Divider,
   Box,
   Center,
   Image,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import type { CartState } from '../../types';

interface HeaderProps {
   cart: CartState;
   onClearCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cart, onClearCart }) => {
   const [cartOpened, setCartOpened] = useState(false);

   return (
      <Group justify="space-between" style={{ height: '100%' }}>
         <Group gap="xs" style={{ marginLeft: '20px', marginTop: '-5px' }}>
            <Title order={3} c="dark" fw={700}>
               Vegetable
            </Title>
            <Box
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'green',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
               }}
            >
               shop
            </Box>
         </Group>

         <Popover
            opened={cartOpened}
            onClose={() => setCartOpened(false)}
            position="bottom-end"
         >
            <Popover.Target>
               <Button
                  variant="filled"
                  color="green"
                  size="md"
                  onClick={() => setCartOpened((o) => !o)}
                  rightSection={<IconShoppingCart size={18} />}
                  style={{ position: 'relative', marginRight: '20px' }}
               >
                  {/* Бейдж перед словом Cart */}
                  {cart.itemCount > 0 && (
                     <Badge
                        size="xs"
                        color="red"
                        style={{
                           position: 'relative',
                           marginRight: '8px',
                           pointerEvents: 'none'
                        }}
                     >
                        {cart.itemCount}
                     </Badge>
                  )}
                  Cart
               </Button>
            </Popover.Target>

            <Popover.Dropdown style={{ minWidth: 'auto', width: '200px', padding: '20px' }}>
               <Stack gap="sm">
                  {/* Показываем заголовок только если есть товары */}
                  {cart.items.length > 0 && (
                     <>
                        <Group justify="space-between">
                           <Text fw={500}>Cart ({cart.itemCount})</Text>
                           <Text fw={500}>${cart.total.toFixed(2)}</Text>
                        </Group>
                        <Divider />
                     </>
                  )}

                  {cart.items.length === 0 ? (
                     <Box style={{ textAlign: 'center' }}>
                        {/* Грустная тележка из файла - уменьшенный размер */}
                        <Center>
                           <Image
                              src="/src/assets/empty-cart.svg"
                              width={100}
                              height={92}
                              alt="Empty cart"
                              style={{ marginBottom: '15px' }}
                           />
                        </Center>
                        <Text c="dimmed" ta="center" size="lg" fw={600} mb="xs">
                           Your cart is empty
                        </Text>
                        <Text c="dimmed" ta="center" size="sm">
                           Add some vegetables!
                        </Text>
                     </Box>
                  ) : (
                     <>
                        {cart.items.map((item) => (
                           <Group key={item.product.id} justify="space-between">
                              <Text size="sm">
                                 {item.product.name} × {item.quantity}
                              </Text>
                              <Text size="sm" fw={500}>
                                 ${(item.product.price * item.quantity).toFixed(2)}
                              </Text>
                           </Group>
                        ))}

                        <Button
                           color="red"
                           size="xs"
                           onClick={() => {
                              onClearCart();
                              setCartOpened(false);
                           }}
                        >
                           Clear Cart
                        </Button>
                     </>
                  )}
               </Stack>
            </Popover.Dropdown>
         </Popover>
      </Group>
   );
};