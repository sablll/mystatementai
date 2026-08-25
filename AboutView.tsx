/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Award, Users, Lock, EyeOff, Scale, Server } from 'lucide-react';
import { ActiveView } from '../types';

interface AboutViewProps {
  setView: (view: ActiveView) => void;
}

export default function AboutView({ setView }: AboutViewProps) {
  return (
    <div id="about-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Our Mission</span>
        <h1 className="font-display font-bold text-4xl text-slate-900 tracking-tight leading-tight">
          Unlocking Financial Silos With Intelligently Structured Data
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed font-normal">
          Founded in 2024, StatementAI was built by a team of CPAs, system architects, and AI researchers who grew tired of wasting hours copy-pasting transactions from messy PDFs into spreadsheets. 
        </p>
      </div>

      {/* 2. Visual Value Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "99.5% Parsing Accuracy",
            desc: "Our neural visual model reads statements row by row, ignoring background lines and correctly identifying decimal points.",
            icon: ShieldCheck,
            color: "text-blue-600 bg-blue-50"
          },
          {
            title: "Zero-Storage Privacy",
            desc: "We process sensitive ledger data on volatile, sandboxed RAM servers. Your transaction history is never logged or stored.",
            icon: EyeOff,
            color: "text-purple-600 bg-purple-50"
          },
          {
            title: "Instant Conversions",
            desc: "Convert a multi-page, complex annual statement in under 10 seconds. Save up to 40 hours per month of data entry.",
            icon: Server,
            color: "text-amber-600 bg-amber-50"
          },
          {
            title: "Open Financial Standards",
            desc: "Our outputs are standardized to flow natively into QuickBooks, Xero, Wave, or any custom ledger database.",
            icon: Scale,
            color: "text-emerald-600 bg-emerald-50"
          }
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4 hover:shadow-md transition">
            <div className={`p-3 rounded-xl w-fit ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Deep-Dive Security Architecture Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-400">
              <Lock className="h-3.5 w-3.5" />
              <span>Enterprise Cybersecurity Framework</span>
            </div>
            <h2 className="font-display font-bold text-3xl text-white tracking-tight">
              We protect your financial statement data with bank-grade security
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              We understand that bank statements contain highly confidential trade information. Our platform is architected with strict defensive layers to protect your client accounts from unauthorized viewing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
              <div className="flex items-center space-x-2.5">
                <span className="p-1 bg-blue-600/20 text-blue-400 rounded">✓</span>
                <span>End-to-End 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="p-1 bg-blue-600/20 text-blue-400 rounded">✓</span>
                <span>GDPR & CCPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="p-1 bg-blue-600/20 text-blue-400 rounded">✓</span>
                <span>Isolated RAM Sandbox Containers</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="p-1 bg-blue-600/20 text-blue-400 rounded">✓</span>
                <span>Independent Third-Party Audits</span>
              </div>
            </div>
          </div>

          {/* Compliance Badges Mockup */}
          <div className="lg:col-span-5 bg-slate-800/60 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-slate-400">Compliance & Security Standards</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <Award className="h-8 w-8 text-blue-400 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm text-white">SOC 2 Type II Certified</h5>
                  <p className="text-xs text-slate-500">Rigorous operational and security validation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm text-white">ISO/IEC 27001 Standard</h5>
                  <p className="text-xs text-slate-500">Highest certification in security governance</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                id="about-contact-btn"
                onClick={() => setView('contact')}
                className="text-xs text-blue-400 hover:text-white font-bold transition flex items-center justify-center space-x-1 mx-auto cursor-pointer"
              >
                <span>Request security documentation package</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Leadership / Team Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Our Leaders</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Backed By Financial & Software Experts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              name: "Eleanor Vance",
              role: "Co-Founder & CEO",
              bio: "Former Director of Finance at Stripe, Eleanor has over 15 years of corporate treasury and CPA audit experience.",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            },
            {
              name: "Liam O'Connor",
              role: "Chief Technology Officer",
              bio: "Ph.D. in Computer Vision from Stanford. Former Tech Lead for optical layout detection at Adobe Systems.",
              avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            },
            {
              name: "Amara Diallo",
              role: "VP of Product Engineering",
              bio: "Specialist in banking API frameworks and sandboxed secure runtimes. Led developer relations at Plaid.",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
              <img
                src={t.avatar}
                alt={t.name}
                referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-full mx-auto object-cover border border-slate-100"
              />
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-base text-slate-900">{t.name}</h4>
                <p className="text-xs text-blue-600 font-semibold uppercase font-mono tracking-wider">{t.role}</p>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                {t.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Final Banner */}
      <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100/50 text-center space-y-4 max-w-4xl mx-auto">
        <h3 className="font-display font-bold text-xl text-slate-900">Have specific security guidelines?</h3>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Our security team regularly assists Fortune 500 banks, compliance auditors, and law firms to establish customized data-privacy sandboxes and dedicated conversion servers.
        </p>
        <button
          id="about-final-contact-btn"
          onClick={() => setView('contact')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm cursor-pointer transition"
        >
          Contact Security Desk
        </button>
      </div>

    </div>
  );
}
