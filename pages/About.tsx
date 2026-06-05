
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDetailedGuide, setShowDetailedGuide] = useState(false);

  useEffect(() => {
    const handleUrlParsing = () => {
      const hashVal = window.location.hash;
      const parts = hashVal.split('/#/');
      const subpage = parts[1]; // e.g. "guide", "creator", "philosophy", "overview"

      const params = new URLSearchParams(location.search);
      const hasGuideQuery = params.get('guide') === 'true' || params.get('brief') === 'true';

      if (subpage === 'guide' || hasGuideQuery) {
        setShowDetailedGuide(true);
      } else {
        setShowDetailedGuide(false);
        if (subpage === 'creator' || subpage === 'philosophy') {
          setTimeout(() => {
            const el = document.getElementById(subpage);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        } else if (subpage === 'overview') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleUrlParsing();
    window.addEventListener('hashchange', handleUrlParsing);
    return () => window.removeEventListener('hashchange', handleUrlParsing);
  }, [location]);
  
  if (showDetailedGuide) {
    return (
      <div className="px-6 py-12 max-w-4xl mx-auto pb-40 relative z-10 animate-fade-in">
        <button 
          onClick={() => navigate('/about/#/overview')}
          className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#333333] hover:text-primary mb-12 transition-colors border border-gray-200 px-4 py-2 bg-white rounded-sm shadow-sm"
        >
          <span className="material-icons text-[16px]">arrow_back</span>
          Back to About
        </button>

        <div className="mb-16 border-b border-gray-200 pb-12">
          <span className="font-mono text-primary font-bold text-[10px] uppercase tracking-widest mb-4 inline-block border border-primary/20 bg-primary/5 px-2 py-1 rounded-sm">Technical Brief</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wide uppercase text-[#333333] mb-6">
            Inside <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">The Labs</span>
          </h1>
          <p className="text-[#333333] opacity-80 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            A deeper look into our engineering values, testing protocols, and the pursuit of deterministic mechanical logic.
          </p>
        </div>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <span className="font-mono text-primary font-bold text-xs uppercase tracking-wider">01 // The Core Vision</span>
              <h3 className="text-2xl font-serif font-bold text-[#333333] uppercase">Our Origin</h3>
              <p className="text-[#333333] opacity-80 leading-relaxed font-normal">
                What began as a chaotic array of pulleys and levers on a bedroom desk evolved into a methodical approach to mechanical computing. Science Olympiad's Mission Possible demands a deep understanding of energy transfers under strict spatial boundaries. Kinetic Logic Labs is our contribution back to the community that fostered this obsession.
              </p>
            </div>
            <div className="space-y-4">
              <span className="font-mono text-primary font-bold text-xs uppercase tracking-wider">02 // The Engineering Principle</span>
              <h3 className="text-2xl font-serif font-bold text-[#333333] uppercase">Deterministic Logic</h3>
              <p className="text-[#333333] opacity-80 leading-relaxed font-normal">
                A perfect run is not a stroke of luck—it is a statistical certainty. We believe in designing devices where every trigger has a predictable path, every fail-safe acts as a binary switch, and every timing element can be fine-tuned to milliseconds. This is what we refer to as kinetic logic.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-sm p-8 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-graph-paper opacity-30 z-0"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-icons text-primary text-3xl">build_circle</span>
                <h4 className="text-lg font-serif font-bold text-[#333333] uppercase tracking-wide">Standardized Guidelines & Documentation</h4>
              </div>
              <p className="text-[#333333] opacity-80 leading-relaxed font-normal max-w-3xl">
                All physical assembly schematics and CAD files provided on Kinetic Logic Labs are pre-tested and tuned on structural frames containing aluminum profiles and high-density timber baseboards. Our calibration logs, timing buffers, and environmental adjustment logs have been compiled throughout major regional and national tournaments. We prioritize rigidity and precision over any visual flair.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="mt-8">
          <button 
            onClick={() => navigate('/about/#/guide')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#333333] font-sans text-xs font-bold tracking-wider uppercase rounded-sm shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all border border-gray-200"
          >
            Learn More
            <span className="material-icons text-[16px] text-primary">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* The Creator Section */}
      <section id="creator" className="reveal pb-12 border-b border-gray-200 flex flex-col items-end text-right">
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
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="reveal py-24 border-y border-gray-200 bg-white relative overflow-hidden text-center shadow-sm rounded-sm">
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
