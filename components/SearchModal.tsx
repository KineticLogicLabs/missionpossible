import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchItem {
  id: string;
  title: string;
  category: 'resources' | 'models' | 'pages';
  path: string;
  state?: {
    phaseId?: number;
    sectionId?: string;
  };
}

const SEARCH_INDEX: SearchItem[] = [
  // General Pages
  { id: 'page-home', title: 'Home', category: 'pages', path: '/' },
  { id: 'page-about', title: 'About', category: 'pages', path: '/about' },
  { id: 'page-resources', title: 'Roadmap Index', category: 'pages', path: '/resources' },
  { id: 'page-models', title: '3D Designs Catalog', category: 'pages', path: '/models' },

  // 3D Models
  { id: 'model-gearbox', title: 'Universal Gearbox V2', category: 'models', path: '/models' },
  { id: 'model-timing', title: 'Timing Masterclass Guide', category: 'models', path: '/models' },
  { id: 'model-assembly', title: 'Full Mission Assembly', category: 'models', path: '/models' },

  // Resources - Phase 1
  { id: 'res-rulebook', title: 'Rulebook Decoder', category: 'resources', path: '/resources?phase=1&section=rulebook', state: { phaseId: 1, sectionId: 'rulebook' } },
  { id: 'res-points', title: 'Points Matrix', category: 'resources', path: '/resources?phase=1&section=points', state: { phaseId: 1, sectionId: 'points' } },
  { id: 'res-action', title: 'Action Selection Guide', category: 'resources', path: '/resources?phase=1&section=action', state: { phaseId: 1, sectionId: 'action' } },
  { id: 'res-roadmap', title: 'Season Roadmap', category: 'resources', path: '/resources?phase=1&section=roadmap', state: { phaseId: 1, sectionId: 'roadmap' } },

  // Resources - Phase 2
  { id: 'res-zoning', title: 'Spatial Zoning Design', category: 'resources', path: '/resources?phase=2&section=zoning', state: { phaseId: 2, sectionId: 'zoning' } },
  { id: 'res-frame', title: 'Frame Fundamentals', category: 'resources', path: '/resources?phase=2&section=frame', state: { phaseId: 2, sectionId: 'frame' } },
  { id: 'res-path', title: 'Path of Travel Physics', category: 'resources', path: '/resources?phase=2&section=path', state: { phaseId: 2, sectionId: 'path' } },
  { id: 'res-cable', title: 'Cable Management Protocols', category: 'resources', path: '/resources?phase=2&section=cable', state: { phaseId: 2, sectionId: 'cable' } },

  // Resources - Phase 3
  { id: 'res-cad', title: 'CAD to Physical', category: 'resources', path: '/resources?phase=3&section=cad', state: { phaseId: 3, sectionId: 'cad' } },
  { id: 'res-tolerances', title: 'Tolerances and Fit Calculations', category: 'resources', path: '/resources?phase=3&section=tolerances', state: { phaseId: 3, sectionId: 'tolerances' } },
  { id: 'res-bambu', title: 'Bambu P1S Optimization Settings', category: 'resources', path: '/resources?phase=3&section=bambu', state: { phaseId: 3, sectionId: 'bambu' } },
  { id: 'res-hardware', title: 'Hardware Integration Spec', category: 'resources', path: '/resources?phase=3&section=hardware', state: { phaseId: 3, sectionId: 'hardware' } },

  // Resources - Phase 4
  { id: 'res-buffers', title: 'Timing Buffers Calibration', category: 'resources', path: '/resources?phase=4&section=buffers', state: { phaseId: 4, sectionId: 'buffers' } },
  { id: 'res-logs', title: 'Calibration Logs Database', category: 'resources', path: '/resources?phase=4&section=logs', state: { phaseId: 4, sectionId: 'logs' } },
  { id: 'res-troubleshooting', title: 'Troubleshooting Flowcharts', category: 'resources', path: '/resources?phase=4&section=troubleshooting', state: { phaseId: 4, sectionId: 'troubleshooting' } },
  { id: 'res-environmental', title: 'Environmental Adjustments', category: 'resources', path: '/resources?phase=4&section=environmental', state: { phaseId: 4, sectionId: 'environmental' } },

  // Resources - Phase 5
  { id: 'res-tsl', title: 'TSL Technical Score Log', category: 'resources', path: '/resources?phase=5&section=tsl', state: { phaseId: 5, sectionId: 'tsl' } },
  { id: 'res-reset', title: '2-Minute Reset Practices', category: 'resources', path: '/resources?phase=5&section=reset', state: { phaseId: 5, sectionId: 'reset' } },
  { id: 'res-pit', title: 'The Pit Kit Checklist', category: 'resources', path: '/resources?phase=5&section=pit', state: { phaseId: 5, sectionId: 'pit' } },
  { id: 'res-impound', title: 'Impound Survival Guide', category: 'resources', path: '/resources?phase=5&section=impound', state: { phaseId: 5, sectionId: 'impound' } }
];

