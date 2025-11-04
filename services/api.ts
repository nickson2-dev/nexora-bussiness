import { mockProducts, mockCategories } from './mockData';
import { Product, Category } from '../types';

const LATENCY = 500; // ms

interface FetchProductsResponse {
  products: Product[];
  total: number;
}

const findCategoryByName = (name: string, categories: Category[]): Category | null => {
  for (const category of categories) {
      if (category.name === name) return category;
      if (category.subcategories) {
          const found = findCategoryByName(name, category.subcategories);
          if (found) return found;
      }
  }
  return null;
}

const getCategoryAndSubCategoryNames = (categoryName: string, allCategories: Category[]): string[] => {
  const category = findCategoryByName(categoryName, allCategories);
  if (!category) return [categoryName];

  const names: string[] = [];
  const queue: Category[] = [category];

  while(queue.length > 0) {
      const current = queue.shift();
      if (current) {
          names.push(current.name);
          if (current.subcategories) {
              queue.push(...current.subcategories);
          }
      }
  }
  return names;
}

export const fetchProducts = (options: { 
  category?: string | null; 
  searchTerm?: string;
  page?: number;
  limit?: number;
  filters?: {
    brands?: string[];
    conditions?: ('New' | 'Used')[];
    sellers?: string[];
    minPrice?: number;
    maxPrice?: number;
  }
}): Promise<FetchProductsResponse> => {
  const { category, searchTerm, page = 1, limit = 10, filters } = options;

  return new Promise(resolve => {
    setTimeout(() => {
      let products = mockProducts;

      if (category) {
        const categoryNames = getCategoryAndSubCategoryNames(category, mockCategories);
        products = products.filter(p => categoryNames.includes(p.category));
      }

      if (searchTerm) {
        products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      
      if (filters) {
        const { brands, conditions, sellers, minPrice, maxPrice } = filters;
        if (brands && brands.length > 0) {
            products = products.filter(p => brands.includes(p.brand));
        }
        if (conditions && conditions.length > 0) {
            products = products.filter(p => conditions.includes(p.condition));
        }
        if (sellers && sellers.length > 0) {
            products = products.filter(p => sellers.includes(p.seller));
        }
        if (minPrice !== undefined && minPrice > 0) {
            products = products.filter(p => p.price >= minPrice);
        }
        if (maxPrice !== undefined && maxPrice > 0) {
            products = products.filter(p => p.price <= maxPrice);
        }
      }

      const total = products.length;
      
      const paginatedProducts = products.slice((page - 1) * limit, page * limit);

      resolve({ products: paginatedProducts, total });
    }, LATENCY);
  });
};

export const fetchProductById = (id: number): Promise<Product | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts.find(p => p.id === id));
    }, LATENCY);
  });
};

export const fetchCategories = (): Promise<Category[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCategories);
    }, LATENCY);
  });
};

export const fetchBestsellers = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts.filter(p => p.isBestseller));
    }, LATENCY);
  });
};

export const fetchTrendingProducts = (): Promise<Product[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockProducts.filter(p => p.isTrending));
      }, LATENCY);
    });
  };
  
export const fetchRelatedProducts = (productId: number, category: string): Promise<Product[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const related = mockProducts.filter(p => p.category === category && p.id !== productId).slice(0, 4);
            resolve(related);
        }, LATENCY);
    });
};

export const fetchDeals = (): Promise<Product[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockProducts.filter(p => p.originalPrice));
        }, LATENCY);
    });
};