
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
          Engineering Overview
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif font-bold leading-[1.1] text-[#333333] mb-8 tracking-wide uppercase">
          Mastering <br/>
          <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Kinetic</span> Engineering
        </h1>
        <p className="text-[#333333] opacity-80 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
          Kinetic Logic Labs is a dedicated platform for competitors tackling the Science Olympiad Mission Possible event. We bridge the gap between simple machines and professional mechanical automation.
        </p>
      </section>

      {/* Purpose Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="reveal reveal-delay-1 border border-gray-200 p-12 bg-white shadow-sm relative group overflow-hidden rounded-sm">
          <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
          <div className="absolute top-0 right-0 p-3">
             <span className="font-mono text-[9px] text-[#333333] opacity-40 font-bold uppercase tracking-widest">Section 01</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 border border-gray-200 bg-white flex items-center justify-center rounded-sm">
                <span className="material-symbols-outlined text-primary text-2xl">hub</span>
                </div>
                <h2 className="text-2xl font-serif font-bold tracking-wide text-[#333333] uppercase">The Vision</h2>
            </div>
            <div className="space-y-10">
                <div>
                <h3 className="text-primary font-mono text-xs font-bold tracking-widest mb-3 uppercase">Technical Rigor</h3>
                <p className="text-[#333333] opacity-70 text-base leading-relaxed font-normal">
                    We believe in detailed schematics and engineering principles over guesswork. Every blueprint is mathematically verified for reliable action under competitive pressure.
                </p>
                </div>
                <div className="pt-8 border-t border-gray-200">
                <h3 className="text-primary font-mono text-xs font-bold tracking-widest mb-3 uppercase">Consistency First</h3>
                <p className="text-[#333333] opacity-70 text-base leading-relaxed font-normal">
                    In Mission Possible, complexity is the enemy. We prioritize robust systems that trigger with 100% repeatability, ensuring your machine performs when it matters most.
                </p>
                </div>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-2 border border-primary/20 p-12 bg-primary/5 shadow-sm relative group flex flex-col justify-center text-center rounded-sm">
          <div className="absolute top-0 left-0 p-3">
             <span className="font-mono text-[9px] text-primary opacity-50 font-bold uppercase tracking-widest">Section 02</span>
          </div>
          <div className="mb-10">
            <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-white">
              <span className="material-symbols-outlined text-4xl text-primary">construction</span>
            </div>
            <h2 className="text-2xl font-serif font-bold tracking-wide text-[#333333] uppercase">The Creator</h2>
          </div>
          <p className="text-[#333333] opacity-90 text-lg leading-relaxed mb-10 font-sans italic">
            "I founded Kinetic Logic Labs after years of competing and coaching. I wanted to build the repository of high-level resources I wish I had as a student starting out."
          </p>
          <div className="flex items-center gap-4 justify-center">
            <div className="h-[1px] w-12 bg-primary/30"></div>
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Kinetic Logic Labs Founder</span>
            <div className="h-[1px] w-12 bg-primary/30"></div>
          </div>
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