interface SearchModalProps {
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Lock scrolling on document body
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const items = query.trim() === '' ? [] : filteredResults;
      const count = items.length;

      if (count === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % count);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + count) % count);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[selectedIndex]) {
          handleSelect(items[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const filteredResults = SEARCH_INDEX.filter((item) => {
    const q = query.trim();
    if (!q) return false;
    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escapedQuery, 'i');
    return regex.test(item.title);
  });

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.state) {
      navigate(item.path, { state: item.state });
    } else {
      navigate(item.path);
    }
  };

  const activeItems = query.trim() === '' ? [] : filteredResults;

  return (
    <div className="fixed inset-0 z-[190] select-none">
      {/* Liquid Glass Dark-Toned Backdrop to blur and fade out the rest of the site */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-[#333333]/30 backdrop-blur-[10px] pointer-events-auto" 
        onClick={onClose} 
      />

      {/* Header Container that REPLACES the main header */}
      <motion.div 
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 h-20 lg:h-24 bg-white border-b border-gray-100 z-[195] pointer-events-auto shadow-sm"
      >
        <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-8 relative z-10 gap-x-4">
          
          {/* Thin, Precise Search Icon on Left */}
          <div className="flex items-center shrink-0 gap-x-4">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-primary stroke-[2]" />
            <div className="w-[1px] h-6 md:h-8 bg-gray-300" />
          </div>

          {/* Core Minimalist Big Input Block */}
          <div className="flex-1 min-w-[120px]">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent border-none outline-none font-sans font-bold text-xl sm:text-2xl md:text-3.5xl uppercase tracking-widest text-[#333333] placeholder-[#333333]/15 focus:ring-0 py-1"
              placeholder="SEARCH"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
          </div>

          {/* Minimal Wordless Cancel Button */}
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-[#333333] transition-all hover:bg-gray-50 rounded-full active:scale-95 shrink-0"
            title="Close Search"
          >
            <X className="w-6 h-6 md:w-8 md:h-8 stroke-[1.8]" />
          </button>
        </div>

        {/* Sharp Blue Horizontal Line across the bottom of the section */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary z-20" />
      </motion.div>

      {/* Floating Suggestions List Directly Underneath the Header */}
      <AnimatePresence>
        {query.trim() !== '' && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-20 lg:top-24 left-0 right-0 bg-white border-b border-gray-200 shadow-md pointer-events-auto z-[195]"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-2">
              {activeItems.length > 0 ? (
                <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-100 pr-1">
                  {activeItems.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all duration-150 ${
                          isSelected 
                            ? 'bg-gray-50 text-primary pl-6' 
                            : 'bg-transparent text-[#333333]'
                        }`}
                      >
                        <span className="font-sans font-bold text-xs uppercase tracking-wider">
                          {item.title}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-150 ${
                          isSelected ? 'text-primary translate-x-1' : 'text-gray-300'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="font-sans font-bold text-xs uppercase tracking-widest text-[#333333]/40">
                    No Results Found
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
