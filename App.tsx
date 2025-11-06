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



interface LocalAccountPageProps {
  user: User;
  orders: Order[];
  supportTickets: SupportTicket[];
  onUpdateUser: (updatedUser: User) => void;
  navigateTo: (page: Page, data?: any) => void;
}

const LocalAccountPage: React.FC<LocalAccountPageProps> = ({ user, orders, supportTickets, onUpdateUser, navigateTo }) => {
  const [activeSection, setActiveSection] = useState<"profile" | "orders" | "support">("profile");
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.displayName || "");

  const handleSaveProfile = () => {
    onUpdateUser({ ...user, displayName: nameInput });
    setEditing(false);
  };

  // Note: App doesn't provide an explicit logout handler; adjust as needed.
  const handleLogout = () => {
    // If you later add a proper logout callback in App, replace this call.
    // For now we clear displayName to signal an update; replace with setUser(null) in App when adding logout.
    onUpdateUser({ ...user, displayName: "" });
    navigateTo('home');
  };

  const renderProfile = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral">My Profile</h2>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button onClick={handleSaveProfile} className="btn btn-primary">Save</button>
              <button onClick={() => { setEditing(false); setNameInput(user.displayName || ""); }} className="btn btn-ghost">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="btn btn-outline">Edit</button>
              <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3 text-lg">
        <p>
          <strong>Email:</strong> {user.email || '—'}
        </p>
        <p>
          <strong>Name:</strong>
          {editing ? (
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="ml-3 p-2 border rounded-md"
              aria-label="Display name"
            />
          ) : (
            <span className="ml-3">{user.displayName || '—'}</span>
          )}
        </p>
        <p>
          <strong>User ID:</strong> {user.id ?? user.uid ?? '—'}
        </p>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-base-100 p-4 border border-base-300 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Order ID: {order.id}</h3>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === "Delivered"
                      ? "bg-success text-white"
                      : order.status === "Shipped"
                      ? "bg-info text-white"
                      : "bg-warning text-neutral"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="border-t border-base-300 pt-2 mt-2">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <span>
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="text-right font-bold mt-2">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSupportTickets = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Support Tickets</h2>
      {supportTickets.length === 0 ? (
        <p>You haven’t submitted any support tickets.</p>
      ) : (
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="border border-base-300 rounded-lg overflow-hidden">
              <button
                className="w-full p-4 flex justify-between items-center text-left bg-base-100 hover:bg-base-200"
                onClick={() =>
                  setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)
                }
              >
                <div>
                  <h3 className="font-bold text-neutral">Subject: {ticket.subject}</h3>
                  <p className="text-sm text-gray-500">
                    Ticket ID: {ticket.id} | Date: {ticket.date}
                  </p>
                </div>
                <i
                  className={`fas fa-chevron-down text-primary transition-transform duration-300 ${
                    expandedTicketId === ticket.id ? "rotate-180" : ""
                  }`}
                ></i>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedTicketId === ticket.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 border-t border-base-300 bg-base-200/50">
                  <h4 className="font-semibold mb-2">Your Message:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfile();
      case "orders":
        return renderOrders();
      case "support":
        return renderSupportTickets();
      default:
        return renderProfile();
    }
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-8">My Account</h1>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-base-200 p-4 rounded-lg shadow-sm">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeSection === "profile"
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <i className="fas fa-user-circle w-6 mr-2"></i>
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("orders")}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeSection === "orders"
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <i className="fas fa-box w-6 mr-2"></i>
                  Order History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("support")}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeSection === "support"
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <i className="fas fa-life-ring w-6 mr-2"></i>
                  Support Tickets
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  );
};