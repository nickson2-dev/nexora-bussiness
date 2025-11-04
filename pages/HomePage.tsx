import React, { useState, useEffect, useMemo } from 'react';
import { Page, Product, Category } from '../types';
import { fetchProducts, fetchCategories, fetchBestsellers, fetchTrendingProducts } from '../services/api';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import Pagination from '../components/Pagination';
import FilterPanel from '../components/FilterPanel';
import MobileFilterSidebar from '../components/MobileFilterSidebar';

interface HomePageProps {
  navigateTo: (page: Page, data?: any) => void;
  initialCategory?: string | null;
}

type Filters = {
  brands: string[];
  conditions: ('New' | 'Used')[];
  sellers: string[];
  minPrice: string;
  maxPrice: string;
}

const PRODUCTS_PER_PAGE = 12;

const HomePage: React.FC<HomePageProps> = ({ navigateTo, initialCategory = null }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    conditions: [],
    sellers: [],
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const loadHomePageData = async () => {
      try {
        const [cats, best, trend] = await Promise.all([
          fetchCategories(),
          fetchBestsellers(),
          fetchTrendingProducts(),
        ]);
        setCategories(cats);
        setBestsellers(best);
        setTrending(trend);
      } catch (error) {
        console.error("Failed to load homepage data", error);
      }
    };
    
    if (!initialCategory) {
      loadHomePageData();
    }
  }, [initialCategory]);

  useEffect(() => {
    const loadProducts = async () => {
        setLoading(true);
        try {
            const { products: prods } = await fetchProducts({ 
              category: selectedCategory, 
              limit: 9999 // Fetch all products for the category to build filters
            });
            setAllProducts(prods);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };
    loadProducts();
    setCurrentPage(1); // Reset page when category changes
    setFilters({ brands: [], conditions: [], sellers: [], minPrice: '', maxPrice: '' }); // Reset filters
    setSortOption('default'); // Reset sort option
  }, [selectedCategory]);
  
  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    if(categoryName && !initialCategory) {
        navigateTo('category', categoryName);
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
    navigateTo('home');
  }

  const { availableBrands, availableConditions, availableSellers } = useMemo(() => {
    const brands = new Set<string>();
    const conditions = new Set<'New' | 'Used'>();
    const sellers = new Set<string>();
    allProducts.forEach(p => {
      brands.add(p.brand);
      conditions.add(p.condition);
      sellers.add(p.seller);
    });
    return {
      availableBrands: Array.from(brands).sort(),
      availableConditions: Array.from(conditions).sort(),
      availableSellers: Array.from(sellers).sort()
    };
  }, [allProducts]);
  
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter(product => {
      const { brands, conditions, sellers, minPrice, maxPrice } = filters;
      if (brands.length > 0 && !brands.includes(product.brand)) return false;
      if (conditions.length > 0 && !conditions.includes(product.condition)) return false;
      if (sellers.length > 0 && !sellers.includes(product.seller)) return false;
      const price = product.price;
      if (minPrice && price < parseFloat(minPrice)) return false;
      if (maxPrice && price > parseFloat(maxPrice)) return false;
      return true;
    });

    const sorted = [...filtered];
    switch(sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sorted;

  }, [allProducts, filters, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
  
  const displayedTitle = useMemo(() => {
    if(selectedCategory) {
        return `Results for "${selectedCategory}"`;
    }
    return "Featured Products";
  }, [selectedCategory]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset page on filter change
  };

  return (
    <div className="space-y-12">
      {!initialCategory && <HeroBanner />}

      {!initialCategory && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 4).map(category => (
              <div key={category.name} className="text-center cursor-pointer group" onClick={() => handleCategoryClick(category.name)}>
                <img src={category.imageUrl} alt={category.name} className="rounded-lg shadow-md mb-2 group-hover:opacity-80 transition-opacity" />
                <h3 className="font-semibold text-neutral group-hover:text-primary">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      <MobileFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        brands={availableBrands}
        conditions={availableConditions}
        sellers={availableSellers}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1">
          <FilterPanel 
            brands={availableBrands}
            conditions={availableConditions}
            sellers={availableSellers}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral whitespace-nowrap">{displayedTitle}</h2>
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                   <button 
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden bg-base-200 text-neutral px-4 py-2 rounded-md hover:bg-base-300 transition-colors flex items-center space-x-2"
                  >
                    <i className="fas fa-filter"></i>
                    <span>Filters</span>
                 </button>
                  {selectedCategory && (
                    <button onClick={handleClearFilter} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition-colors whitespace-nowrap">
                        &times; Clear Filter
                    </button>
                  )}
                   <div>
                    <label htmlFor="sort-by" className="sr-only">Sort by</label>
                    <select
                      id="sort-by"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="p-2 border border-base-300 rounded-md bg-base-100 focus:ring-primary focus:border-primary"
                    >
                      <option value="default">Default</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map(product => (
                      <ProductCard key={product.id} product={product} onClick={() => navigateTo('product', product)} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-8">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-base-100 rounded-lg">
                    <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {!initialCategory && (
          <>
            <ProductCarousel title="Bestsellers" products={bestsellers} onProductClick={(p) => navigateTo('product', p)} />
            <ProductCarousel title="Trending Now" products={trending} onProductClick={(p) => navigateTo('product', p)} />
          </>
      )}
    </div>
  );
};



export default HomePage;