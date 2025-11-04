import React, { useContext } from 'react';
import { Page, WishlistContextType } from '../types';
import { WishlistContext } from '../App';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

interface WishlistPageProps {
  navigateTo: (page: Page, data?: any) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ navigateTo }) => {
  const { wishlist } = useContext(WishlistContext) as WishlistContextType;

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <i className="far fa-heart text-6xl text-gray-300 mb-4"></i>
        <h1 className="text-3xl font-bold text-neutral mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-6">Explore products and save your favorites by clicking the heart icon.</p>
        <Button onClick={() => navigateTo('home')}>Discover Products</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => navigateTo('product', product)} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
