
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-32 pb-40 relative z-10">
      {/* Introduction */}
      <section className="reveal relative pb-12 border-b border-gray-200">
        <div className="mb-6 flex items-center gap-2 text-primary font-mono text-[10px] tracking-widest uppercase font-bold">
          <span className="w-8 h-[1px] bg-primary"></span>
          About
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif font-bold leading-[1.1] text-[#333333] mb-8 tracking-wide uppercase">
          What's this <br/>
          <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">site for?</span>
        </h1>
        <p className="text-[#333333] opacity-80 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
          Kinetic Logic Labs is a dedicated platform for competitors tackling the Science Olympiad Mission Possible event. It includes a variety of resources for students, including 3D models of an award-winning nationals Mission Possible device, advice from a former Mission Possible competitor, and more.
        </p>
      </section>

      {/* The Creator Section */}
      <section className="reveal pb-12 border-b border-gray-200 flex flex-col items-end text-right">
        <div className="mb-6 flex items-center gap-2 text-primary font-mono text-[10px] tracking-widest uppercase font-bold justify-end">
          The Creator
          <span className="w-8 h-[1px] bg-primary"></span>
        </div>
        <div className="max-w-2xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#333333] uppercase leading-none tracking-wide">
            The Creator
          </h2>
          
          <div className="ml-auto w-full max-w-md aspect-[16/10] bg-gray-50 border border-gray-200 rounded-sm overflow-hidden flex items-center justify-center p-2 relative group shadow-sm">
            <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-[#333333]/40">CREATOR_PROFILE_01</div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
              alt="Creator portrait placeholder" 
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply group-hover:scale-102 transition-transform duration-500 rounded-sm relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="text-[#333333] opacity-80 text-base md:text-lg leading-relaxed font-normal">
            As a competitor and mechanical designer, my mission is to share the insights and designs gathered from extensive building and testing. This repository represents hundreds of prototype iterations and competitive run experiences.
          </p>
          
          <p className="text-[#333333] opacity-70 text-sm font-mono uppercase tracking-wider">
            Engineering & Logic Design Lead // Science Olympiad Builder
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="reveal py-24 border-y border-gray-200 bg-white relative overflow-hidden text-center shadow-sm rounded-sm">
        <div className="absolute inset-0 bg-graph-paper opacity-30 pointer-events-none"></div>
        <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-wide text-[#333333] uppercase">Precision over Luck.</h2>
            <p className="text-[#333333] opacity-70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12 font-normal">
            Our design philosophy centers on deterministic mechanical logic. We eliminate variables so you can focus on perfecting your run times.
            </p>
            <div className="flex justify-center gap-12 text-primary/40">
            <span className="material-icons text-5xl">settings</span>
            <span className="material-icons text-5xl">bolt</span>
            <span className="material-icons text-5xl">architecture</span>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal text-center py-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 tracking-wide text-[#333333] uppercase">Ready to deploy?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/models')}
            className="px-8 py-4 bg-primary text-white font-sans text-sm font-bold tracking-wider uppercase rounded-sm shadow-sm hover:focus:bg-blue-600 transition-all border border-primary"
          >
            Access Schematics
          </button>
          <button 
            onClick={() => navigate('/resources')}
            className="px-8 py-4 bg-white text-[#333333] font-sans text-sm font-bold tracking-wider uppercase rounded-sm shadow-sm hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300"
          >
            Local Library
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
