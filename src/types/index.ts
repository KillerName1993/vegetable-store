export interface Product {
   id: number;
   name: string;
   category: string;
   price: number;
   currency: string;
   image: string;
   bestseller: boolean;
   featured: boolean;
   details?: string;
}

export interface CartItem {
   product: Product;
   quantity: number;
}

export interface CartState {
   items: CartItem[];
   total: number;
   itemCount: number;
}