/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Shield, Sparkles, LogIn, Lock, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        const isUserAdmin = email.toLowerCase() === 'admin@statementai.com';
        const user: User = {
          id: `u-${Math.random().toString(36).substr(2, 9)}`,
          name: name || (isUserAdmin ? 'System Administrator' : email.split('@')[0]),
          email: email,
          role: isUserAdmin ? 'admin' : 'user',
          avatar: isUserAdmin 
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
            : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
        };
        onLoginSuccess(user);
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError('');
    
    // Simulate real Google Sign In workflow
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        const user: User = {
          id: 'u-google-101',
          name: 'Amreen Khatun',
          email: 'amreenkhatun04@gmail.com',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
        };
        onLoginSuccess(user);
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  const loadAdminDemo = () => {
    setEmail('admin@statementai.com');
    setName('Admin System');
    setIsSignUp(false);
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        id="auth-modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white relative">
          <button
            id="auth-modal-close"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-white/15 p-1.5 rounded-lg">
              <Shield className="h-5 w-5 text-blue-200" />
            </div>
            <span className="text-xs uppercase font-mono tracking-widest text-blue-200">StatementAI Ledger Sync</span>
          </div>
          <h2 className="text-2xl font-display font-bold">
            {isSignUp ? 'Create your Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-blue-100 mt-1">
            Access secure offline statements, audit reports, and developer APIs.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-4 animate-bounce">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Authentication Successful</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Synchronizing secure transaction vaults...
                </p>
              </motion.div>
            ) : (
              <motion.div key="form">
                {/* Simulated Google SSO Button */}
                <button
                  id="auth-google-btn"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-xs hover:shadow-sm cursor-pointer mb-5 disabled:opacity-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative mb-5">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-400 font-mono">Or secure email</span></div>
                </div>

                {error && (
                  <div className="mb-4 text-xs font-semibold bg-rose-50 border border-rose-100 text-rose-600 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        id="auth-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                      <input
                        id="auth-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Passcode / Password</label>
                      {!isSignUp && (
                        <button
                          id="auth-forgot-pass"
                          type="button"
                          onClick={() => setError('Password resets are automated. Please log in with Google for single-click access.')}
                          className="text-xs text-blue-600 hover:underline cursor-pointer"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                      <input
                        id="auth-pass-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    id="auth-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg shadow-blue-500/10 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <LogIn className="h-4.5 w-4.5" />
                    <span>{loading ? 'Authenticating...' : isSignUp ? 'Sign Up' : 'Sign In'}</span>
                  </button>
                </form>

                {/* Switch Login Mode & Quick Demo triggers */}
                <div className="mt-6 flex flex-col items-center space-y-3 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    {isSignUp ? 'Already have an account?' : 'Need a local secure locker?'}
                    <button
                      id="auth-toggle-mode"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError('');
                      }}
                      className="ml-1 text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      id="demo-admin-login"
                      type="button"
                      onClick={loadAdminDemo}
                      className="text-[11px] font-mono font-semibold bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      Demo Admin Login
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
