/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, FileSpreadsheet, Sparkles, LogIn, LogOut, ShieldAlert, Key, User as UserIcon } from 'lucide-react';
import { ActiveView, User } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setView: (view: ActiveView) => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navbar({ activeView, setView, user, onLogout, onLoginClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems: { label: string; view: ActiveView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Converter', view: 'converter' },
    { label: 'About', view: 'about' },
    { label: 'FAQ', view: 'faq' },
    { label: 'Blog', view: 'blog' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setView(view);
    setIsOpen(false);
    setShowProfileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav id="app-navbar" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              id="navbar-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 cursor-pointer focus:outline-hidden"
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900 block">
                  Statement<span className="text-blue-600">AI</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 block -mt-1 uppercase">
                  Statement Parser
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                id={`nav-desktop-${item.view}`}
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-2.5 py-2 rounded-md text-xs lg:text-sm font-semibold transition-all duration-250 cursor-pointer ${
                  activeView === item.view
                    ? 'text-blue-600 bg-blue-50/50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Role-based tabs (Admin) */}
            {user && user.role === 'admin' && (
              <button
                id="nav-desktop-admin"
                onClick={() => handleNavClick('admin')}
                className={`px-2.5 py-2 rounded-md text-xs lg:text-sm font-bold text-red-600 flex items-center space-x-1 cursor-pointer transition-colors ${
                  activeView === 'admin' ? 'bg-red-50/80' : 'hover:bg-slate-50'
                }`}
              >
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Role-based tabs (Developer API) */}
            {user && (
              <button
                id="nav-desktop-developer-api"
                onClick={() => handleNavClick('developer-api')}
                className={`px-2.5 py-2 rounded-md text-xs lg:text-sm font-bold text-violet-600 flex items-center space-x-1 cursor-pointer transition-colors ${
                  activeView === 'developer-api' ? 'bg-violet-50/80' : 'hover:bg-slate-50'
                }`}
              >
                <Key className="h-4 w-4 shrink-0" />
                <span>Developer API</span>
              </button>
            )}
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

            {/* Account Profile and Authentication Button */}
            {user ? (
              <div className="relative">
                <button
                  id="navbar-profile-menu-trigger"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-all cursor-pointer focus:outline-hidden"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-full object-cover shrink-0"
                  />
                  <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate pr-1.5 hidden lg:inline-block">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-150 rounded-xl shadow-xl py-1.5 z-50 text-xs font-medium text-slate-700 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{user.email}</p>
                    </div>
                    
                    {user.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600 font-bold flex items-center space-x-1.5 cursor-pointer"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        <span>Admin Cockpit</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleNavClick('developer-api')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Key className="h-4 w-4" />
                      <span>Developer API</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-rose-600 flex items-center space-x-1.5 border-t border-slate-100 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                onClick={onLoginClick}
                className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Log In</span>
              </button>
            )}

            <button
              id="nav-cta-btn"
              onClick={() => handleNavClick('converter')}
              className="ml-2 flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg shadow-blue-500/10 focus:outline-hidden"
            >
              <Sparkles className="h-4 w-4" />
              <span>Start Converting</span>
            </button>
          </div>

          {/* Hamburger button */}
          <div className="flex items-center md:hidden gap-3">
            {user && (
              <img
                src={user.avatar}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full border border-slate-200 object-cover shrink-0"
              />
            )}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-b border-slate-100 shadow-xl animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-sm">
            {navItems.map((item) => (
              <button
                id={`nav-mobile-${item.view}`}
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-4 py-3 rounded-md font-semibold cursor-pointer transition-colors ${
                  activeView === item.view
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {user && user.role === 'admin' && (
              <button
                id="nav-mobile-admin"
                onClick={() => handleNavClick('admin')}
                className="block w-full text-left px-4 py-3 rounded-md font-bold text-red-600 hover:bg-slate-50"
              >
                Admin Panel Dashboard
              </button>
            )}

            {user && (
              <button
                id="nav-mobile-developer-api"
                onClick={() => handleNavClick('developer-api')}
                className="block w-full text-left px-4 py-3 rounded-md font-bold text-violet-600 hover:bg-slate-50"
              >
                Developer API Dashboard
              </button>
            )}

            <div className="px-4 py-3 border-t border-slate-150 space-y-2">
              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 rounded-lg font-bold"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  <span>Log Out ({user.name})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-bold"
                >
                  <LogIn className="h-4.5 w-4.5" />
                  <span>Log In Account</span>
                </button>
              )}

              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleNavClick('converter')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md cursor-pointer transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                <span>Start Converting Free</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
