
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, X, Compass, Zap, Printer, RotateCw } from 'lucide-react';
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

const SPECIFICATIONS: Record<string, { label: string; value: string }[]> = {
  p1: [
    { label: 'Gear Ratio', value: '12:1 / 36:1 dual configuration' },
    { label: 'Shaft Compatibility', value: '4mm mechanical steel shafts' },
    { label: 'Bearing Integration', value: 'Requires 4x 608ZZ bearings' },
    { label: 'Suggested Materials', value: 'PLA, PETG, ABS' },
    { label: 'Optimal Infill', value: '45% Gyroid infill' },
    { label: 'Print Resolution', value: '0.2mm layer height' }
  ],
  p2: [
    { label: 'Total Pages', value: '42 high-resolution pages' },
    { label: 'File Type', value: 'Vector PDF with editable charts' },
    { label: 'Trigger Designs', value: '12 unique mechanical triggers' },
    { label: 'Case Studies', value: '5 tournament-winning designs' },
    { label: 'Timing Systems', value: 'Sand, water, pendulum friction' },
    { label: 'Target Event', value: 'Science Olympiad Mission Possible' }
  ],
  p3: [
    { label: 'File Formats', value: 'STEP, SLDASM, .3DM, F3D Link' },
    { label: 'Machine Volume', value: 'Fits 60cm x 60cm x 60cm limit' },
    { label: 'Complexity', value: 'Acts as complete master assembly' },
    { label: 'Mounting Points', value: 'Standard 2020 Aluminum extrusion' },
    { label: 'Parts Included', value: '14 interactive assemblies' },
    { label: 'Editable Range', value: 'Fully parametric and resizable' }
  ]
};

interface Models3DProps {
  onAddToCart: (res: Resource) => void;
}

