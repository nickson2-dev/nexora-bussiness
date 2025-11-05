import React, { useContext } from 'react';
import { Product, WishlistContextType } from '../types';
import StarRating from './StarRating';
import { WishlistContext } from '../App';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext) as WishlistContextType;
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className="bg-base-100 border border-base-300 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.originalPrice && product.price < product.originalPrice && (
            <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg transform -rotate-2">
                SALE
            </div>
        )}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full h-9 w-9 flex items-center justify-center transition-all duration-300 hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-neutral'}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart text-lg`}></i>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-neutral truncate group-hover:text-primary">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center my-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">UGX{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">UGX{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button className="text-secondary hover:text-secondary-focus transition-colors">
                <i className="fas fa-cart-plus text-xl"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;