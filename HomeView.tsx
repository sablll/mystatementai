/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  FileCheck, 
  Table, 
  Database, 
  RefreshCcw, 
  Lock,
  ChevronRight,
  Star
} from 'lucide-react';
import { ActiveView } from '../types';
import { TESTIMONIALS } from '../data/mockData';

interface HomeViewProps {
  setView: (view: ActiveView) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  // Advertisement Settings (Temporarily disabled - set to true to restore ads)
  const ENABLE_ADS = false;
  const bannerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ENABLE_ADS) return;
    if (!bannerRef.current) return;

    // Clear any previous failed or stale banner content
    bannerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.innerHTML = `
(function(veuch){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = veuch || {};
s.src = "//untimely-hello.com/blXzV.sddrGQlG0fY/WIcc/Eevmy9/udZOUJl_kDPxTFcDytM/z/I/xiN/jNkEtYNHziI/z/MSj-EU3bMswW";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({});
    `;
    
    bannerRef.current.appendChild(script);

    return () => {
      if (bannerRef.current) {
        bannerRef.current.innerHTML = '';
      }
    };
  }, [ENABLE_ADS]);

  // Interactive ROI Estimator States
  const [statementsCount, setStatementsCount] = useState(15);
  const [pagesCount, setPagesCount] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(45);

  // ROI Calculations
  // Manual entry takes approx 15 minutes per statement page (typing transactions, double checking balances)
  const manualHours = Math.round(((statementsCount * pagesCount * 15) / 60) * 10) / 10;
  // StatementAI takes approx 10 seconds per page (0.17 minutes) + 2 minutes total review time
  const aiHours = Math.round((((statementsCount * pagesCount * 10) / 3600) + (statementsCount * 1.5)) / 60 * 10) / 10;
  const hoursSaved = Math.max(0.1, Math.round((manualHours - aiHours) * 10) / 10);
  const dollarsSaved = Math.round(hoursSaved * hourlyRate);

  return (
    <div id="home-view" className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/30 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200/55 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Next-Generation Financial AI Parser</span>
              </div>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Convert Messy <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-4">Bank Statements</span> into Clean Excel & CSV
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Stop manually typing transactions. Our layout-aware AI digitizes any PDF statement in 10 seconds with 99.5% accuracy. Secure, compliant, and ready for accounting.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-start-btn"
                  onClick={() => setView('converter')}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Start Converting Free</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  id="hero-faq-btn"
                  onClick={() => setView('faq')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>How it works</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Lock className="h-4 w-4 text-blue-500" />
                  <span>256-bit encrypted bank security</span>
                </span>
              </div>
            </div>

            {/* Visual Conversion Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-w-md mx-auto overflow-hidden">
                {/* Background ambient glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl"></div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-mono text-[10px] bg-slate-100 px-2.5 py-1 rounded-md text-slate-500 font-semibold uppercase">
                    live_demo.pdf
                  </span>
                </div>

                {/* Left Side: Mock Source Bank PDF */}
                <div className="space-y-3 opacity-90 transition-all duration-500">
                  <div className="bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-xs text-slate-700">CHASE BANK</span>
                      <span className="text-[9px] text-slate-400">Page 1 of 1</span>
                    </div>
                    <div className="h-[1px] bg-slate-200"></div>
                    
                    {/* Simulated blurred/messy line items */}
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>06/02 STRIPE TRANSFER ST-829</span>
                      <span className="text-emerald-600 font-semibold">+$4,850.00</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>06/05 AMAZON WEB SERVICES AWS</span>
                      <span className="text-rose-600 font-semibold">-$428.50</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>06/08 GOOGLE WORKSPACE GSUITE</span>
                      <span className="text-rose-600 font-semibold">-$72.00</span>
                    </div>
                  </div>

                  {/* Transition effect */}
                  <div className="flex justify-center my-3 relative">
                    <div className="bg-blue-600 text-white rounded-full p-2.5 shadow-md shadow-blue-500/20 z-10 animate-bounce">
                      <RefreshCcw className="h-4 w-4" />
                    </div>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-blue-100"></div>
                    </div>
                  </div>

                  {/* Clean Export Screen */}
                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-blue-900 flex items-center space-x-1">
                        <FileCheck className="h-3.5 w-3.5 text-blue-600" />
                        <span>Parsed Spreadsheet Output</span>
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-semibold">
                        99.9% Match
                      </span>
                    </div>
                    
                    <div className="overflow-x-auto text-[9px] font-mono text-slate-600 bg-white p-1.5 rounded-md border border-slate-100">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                            <th className="p-1 text-left">Date</th>
                            <th className="p-1 text-left">Description</th>
                            <th className="p-1 text-right">Debit</th>
                            <th className="p-1 text-right">Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="p-1">2026-06-02</td>
                            <td className="p-1 font-semibold text-blue-600">Stripe Transfer</td>
                            <td className="p-1 text-right">-</td>
                            <td className="p-1 text-right text-emerald-600">$4,850.00</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-1">2026-06-05</td>
                            <td className="p-1 font-semibold text-blue-600">AWS Cloud Hosting</td>
                            <td className="p-1 text-right text-rose-600">$428.50</td>
                            <td className="p-1 text-right">-</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 justify-end text-xs">
                  <span className="bg-slate-100 hover:bg-slate-200 transition px-2 py-1 rounded text-[10px] text-slate-600 font-medium">Excel</span>
                  <span className="bg-slate-100 hover:bg-slate-200 transition px-2 py-1 rounded text-[10px] text-slate-600 font-medium">CSV</span>
                  <span className="bg-blue-600 text-white px-2.5 py-1 rounded text-[10px] font-semibold">Download</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HilltopAds Banner Advertisement (Temporarily Disabled) */}
      {ENABLE_ADS && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 -mb-4">
          <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4 shadow-xs flex flex-col items-center justify-center space-y-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Sponsored Ad Banner</span>
            <div ref={bannerRef} id="hilltop-ads-banner-container" className="w-full flex justify-center min-h-[90px] overflow-hidden" />
          </div>
        </div>
      )}

      {/* 2. Key Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10 text-center">
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">5M+</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">Transactions Parsed</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-display font-bold text-blue-400 tracking-tight">99.5%</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">OCR Precision Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">10,000+</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">Global Banks Supported</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-display font-bold text-blue-400 tracking-tight">&lt; 10s</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">Average Process Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stepper: How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            How Simple Is Bank Statement Conversion?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Convert statements in four effortless steps. Our intelligent ledger layout engine validates all balances for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Upload Bank PDFs',
              desc: 'Drag & drop single or multi-page bank PDFs. StatementAI supports over 10,000 banks.',
              icon: Zap,
              color: 'bg-amber-100 text-amber-800'
            },
            {
              step: '02',
              title: 'AI Layout Extraction',
              desc: 'Our financial model isolates dates, descriptions, checks, debits, credits, and balances.',
              icon: Sparkles,
              color: 'bg-blue-100 text-blue-800'
            },
            {
              step: '03',
              title: 'Reconcile & Audit',
              desc: 'Our double-entry parser matches ending sums with your transaction logs for zero errors.',
              icon: FileCheck,
              color: 'bg-purple-100 text-purple-800'
            },
            {
              step: '04',
              title: 'Instant Download',
              desc: 'Save your clean transaction records directly as structured Excel, CSV, or JSON tables.',
              icon: FileSpreadsheet,
              color: 'bg-emerald-100 text-emerald-800'
            }
          ].map((item, index) => (
            <div key={index} className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition duration-250 group">
              <span className="absolute top-4 right-6 text-3xl font-display font-black text-slate-100 group-hover:text-blue-50 transition">
                {item.step}
              </span>
              <div className="space-y-4">
                <div className={`p-3 rounded-xl w-fit ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Features Overview</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Engineered Specially For Professional Accounting
            </h2>
            <p className="text-slate-600 text-base">
              Standard OCR converters leave columns scrambled. StatementAI understands financial ledger structures natively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Layout-Aware OCR",
                desc: "Never deal with merged columns again. We read credit/debit margins perfectly even across multiple pages.",
                icon: Table
              },
              {
                title: "Volatile Zero-Storage Mode",
                desc: "Enable our strict HIPAA/SOC2 mode. Transactions are parsed in RAM and permanently deleted immediately after download.",
                icon: Lock
              },
              {
                title: "Automatic Classification",
                desc: "AI scans merchant descriptions to automatically assign spending categories, cutting hours of manual bookkeeping categorization.",
                icon: Sparkles
              },
              {
                title: "Balance Validation Audit",
                desc: "Our engine executes automatic accounting balance checks: Starting Balance + Deposits - Withdrawals = Ending Balance.",
                icon: ShieldCheck
              },
              {
                title: "Multiple Export Formats",
                desc: "Download native Excel (.xlsx), universal CSV, or developer-friendly JSON structured outputs in one click.",
                icon: FileSpreadsheet
              },
              {
                title: "Smart Field Mapping",
                desc: "Reorder and rename columns (e.g. mapping 'Transaction Amount' to 'Debit') to fit your custom QuickBooks or Xero configurations.",
                icon: Database
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs hover:border-blue-100 transition duration-200 space-y-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-display font-semibold text-lg text-slate-900">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive ROI Estimator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Estimator Controls */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
                How much time & cost are you losing to manual data entry?
              </h3>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Adjust the sliders below based on your bookkeeping team's monthly workload to view your savings with StatementAI.
              </p>

              {/* Sliders */}
              <div className="space-y-5 bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xs">
                {/* Statements Count */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Statements per Month</span>
                    <span className="font-mono bg-blue-500/50 px-2 py-0.5 rounded text-white">{statementsCount} accounts</span>
                  </div>
                  <input
                    id="slider-statements"
                    type="range"
                    min="1"
                    max="100"
                    value={statementsCount}
                    onChange={(e) => setStatementsCount(parseInt(e.target.value))}
                    className="w-full accent-blue-200 cursor-pointer"
                  />
                </div>

                {/* Avg Pages */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Avg. Pages per Statement</span>
                    <span className="font-mono bg-blue-500/50 px-2 py-0.5 rounded text-white">{pagesCount} pages</span>
                  </div>
                  <input
                    id="slider-pages"
                    type="range"
                    min="1"
                    max="20"
                    value={pagesCount}
                    onChange={(e) => setPagesCount(parseInt(e.target.value))}
                    className="w-full accent-blue-200 cursor-pointer"
                  />
                </div>

                {/* Hourly Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Bookkeeper Hourly Rate</span>
                    <span className="font-mono bg-blue-500/50 px-2 py-0.5 rounded text-white">${hourlyRate}/hr</span>
                  </div>
                  <input
                    id="slider-rate"
                    type="range"
                    min="15"
                    max="150"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                    className="w-full accent-blue-200 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Dashboard */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-white/10 p-8 space-y-6 text-center md:text-left relative">
              <div className="absolute top-4 right-4 text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/20">
                Estimated ROI
              </div>

              <h4 className="font-display font-semibold text-lg text-slate-300">Your Monthly Savings Summary</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Hours Saved</span>
                  <p className="text-3xl md:text-4xl font-display font-black text-emerald-400 font-mono">
                    {hoursSaved} hrs
                  </p>
                  <span className="text-[10px] text-slate-500 block">Reduction in manual transcription</span>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Billing Saved</span>
                  <p className="text-3xl md:text-4xl font-display font-black text-white font-mono">
                    ${dollarsSaved.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-slate-500 block">Immediate payroll reclaimed</span>
                </div>
              </div>

              <div className="h-[1px] bg-slate-800"></div>

              <div className="flex items-center space-x-3 bg-blue-950/40 border border-blue-900/50 p-4 rounded-xl text-left">
                <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200 leading-relaxed">
                  With manual entry taking <strong className="text-white font-semibold">{manualHours} hours</strong>, StatementAI finishes the same volume in just <strong className="text-white font-semibold">{aiHours} hours</strong> (including review)!
                </p>
              </div>

              <button
                id="estimator-convert-btn"
                onClick={() => setView('converter')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/10 cursor-pointer transition flex items-center justify-center space-x-2"
              >
                <span>Automate This Workload Now</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Testimonials</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Trusted By CPAs, Auditors, and Small Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-3.5 pt-6 border-t border-slate-100 mt-6">
                <img
                  src={t.avatar}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="font-semibold text-sm text-slate-900">{t.author}</h5>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-8 md:p-16 text-center border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
              Ready to automate your bank statements?
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              No subscription or credit card needed. Just drag, drop, and download. Start saving time on reconciliation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <button
                id="cta-bottom-start-btn"
                onClick={() => setView('converter')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition cursor-pointer"
              >
                Convert Statement Now
              </button>
              <button
                id="cta-bottom-faq-btn"
                onClick={() => setView('faq')}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-8 py-3.5 rounded-xl transition cursor-pointer"
              >
                Supported Formats FAQ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
