
import React, { useState } from 'react';
import { Resource } from '../types';

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
}

const Models3D: React.FC<Models3DProps> = ({ onAddToCart }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuyNow = async (item: Resource) => {
    setLoadingId(item.id);
    
    console.log(`Initiating Stripe Checkout for: ${item.title}`);
    
    setTimeout(() => {
      alert(`Stripe Checkout Redirect: In a live app, you would now be redirected to Stripe's hosted checkout page for ${item.title} ($${item.price}).`);
      setLoadingId(null);
    }, 1500);
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto pb-40 relative z-10">
      <div className="text-center mb-20 reveal border-b border-gray-200 pb-12">
        <div className="flex justify-center mb-6">
             <span className="font-mono text-primary font-bold text-[10px] tracking-[0.2em] uppercase border border-primary/20 px-3 py-1 rounded-sm bg-primary/5">
                Premium Schematics
             </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide text-[#333333] uppercase">
          Premium <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Schematics</span>
        </h1>
        <p className="text-[#333333] opacity-80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal pt-4">
          High-performance 3D models designed for the final stages of your mission build. All transactions are handled securely via Lemon Squeezy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MODELS_3D.map((item, idx) => (
          <div key={item.id} className={`bg-white border border-gray-200 shadow-sm p-4 flex flex-col group transition-all reveal reveal-delay-${idx} hover:border-primary/50 hover:shadow-md rounded-sm`}>
            <div className="relative h-64 overflow-hidden bg-gray-100 border border-gray-200 mb-6 rounded-sm">
              <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
              <img 
                alt={item.title} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply relative z-10" 
                src={item.imageUrl} 
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white text-[#333333] text-[9px] font-mono font-bold px-2 py-1 border border-gray-200 uppercase tracking-widest shadow-sm rounded-sm">
                  {item.type}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col flex-grow px-2 pb-2">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif font-bold text-[#333333] grow pr-4 leading-tight group-hover:text-primary transition-colors tracking-wide uppercase">{item.title}</h3>
                <span className="text-lg font-mono font-bold text-[#333333] border border-gray-200 px-2 py-1 bg-gray-50 rounded-sm">${item.price}</span>
              </div>
              <p className="text-[#333333] opacity-70 text-sm leading-relaxed mb-8 flex-grow font-normal">{item.description}</p>
              
              <div className="space-y-3">
                <a 
                  href="https://kineticlogiclabs.lemonsqueezy.com/checkout/buy/d420d96a-4821-4173-824f-4fd694d0a214?embed=1"
                  className="lemonsqueezy-button w-full py-4 bg-primary text-white font-sans text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-sm active:scale-95 border border-primary"
                >
                  <span className="material-icons text-[16px]">account_balance_wallet</span>
                  Initialize Purchase
                </a>

                <button 
                  onClick={() => onAddToCart(item)}
                  className="w-full py-4 bg-white border border-gray-200 text-[#333333] font-sans text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95 shadow-sm hover:border-gray-300"
                >
                  <span className="material-icons text-[16px]">add</span>
                  Save to Local
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
