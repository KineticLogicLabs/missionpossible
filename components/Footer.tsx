
import React from 'react';
import { Page } from '../types';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, isDarkMode, toggleTheme }) => {
  return (
    <footer className="bg-neutral-50 dark:bg-black border-t border-black/5 dark:border-white/5 pt-16 pb-12 px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer group w-fit"
          >
            <Logo className="h-6 w-auto" />
          </div>
          <p className="text-[11px] leading-relaxed text-black/40 dark:text-slate-500 uppercase tracking-wider italic border-l-2 border-primary/30 dark:border-primary/30 pl-4">
            Kinetic Logic Labs is an independent educational resource provider. Not officially affiliated with Science Olympiad, Inc.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:justify-items-center">
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Explore</h4>
            <button onClick={() => onNavigate('home')} className="text-black/40 dark:text-white/40 text-[11px] uppercase tracking-widest font-bold hover:text-primary dark:hover:text-white text-left">Home</button>
            <button onClick={() => onNavigate('resources')} className="text-black/40 dark:text-white/40 text-[11px] uppercase tracking-widest font-bold hover:text-primary dark:hover:text-white text-left">Resources</button>
            <button onClick={() => onNavigate('models')} className="text-black/40 dark:text-white/40 text-[11px] uppercase tracking-widest font-bold hover:text-primary dark:hover:text-white text-left">3D Models</button>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Support</h4>
            <button onClick={() => onNavigate('about')} className="text-black/40 dark:text-white/40 text-[11px] uppercase tracking-widest font-bold hover:text-primary dark:hover:text-white text-left">About Us</button>
            <button onClick={() => onNavigate('privacy')} className="text-black/40 dark:text-white/40 text-[11px] uppercase tracking-widest font-bold hover:text-primary dark:hover:text-white text-left">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="text-black/40 dark:text-white/40 text-[11px] uppercase tracking-widest font-bold hover:text-primary dark:hover:text-white text-left">Terms</button>
          </div>
        </div>

        {/* Theme Toggle / Copyright */}
        <div className="flex flex-col items-start md:items-end gap-6">
          <a 
            href="https://kineticlogiclabs.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2"
          >
            <span className="material-icons text-sm">open_in_new</span>
            Visit Main Site
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"
            aria-label="Toggle Theme"
          >
            <span className="material-icons">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <div className="text-right">
            <p className="text-black/20 dark:text-white/20 text-[9px] uppercase tracking-[0.3em]">© 2026 Kinetic Logic Labs</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
