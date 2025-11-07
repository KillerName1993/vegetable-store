import { useState, useEffect } from 'react';
import { AppShell, MantineProvider, Title, Box } from '@mantine/core';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { useCart } from './hooks/useCart';
import { fetchProducts } from './utils/api';
import type { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cart, addToCart, clearCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <MantineProvider>
      <AppShell
        padding="md"
        header={{ height: 80 }}
        styles={{
          main: {
            paddingTop: '90px',
            backgroundColor: 'var(--mantine-color-gray-0)',
          },
          header: {
            border: 'none',
            boxShadow: 'none',
          },
        }}
      >
        <AppShell.Header>
          <Header cart={cart} onClearCart={clearCart} />
        </AppShell.Header>

        <AppShell.Main>
          <Box style={{ textAlign: 'left', marginTop: '20px', marginLeft: '50px' }}>
            <Title order={1} fw={600}>
              Catalog
            </Title>
          </Box>
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onAddToCart={addToCart}
          />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;