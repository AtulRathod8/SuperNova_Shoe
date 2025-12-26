
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ChatAssistant from './components/ChatAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { ShoppingBag, ChevronRight, Zap, Globe, Package, Sparkles, Star, Github, Twitter, Instagram } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Running', 'High-Top', 'Lifestyle', 'Basketball', 'Training'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: Product, size: string) => {
    if (!size) {
      alert("Please select your orbit size!");
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, size: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleBackToStore = () => {
    setSelectedProduct(null);
    setSelectedSize('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-indigo-500/30">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      {!selectedProduct && activeCategory === 'All' && (
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
              alt="Hero Background"
            />
          </div>
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom duration-700">
              <Sparkles size={14} /> The 2025 Supernova Collection
            </div>
            <h1 className="text-6xl md:text-9xl font-space font-extrabold tracking-tighter mb-8 leading-none animate-in fade-in slide-in-from-bottom duration-1000">
              DEFY THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
                GRAVITY
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Engineered for the cosmic athlete. Experience weightless traction and supernova propulsion in every stride.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              <button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-extrabold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                Launch Collection <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-full font-bold transition-all">
                The Science
              </button>
            </div>
          </div>
        </section>
      )}

      <main id="collection" className="max-w-7xl mx-auto px-4 py-16">
        {!selectedProduct ? (
          <>
            {/* Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <div>
                <h2 className="text-3xl font-space font-bold mb-2">Our Universe</h2>
                <p className="text-gray-400">Explore footwear from every sector of performance.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest ${
                      activeCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]' 
                      : 'bg-gray-900 text-gray-400 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={(p) => {
                    setSelectedProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              ))}
            </div>

            {/* Trust Section */}
            <section className="mt-32 py-20 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                <div className="group">
                  <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-500 mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-indigo-600/20">
                    <Globe size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-space">Universal Shipping</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Free interstellar delivery on all orders over $200. Track your package across the galaxy in real-time.</p>
                </div>
                <div className="group">
                  <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center text-purple-500 mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-purple-600/20">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-space">Atomic Cushioning</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Our proprietary foam tech absorbs 99.9% of kinetic impact, protecting your joints in any atmosphere.</p>
                </div>
                <div className="group">
                  <div className="w-20 h-20 bg-pink-600/10 rounded-3xl flex items-center justify-center text-pink-500 mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-pink-600/20">
                    <Package size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-space">Eco-Origin</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Each Supernova pair is crafted from 85% ocean-bound plastics and recycled orbital debris.</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Detail Page */
          <div className="animate-in fade-in duration-700 slide-in-from-right-4">
            <button 
              onClick={handleBackToStore}
              className="mb-12 text-gray-500 hover:text-white flex items-center gap-2 group transition-colors uppercase text-xs font-bold tracking-widest"
            >
              <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
              Return to Catalog
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Product Visuals */}
              <div className="lg:col-span-7 space-y-6">
                <div className="aspect-[4/5] bg-gray-900 rounded-[2rem] overflow-hidden border border-white/5 relative group">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent pointer-events-none" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/5 opacity-50 hover:opacity-100 transition-all cursor-crosshair">
                      <img src={selectedProduct.image} alt="" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Configuration */}
              <div className="lg:col-span-5">
                <div className="sticky top-32">
                  <div className="inline-flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Sparkles size={14} /> New Arrival • {selectedProduct.category}
                  </div>
                  <h1 className="text-6xl font-space font-extrabold mb-4 leading-tight">{selectedProduct.name}</h1>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold text-white">${selectedProduct.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/5 px-2 py-1 rounded-lg border border-yellow-500/10">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-black">{selectedProduct.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed text-lg mb-10 border-l-2 border-indigo-600 pl-6 py-2 italic">
                    "{selectedProduct.description}"
                  </p>

                  <div className="space-y-10">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-black text-xs text-gray-500 uppercase tracking-widest">Select Orbit Size</h4>
                        <button className="text-indigo-400 text-xs font-bold border-b border-indigo-400/20 hover:border-indigo-400 transition-all">Size Guide</button>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-4 gap-3">
                        {selectedProduct.sizes.map(size => (
                          <button 
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-4 rounded-xl text-sm font-bold transition-all ${
                              selectedSize === size 
                              ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.15)] ring-2 ring-indigo-500' 
                              : 'bg-gray-900 border border-white/10 text-gray-500 hover:border-white/30'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => addToCart(selectedProduct, selectedSize)}
                        className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-indigo-600/30 active:scale-[0.98] uppercase tracking-widest"
                      >
                        <ShoppingBag size={22} /> Add to Orbit
                      </button>
                      <button className="w-full py-6 bg-transparent border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-bold rounded-2xl transition-all">
                        Find in Sector (Nearby Store)
                      </button>
                    </div>

                    <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-y-6 gap-x-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Zap size={18} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Instant Response</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Globe size={18} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Global Relay</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500"><Package size={18} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Recycled Shell</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-gray-950 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <a href="#/" className="text-3xl font-black font-space tracking-tighter text-white mb-6 block">
                SUPER<span className="text-indigo-500">NOVA</span>
              </a>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Pioneering the future of cosmic footwear. Designed for athletes who aren't limited by planetary boundaries.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"><Github size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Launch Map</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">The Vault</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Mission Protocol</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Affiliate Program</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Shipping Intel</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Size Calibration</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Join the Fleet</h4>
              <p className="text-gray-500 text-sm mb-4">Get priority access to limited drops and technical updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Comms link..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 flex-1" />
                <button className="bg-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">Join</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
            <p>&copy; 2025 Supernova Footwear Group. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
      
      <ChatAssistant />
    </div>
  );
};

export default App;
