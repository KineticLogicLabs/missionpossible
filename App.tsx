
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Models3D from './pages/Models3D';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Legal from './pages/Legal';
import { CartItem, Resource } from './types';

// ScrollToTop component to handle scroll reset on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Animation handler component
const AnimationHandler: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeNewElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.active)');
      elements.forEach(el => revealObserver.observe(el));
    };

    observeNewElements();

    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const addToCart = (resource: Resource) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === resource.id);
      if (existing) return prev;
      return [...prev, { ...resource, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const shouldShowNavbarCart = cart.length > 0;
  const shouldShowFloatingCart = cart.length > 0 && location.pathname === '/models';

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary selection:text-white bg-white dark:bg-black">
      <ScrollToTop />
      <AnimationHandler />
      
      <Navbar 
        cartCount={cart.length}
        showCart={shouldShowNavbarCart}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="flex-grow pt-24 md:pt-36">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/models" element={<Models3D onAddToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout cart={cart} onRemove={removeFromCart} />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer 
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      {shouldShowFloatingCart && (
        <a 
          href="#/checkout"
          className="fixed bottom-6 right-6 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform z-50 animate-bounce"
        >
          <span className="material-icons text-2xl">shopping_cart</span>
          <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-accent">
            {cart.length}
          </span>
        </a>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
