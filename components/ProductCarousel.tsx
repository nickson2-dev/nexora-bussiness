
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onProductClick }) => {
  if (!products || products.length === 0) {
    return null;
  }
  
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-neutral mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
