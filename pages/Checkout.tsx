import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onRemove }) => {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="px-6 py-32 text-center max-w-2xl mx-auto relative z-10">
        <div className="mb-12 relative inline-block">
          <div className="absolute inset-0 bg-primary/5 border border-primary/20 scale-150 transform rotate-45 pointer-events-none rounded-sm"></div>
          <div className="relative text-[#333333] opacity-20">
            <span className="material-icons text-[120px] md:text-[160px]">account_balance_wallet</span>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-wide text-[#333333] uppercase">
          Local buffer is <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">empty</span>
        </h2>
        <p className="text-[#333333] opacity-80 mb-12 text-sm font-sans max-w-md mx-auto leading-relaxed pt-4 tracking-wide">
          Initialize your next engineering project by saving schema to your local drive.
        </p>
        <button 
          onClick={() => navigate('/models')}
          className="px-10 py-4 bg-primary text-white font-sans text-sm font-bold tracking-wider uppercase rounded-sm hover:focus:bg-blue-600 transition-all shadow-sm border border-primary"
        >
          Browse Repository
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto relative z-10">
      <header className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide text-[#333333] uppercase">
            Checkout <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Modules</span>
          </h1>
        </div>
        <div className="flex gap-8 text-[12px] font-sans font-bold uppercase tracking-wider">
          <span className="text-primary">System Ready: Initialize Payment via Secure Portal</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-[#333333] border-b border-gray-200 pb-2">Active Modules</h2>
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 p-4 flex flex-col md:flex-row items-center gap-6 group shadow-sm relative rounded-sm">
                <div className="absolute top-0 right-0 p-2">
                  <span className="font-mono text-[9px] text-[#333333] opacity-40 font-bold uppercase tracking-widest">Model {item.id}</span>
                </div>
                <div className="w-full md:w-32 h-32 bg-gray-50 border border-gray-200 shrink-0 relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover mix-blend-multiply grayscale opacity-80" />
                </div>
                <div className="flex-grow w-full text-center md:text-left pt-4 md:pt-0">
                  <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2 md:mb-0">
                    <h3 className="font-serif font-bold text-xl text-[#333333] uppercase tracking-wide">{item.title}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[#333333] opacity-40 hover:opacity-100 hover:text-red-500 transition-colors mt-2 md:mt-0"
                    >
                      <span className="material-icons text-[20px]">delete_outline</span>
                    </button>
                  </div>
                  <p className="text-[10px] font-mono font-bold text-[#333333] opacity-70 uppercase tracking-widest mt-2 md:mt-1">{item.type} Resource</p>
                  <div className="mt-4 md:mt-4 text-[#333333] font-mono font-bold text-lg">${item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 p-8 sticky top-32 shadow-sm rounded-sm">
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-[#333333] mb-8 border-b border-gray-200 pb-2">Purchase Finalization</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs font-sans font-bold text-[#333333] opacity-70">
                <span className="uppercase tracking-wider">Modules ({cart.length})</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-sans font-bold text-[#333333] opacity-70">
                <span className="uppercase tracking-wider">Secure Delivery</span>
                <span className="text-primary font-mono uppercase">Direct</span>
              </div>
              <div className="h-[1px] bg-gray-200 my-6"></div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#333333]">Total Due</span>
                <span className="text-2xl font-mono font-bold text-[#333333]">${total.toFixed(2)}</span>
              </div>
            </div>

            <a 
              href="https://kineticlogiclabs.lemonsqueezy.com/checkout/buy/d420d96a-4821-4173-824f-4fd694d0a214?embed=1"
              className="lemonsqueezy-button w-full py-4 bg-primary text-white font-sans text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-blue-600 transition-all shadow-sm border border-primary flex items-center justify-center gap-2"
            >
              <span className="material-icons text-sm">lock_outline</span>
              Open Secure Gateway
            </a>
            
            <p className="text-[10px] text-[#333333] opacity-60 text-center mt-6 font-sans leading-relaxed px-4">
              Clicking the button will initialize an external secure gateway for payment processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
