/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileSpreadsheet, Shield, Mail, Heart, Github } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  setView: (view: ActiveView) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleLinkClick = (view: ActiveView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-md flex items-center justify-center">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                Statement<span className="text-blue-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Convert any PDF bank statement into clean, perfectly structured Excel, CSV, or JSON spreadsheets in seconds. Powered by secure financial-layout AI.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 rounded-md w-fit">
              <Shield className="h-3.5 w-3.5" />
              <span>SOC2 Compliant & AES-256 Encrypted</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-converter"
                  onClick={() => handleLinkClick('converter')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  PDF Converter
                </button>
              </li>
              <li>
                <button
                  id="footer-link-faq"
                  onClick={() => handleLinkClick('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Supported Banks
                </button>
              </li>
              <li>
                <button
                  id="footer-link-boa"
                  onClick={() => handleLinkClick('boa-to-excel')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center space-x-1"
                >
                  <span>BoA to Excel</span>
                  <span className="bg-blue-600/30 text-blue-300 text-[8px] font-bold px-1 py-0.2 rounded font-mono uppercase shrink-0">USA</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-free-pdf"
                  onClick={() => handleLinkClick('free-pdf-converter')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center space-x-1"
                >
                  <span>Free PDF Converter</span>
                  <span className="bg-emerald-600/30 text-emerald-300 text-[8px] font-bold px-1 py-0.2 rounded font-mono uppercase shrink-0">Free</span>
                </button>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 line-through">API Integration</span>
                  <span className="bg-blue-900/60 text-blue-300 text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase font-mono">
                    Soon
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  id="footer-link-blog"
                  onClick={() => handleLinkClick('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Insights Blog
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={() => handleLinkClick('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  onClick={() => handleLinkClick('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-800 flex items-center space-x-1.5">
                  <Mail className="h-3 w-3 text-blue-500" />
                  <span>support@statementai.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 StatementAI Inc. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Built with precision for flawless financial bookkeeping.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
