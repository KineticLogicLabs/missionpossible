
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Models3D from './pages/Models3D';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Legal from './pages/Legal';
import { Page, CartItem, Resource } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

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

  // Handle Global Reveal Animations for static and dynamic content
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once it's active, we can stop observing this specific element
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeNewElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.active)');
      elements.forEach(el => revealObserver.observe(el));
    };

    // Initial observation of elements currently on the page
    observeNewElements();

    // Use MutationObserver to detect when the DOM changes (e.g., filtering search results)
    // and observe any new .reveal elements that appear.
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
  }, [currentPage]);

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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'resources':
        return <Resources onNavigate={setCurrentPage} />;
      case 'models':
        return <Models3D onAddToCart={addToCart} onNavigate={setCurrentPage} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'checkout':
        return <Checkout cart={cart} onRemove={removeFromCart} onNavigate={setCurrentPage} />;
      case 'privacy':
        return <Legal type="privacy" />;
      case 'terms':
        return <Legal type="terms" />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const shouldShowNavbarCart = cart.length > 0;
  const shouldShowFloatingCart = cart.length > 0 && currentPage === 'models';

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary selection:text-white bg-white dark:bg-black">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        cartCount={cart.length}
        showCart={shouldShowNavbarCart}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="flex-grow pt-24 md:pt-36">
        {renderPage()}
      </main>

      <Footer 
        onNavigate={setCurrentPage} 
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      {shouldShowFloatingCart && (
        <button 
          onClick={() => setCurrentPage('checkout')}
          className="fixed bottom-6 right-6 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform z-50 animate-bounce"
        >
          <span className="material-icons text-2xl">shopping_cart</span>
          <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-accent">
            {cart.length}
          </span>
        </button>
      )}
    </div>
  );
};

export default App;