const Models3D: React.FC<Models3DProps> = ({ onAddToCart }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<Resource | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUrlParsing = () => {
      const hashVal = window.location.hash;
      const parts = hashVal.split('/#/');
      const subpage = parts[1]; // e.g. "p1", "p2", "p3", "advantages", "overview"
      
      if (subpage) {
        if (subpage === 'advantages') {
          setSelectedModel(null);
          setTimeout(() => {
            const el = document.getElementById('advantages');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        } else if (subpage === 'overview') {
          setSelectedModel(null);
        } else {
          const idx = MODELS_3D.findIndex(m => m.id === subpage);
          if (idx !== -1) {
            setActiveIndex(idx);
            setSelectedModel(MODELS_3D[idx]);
          }
        }
        return;
      }
      
      // Fallback
      const params = new URLSearchParams(location.search);
      const modelParam = params.get('model');
      if (modelParam) {
        const idx = MODELS_3D.findIndex(m => m.id === modelParam);
        if (idx !== -1) {
          setActiveIndex(idx);
          setSelectedModel(MODELS_3D[idx]);
        }
      } else {
        setSelectedModel(null);
      }
    };

    handleUrlParsing();
    window.addEventListener('hashchange', handleUrlParsing);
    return () => window.removeEventListener('hashchange', handleUrlParsing);
  }, [location]);

  const getOffset = (idx: number) => {
    return idx - activeIndex;
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < MODELS_3D.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto pb-40 relative z-10 overflow-x-hidden">
      <div className="text-center mb-16 reveal pb-6">
        <div className="flex justify-center mb-6">
             <span className="font-mono text-primary font-bold text-[10px] tracking-[0.2em] uppercase border border-primary/20 px-3 py-1 rounded-sm bg-primary/5">
                Premium Schematics
             </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide text-[#333333] uppercase">
          3D <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Designs</span>
        </h1>
        <p className="text-[#333333] opacity-80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal pt-4">
          The 3D models printed and used on our award-winning Mission Possible Device. Designed by Ziyao Xu using Fusion.
        </p>
      </div>

      {/* Rotating Carousel Carousel Container */}
      <div className="relative w-full max-w-5xl mx-auto h-[680px] md:h-[640px] flex items-center justify-center">
        
        {/* Carousel Tracks */}
        <div className="relative w-full h-full flex items-center justify-center">
          {MODELS_3D.map((item, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            let transformStyle = "";
            let zIndexStyle = "";
            let opacityStyle = "";
            let shadowStyle = "";
            let borderStyle = "";

            if (isCenter) {
              transformStyle = "translate-x-0 scale-100";
              zIndexStyle = "z-30";
              opacityStyle = "opacity-100";
              shadowStyle = "shadow-xl bg-white blur-none";
              borderStyle = "border-primary/40";
            } else if (isLeft) {
              transformStyle = "-translate-x-[35%] sm:-translate-x-[50%] md:-translate-x-[65%] scale-80 sm:scale-85 md:scale-90";
              zIndexStyle = "z-10";
              opacityStyle = "opacity-40 hover:opacity-60";
              shadowStyle = "shadow-sm bg-gray-50/90 blur-[2px]";
              borderStyle = "border-gray-200";
            } else if (isRight) {
              transformStyle = "translate-x-[35%] sm:translate-x-[50%] md:translate-x-[65%] scale-80 sm:scale-85 md:scale-90";
              zIndexStyle = "z-10";
              opacityStyle = "opacity-40 hover:opacity-60";
              shadowStyle = "shadow-sm bg-gray-50/90 blur-[2px]";
              borderStyle = "border-gray-200";
            } else if (offset < -1) {
              transformStyle = "-translate-x-[70%] sm:-translate-x-[100%] scale-50 opacity-0 pointer-events-none blur-[4px]";
              zIndexStyle = "z-0";
              opacityStyle = "opacity-0";
              shadowStyle = "shadow-none";
              borderStyle = "border-transparent";
            } else {
              transformStyle = "translate-x-[70%] sm:translate-x-[100%] scale-50 opacity-0 pointer-events-none blur-[4px]";
              zIndexStyle = "z-0";
              opacityStyle = "opacity-0";
              shadowStyle = "shadow-none";
              borderStyle = "border-transparent";
            }

            return (
              <div 
                key={item.id} 
                onClick={() => {
                  if (offset !== 0) setActiveIndex(idx);
                }}
                className={`absolute w-[280px] sm:w-[350px] md:w-[420px] p-5 flex flex-col border transition-all duration-300 ease-out rounded-sm ${transformStyle} ${zIndexStyle} ${opacityStyle} ${shadowStyle} ${borderStyle} ${offset !== 0 ? 'cursor-pointer select-none' : 'pointer-events-auto'}`}
              >
                <div className="relative h-48 md:h-60 overflow-hidden bg-gray-100 border border-gray-200 mb-6 rounded-sm">
                  <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
                  <img 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-all duration-300 relative z-10 ${isCenter ? 'grayscale-0 opacity-100' : 'grayscale opacity-75 group-hover:scale-102'}`} 
                    src={item.imageUrl} 
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white text-[#333333] text-[9px] font-mono font-bold px-2 py-1 border border-gray-200 uppercase tracking-widest shadow-sm rounded-sm">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow px-1 pb-1">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className={`text-xl md:text-2xl font-serif font-bold text-[#333333] leading-tight uppercase transition-colors duration-300 ${isCenter ? 'text-primary' : ''}`}>
                      {item.title}
                    </h3>
                    <span className="text-base md:text-lg font-mono font-bold text-[#333333] border border-gray-200 px-2 py-0.5 bg-gray-50 rounded-sm">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-[#333333] opacity-70 text-xs md:text-sm leading-relaxed mb-6 flex-grow font-normal">
                    {item.description}
                  </p>
                  
                  <div className={`transition-all duration-300 flex flex-col gap-2.5 ${isCenter ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95 h-0 overflow-hidden mt-0'}`}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/models/#/' + item.id);
                      }}
                      className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transform active:scale-98 transition-all shadow-sm border border-primary cursor-pointer"
                    >
                      Learn More
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="w-full py-3 bg-white hover:bg-gray-50 text-[#333333] border border-gray-200 hover:border-gray-350 font-sans text-xs font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transform active:scale-98 transition-all shadow-sm cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 text-primary" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Navigation Controls (Arrows + Slide Indicators) */}
      <div className="flex justify-center items-center gap-6 mt-8 z-20 relative">
        {/* Left Arrow Button */}
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-300 ${
            activeIndex === 0 
              ? 'bg-gray-100 text-[#333333]/40 cursor-not-allowed pointer-events-none' 
              : 'bg-white hover:bg-gray-50 text-[#333333] hover:text-primary hover:scale-105 active:scale-95 cursor-pointer'
          }`}
          aria-label="Previous Design"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-2.5">
          {MODELS_3D.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-10 bg-primary shadow-sm' 
                  : 'w-2 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to design ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={handleNext}
          disabled={activeIndex === MODELS_3D.length - 1}
          className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-300 ${
            activeIndex === MODELS_3D.length - 1 
              ? 'bg-gray-100 text-[#333333]/40 cursor-not-allowed pointer-events-none' 
              : 'bg-white hover:bg-gray-50 text-[#333333] hover:text-primary hover:scale-105 active:scale-95 cursor-pointer'
          }`}
          aria-label="Next Design"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Why use 3D Printing for Mission Possible? */}
      <section id="advantages" className="mt-32 border border-gray-200 bg-white rounded-sm p-8 md:p-12 relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-graph-paper opacity-30 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <span className="font-mono text-primary font-bold text-[10px] tracking-[0.2em] uppercase border border-primary/20 px-3 py-1 rounded-sm bg-primary/5">
                Technical Advantages
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-[#333333] uppercase">
              Why use 3D Printing for Mission Possible?
            </h2>
            <p className="text-[#333333] opacity-80 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              FDM additive manufacturing is not just a fabrication tool—it is the modern competitor’s most potent engineering edge for achieving flawless timing, spatial density, and structural stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-5 bg-gray-50 border border-gray-200 rounded-sm hover:border-primary/30 transition-colors">
              <div className="p-3 bg-white rounded-sm border border-gray-200 shadow-sm h-fit">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#333333] uppercase tracking-wide">Geometric Perfection</h3>
                <p className="text-[#333333] opacity-80 text-xs md:text-sm leading-relaxed font-normal">
                  Design complex triggers, cascading systems, and high-ratio gearboxes to sub-millimeter tolerances (within ±0.1mm) that are impossible to machine with generic hand tools.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-gray-50 border border-gray-200 rounded-sm hover:border-primary/30 transition-colors">
              <div className="p-3 bg-white rounded-sm border border-gray-200 shadow-sm h-fit">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#333333] uppercase tracking-wide">Rapid Iteration Cycle</h3>
                <p className="text-[#333333] opacity-80 text-xs md:text-sm leading-relaxed font-normal">
                  A tournament-winning machine demands continuous tuning of clearances and release speeds. Adjust parametric variables in CAD, send the STL to a high-speed printer, and test again in hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-gray-50 border border-gray-200 rounded-sm hover:border-primary/30 transition-colors">
              <div className="p-3 bg-white rounded-sm border border-gray-200 shadow-sm h-fit">
                <Printer className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#333333] uppercase tracking-wide">Strict Volume Optimization</h3>
                <p className="text-[#333333] opacity-80 text-xs md:text-sm leading-relaxed font-normal">
                  Maximize vertical and spatial usage within the restrictive 60cm³ boundaries. Custom-designed brackets and sliding channels slot perfectly around structural aluminum extrusions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-gray-50 border border-gray-200 rounded-sm hover:border-primary/30 transition-colors">
              <div className="p-3 bg-white rounded-sm border border-gray-200 shadow-sm h-fit">
                <RotateCw className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#333333] uppercase tracking-wide">Fail-Safe Replicability</h3>
                <p className="text-[#333333] opacity-80 text-xs md:text-sm leading-relaxed font-normal">
                  Accident occurrences are common during transit or setup. Additive manufacturing guarantees that damaged components can be hot-swapped with identical, pristine replacements instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#333333]/80 backdrop-blur-sm transition-opacity"
            onClick={() => navigate('/models/#/overview')}
          />
          
          {/* Modal Container */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-2xl relative max-w-2xl w-full z-10 overflow-hidden text-left flex flex-col md:flex-row max-h-[85vh]">
            <button 
              onClick={() => navigate('/models/#/overview')}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-[#333333] hover:text-primary p-1.5 rounded-full border border-gray-100 shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Visual Column */}
            <div className="w-full md:w-1/2 relative bg-gray-50 flex flex-col min-h-[200px] md:min-h-[350px]">
              <div className="absolute inset-0 bg-graph-paper opacity-30 pointer-events-none"></div>
              <img 
                src={selectedModel.imageUrl} 
                alt={selectedModel.title}
                className="w-full h-full object-cover mix-blend-multiply flex-grow"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white text-[#333333] text-[9px] font-mono font-bold px-3 py-1.5 border border-gray-200 uppercase tracking-widest shadow-sm rounded-sm">
                  {selectedModel.type}
                </span>
              </div>
            </div>
            
            {/* Details Column */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="font-mono text-primary font-bold text-[10px] tracking-widest uppercase mb-2 inline-block">
                  Specifications Sheet
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#333333] uppercase tracking-wide mb-3">
                  {selectedModel.title}
                </h2>
                <p className="text-[#333333] opacity-80 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                  {selectedModel.description}
                </p>
                
                <div className="border-t border-gray-200 pt-5 mb-6">
                  <h4 className="font-mono text-[#333333] font-bold text-[10px] tracking-wider uppercase mb-3">
                    Technical Specifications
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    {SPECIFICATIONS[selectedModel.id]?.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center text-xs pb-1 sm:pb-2 border-b border-gray-100">
                        <span className="text-[#333333] opacity-60 font-sans">{spec.label}</span>
                        <span className="text-[#333333] font-mono font-medium text-right ml-4">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-sm p-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-wider">Unit Price</span>
                  <span className="text-2xl font-mono font-bold text-[#333333] leading-none">${selectedModel.price}</span>
                </div>
                <button 
                  onClick={() => {
                    onAddToCart(selectedModel);
                    navigate('/models/#/overview');
                  }}
                  className="px-6 py-3 bg-primary hover:bg-blue-600 text-white font-sans text-xs font-bold tracking-wider uppercase rounded-sm flex items-center gap-2 transform active:scale-98 transition-all shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Models3D;
