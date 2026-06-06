
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import Logo from './Logo';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  cartCount: number;
  showCart: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, showCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { 
      label: 'Home', 
      path: '/'
    },
    { 
      label: 'About', 
      path: '/about',
      subLinks: [
        { label: 'Inbound Overview', path: '/about/#/overview' },
        { label: 'Technical Brief', path: '/about/#/guide' },
        { label: 'The Creator', path: '/about/#/creator' },
        { label: 'Our Philosophy', path: '/about/#/philosophy' }
      ]
    },
    { 
      label: 'Resources', 
      path: '/resources',
      subLinks: [
        { label: 'Index Overview', path: '/resources/#/overview' },
        { label: 'Planning', path: '/resources/#/phase-1' },
        { label: 'Design', path: '/resources/#/phase-2' },
        { label: 'Construction', path: '/resources/#/phase-3' },
        { label: 'Competition', path: '/resources/#/phase-4' }
      ]
    },
    { 
      label: '3D Models', 
      path: '/models',
      subLinks: [
        { label: 'All Schematics', path: '/models' },
        { label: 'Universal Gearbox V2', path: '/models/#/universal-gearbox-v2' },
        { label: 'Timing Masterclass', path: '/models/#/timing-masterclass' },
        { label: 'Full Mission Assembly', path: '/models/#/full-mission-assembly' },
        { label: 'Why 3D Print?', path: '/models/#/advantages' }
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-200 bg-white/70 backdrop-blur-md px-6 h-16 lg:h-20 transition-all shadow-sm">
      <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center cursor-pointer group transition-transform duration-300 ease-out active:scale-95"
        >
          <Logo className="h-9 md:h-10 lg:h-11 w-auto" />
        </Link>
 
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 px-2 h-full">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group/nav h-full flex items-center">
              <NavLink
                to={link.path}
                className={({ isActive }) => `text-xs uppercase font-sans font-semibold tracking-wider transition-colors border-b-2 pb-0.5 flex items-center ${
                  isActive 
                    ? 'text-primary border-primary' 
                    : 'text-[#333333] border-transparent hover:text-primary'
                }`}
              >
                {link.label}
              </NavLink>

              {link.subLinks && (
                <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-1 w-56 bg-white border border-gray-200 shadow-lg rounded-sm py-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 origin-top pointer-events-auto z-[150] translate-y-2 group-hover/nav:translate-y-0">
                  <div className="absolute inset-0 bg-graph-paper opacity-10 z-0 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col">
                    {link.subLinks.slice(1).map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="px-4 py-2.5 text-left font-sans text-[10px] font-bold tracking-wider uppercase text-[#333333] hover:text-primary hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-105"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex items-center gap-4 pl-4 ml-2 border-l border-gray-200 h-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#333333] hover:text-primary transition-colors flex items-center justify-center border border-transparent hover:border-gray-200 rounded"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
 
            {showCart && cartCount > 0 && (
              <Link 
                to="/checkout"
                className="relative p-2 text-[#333333] hover:text-primary transition-colors flex items-center gap-2 border border-transparent hover:border-gray-200 rounded"
              >
                <span className="material-icons text-[16px]">shopping_cart</span>
                <span className="font-mono text-[10px] font-bold tracking-widest">[{cartCount}]</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-3 relative z-50">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-1 px-2 text-[#333333] hover:text-primary transition-colors focus:outline-none flex items-center justify-center transition-transform active:scale-95"
            title="Search"
          >
            <Search className="w-5.5 h-5.5 stroke-[1.8]" />
          </button>

          {showCart && cartCount > 0 && (
            <>
              <Link 
                to="/checkout"
                className="relative p-1 text-primary transition-colors flex items-center gap-1 active:scale-95"
              >
                <span className="material-icons text-[18px]">shopping_cart</span>
                <span className="font-mono text-[10px] font-bold">[{cartCount}]</span>
              </Link>
              {/* Elegant Divider */}
              <div className="h-5 w-[1px] bg-gray-200 self-center mx-1" />
            </>
          )}
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 px-2 flex flex-col justify-center items-center gap-[5px] focus:outline-none group transition-transform active:scale-95"
            aria-label="Toggle Menu"
          >
            <span className={`block h-[2px] w-5 bg-[#333333] transition-transform duration-300 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block h-[2px] w-5 bg-[#333333] transition-opacity duration-300 rounded-sm ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-[2px] w-5 bg-[#333333] transition-transform duration-300 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-md overflow-hidden"
          >
             <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex flex-col p-8 gap-6 relative z-10 bg-white m-4 border border-gray-200 shadow-sm rounded-sm"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + (idx * 0.05) }}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `text-sm font-sans font-bold tracking-wider text-left uppercase transition-colors block w-full ${
                      isActive ? 'text-primary' : 'text-[#333333] hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </NavLink>

                  {link.subLinks && (
                    <div className="mt-3 ml-3 pl-3 border-l border-gray-200 flex flex-col gap-2.5">
                      {link.subLinks.slice(1).map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-[10px] font-sans font-semibold tracking-wider uppercase text-[#333333]/70 hover:text-primary transition-colors py-0.5"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
