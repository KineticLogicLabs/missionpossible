import React from 'react';

const LabNotes: React.FC = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-32 pb-40 relative z-10">
      {/* Introduction */}
      <section className="reveal relative pb-12 border-b border-gray-200">
        <div className="mb-6 flex items-center gap-2 text-primary font-mono text-[10px] tracking-widest uppercase font-bold">
          <span className="w-8 h-[1px] bg-primary"></span>
          Log Archive
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif font-bold leading-[1.1] text-[#333333] mb-8 tracking-wide uppercase">
          Lab <br/>
          <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Notes</span> & Logs
        </h1>
        <p className="text-[#333333] opacity-80 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
          A dedicated space for technical documentation, experimental results, and engineering logs. This section is currently under development.
        </p>
      </section>

      {/* Placeholder Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="reveal reveal-delay-1 border border-gray-200 p-12 bg-white shadow-sm relative group overflow-hidden rounded-sm">
          <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
          <div className="absolute top-0 right-0 p-3">
             <span className="font-mono text-[9px] text-[#333333] opacity-40 font-bold uppercase tracking-widest">Draft 01</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 border border-gray-200 bg-white flex items-center justify-center rounded-sm">
                <span className="material-symbols-outlined text-primary text-2xl">edit_note</span>
                </div>
                <h2 className="text-2xl font-serif font-bold tracking-wide text-[#333333] uppercase">Experimental Data</h2>
            </div>
            <div className="space-y-10">
                <div>
                <h3 className="text-primary font-mono text-xs font-bold tracking-widest mb-3 uppercase">Coming Soon</h3>
                <p className="text-[#333333] opacity-70 text-base leading-relaxed font-normal">
                    Detailed logs of mechanical logic tests and timing module calibrations will be archived here for reference.
                </p>
                </div>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-2 border border-primary/20 p-12 bg-primary/5 shadow-sm flex flex-col justify-center text-center relative overflow-hidden rounded-sm">
          <div className="absolute top-0 left-0 p-3">
             <span className="font-mono text-[9px] text-primary opacity-50 font-bold uppercase tracking-widest">System Status</span>
          </div>
          <div className="relative z-10">
            <div className="mb-10">
                <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-white">
                <span className="material-icons text-4xl text-primary">construction</span>
                </div>
                <h2 className="text-2xl font-serif font-bold tracking-wide text-[#333333] uppercase">Under Construction</h2>
            </div>
            <p className="text-[#333333] opacity-90 text-sm leading-relaxed font-normal mb-8 font-mono tracking-widest">
                We are currently compiling our engineering logs and technical documentation. Check back soon for updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabNotes;
