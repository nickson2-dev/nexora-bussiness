import React from 'react';
import FilterPanel from './FilterPanel';
import { Product } from '../types';
import Button from './Button';

type Filters = {
  brands: string[];
  conditions: ('New' | 'Used')[];
  sellers: string[];
  minPrice: string;
  maxPrice: string;
};

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  brands: string[];
  conditions: ('New' | 'Used')[];
  sellers: string[];
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

const MobileFilterSidebar: React.FC<MobileFilterSidebarProps> = ({ 
    isOpen, 
    onClose, 
    ...filterPanelProps 
}) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div 
        className={`fixed top-0 left-0 w-80 h-full bg-base-100 shadow-lg z-50 transform transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-heading"
      >
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h2 id="filter-heading" className="text-2xl font-bold">Filters</h2>
          <button onClick={onClose} className="text-2xl" aria-label="Close filters">
            &times;
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-128px)]">
          <FilterPanel {...filterPanelProps} />
        </div>
        <div className="p-4 border-t border-base-300 absolute bottom-0 left-0 right-0 bg-base-100">
            <Button onClick={onClose} className="w-full" size="lg">
                View Results
            </Button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterSidebar;