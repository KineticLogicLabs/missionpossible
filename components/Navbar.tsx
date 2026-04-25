
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface NavbarProps {
  cartCount: number;
  showCart: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, showCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resources', path: '/resources' },
    { label: 'Lab Notes', path: '/lab-notes' },
    { label: '3D Models', path: '/models' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-200 bg-white/70 backdrop-blur-md px-6 h-20 lg:h-24 transition-all shadow-sm">
      <div className="absolute inset-0 bg-graph-paper opacity-30 z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center cursor-pointer group transition-transform duration-300 ease-out active:scale-95"
        >
          <Logo className="h-10 md:h-12 lg:h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 px-2 h-full">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `text-xs uppercase font-sans font-semibold tracking-wider transition-colors border-b-2 pt-1 pb-1 flex items-center ${
                isActive 
                  ? 'text-primary border-primary' 
                  : 'text-[#333333] border-transparent hover:text-primary'
              }`}
            >
              {link.label}
            </NavLink>
          ))}
          
          <div className="flex items-center gap-4 pl-4 ml-2 border-l border-gray-200 h-6">
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
        <div className="flex md:hidden items-center gap-4">
          {showCart && cartCount > 0 && (
            <Link 
              to="/checkout"
              className="relative p-2 text-primary transition-colors flex items-center gap-1 border border-primary/20 rounded bg-white shadow-sm"
            >
              <span className="material-icons text-[16px]">shopping_cart</span>
              <span className="font-mono text-[10px] font-bold">[{cartCount}]</span>
            </Link>
          )}
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center gap-[4px] focus:outline-none group border border-gray-200 bg-white shadow-sm relative z-50 rounded-sm"
            aria-label="Toggle Menu"
          >
            <span className={`block h-[1px] w-[18px] bg-[#333333] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
            <span className={`block h-[1px] w-[18px] bg-[#333333] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-[1px] w-[18px] bg-[#333333] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
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
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `text-sm font-sans font-semibold tracking-wider text-left uppercase transition-colors pb-4 border-b border-gray-200 last:border-0 block w-full ${
                      isActive ? 'text-primary' : 'text-[#333333] hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
