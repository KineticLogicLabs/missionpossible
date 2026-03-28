
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="px-6 pb-32 max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-16 mb-32 lg:py-20">
        <div className="flex-1 space-y-8 reveal">
          <div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] mb-8 text-black dark:text-white">
              Science Olympiad <br/>
              <span className="gradient-text">Mission Possible</span> <br/>
              Technical Hub
            </h1>
            <p className="text-black/50 dark:text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
              A curated collection of mechanical logic, timing modules, and 3D blueprints designed for competitors who prioritize precision over luck.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-6">
            <button 
              onClick={() => onNavigate('resources')}
              className="px-10 py-4 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary/80 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-primary/20"
            >
              Get Started Now
            </button>
          </div>
        </div>

        <div className="flex-1 w-full relative reveal reveal-delay-2">
          {/* Hero Image Container - Cleaned up to avoid "weird box" look */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl">
            <img 
              alt="Engineering Logic" 
              className="w-full h-full object-cover opacity-90 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-105" 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
            />
            {/* Smooth transition gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent opacity-40"></div>
          </div>
        </div>
      </section>

      {/* Hook Section - Designed by a Human */}
      <section className="mb-32 py-16 border-y border-black/5 dark:border-white/5 reveal">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Built by a competitor, <br/>for competitors.</h3>
          
          <div className="py-20">
            <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="material-icons text-black/20 dark:text-white/20">person</span>
            </div>
            <div className="h-px w-24 bg-black/5 dark:bg-white/5 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Logic Modules Grid */}
      <section className="mb-32">
        <div className="flex items-end justify-between mb-16 reveal">
          <div className="space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
              Essential Modules
            </h2>
            <p className="text-black/40 dark:text-white/40 text-sm md:text-base max-w-md">
              Reliable building blocks for your next machine.
            </p>
          </div>
          <button onClick={() => onNavigate('resources')} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors pb-1 border-b border-primary/20">
            View Library
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Vertical Transfer", category: "Mechanical", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=600" },
            { title: "Universal Triggers", category: "Logic", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" },
            { title: "Timing Gears", category: "Precision", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600" }
          ].map((item, idx) => (
            <div key={idx} className={`group cursor-pointer reveal reveal-delay-${idx+1}`} onClick={() => onNavigate('resources')}>
              <div className="aspect-[1.5] mb-8 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 relative">
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 dark:grayscale dark:group-hover:grayscale-0" 
                  src={item.img} 
                />
              </div>
              <div className="space-y-1 px-2">
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{item.category}</p>
                <h3 className="font-bold text-xl group-hover:text-primary transition-colors text-black dark:text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 reveal">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight text-black dark:text-white">Refine your logic today.</h2>
        <button 
          onClick={() => onNavigate('resources')}
          className="px-12 py-5 bg-primary dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-2xl"
        >
          Explore Resources
        </button>
      </section>
    </div>
  );
};

export default Home;
