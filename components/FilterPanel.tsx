import React, { useState } from 'react';
import { Product } from '../types';

type Filters = {
  brands: string[];
  conditions: ('New' | 'Used')[];
  sellers: string[];
  minPrice: string;
  maxPrice: string;
};

interface FilterPanelProps {
  brands: string[];
  conditions: ('New' | 'Used')[];
  sellers: string[];
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-base-300 py-4">
            <button 
                className="w-full flex justify-between items-center text-lg font-semibold text-neutral"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <i className={`fas fa-chevron-down text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`mt-3 space-y-2 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                {children}
            </div>
        </div>
    )
}

const FilterPanel: React.FC<FilterPanelProps> = ({ brands, conditions, sellers, filters, onFilterChange }) => {

  const handleCheckboxChange = (
    filterType: 'brands' | 'conditions' | 'sellers',
    value: string
  ) => {
    const currentValues = filters[filterType] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange({ [filterType]: newValues });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };


  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm sticky top-24">
        <h2 className="text-2xl font-bold text-neutral mb-4">Filter By</h2>
        
        <FilterSection title="Brand">
            {brands.map(brand => (
                <label key={brand} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleCheckboxChange('brands', brand)}
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                </label>
            ))}
        </FilterSection>

        <FilterSection title="Condition">
            {conditions.map(condition => (
                <label key={condition} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={filters.conditions.includes(condition)}
                        onChange={() => handleCheckboxChange('conditions', condition)}
                    />
                    <span className="text-sm text-gray-700">{condition}</span>
                </label>
            ))}
        </FilterSection>

        <FilterSection title="Seller">
            {sellers.map(seller => (
                <label key={seller} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={filters.sellers.includes(seller)}
                        onChange={() => handleCheckboxChange('sellers', seller)}
                    />
                    <span className="text-sm text-gray-700">{seller}</span>
                </label>
            ))}
        </FilterSection>

        <FilterSection title="Price">
            <div className="flex items-center space-x-2">
                <input 
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                    className="w-full px-2 py-1 border border-base-300 rounded-md text-sm"
                />
                <span className="text-gray-500">-</span>
                 <input 
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full px-2 py-1 border border-base-300 rounded-md text-sm"
                />
            </div>
        </FilterSection>
    </div>
  );
};

export default FilterPanel;