
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
import LabNotes from './pages/LabNotes';
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
  const location = useLocation();

  useEffect(() => {
    // Initialize Lemon Squeezy event handler for blur effect
    const setupLS = () => {
      const LS = (window as any).LemonSqueezy;
      if (LS) {
        LS.Setup({
          eventHandler: (event: any) => {
            if (event.event === 'Checkout.Opened') {
              document.body.classList.add('checkout-active');
            } else if (event.event === 'Checkout.Closed') {
              document.body.classList.remove('checkout-active');
            }
          }
        });
        return true;
      }
      return false;
    };

    const isSetup = setupLS();
    if (!isSetup) {
      const timer = setInterval(() => {
        if (setupLS()) clearInterval(timer);
      }, 500);
      return () => clearInterval(timer);
    }
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-[#333333]">
      <ScrollToTop />
      <AnimationHandler />
      
      <Navbar 
        cartCount={cart.length}
        showCart={shouldShowNavbarCart}
      />
      
      <main className="flex-grow pt-24 md:pt-36">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/models" element={<Models3D onAddToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/lab-notes" element={<LabNotes />} />
          <Route path="/checkout" element={<Checkout cart={cart} onRemove={removeFromCart} />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      
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
