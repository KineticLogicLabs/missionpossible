
import React, { useState } from 'react';
import { Resource, Page } from '../types';

const MODELS_3D: Resource[] = [
  {
    id: 'p1',
    title: 'Universal Gearbox V2',
    description: 'High-torque ratio design optimized for 3D printing with integrated low-friction bearing mounts.',
    price: 14.99,
    type: 'STL',
    imageUrl: 'https://images.unsplash.com/photo-1531284895878-7897897c1c5c?auto=format&fit=crop&q=80&w=600',
    isPremium: true
  },
  {
    id: 'p2',
    title: 'Timing Masterclass Guide',
    description: 'Complete breakdown of mechanical timing mechanisms for consistent, sub-millisecond success.',
    price: 9.99,
    type: 'PDF',
    imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600',
    isPremium: true
  },
  {
    id: 'p3',
    title: 'Full Mission Assembly',
    description: 'A complete skeleton assembly to jumpstart your design phase. Editable STEP/SLDASM files.',
    price: 29.99,
    type: 'BUNDLE',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    isPremium: true
  }
];

interface Models3DProps {
  onAddToCart: (res: Resource) => void;
  onNavigate: (page: Page) => void;
}

const Models3D: React.FC<Models3DProps> = ({ onAddToCart, onNavigate }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuyNow = async (item: Resource) => {
    setLoadingId(item.id);
    
    // NOTE: In a production environment, you would hit your backend API here.
    // Example: const response = await fetch('/api/create-checkout-session', { ... });
    // const session = await response.json();
    // window.location.href = session.url;
    
    console.log(`Initiating Stripe Checkout for: ${item.title}`);
    
    // Simulating API call delay
    setTimeout(() => {
      alert(`Stripe Checkout Redirect: In a live app, you would now be redirected to Stripe's hosted checkout page for ${item.title} ($${item.price}).`);
      setLoadingId(null);
    }, 1500);
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto pb-40">
      <div className="text-center mb-24 reveal">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-black dark:text-white">
          3D Models
        </h1>
        <p className="text-black/40 dark:text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          High-performance 3D models designed for the final stages of your mission build. All transactions are handled securely via Stripe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {MODELS_3D.map((item, idx) => (
          <div key={item.id} className={`bg-neutral-50 dark:bg-card-dark border border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col group hover:border-primary/20 transition-all reveal reveal-delay-${idx}`}>
            <div className="relative h-72 overflow-hidden bg-neutral-200 dark:bg-neutral-900/50">
              <img 
                alt={item.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 dark:grayscale dark:group-hover:grayscale-0" 
                src={item.imageUrl} 
              />
              <div className="absolute top-6 left-6">
                <span className="bg-primary/20 text-primary text-[9px] font-bold px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest shadow-xl backdrop-blur-md">
                  {item.type}
                </span>
              </div>
            </div>
            
            <div className="p-10 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors text-black dark:text-white">{item.title}</h3>
                <span className="text-xl font-bold text-black dark:text-white">${item.price}</span>
              </div>
              <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed mb-10 flex-grow">{item.description}</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleBuyNow(item)}
                  disabled={loadingId === item.id}
                  className="w-full py-4 bg-accent text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-accent/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
                >
                  {loadingId === item.id ? (
                    <span className="animate-spin material-icons">sync</span>
                  ) : (
                    <span className="material-icons text-lg">shopping_bag</span>
                  )}
                  {loadingId === item.id ? 'Connecting...' : 'Buy Now'}
                </button>

                <button 
                  onClick={() => onAddToCart(item)}
                  className="w-full py-4 bg-transparent border border-black/10 dark:border-white/10 text-black dark:text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:border-primary transition-all active:scale-95 text-xs uppercase tracking-widest"
                >
                  <span className="material-icons text-lg">add_shopping_cart</span>
                  Add to Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Models3D;
