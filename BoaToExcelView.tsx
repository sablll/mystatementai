/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  FileCheck, 
  HelpCircle, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  FileDown, 
  CheckCircle2,
  Clock,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { ActiveView } from '../types';

interface BoaToExcelViewProps {
  setView: (view: ActiveView) => void;
}

export default function BoaToExcelView({ setView }: BoaToExcelViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic SEO Metadata Injection for USA Search Intent
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Bank of America Statement to Excel Converter | Free & Secure - StatementAI";

    const getOrCreateMeta = (attributeName: string, attributeValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      return element;
    };

    const descMeta = getOrCreateMeta('name', 'description');
    const originalDesc = descMeta.getAttribute('content');
    descMeta.setAttribute('content', 'Convert Bank of America PDF bank statements and credit card bills to Excel (XLSX), CSV, or JSON instantly. 100% private and secure AI-powered transaction parser optimized for US accounting.');

    const ogTitle = getOrCreateMeta('property', 'og:title');
    const originalOgTitle = ogTitle.getAttribute('content');
    ogTitle.setAttribute('content', 'Bank of America Statement to Excel Converter | StatementAI');

    const ogDesc = getOrCreateMeta('property', 'og:description');
    const originalOgDesc = ogDesc.getAttribute('content');
    ogDesc.setAttribute('content', 'Instantly parse Bank of America PDF statements, credit card ledgers, and cash summaries to Excel with 99.5% accuracy. No credit card required.');

    const ogUrl = getOrCreateMeta('property', 'og:url');
    const originalOgUrl = ogUrl.getAttribute('content');
    ogUrl.setAttribute('content', 'https://mystatementai.in/bank-of-america-to-excel');

    // JSON-LD Structured Data Schema (WebApplication and HowTo Schema)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": "https://mystatementai.in/bank-of-america-to-excel#webapp",
          "name": "Bank of America Statement to Excel Converter",
          "url": "https://mystatementai.in/bank-of-america-to-excel",
          "description": "Convert Bank of America PDF bank statements, credit card bills, and transaction histories to Excel, CSV, or JSON automatically with high-accuracy AI parser.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires HTML5",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Bank of America specialized PDF layout parsing",
            "Bank-grade SSL transmission security",
            "Instant multi-format Excel, CSV, and JSON download",
            "Automatic transaction tax categorization"
          ]
        },
        {
          "@type": "HowTo",
          "name": "How to Convert Bank of America Statement to Excel",
          "description": "Step-by-step guide on converting your digital or scanned Bank of America PDF statement to Excel formats.",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Download PDF from Online Banking",
              "text": "Sign in to your Bank of America online banking portal, navigate to Statements & Documents, and download the target monthly PDF statement."
            },
            {
              "@type": "HowToStep",
              "name": "Upload to StatementAI",
              "text": "Drag and drop the downloaded PDF statement into the StatementAI conversion interface."
            },
            {
              "@type": "HowToStep",
              "name": "Review and Export to Excel",
              "text": "Our AI extracts the transaction tables in seconds. Review the live preview and click 'Export Excel' to download your structured spreadsheet."
            }
          ]
        }
      ]
    };
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.title = originalTitle;
      if (originalDesc) {
        descMeta.setAttribute('content', originalDesc);
      } else {
        descMeta.parentNode?.removeChild(descMeta);
      }
      if (originalOgTitle) ogTitle.setAttribute('content', originalOgTitle);
      if (originalOgDesc) ogDesc.setAttribute('content', originalOgDesc);
      if (originalOgUrl) ogUrl.setAttribute('content', originalOgUrl);
      script.parentNode?.removeChild(script);
    };
  }, []);

  const handleCtaClick = () => {
    setView('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqItems = [
    {
      q: "How do I download my bank statements from Bank of America as a PDF?",
      a: "Log in to your Bank of America Online Banking account. Go to the 'Statements & Documents' tab from the navigation menu or your account overview page. Choose the account, select the desired monthly cycle statement, and click 'Download PDF' to save it to your local computer."
    },
    {
      q: "Does this converter support Bank of America Credit Card statements?",
      a: "Yes. Our parsing model is completely general and recognizes both Bank of America checking/savings transaction listings as well as commercial credit card statement layouts (including payment summary blocks and individual cardholder transaction lists)."
    },
    {
      q: "Will my confidential financial data be safe and secure?",
      a: "Absolutely. We employ bank-grade security protocols. All file transmissions are encrypted using 256-bit SSL, and statements are processed completely in sandboxed RAM-only containers. Your bank credentials, transaction history, and customer details are never logged, stored, or shared with third parties."
    },
    {
      q: "Can I import the converted Excel sheets directly into QuickBooks or Xero?",
      a: "Yes. The generated XLSX and CSV spreadsheets feature clean, pre-structured columns (Date, Description, Debit, Credit, Category, Reference) that map perfectly to the import templates of QuickBooks Online, QuickBooks Desktop, Xero, Wave, and Sage."
    },
    {
      q: "How does StatementAI handle scanned or photographed paper statements?",
      a: "Our parser is powered by an advanced layout-aware vision AI. If you upload a scanned page, a low-quality photocopy, or a photo of a printed paper Bank of America statement, our embedded OCR layer automatically digitizes the data without losing rows or mixing up columns."
    },
    {
      q: "Is there a limit to the number of statement pages I can convert?",
      a: "We support processing multi-page annual ledgers and multi-month packages instantly. For extremely large institutional files, our engine handles the load seamlessly on the cloud backend, ensuring you save hundreds of hours of manual typing."
    }
  ];

  return (
    <div id="boa-seo-landing" className="space-y-20 pb-16">
      
      {/* 1. Hero / Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/30 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200/55 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Optimized for US Bank Accounts & Ledgers</span>
              </div>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Bank of America <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-4">Statement to Excel</span> Converter
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Instantly convert any Bank of America PDF bank statement, corporate checking history, or credit card bill into structured Excel (XLSX), CSV, or JSON spreadsheets. Powered by secure, layout-aware AI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="boa-hero-start-btn"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Start Converting Free</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center justify-center"
                >
                  <span>View Steps</span>
                </a>
              </div>

              {/* Security trust tags */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Lock className="h-4 w-4 text-blue-500" />
                  <span>AES-255 military grade security</span>
                </span>
              </div>
            </div>

            {/* Simulated BoA Conversion Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-w-md mx-auto overflow-hidden relative">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-mono text-[9px] bg-red-50 text-red-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    BoA_Checking_June.pdf
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Visual Source Representing BoA PDF header */}
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-display font-bold text-xs text-slate-800">BANK OF AMERICA, N.A.</p>
                        <p className="text-[8px] text-slate-400 font-mono">P.O. Box 25118, Tampa, FL 33622</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase">
                        Account Summary
                      </span>
                    </div>
                    
                    <div className="h-[1px] bg-slate-200 my-1"></div>
                    
                    {/* Simulated transaction rows */}
                    <div className="space-y-1.5 text-[9px] font-mono text-slate-500">
                      <div className="flex justify-between">
                        <span>06/12 ONLINE TRANSFER FROM SAVINGS</span>
                        <span className="text-emerald-600 font-semibold">+$2,500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>06/14 SAFEWAY GROCERY STORE SAN JOSE</span>
                        <span className="text-rose-600 font-semibold">-$142.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>06/18 COMCAST UTILITIES PAYMENTS</span>
                        <span className="text-rose-600 font-semibold">-$89.99</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider arrow */}
                  <div className="flex justify-center -my-2">
                    <div className="bg-blue-600 text-white rounded-full p-2 shadow-md">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>

                  {/* Structured Destination Excel Output */}
                  <div className="bg-emerald-50/40 p-3.5 rounded-lg border border-emerald-100/70 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-emerald-950 text-xs flex items-center space-x-1">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                        <span>Formatted excel_output.xlsx</span>
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-semibold font-mono">
                        99.9% Match
                      </span>
                    </div>

                    <div className="overflow-x-auto text-[8px] font-mono text-slate-600 bg-white p-1 rounded border border-slate-100">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                            <th className="p-1">Date</th>
                            <th className="p-1">Description</th>
                            <th className="p-1 text-right">Debit</th>
                            <th className="p-1 text-right">Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="p-1">2026-06-12</td>
                            <td className="p-1 truncate max-w-[120px]">Transfer from Savings</td>
                            <td className="p-1 text-right text-slate-400">-</td>
                            <td className="p-1 text-right text-emerald-600 font-medium">2500.00</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-1">2026-06-14</td>
                            <td className="p-1 truncate max-w-[120px]">Safeway Grocery</td>
                            <td className="p-1 text-right text-rose-600 font-medium">142.50</td>
                            <td className="p-1 text-right text-slate-400">-</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Conversion Guide */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Conversion Guide</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            How to Convert Bank of America PDF to Excel
          </h2>
          <p className="text-slate-500">
            Export transaction histories cleanly into spreadsheets in three simple steps. No programming required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4 relative">
            <div className="absolute top-6 right-6 text-3xl font-display font-extrabold text-slate-100">01</div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-fit">
              <FileDown className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Get Your PDF Statement</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Log into your Bank of America online banking console, choose your checking or savings profile, go to 'Statements & Documents' and download your target monthly statement PDF to your desktop.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4 relative">
            <div className="absolute top-6 right-6 text-3xl font-display font-extrabold text-slate-100">02</div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-fit">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Upload to StatementAI</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Click the 'Start Converting' button. Drag and drop your downloaded Bank of America PDF file into the secure dropzone. Our layout AI will scan the statement, parse column headers, and extract all rows instantly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4 relative">
            <div className="absolute top-6 right-6 text-3xl font-display font-extrabold text-slate-100">03</div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-fit">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Download Excel Spreadsheet</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Review the complete live transaction table, check summary totals (credits, debits, opening, and closing balances), and click 'Export Excel' to download your structured, accounting-ready spreadsheet.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Deep-Dive Features Grid */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">Enterprise Level Features</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              A Complete Financial Converter Built for Professionals
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Get perfect data consistency for bookkeeping, auditing, wealth management, and general expense tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg w-fit">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">99.5% Parsing Accuracy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No more missed rows or truncated text fields. StatementAI reconstructs the full ledger structure with high mathematical consistency, matching your original Bank of America monthly PDF perfectly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg w-fit">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Bank-Grade Confidentiality</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Security is our foundation. Files are uploaded via Secure Socket Layer (SSL) and decrypted dynamically in isolated volatile RAM. Your transactional details are never cached or logged on our servers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg w-fit">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Instant 10-Second OCR</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Manually digitizing statements is slow and error-prone. Our cloud parser processes multiple PDF pages in a split second, cutting hours of manual spreadsheet bookkeeping down to a simple, clean click.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg w-fit">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Smart Tax Categorization</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our embedded model categorizes every Bank of America transaction automatically (e.g., Software, Salaries, Rent, Utilities, meals) so that you are tax and audit ready without extra post-processing work.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg w-fit">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Multi-Format Ready</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Download parsed sheets directly in Microsoft Excel (.xlsx), comma-separated values (.csv) format, or clean developer-friendly JSON schemas. Perfect for database integrations or direct visual dashboards.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg w-fit">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Fully Optimized for US Formats</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Optimized specifically for standard United States Bank of America formats, including correct handling of MM/DD date schemas, check transaction details, deposits, and standard fee structures.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Frequently Asked Questions</span>
          <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
            Common Questions About BoA Conversions
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know about secure bank statement extraction.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden"
            >
              <button
                id={`boa-faq-toggle-${index}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-slate-800 hover:text-blue-600 transition-colors focus:outline-hidden"
              >
                <span className="text-sm sm:text-base pr-4">{item.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-6 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-50/50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom Call-To-Action Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
              Ready to Parse Your Bank of America Statement to Excel?
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Upload your PDF statements right now. Zero card details needed. Convert pages instantly and keep your records immaculate.
            </p>
            
            <div className="pt-2 flex justify-center">
              <button
                id="boa-bottom-cta-btn"
                onClick={handleCtaClick}
                className="bg-white text-blue-600 hover:bg-slate-50 font-bold px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer flex items-center space-x-2 text-base"
              >
                <span>Convert Statement Now</span>
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
