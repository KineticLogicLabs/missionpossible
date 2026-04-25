
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="px-6 pb-32 max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-16 mb-32 lg:py-20 relative">
        <div className="flex-1 space-y-8 reveal z-10">
          <div>
            <div className="mb-4 flex items-center gap-2 text-primary font-mono text-[10px] tracking-widest uppercase font-bold">
              <span className="w-8 h-[1px] bg-primary"></span>
              Initialize Project
            </div>
            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-[80px] tracking-wide leading-[1.05] mb-8 text-[#333333] uppercase">
              Science Olympiad <br/>
              <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Mission Possible</span> <br/>
              Technical Hub
            </h1>
            <p className="text-[#333333] opacity-80 text-lg md:text-xl max-w-xl leading-relaxed font-normal">
              A curated collection of mechanical logic, timing modules, and 3D blueprints designed for competitors who prioritize precision over approximation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => navigate('/resources')}
              className="px-8 py-4 bg-primary text-white font-sans font-bold text-sm rounded-sm shadow-sm hover:bg-blue-600 transition-all flex items-center gap-2 tracking-wider uppercase border border-primary hover:border-blue-600"
            >
              Explore Resources
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="flex-1 w-full relative reveal reveal-delay-2 lg:-ml-20">
          {/* Technical Draft Image Overlay */}
          <div className="relative aspect-[4/3] rounded-sm bg-white border border-gray-200 shadow-md p-2">
            <div className="absolute inset-0 bg-graph-paper opacity-50 z-0 pointer-events-none"></div>
            <img 
              alt="Engineering Draft" 
              className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply relative z-10 rounded-sm" 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
            />
          </div>
        </div>
      </section>

      {/* Hook Section */}
      <section className="mb-32 py-24 border-y border-gray-300 reveal relative bg-white overflow-hidden text-center shadow-sm">
        <div className="absolute inset-0 bg-graph-paper opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10 px-6">
          <div className="flex justify-center mb-6">
             <span className="font-mono text-primary font-bold text-[10px] tracking-[0.2em] uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-sm">
                Engineering Manifesto
             </span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold tracking-wide text-[#333333] leading-[1.2] uppercase">
            Built by a competitor, <br/><span className="text-primary border-b-4 border-primary/20 pb-1 inline-block">for competitors.</span>
          </h3>
          <p className="text-[#333333] opacity-80 text-lg md:text-xl max-w-2xl mx-auto font-normal pb-4">
            Every resource is engineered to enhance reliability and streamline your iteration process. We leave nothing to chance.
          </p>
        </div>
      </section>

      {/* Logic Modules Grid */}
      <section className="mb-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 reveal border-b border-gray-200 pb-6">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-[#333333] uppercase">
              Essential Modules
            </h2>
            <p className="text-[#333333] opacity-70 text-lg font-normal max-w-md">
              Reliable building blocks for your next machine.
            </p>
          </div>
          <button onClick={() => navigate('/resources')} className="text-primary font-sans text-sm font-bold tracking-wider hover:text-blue-600 transition-colors flex items-center gap-2 group w-fit uppercase border border-transparent hover:border-primary px-3 py-2 rounded-sm bg-white">
            Explore Resources
            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Vertical Output", category: "MECHANICAL", spec: "[STL]", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
            { title: "Universal Triggers", category: "LOGIC", spec: "[FUSION]", img: "https://images.unsplash.com/photo-1531284895878-7897897c1c5c?auto=format&fit=crop&q=80&w=600" },
            { title: "Timing Mechanisms", category: "PRECISION", spec: "[PDF]", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600" }
          ].map((item, idx) => (
            <div key={idx} className={`group cursor-pointer reveal reveal-delay-${idx+1} bg-white border border-gray-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all p-4 rounded-sm`} onClick={() => navigate('/resources')}>
              <div className="aspect-[4/3] mb-6 overflow-hidden bg-gray-100 relative border border-gray-200 rounded-sm">
                <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700 ease-in-out mix-blend-multiply relative z-10" 
                  src={item.img} 
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur border border-gray-200 px-2 py-1 z-20 shadow-sm rounded-sm">
                    <span className="font-mono text-[9px] text-[#333333] font-bold tracking-widest">{item.spec}</span>
                </div>
              </div>
              <div className="space-y-3 px-2 pb-2">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-sm"></span>
                    <p className="text-primary text-[10px] font-mono font-bold uppercase tracking-widest">{item.category}</p>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#333333] group-hover:text-primary transition-colors tracking-wide uppercase">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-24 bg-white border border-gray-200 shadow-sm reveal mt-32 relative overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-graph-paper opacity-30 pointer-events-none z-0"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 tracking-wide text-[#333333] uppercase">Refine your logic today.</h2>
            <button 
            onClick={() => navigate('/resources')}
            className="px-10 py-4 bg-primary text-white font-sans font-bold tracking-wider uppercase text-sm rounded-sm hover:bg-blue-600 transition-all shadow-sm border border-primary"
            >
            Explore Resources
            </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
