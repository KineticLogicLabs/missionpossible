
import React, { useState } from 'react';
import { CartItem, Page } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onNavigate: (page: Page) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onRemove, onNavigate }) => {
  const [step, setStep] = useState(1);
  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="px-6 py-32 text-center max-w-lg mx-auto">
        <div className="mb-10 text-black/10 dark:text-white/10">
          <span className="material-symbols-outlined text-8xl">shopping_basket</span>
        </div>
        <h2 className="text-3xl font-black mb-6 italic uppercase text-black dark:text-white">Your lab is empty</h2>
        <p className="text-black/40 dark:text-white/40 mb-12 uppercase tracking-widest text-sm">Add some premium logic modules to your project.</p>
        <button 
          onClick={() => onNavigate('paid')}
          className="px-12 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-black transition-all"
        >
          Browse Assets
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-black dark:text-white">
            SECURE <span className="text-primary">CHECKOUT</span>
          </h1>
          <div className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-widest border border-accent/30 px-3 py-1.5 rounded-sm">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Encrypted
          </div>
        </div>
        <div className="flex gap-8 border-b border-black/10 dark:border-white/10 pb-4 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className={step === 1 ? 'text-primary border-b-2 border-primary pb-4' : 'text-black/30 dark:text-white/30'}>01 // Summary</span>
          <span className={step === 2 ? 'text-primary border-b-2 border-primary pb-4' : 'text-black/30 dark:text-white/30'}>02 // Billing</span>
          <span className={step === 3 ? 'text-primary border-b-2 border-primary pb-4' : 'text-black/30 dark:text-white/30'}>03 // Access</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Active Modules</h2>
              {cart.map((item) => (
                <div key={item.id} className="bg-neutral-50 dark:bg-card-dark border border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-center gap-6 group">
                  <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-900 rounded-xl overflow-hidden shrink-0 border border-black/5 dark:border-white/5">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover dark:grayscale dark:opacity-60" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg uppercase tracking-tight text-black dark:text-white">{item.title}</h3>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-black/20 dark:text-white/20 hover:text-red-500 transition-colors"
                      >
                        <span className="material-icons text-xl">delete_outline</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest font-bold mt-1">{item.type} Resource</p>
                    <div className="mt-4 text-primary font-black text-xl">${item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-500">
              <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Billing Protocol</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 ml-1">Full Name</label>
                    <input type="text" className="w-full bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:border-primary focus:outline-none transition-all text-black dark:text-white" placeholder="JOHN DOE" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 ml-1">Email Address</label>
                    <input type="email" className="w-full bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:border-primary focus:outline-none transition-all text-black dark:text-white" placeholder="RECIPIENT@HUB.LOGIC" />
                  </div>
                </div>
              </div>
              <div className="space-y-6 pt-8 border-t border-black/5 dark:border-white/5">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Payment Authority</h2>
                <div className="relative">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 ml-1 mb-2 block">Card Signature</label>
                  <div className="relative">
                    <input type="text" className="w-full bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 pl-14 text-sm focus:border-primary focus:outline-none transition-all text-black dark:text-white" placeholder="0000 0000 0000 0000" />
                    <span className="material-icons absolute left-5 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/20">credit_card</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 ml-1">Expiry</label>
                    <input type="text" className="w-full bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:border-primary focus:outline-none transition-all text-black dark:text-white" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 ml-1">Security Code</label>
                    <input type="password" className="w-full bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-5 py-4 text-sm focus:border-primary focus:outline-none transition-all text-black dark:text-white" placeholder="***" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-8">
          <div className="bg-neutral-50 dark:bg-card-dark border border-black/10 dark:border-white/10 rounded-3xl p-8 sticky top-32">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary">Data Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                <span className="text-black/40 dark:text-white/40">Modules ({cart.length})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                <span className="text-black/40 dark:text-white/40">Secure Delivery</span>
                <span className="text-accent">FREE</span>
              </div>
              <div className="h-px bg-black/10 dark:bg-white/10 my-4"></div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-black dark:text-white">Total Access</span>
                <span className="text-3xl font-black text-black dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            {step === 1 ? (
              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-primary text-white font-black rounded-2xl uppercase tracking-[0.3em] text-xs hover:opacity-90 transition-all transform hover:scale-[1.02]"
              >
                PROCEED TO BILLING
              </button>
            ) : (
              <button 
                onClick={() => {
                  alert("Order Simulation Complete! Your assets are being delivered.");
                  onNavigate('home');
                }}
                className="w-full py-5 bg-accent text-white font-black rounded-2xl uppercase tracking-[0.3em] text-xs hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-[0_10px_30px_rgba(255,107,0,0.3)]"
              >
                COMPLETE PURCHASE
              </button>
            )}
            
            <p className="text-[9px] text-black/30 dark:text-white/30 text-center mt-8 uppercase tracking-[0.2em] leading-relaxed">
              Upon completion, blueprints will be delivered to your registered email in KINETIC-ROOT format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
