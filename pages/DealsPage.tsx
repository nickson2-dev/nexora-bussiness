
import React, { useState, useEffect } from 'react';
import { Page, Product } from '../types';
import { fetchDeals } from '../services/api';
import ProductCard from '../components/ProductCard';

interface DealsPageProps {
  navigateTo: (page: Page, data?: any) => void;
}

const DealsPage: React.FC<DealsPageProps> = ({ navigateTo }) => {
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      try {
        const deals = await fetchDeals();
        setDealProducts(deals);
      } catch (error) {
        console.error("Failed to load deals", error);
      } finally {
        setLoading(false);
      }
    };
    loadDeals();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-neutral mb-8">Today's Deals</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => navigateTo('product', product)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DealsPage;
