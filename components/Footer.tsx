import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12 px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-graph-paper opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand */}
        <div className="space-y-6">
          <Link 
            to="/"
            className="flex items-center cursor-pointer group w-fit"
          >
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="space-y-4">
            <p className="text-[11px] leading-relaxed text-[#333333] opacity-70 font-sans">
              Kinetic Logic Labs is an independent educational resource provider. Not officially affiliated with Science Olympiad, Inc.
            </p>
            <div className="flex items-center gap-2 text-xs font-sans text-[#333333] opacity-70">
                <span className="material-icons text-[16px]">mail</span>
                <a href="mailto:kineticlogiclabs@gmail.com" className="hover:text-primary transition-colors hover:underline">kineticlogiclabs@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:justify-items-center">
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#333333] mb-2 border-b border-gray-200 pb-2">Explore</h4>
            <Link to="/" className="text-[#333333] opacity-70 text-xs font-sans hover:text-primary hover:opacity-100 transition-colors">Home</Link>
            <Link to="/about" className="text-[#333333] opacity-70 text-xs font-sans hover:text-primary hover:opacity-100 transition-colors">About</Link>
            <Link to="/resources" className="text-[#333333] opacity-70 text-xs font-sans hover:text-primary hover:opacity-100 transition-colors">Resources</Link>
            <Link to="/models" className="text-[#333333] opacity-70 text-xs font-sans hover:text-primary hover:opacity-100 transition-colors">3D Models</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#333333] mb-2 border-b border-gray-200 pb-2">Legal</h4>
            <Link to="/privacy" className="text-[#333333] opacity-70 text-xs font-sans hover:text-primary hover:opacity-100 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[#333333] opacity-70 text-xs font-sans hover:text-primary hover:opacity-100 transition-colors">Terms of Use</Link>
          </div>
        </div>

        {/* Action / Copyright */}
        <div className="flex flex-col items-start md:items-end gap-6 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-12">
        <div className="relative group flex items-center">
          <a 
            href="https://kineticlogiclabs.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white border border-gray-200 text-[#333333] text-[10px] font-sans font-bold tracking-wider rounded-sm hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-sm uppercase"
            title="Check out more cool stuff here!"
          >
            <span className="material-icons text-[14px]">open_in_new</span>
            Main Site
          </a>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#333333] text-white text-[10.5px] font-sans font-semibold rounded-sm opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md z-50">
            Check out more cool stuff here!
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#333333]"></span>
          </span>
        </div>
          
          <div className="text-left md:text-right space-y-3 pt-4">
            <p className="text-[#333333] text-[10px] font-sans font-bold tracking-wider uppercase">© 2026 Kinetic Logic Labs</p>
            <div className="text-[#333333] opacity-50 text-[10px] font-mono leading-relaxed space-y-1">
              <p>ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
