
import React, { useState, useMemo } from 'react';
import { Resource, Page } from '../types';

const RESOURCES: Resource[] = [
  {
    id: 'f1',
    title: 'Universal Trigger V2',
    description: 'Adjustable sensitivity hair-trigger mechanism. Optimized for FDM printing with no supports required.',
    type: 'STL',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f2',
    title: 'Modular Ramp System',
    description: 'Configurable ramp system for precise timing control and reliable object transition.',
    type: 'STEP',
    imageUrl: 'https://images.unsplash.com/photo-1530124560676-587cad91244f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f3',
    title: 'Action Log Template',
    description: 'Pre-formatted documentation template for tracking machine steps and timing requirements.',
    type: 'PDF',
    imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea10cc3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'f4',
    title: 'Step Logic Guide',
    description: 'A comprehensive guide on sequencing Mission Possible actions to maximize efficiency.',
    type: 'PDF',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
  }
];

type Category = 'All' | '3D Files' | 'Templates' | 'Engineering Guides';

interface ResourcesProps {
  onNavigate: (page: Page) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sequential character matching logic
  const isOrderedMatch = (query: string, target: string) => {
    // Normalize both: remove spaces and lowercase
    const s = query.toLowerCase().replace(/\s/g, '');
    const t = target.toLowerCase().replace(/\s/g, '');
    
    if (!s) return true;
    
    let sIdx = 0;
    for (let tIdx = 0; tIdx < t.length && sIdx < s.length; tIdx++) {
      if (t[tIdx] === s[sIdx]) {
        sIdx++;
      }
    }
    return sIdx === s.length;
  };

  // Memoize filtered results
  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      const matchesSearch = isOrderedMatch(searchTerm, r.title);
      
      let matchesCategory = true;
      if (activeCategory === '3D Files') {
          matchesCategory = ['STL', 'STEP'].includes(r.type);
      } else if (activeCategory === 'Templates') {
          matchesCategory = r.title.toLowerCase().includes('template');
      } else if (activeCategory === 'Engineering Guides') {
          matchesCategory = r.title.toLowerCase().includes('guide');
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const categories: Category[] = ['All', '3D Files', 'Templates', 'Engineering Guides'];

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto pb-40">
      <div className="mb-12 text-center lg:text-left reveal">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-black dark:text-white">
          Resources
        </h1>
        <p className="text-black/40 dark:text-white/40 text-base md:text-lg max-w-xl leading-relaxed">
          Open-source assets for rapid machine assembly. These modules are built for reliability and ease of modification.
        </p>
      </div>

      {/* Search and Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-20 reveal reveal-delay-1 items-stretch relative z-[60]">
        <div className="relative flex-grow">
          <span className="material-icons absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-50">search</span>
          <input 
            type="text"
            placeholder="Search components (e.g. 'utr' for Universal Trigger)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-100 dark:bg-card-dark border border-black/5 dark:border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-primary/50 transition-all placeholder:text-black/20 dark:placeholder:text-white/20 text-black dark:text-white"
          />
        </div>

        {/* Dropdown Filter */}
        <div className="relative min-w-[200px]">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-full bg-neutral-100 dark:bg-card-dark border border-black/5 dark:border-white/5 rounded-2xl px-6 py-5 md:py-0 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-black/80 dark:text-white/80 hover:border-primary/30 transition-all group"
          >
            <span className="flex items-center gap-2">
              <span className="material-icons text-primary text-xl">filter_list</span>
              {activeCategory}
            </span>
            <span className={`material-icons transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute top-full left-0 right-0 mt-2 z-[70] bg-white dark:bg-card-dark border border-black/10 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b border-black/5 dark:border-white/5 last:border-0 ${activeCategory === cat ? 'bg-primary text-white' : 'text-black/40 dark:text-white/40 hover:bg-neutral-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 relative z-10">
          {filtered.map((item) => (
            <div key={item.id} className={`bg-neutral-50 dark:bg-card-dark border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden group hover:border-primary/20 transition-all flex flex-col h-full reveal`}>
              <div className="aspect-video relative overflow-hidden bg-neutral-200 dark:bg-neutral-900/50">
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 dark:grayscale dark:group-hover:grayscale-0" 
                  src={item.imageUrl} 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-primary text-[9px] font-bold px-3 py-1 border border-primary/20 uppercase tracking-widest rounded-full">
                    .{item.type}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-black dark:text-white">{item.title}</h3>
                <p className="text-black/40 dark:text-white/40 text-sm leading-relaxed mb-10 flex-grow font-normal">{item.description}</p>
                <button className="w-full py-4 px-6 border border-black/10 dark:border-white/10 hover:border-primary text-black dark:text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3">
                  <span className="material-icons text-lg">download</span>
                  Access Blueprint
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State with Suggestions */
        <div className="py-20 text-center reveal border border-dashed border-black/10 dark:border-white/10 rounded-[3rem] bg-neutral-50/50 dark:bg-white/[0.02]">
          <div className="mb-8 inline-flex flex-col items-center">
            <span className="material-icons text-6xl text-primary/20 mb-4">search_off</span>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2 uppercase tracking-tight">Logic Fault: 0 Results</h2>
            <p className="text-black/40 dark:text-white/40 text-sm max-w-xs mx-auto italic">
              No components match the sequence "{searchTerm}" in the current category.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-6 px-6">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4">Recommended Assets</p>
             <div className="flex flex-wrap justify-center gap-3">
                {RESOURCES.slice(0, 3).map((res) => (
                  <button 
                    key={res.id}
                    onClick={() => setSearchTerm(res.title)}
                    className="px-5 py-3 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-primary hover:border-primary/30 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span className="material-icons text-sm opacity-50">auto_fix_high</span>
                    {res.title}
                  </button>
                ))}
             </div>
             
             <div className="pt-8">
               <button 
                onClick={() => {setActiveCategory('All'); setSearchTerm('');}}
                className="text-primary text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
               >
                System Reset
               </button>
             </div>
          </div>
        </div>
      )}
      
      {/* Premium Bridge */}
      <section className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-12 md:p-20 text-center reveal mt-20">
        <div className="max-w-xl mx-auto">
          <span className="material-icons text-primary text-4xl mb-6">workspace_premium</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-black dark:text-white">Need 3D Models?</h2>
          <p className="text-black/50 dark:text-white/50 mb-10 text-sm leading-relaxed font-normal">
            Our 3D model library includes verified sub-assemblies and complete gearbox templates for high-stakes competition.
          </p>
          <button 
            onClick={() => onNavigate('models')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-primary/70 transition-all flex items-center justify-center gap-2 mx-auto border-b border-primary/20 pb-1"
          >
            Explore 3D Models 
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Resources;
