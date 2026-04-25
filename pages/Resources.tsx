import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface Phase {
  id: number;
  title: string;
  icon: string;
  sections: Section[];
}

const EngineeringNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-8 p-6 bg-primary/5 border border-primary/20 relative group reveal rounded-sm">
    <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">Process Note</span>
    </div>
    <div className="flex items-center gap-2 mb-3">
      <span className="material-icons text-primary text-[16px]">lightbulb</span>
      <span className="text-primary font-mono font-bold uppercase tracking-widest text-[10px]">Engineering Log</span>
    </div>
    <div className="text-[#333333] opacity-80 text-sm font-normal leading-relaxed font-sans">
      {children}
    </div>
  </div>
);

const PHASES: Phase[] = [
  {
    id: 1,
    title: 'Strategy',
    icon: 'insights',
    sections: [
      {
        id: 'rulebook',
        title: 'Rulebook Decoder',
        content: (
          <div className="space-y-6">
            <p className="font-normal text-[#333333] opacity-80 text-lg">The first step to winning Mission Possible is not building; it's reading. The rulebook contains hidden constraints that define the ceiling of your score.</p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#333333] border-b border-gray-200 pb-2 uppercase tracking-wide">Key Constraints</h2>
            <ul className="list-none pl-0 space-y-4 text-[#333333] opacity-80 font-normal">
              <li className="flex gap-4 border-l-2 border-primary/30 pl-4">
                <span className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mt-1">C.01</span>
                <span>Dimensions: 60cm x 60cm x 60cm is the absolute limit. Build to 58cm to account for measurement error.</span>
              </li>
              <li className="flex gap-4 border-l-2 border-primary/30 pl-4">
                <span className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mt-1">C.02</span>
                <span>Start/End Actions: Must be clearly visible and distinct from intermediate steps.</span>
              </li>
              <li className="flex gap-4 border-l-2 border-primary/30 pl-4">
                <span className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mt-1">C.03</span>
                <span>Timing: The target time is your best friend or your worst enemy.</span>
              </li>
            </ul>
            <EngineeringNote>
              Hindsight: We lost 40 points at Regionals because our "Start" action was partially obscured by a support pillar. Always prioritize visibility over compact design.
            </EngineeringNote>
          </div>
        )
      },
      {
        id: 'points',
        title: 'Points Matrix',
        content: (
          <div className="space-y-6">
            <p className="font-normal text-[#333333] opacity-80 text-lg">Not all actions are created equal. Use this matrix to prioritize high-value mechanical logic over complex but low-scoring steps.</p>
            <div className="overflow-x-auto relative mt-8">
              <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
              <table className="w-full border-collapse border border-gray-300 relative z-10 bg-white shadow-sm rounded-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-4 text-left font-mono text-[10px] font-bold text-[#333333] uppercase tracking-widest">Action Type</th>
                    <th className="p-4 text-left font-mono text-[10px] font-bold text-[#333333] uppercase tracking-widest">Difficulty</th>
                    <th className="p-4 text-left font-mono text-[10px] font-bold text-[#333333] uppercase tracking-widest">Points</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-mono text-[#333333]">
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4 uppercase tracking-wider">Chem to Mech</td>
                    <td className="p-4 text-red-500 font-bold uppercase tracking-wider">High</td>
                    <td className="p-4 font-bold">50</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 uppercase tracking-wider">Elec to Grav</td>
                    <td className="p-4 text-primary font-bold uppercase tracking-wider">Med</td>
                    <td className="p-4 font-bold">30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      { id: 'action', title: 'Action Selection', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Choose actions that you can replicate 100 times without failure. Complexity is the enemy of reliability.</p> },
      { id: 'roadmap', title: 'Season Roadmap', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Week 1-2: Prototyping. Week 3-4: Frame Construction. Week 5-8: Integration and Testing.</p> },
    ]
  },
  {
    id: 2,
    title: 'Architecture',
    icon: 'architecture',
    sections: [
      { id: 'zoning', title: 'Spatial Zoning', content: (
          <div className="space-y-6">
            <p className="font-normal text-[#333333] opacity-80 text-lg">Divide your 60cm cube into functional zones. Keep heavy components at the bottom for stability.</p>
            <EngineeringNote>
              Hindsight: We once placed a heavy lead-acid battery on a middle shelf. The machine wobbled during a high-speed trigger, causing a 0.5s timing drift. Always keep the center of gravity as low as possible.
            </EngineeringNote>
          </div>
        ) },
      { id: 'frame', title: 'Frame Fundamentals', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Use T-slot aluminum or 1/2" plywood. Rigidity is non-negotiable for timing consistency.</p> },
      { id: 'path', title: 'Path of Travel', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Map out the flow of energy. Avoid crossing paths to prevent accidental triggers.</p> },
      { id: 'cable', title: 'Cable Management', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Use zip ties and labels. A messy machine is a machine that fails during impound.</p> },
    ]
  },
  {
    id: 3,
    title: 'Fabrication',
    icon: 'precision_manufacturing',
    sections: [
      { id: 'cad', title: 'CAD to Physical', content: (
          <div className="space-y-6">
            <p className="font-normal text-[#333333] opacity-80 text-lg">Model everything in Onshape or Fusion 360 before cutting. Measure twice, print once.</p>
            <EngineeringNote>
              Hindsight: 3D prints are rarely the exact size of the CAD model. Always print a "tolerance test" block before committing to a 12-hour print for a critical gearbox.
            </EngineeringNote>
          </div>
        ) },
      { id: 'tolerances', title: 'Tolerances and Fit', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Account for 3D print shrinkage. Use 0.2mm clearance for moving parts.</p> },
      { id: 'bambu', title: 'Bambu P1S Optimization', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Use PETG for structural parts. 4 walls, 20% gyroid infill for maximum strength-to-weight.</p> },
      { id: 'hardware', title: 'Hardware Integration', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Standardize on M3 and M4 bolts. Keep a kit of spares in your pit box.</p> },
    ]
  },
  {
    id: 4,
    title: 'Reliability',
    icon: 'verified',
    sections: [
      { id: 'buffers', title: 'Timing Buffers', content: (
          <div className="space-y-6">
            <p className="font-normal text-[#333333] opacity-80 text-lg">Build in adjustable delays. Use sand timers or slow-moving gears to fine-tune your final time.</p>
            <EngineeringNote>
              Hindsight: Never rely on a single "perfect" run. Your machine will run differently in a cold gym than in your warm basement. Mechanical buffers are easier to adjust on the fly than redesigning a gear train.
            </EngineeringNote>
          </div>
        ) },
      { id: 'logs', title: 'Calibration Logs', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Record every run. Note temperature and humidity—they affect friction more than you think.</p> },
      { id: 'troubleshooting', title: 'Troubleshooting Flowcharts', content: <p className="font-normal text-[#333333] opacity-80 text-lg">If Step A fails, check Trigger B. Create a "If-Then" guide for your team.</p> },
      { id: 'environmental', title: 'Environmental Adjustments', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Be ready for the competition floor. It might be uneven or drafty.</p> },
    ]
  },
  {
    id: 5,
    title: 'Competition',
    icon: 'emoji_events',
    sections: [
      { id: 'tsl', title: 'TSL Mastery', content: <p className="font-normal text-[#333333] opacity-80 text-lg">The Technical Score Log is half the battle. Use our automated generator to ensure 0 penalties.</p> },
      { id: 'reset', title: '2-Minute Reset', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Practice resetting your machine under pressure. Use a checklist to ensure no steps are skipped.</p> },
      { id: 'pit', title: 'The Pit Kit', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Superglue, duct tape, extra batteries, and a soldering iron. If it can break, it will.</p> },
      { id: 'impound', title: 'Impound Survival Guide', content: <p className="font-normal text-[#333333] opacity-80 text-lg">Once you impound, you can't touch it. Ensure all triggers are locked and safe for transport.</p> },
    ]
  }
];

const Resources: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<number | null>(null);

  const activePhase = PHASES.find(p => p.id === activePhaseId);

  const handlePhaseSelect = (id: number) => {
    setActivePhaseId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!activePhaseId) {
    return (
      <div className="px-6 py-12 max-w-6xl mx-auto pb-40 relative z-10">
        <div className="mb-20 text-center reveal border-b border-gray-200 pb-12">
            <div className="flex justify-center mb-6">
                <span className="font-mono text-primary text-[10px] tracking-[0.2em] uppercase border border-primary/20 px-3 py-1 rounded bg-primary/5">
                    Resource Index
                </span>
            </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wide uppercase mb-6 text-[#333333]">
            The <span className="text-primary border-b-[6px] border-primary/20 pb-2 inline-block leading-none">Roadmap</span>
          </h1>
          <p className="text-[#333333] opacity-80 text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed pt-4">
            A phase-based engineering framework for Science Olympiad Mission Possible. 
            Select a phase to enter the lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal reveal-delay-1">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handlePhaseSelect(phase.id)}
              className="group relative bg-white border border-gray-200 p-8 text-left hover:border-primary/50 transition-all overflow-hidden shadow-sm flex flex-col rounded-sm"
            >
              <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-icons text-8xl">{phase.icon}</span>
              </div>
              <div className="relative z-10 flex-grow">
                <span className="font-mono text-primary font-bold text-[10px] uppercase tracking-widest mb-4 inline-block border border-primary/20 bg-primary/5 px-2 py-1 rounded-sm">Phase 0{phase.id}</span>
                <h3 className="text-2xl font-serif font-bold mb-4 text-[#333333] group-hover:text-primary transition-colors tracking-wide uppercase">{phase.title}</h3>
                <div className="space-y-2 mb-8">
                  {phase.sections.map(s => (
                      <p key={s.id} className="text-[#333333] opacity-70 text-[11px] font-mono leading-relaxed truncate tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary/50 rounded-sm"></span> {s.title}
                      </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-bold uppercase tracking-widest mt-auto group-hover:tracking-[0.2em] transition-all">
                Initialize Phase <span className="material-icons text-[14px]">arrow_forward</span>
              </div>
            </button>
          ))}
          
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => setActivePhaseId(null)}
          className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#333333] hover:text-primary mb-12 transition-colors border border-gray-200 px-4 py-2 bg-white rounded-sm shadow-sm"
        >
          <span className="material-icons text-[16px]">arrow_back</span>
          Back to Index
        </button>

        <div className="mb-20 border-b border-gray-200 pb-12">
          <span className="font-mono text-primary font-bold text-[10px] uppercase tracking-widest mb-4 inline-block border border-primary/20 bg-primary/5 px-2 py-1 rounded-sm">Phase 0{activePhase.id}</span>
          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-serif font-bold tracking-wide uppercase text-[#333333] mb-6">
            {activePhase.title}
          </h1>
        </div>

        <div className="space-y-24 pb-40">
          {activePhase.sections.map((section) => (
            <section key={section.id} id={section.id} className="reveal">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-[#333333] tracking-wide uppercase border-l-4 border-primary pl-4">
                {section.title}
              </h2>
              <div className="pl-5">
                {section.content}
              </div>
            </section>
          ))}
        </div>
    </div>
  );
};

export default Resources;
