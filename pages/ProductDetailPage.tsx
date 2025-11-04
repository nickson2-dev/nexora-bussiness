import React, { useState, useEffect, useContext } from 'react';
import { Product, Page, CartContextType } from '../types';
import { CartContext } from '../App';
import StarRating from '../components/StarRating';
import ProductCarousel from '../components/ProductCarousel';
import Button from '../components/Button';
import { fetchRelatedProducts } from '../services/api';

interface ProductDetailPageProps {
  product: Product;
  navigateTo: (page: Page, data?: any) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, navigateTo }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setQuantity(1);
    
    const loadRelated = async () => {
        // FIX: `fetchRelatedProducts` expects 2 arguments, not 3. Removed `product.brand`.
        const related = await fetchRelatedProducts(product.id, product.category);
        setRelatedProducts(related);
    };
    loadRelated();
    
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optionally show a confirmation message
  };

  return (
    <div className="bg-base-100">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-base-200 rounded-lg mb-4 flex items-center justify-center">
            <img src={selectedImage} alt={product.name} className="w-full h-auto max-h-[500px] object-contain rounded-lg"/>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-2">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-4">{product.category}</p>
          <div className="flex items-center mb-4">
            <StarRating rating={product.rating} />
            <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-gray-700 mb-6 text-lg">{product.description}</p>
          <div className="flex items-baseline mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through ml-3">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="w-20 text-center border border-base-300 rounded-md py-2 px-3"
            />
          </div>
          <Button size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
            <i className="fas fa-shopping-cart mr-2"></i>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.length > 0 ? product.reviews.map(review => (
            <div key={review.id} className="border-b border-base-300 pb-4">
              <div className="flex items-center mb-2">
                <StarRating rating={review.rating} />
                <span className="font-bold ml-3">{review.author}</span>
                <span className="text-gray-500 text-sm ml-auto">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          )) : <p>No reviews yet.</p>}
        </div>
      </div>
      
      {/* Related Products */}
      <ProductCarousel 
        title="Customers also bought" 
        products={relatedProducts} 
        onProductClick={(p) => navigateTo('product', p)} 
      />
    </div>
  );
};

export default ProductDetailPage;