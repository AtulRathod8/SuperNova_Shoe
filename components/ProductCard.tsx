
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group bg-gray-900 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-[10px] uppercase font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-semibold text-gray-300">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-1">{product.category} • {product.color}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-600 text-gray-400 group-hover:text-white transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
