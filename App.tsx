import React, { useState, useCallback, useMemo } from 'react';
import { Product, CartItem, User, Order, Page, CartContextType, SupportTicket, WishlistContextType } from './types';
import { mockUser, mockOrders, mockSupportTickets } from './services/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import DealsPage from './pages/DealsPage';
import SignInModal from './components/SignInModal';
import CustomerServicePage from './pages/CustomerServicePage';
import WishlistPage from './pages/WishlistPage';

interface HistoryState {
  page: Page;
  data?: any;
}

export const CartContext = React.createContext<CartContextType | null>(null);
export const WishlistContext = React.createContext<WishlistContextType | null>(null);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders] = useState<Order[]>(mockOrders);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const navigateTo = (page: Page, data?: any) => {
    const currentState: HistoryState = {
        page: currentPage,
        data: currentPage === 'product' ? selectedProduct : selectedCategory,
    };
    setHistory(prev => [...prev, currentState]);

    if (page === 'product' && data) {
      setSelectedProduct(data);
    }
    if (page === 'category' && data) {
      setSelectedCategory(data);
    } else {
      setSelectedCategory(null);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length === 0) {
        setCurrentPage('home');
        setSelectedProduct(null);
        setSelectedCategory(null);
        return;
    };

    const lastState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    setCurrentPage(lastState.page);
    if(lastState.page === 'product' && lastState.data) {
        setSelectedProduct(lastState.data);
    } else {
        setSelectedProduct(null);
    }
    if(lastState.page === 'category' && lastState.data) {
        setSelectedCategory(lastState.data);
    } else {
        setSelectedCategory(null);
    }
  };

  const handleSignIn = () => {
    setUser(mockUser);
    setSignInModalOpen(false);
    navigateTo('account');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const createSupportTicket = ({ subject, message }: { subject: string; message: string; }) => {
    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(Math.random() * 90000) + 10000}`,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);
  
  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const cartContextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => [...prev, product]);
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const wishlistContextValue = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
  }), [wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount]);


  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return selectedProduct && <ProductDetailPage product={selectedProduct} navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage navigateTo={navigateTo} />;
      case 'checkout':
        return <CheckoutPage navigateTo={navigateTo} />;
      case 'account':
        return user ? <AccountPage user={user} orders={orders} supportTickets={supportTickets} onUpdateUser={updateUser} navigateTo={navigateTo} /> : <HomePage navigateTo={navigateTo} />;
      case 'category':
        return <HomePage navigateTo={navigateTo} initialCategory={selectedCategory} />;
      case 'deals':
        return <DealsPage navigateTo={navigateTo} />;
      case 'customerservice':
        return <CustomerServicePage onCreateTicket={createSupportTicket} />;
      case 'wishlist':
        return <WishlistPage navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <WishlistContext.Provider value={wishlistContextValue}>
        <div className="flex flex-col min-h-screen font-sans bg-base-200">
          <Header 
              navigateTo={navigateTo} 
              goBack={goBack} 
              canGoBack={history.length > 0} 
              user={user}
              onAccountClick={() => user ? navigateTo('account') : setSignInModalOpen(true)}
          />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </main>
          <Footer />
          <SignInModal 
              isOpen={isSignInModalOpen}
              onClose={() => setSignInModalOpen(false)}
              onSignIn={handleSignIn}
          />
        </div>
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export default App;