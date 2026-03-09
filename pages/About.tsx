
import React from 'react';
import { Page } from '../types';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-32 pb-40">
      {/* Introduction */}
      <section className="reveal">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-6">Our Mission</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-black dark:text-white mb-10 tracking-tight">
          Mastering <br/>
          <span className="gradient-text italic">Kinetic</span> Engineering.
        </h1>
        <p className="text-black/50 dark:text-white/50 text-base md:text-xl font-normal leading-relaxed max-w-2xl">
          Kinetic Logic Labs is a dedicated platform for competitors tackling the Science Olympiad Mission Possible event. We bridge the gap between simple machines and professional mechanical automation.
        </p>
      </section>

      {/* Purpose Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="reveal reveal-delay-1 border border-black/5 dark:border-white/5 p-12 rounded-[2rem] bg-neutral-50 dark:bg-card-dark relative overflow-hidden group hover:border-primary/20 transition-all">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <span className="material-icons text-[120px] text-black dark:text-white">psychology</span>
          </div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">hub</span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-black dark:text-white">The Vision</h2>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-primary font-bold text-[10px] uppercase tracking-widest mb-4">Technical Rigor</h3>
              <p className="text-black/40 dark:text-white/40 text-sm leading-relaxed font-normal">
                We believe in detailed schematics and engineering principles over guesswork. Every blueprint is mathematically verified for reliable action under competitive pressure.
              </p>
            </div>
            <div className="pt-10 border-t border-black/5 dark:border-white/5">
              <h3 className="text-primary font-bold text-[10px] uppercase tracking-widest mb-4">Consistency First</h3>
              <p className="text-black/40 dark:text-white/40 text-sm leading-relaxed font-normal">
                In Mission Possible, complexity is the enemy. We prioritize robust systems that trigger with 100% repeatability, ensuring your machine performs when it matters most.
              </p>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-2 border border-primary/10 p-12 rounded-[2rem] bg-primary/[0.02] flex flex-col justify-center text-center">
          <div className="mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">construction</span>
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-black dark:text-white">The Creator</h2>
          </div>
          <p className="text-black/60 dark:text-white/60 text-base leading-relaxed mb-10 italic font-medium">
            "I founded Kinetic Logic Labs after years of competing and coaching. I wanted to build the repository of high-level resources I wish I had as a student starting out."
          </p>
          <div className="flex items-center gap-4 justify-center">
            <div className="h-[1px] w-12 bg-primary/20"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Kinetic Logic Labs Founder</span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="reveal py-20 border-y border-black/5 dark:border-white/5 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-black dark:text-white">Precision over Luck.</h2>
        <p className="text-black/40 dark:text-white/40 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-12 font-normal">
          Our design philosophy centers on deterministic mechanical logic. We eliminate variables so you can focus on perfecting your run times.
        </p>
        <div className="flex justify-center gap-8 text-primary/40">
           <span className="material-icons text-4xl">settings</span>
           <span className="material-icons text-4xl">bolt</span>
           <span className="material-icons text-4xl">architecture</span>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal text-center py-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 tracking-tight text-black dark:text-white">Ready to start building?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button 
            onClick={() => onNavigate('paid')}
            className="px-12 py-5 bg-primary dark:bg-white text-white dark:text-black font-bold rounded-2xl text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-xl"
          >
            Shop Blueprints
          </button>
          <button 
            onClick={() => onNavigate('free')}
            className="px-12 py-5 bg-transparent border border-black/10 dark:border-white/10 text-black dark:text-white font-bold rounded-2xl text-xs uppercase tracking-[0.2em] hover:border-primary transition-all"
          >
            Free Library
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
