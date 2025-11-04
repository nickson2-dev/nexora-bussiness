
import React from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  return (
    <div 
      className={`flex items-center cursor-pointer group ${className}`}
      onClick={onClick}
      aria-label="Nexora Home"
    >
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 42L8 6L24 30V42H8Z" fill="#1a237e" className="group-hover:fill-primary-focus transition-colors"/>
          <path d="M40 6V42L24 18V6H40Z" fill="#ff6f00" className="group-hover:fill-secondary-focus transition-colors"/>
      </svg>
      <span className="text-3xl font-bold text-white group-hover:text-secondary transition-colors ml-2">Nexora</span>
    </div>
  );
};

export default Logo;
