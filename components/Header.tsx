import React, { useContext, useState, useEffect } from 'react';
import { Page, CartContextType, User, WishlistContextType } from '../types';
import { CartContext, WishlistContext } from '../App';
import { mockProducts } from '../services/mockData';
import { fetchCategories } from '../services/api';
import { Category } from '../types';
import Sidebar from './Sidebar';
import Logo from './Logo';

interface HeaderProps {
  navigateTo: (page: Page, data?: any) => void;
  goBack: () => void;
  canGoBack: boolean;
  user: User | null;
  onAccountClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, goBack, canGoBack, user, onAccountClick }) => {
  const { cartCount } = useContext(CartContext) as CartContextType;
  const { wishlistCount } = useContext(WishlistContext) as WishlistContextType;
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      const filteredSuggestions = mockProducts
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .map(p => p.name)
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const product = mockProducts.find(p => p.name === suggestion);
    if (product) {
      navigateTo('product', product);
    }
    setSearchTerm('');
    setSuggestions([]);
    setMobileSearchOpen(false);
  };

  const NavItem: React.FC<{ page: Page, children: React.ReactNode, data?: any }> = ({ page, children, data }) => (
    <button 
      onClick={() => navigateTo(page, data)} 
      className="text-white hover:text-secondary transition-colors font-medium"
    >
      {children}
    </button>
  );

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        navigateTo={navigateTo}
        categories={categories}
      />
      <header className="bg-primary text-white shadow-md sticky top-0 z-40">
        {/* Top bar */}
        <div className="bg-primary-focus text-xs">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
                <div className="flex items-center space-x-4">
                  <span>Welcome to Next!</span>
                </div>
                <div className="flex items-center space-x-6">
                    <button onClick={() => navigateTo('customerservice')} className="hover:text-secondary transition-colors">Help & Contact</button>
                    <a href="#" className="hover:text-secondary transition-colors">Sell on Next</a>
                </div>
            </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
             <div className="flex items-center space-x-4">
                <button onClick={() => setSidebarOpen(true)} className="text-2xl hover:text-secondary transition-colors">
                  <i className="fas fa-bars"></i>
                </button>
                <Logo onClick={() => navigateTo('home')} />
             </div>

             <div className="hidden md:flex flex-grow max-w-2xl mx-4 relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 rounded-l-md text-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
              <button className="bg-secondary hover:bg-secondary-focus px-6 py-3 rounded-r-md">
                <i className="fas fa-search"></i>
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-base-100 border border-gray-200 rounded-md mt-1 text-neutral shadow-lg z-10">
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <nav className="flex items-center space-x-4 sm:space-x-6">
               <button 
                className="md:hidden text-2xl hover:text-secondary transition-colors"
                onClick={() => setMobileSearchOpen(!isMobileSearchOpen)}
              >
                <i className="fas fa-search"></i>
              </button>
              <div 
                className="relative cursor-pointer hover:text-secondary transition-colors"
                onClick={() => navigateTo('wishlist')}
              >
                <i className="fas fa-heart text-2xl"></i>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div 
                className="relative cursor-pointer hover:text-secondary transition-colors"
                onClick={() => navigateTo('cart')}
              >
                <i className="fas fa-shopping-cart text-2xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <button 
                className="cursor-pointer hover:text-secondary transition-colors flex items-center space-x-2"
                onClick={onAccountClick}
              >
                <i className="fas fa-user-circle text-2xl"></i>
                 <div className="hidden lg:block text-left">
                     <div className="text-xs">{user ? `Hello, ${user.name.split(' ')[0]}` : 'Sign In'}</div>
                     <div className="font-bold text-sm">Account</div>
                 </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden bg-base-100 p-4 border-t border-base-300">
             <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 rounded-md text-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                autoFocus
              />
              <button className="absolute right-0 top-0 bottom-0 bg-secondary hover:bg-secondary-focus px-5 rounded-r-md">
                <i className="fas fa-search"></i>
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-base-100 border border-gray-200 rounded-md mt-1 text-neutral shadow-lg z-10">
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="bg-primary-focus/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 text-sm">
                <div className="flex items-center space-x-6">
                  {canGoBack && (
                    <button onClick={goBack} className="hover:text-secondary transition-colors flex items-center space-x-2">
                      <i className="fas fa-arrow-left"></i>
                      <span>Back</span>
                    </button>
                  )}
                  <button className="flex items-center space-x-2 hover:text-secondary transition-colors">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                        <div className="text-xs text-gray-300">Deliver to</div>
                        <div className="font-bold">{user ? `${user.address.city} ${user.address.zip}` : "Location"}</div>
                    </div>
                  </button>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <NavItem page="home">Home</NavItem>
                    <NavItem page="deals">
                      <span className="text-secondary font-bold">Today's Deals</span>
                    </NavItem>
                    <NavItem page="home">Best Sellers</NavItem>
                    <NavItem page="home">New Releases</NavItem>
                </div>
            </div>
        </div>
      </header>
    </>
  );
};

export default Header;