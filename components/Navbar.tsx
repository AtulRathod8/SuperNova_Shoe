
import React from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#/" className="text-2xl font-bold font-space tracking-tighter text-white">
            SUPER<span className="text-indigo-500">NOVA</span>
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <a href="#/shop" className="hover:text-white transition-colors">Shop All</a>
            <a href="#/featured" className="hover:text-white transition-colors">New Arrivals</a>
            <a href="#/about" className="hover:text-white transition-colors">Technology</a>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors hidden sm:block">
            <User size={20} />
          </button>
          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
