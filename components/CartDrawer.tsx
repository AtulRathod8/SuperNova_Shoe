
import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-gray-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-indigo-500" />
            <h2 className="text-xl font-bold text-white">Your Orbit</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-gray-600" />
              </div>
              <p className="text-gray-400">Your orbit is empty. Time to launch some style.</p>
              <button 
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                <div className="w-24 h-24 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">Size: {item.selectedSize} | {item.color}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 bg-gray-900 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                        className="p-1 hover:text-white text-gray-500"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                        className="p-1 hover:text-white text-gray-500"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="text-white font-medium">Calculated at launch</span>
            </div>
            <div className="pt-4 flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-white text-black font-extrabold rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Initiate Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
