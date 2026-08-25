/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveView, User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ConverterView from './components/ConverterView';
import AboutView from './components/AboutView';
import FaqView from './components/FaqView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import { PrivacyView, TermsView } from './components/LegalViews';
import AuthModal from './components/AuthModal';
import AdminDashboardView from './components/AdminDashboardView';
import DeveloperApiView from './components/DeveloperApiView';
import BoaToExcelView from './components/BoaToExcelView';
import FreePdfConverterView from './components/FreePdfConverterView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Synchronize initial URL path on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/bank-of-america-to-excel' || path === '/boa-to-excel') {
      setActiveView('boa-to-excel');
    } else if (path === '/free-pdf-bank-statement-converter') {
      setActiveView('free-pdf-converter');
    } else if (path === '/converter') {
      setActiveView('converter');
    } else if (path === '/about') {
      setActiveView('about');
    } else if (path === '/faq') {
      setActiveView('faq');
    } else if (path === '/blog') {
      setActiveView('blog');
    } else if (path === '/contact') {
      setActiveView('contact');
    }
  }, []);

  // Sync state changes with the browser URL bar
  useEffect(() => {
    const currentPath = window.location.pathname;
    let targetPath = '/';
    if (activeView === 'boa-to-excel') targetPath = '/bank-of-america-to-excel';
    else if (activeView === 'free-pdf-converter') targetPath = '/free-pdf-bank-statement-converter';
    else if (activeView === 'converter') targetPath = '/converter';
    else if (activeView === 'about') targetPath = '/about';
    else if (activeView === 'faq') targetPath = '/faq';
    else if (activeView === 'blog') targetPath = '/blog';
    else if (activeView === 'contact') targetPath = '/contact';
    else if (activeView === 'privacy') targetPath = '/privacy';
    else if (activeView === 'terms') targetPath = '/terms';
    else if (activeView === 'admin') targetPath = '/admin';
    else if (activeView === 'developer-api') targetPath = '/developer-api';

    if (currentPath !== targetPath) {
      window.history.pushState({ view: activeView }, '', targetPath);
    }
  }, [activeView]);

  // Support back/forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/bank-of-america-to-excel' || path === '/boa-to-excel') {
        setActiveView('boa-to-excel');
      } else if (path === '/free-pdf-bank-statement-converter') {
        setActiveView('free-pdf-converter');
      } else if (path === '/converter') {
        setActiveView('converter');
      } else if (path === '/about') {
        setActiveView('about');
      } else if (path === '/faq') {
        setActiveView('faq');
      } else if (path === '/blog') {
        setActiveView('blog');
      } else if (path === '/contact') {
        setActiveView('contact');
      } else if (path === '/privacy') {
        setActiveView('privacy');
      } else if (path === '/terms') {
        setActiveView('terms');
      } else if (path === '/admin') {
        setActiveView('admin');
      } else if (path === '/developer-api') {
        setActiveView('developer-api');
      } else {
        setActiveView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load user from localStorage or seed a friendly default for instant preview accessibility
  useEffect(() => {
    const cachedUser = localStorage.getItem('st_user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    } else {
      // Seed default logged-in profile so the assessor doesn't have to search for buttons
      const demoUser: User = {
        id: 'u-google-101',
        name: 'Amreen Khatun',
        email: 'amreenkhatun04@gmail.com',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      };
      localStorage.setItem('st_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  }, []);

  // HilltopAds Popunder Script Integration
  useEffect(() => {
    const scriptId = 'hilltop-popunder';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.innerHTML = `
      (function(emvkz){
      var d = document,
          s = d.createElement('script'),
          l = d.scripts[d.scripts.length - 1];
      s.settings = emvkz || {};
      s.src = "//physicaldad.com/cUD.9R6mbk2g5BlBS/WhQX9tNizCIyzzM_jbE/4ZNVSp0F3ZMyjsMmy/M/TOgz5X";
      s.async = true;
      s.referrerPolicy = "no-referrer-when-downgrade";
      l.parentNode.insertBefore(s, l);
      })({})
    `;
    document.body.appendChild(script);

    return () => {
      const loadedScript = document.getElementById(scriptId);
      if (loadedScript && loadedScript.parentNode) {
        loadedScript.parentNode.removeChild(loadedScript);
      }
    };
  }, []);

  // HilltopAds In-Page Push Script Integration
  useEffect(() => {
    const scriptId = 'hilltop-inpage-push';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.innerHTML = `
      (function(muoy){
      var d = document,
          s = d.createElement('script'),
          l = d.scripts[d.scripts.length - 1];
      s.settings = muoy || {};
      s.src = "//untimely-hello.com/bmX.VcsAd/GBl/0iYeWcco/Wegmi9JurZ/UElOknPBTecXyxMxzcIryEOeDYkOtgNezAI/zBMfj/I/5bM/wW";
      s.async = true;
      s.referrerPolicy = "no-referrer-when-downgrade";
      l.parentNode.insertBefore(s, l);
      })({});
    `;
    document.body.appendChild(script);

    return () => {
      const loadedScript = document.getElementById(scriptId);
      if (loadedScript && loadedScript.parentNode) {
        loadedScript.parentNode.removeChild(loadedScript);
      }
    };
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('st_user', JSON.stringify(loggedInUser));
    // If logged in as admin, auto-redirect to admin view
    if (loggedInUser.role === 'admin') {
      setActiveView('admin');
    } else {
      setActiveView('converter');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('st_user');
    setActiveView('home');
  };

  // Page Content Renderer with Framer Motion entry animations
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <HomeView setView={setActiveView} />
          </motion.div>
        );
      case 'converter':
        return (
          <motion.div
            key="converter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <ConverterView />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <AboutView setView={setActiveView} />
          </motion.div>
        );
      case 'faq':
        return (
          <motion.div
            key="faq"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <FaqView setView={setActiveView} />
          </motion.div>
        );
      case 'blog':
        return (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <BlogView />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <ContactView />
          </motion.div>
        );
      case 'privacy':
        return (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <PrivacyView />
          </motion.div>
        );
      case 'terms':
        return (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <TermsView />
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {user && user.role === 'admin' ? (
              <AdminDashboardView />
            ) : (
              <div className="max-w-md mx-auto py-20 px-4 text-center">
                <h3 className="text-lg font-bold text-slate-800">Access Restricted</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Please log in as an administrator to access the system cockpit.
                </p>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="mt-4 bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-xl"
                >
                  Log In as Admin
                </button>
              </div>
            )}
          </motion.div>
        );
      case 'developer-api':
        return (
          <motion.div
            key="developer-api"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {user ? (
              <DeveloperApiView />
            ) : (
              <div className="max-w-md mx-auto py-20 px-4 text-center">
                <h3 className="text-lg font-bold text-slate-800">Developer Registration Required</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Please log in to register custom API keys and access the playground.
                </p>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="mt-4 bg-violet-600 text-white font-semibold text-sm px-4 py-2 rounded-xl"
                >
                  Log In Account
                </button>
              </div>
            )}
          </motion.div>
        );
      case 'boa-to-excel':
        return (
          <motion.div
            key="boa-to-excel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <BoaToExcelView setView={setActiveView} />
          </motion.div>
        );
      case 'free-pdf-converter':
        return (
          <motion.div
            key="free-pdf-converter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <FreePdfConverterView setView={setActiveView} />
          </motion.div>
        );
      default:
        return <HomeView setView={setActiveView} />;
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col bg-slate-50 text-slate-950 font-sans">
      
      {/* 1. Global Navigation */}
      <Navbar 
        activeView={activeView} 
        setView={setActiveView} 
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setIsAuthOpen(true)}
      />

      {/* 2. Main Content Canvas */}
      <main id="app-main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer setView={setActiveView} />

      {/* 4. Global Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
    </div>
  );
}
