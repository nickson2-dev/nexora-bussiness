import React, { useState } from 'react';
import { Page, Category } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: Page, data?: any) => void;
  categories: Category[];
}

interface CategoryItemProps {
  category: Category;
  onNavigate: (page: Page, data: any) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  const handleCategoryClick = () => {
    onNavigate('category', category.name);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div className="flex justify-between items-center w-full text-left p-2 rounded hover:bg-base-200">
        <button onClick={handleCategoryClick} className="flex-grow text-left">
          {category.name}
        </button>
        {hasSubcategories && (
          <button onClick={handleToggle} className="px-2 py-1">
            <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
          </button>
        )}
      </div>
      {isOpen && hasSubcategories && (
        <ul className="pl-4 mt-1 space-y-1 border-l-2 border-base-200">
          {category.subcategories?.map(subCat => (
            <CategoryItem key={subCat.name} category={subCat} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigateTo, categories }) => {
  const handleNavigate = (page: Page, data?: any) => {
    navigateTo(page, data);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 w-80 h-full bg-base-100 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <ul className="space-y-2">
            <li>
              <button onClick={() => handleNavigate('home')} className="w-full text-left p-2 rounded hover:bg-base-200 font-semibold text-lg">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate('account')} className="w-full text-left p-2 rounded hover:bg-base-200 font-semibold text-lg">
                My Account
              </button>
            </li>
            <li className="pt-4 border-t mt-4">
              <h3 className="font-bold text-xl mb-2 px-2">Shop by Department</h3>
              <ul className="space-y-1">
                {categories.map(category => (
                  <CategoryItem key={category.name} category={category} onNavigate={handleNavigate} />
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;