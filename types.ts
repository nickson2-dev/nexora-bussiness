export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  reviews: Review[];
  isBestseller?: boolean;
  isTrending?: boolean;
  brand: string;
  condition: 'New' | 'Used';
  seller: string;
}

export interface Category {
  name: string;
  imageUrl?: string;
  subcategories?: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
}

export interface SupportTicket {
  id: string;
  orderId?: string;
  subject: string;
  message: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Closed';
}

export type Page = 'home' | 'product' | 'cart' | 'checkout' | 'account' | 'category' | 'deals' | 'customerservice' | 'wishlist';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}