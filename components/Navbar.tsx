
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
  cartCount: number;
  showCart: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, showCart, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources' },
    { label: '3D Models', path: '/models' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-nav border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-black/75 px-6 py-5 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with Hover Scale Effect */}
        <Link 
          to="/"
          className="flex items-center cursor-pointer group transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
        >
          <Logo className="h-10 md:h-14 w-auto transition-colors group-hover:text-primary" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `text-sm md:text-base font-semibold tracking-wide transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-black/60 dark:text-white/60 hover:text-primary dark:hover:text-primary'
              }`}
            >
              {link.label}
            </NavLink>
          ))}
          
          <div className="flex items-center gap-4 border-l border-black/10 dark:border-white/10 pl-8 ml-2">
            {showCart && cartCount > 0 && (
              <Link 
                to="/checkout"
                className="relative p-2 text-black/50 dark:text-white/50 hover:text-primary transition-colors"
              >
                <span className="material-icons text-2xl">shopping_cart</span>
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-4">
          {showCart && cartCount > 0 && (
            <Link 
              to="/checkout"
              className="relative p-1 text-primary"
            >
              <span className="material-icons text-2xl">shopping_cart</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>
          )}
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
            aria-label="Toggle Menu"
          >
            <span className={`hamburger-line block h-0.5 w-6 group-hover:bg-primary ${isMenuOpen ? 'rotate-45 translate-y-2 bg-primary' : 'bg-black dark:bg-white'}`}></span>
            <span className={`hamburger-line block h-0.5 w-6 group-hover:bg-primary ${isMenuOpen ? 'opacity-0 scale-x-0' : 'bg-black dark:bg-white'}`}></span>
            <span className={`hamburger-line block h-0.5 w-6 group-hover:bg-primary ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-primary' : 'bg-black dark:bg-white'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 animate-in slide-in-from-top duration-300 shadow-2xl">
          <div className="flex flex-col p-10 gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `text-xl font-semibold text-left transition-colors ${
                  isActive ? 'text-primary' : 'text-black/60 dark:text-white/60 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
