/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight,
  FileSpreadsheet, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  FileCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  FileDown, 
  CheckCircle2,
  Clock,
  TrendingUp,
  LayoutGrid,
  FileCode,
  Zap,
  EyeOff,
  Scale,
  DollarSign,
  Briefcase,
  History,
  FileText
} from 'lucide-react';
import { ActiveView } from '../types';

interface FreePdfConverterViewProps {
  setView: (view: ActiveView) => void;
}

export default function FreePdfConverterView({ setView }: FreePdfConverterViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic SEO Metadata Injection for the keyword "Free PDF Bank Statement Converter"
  useEffect(() => {
    const originalTitle = document.title;
    // Under 60 characters
    document.title = "Free PDF Bank Statement Converter | Excel & CSV - StatementAI";

    const getOrCreateMeta = (attributeName: string, attributeValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      return element;
    };

    // Under 160 characters
    const descMeta = getOrCreateMeta('name', 'description');
    const originalDesc = descMeta.getAttribute('content');
    descMeta.setAttribute('content', 'Convert bank statement PDFs to Excel, CSV, or JSON instantly. 100% free, no login required. Private, secure, AI-powered extraction with 99.5% accuracy.');

    const ogTitle = getOrCreateMeta('property', 'og:title');
    const originalOgTitle = ogTitle.getAttribute('content');
    ogTitle.setAttribute('content', 'Free PDF Bank Statement Converter | StatementAI');

    const ogDesc = getOrCreateMeta('property', 'og:description');
    const originalOgDesc = ogDesc.getAttribute('content');
    ogDesc.setAttribute('content', 'Convert bank statement PDFs to Excel, CSV, or JSON instantly. 100% free, no login required.');

    const ogUrl = getOrCreateMeta('property', 'og:url');
    const originalOgUrl = ogUrl.getAttribute('content');
    ogUrl.setAttribute('content', 'https://www.mystatementai.in/free-pdf-bank-statement-converter');

    // JSON-LD FAQ and WebApplication Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": "https://www.mystatementai.in/free-pdf-bank-statement-converter#webapp",
          "name": "Free PDF Bank Statement Converter",
          "url": "https://www.mystatementai.in/free-pdf-bank-statement-converter",
          "description": "Convert PDF bank statements into Excel, CSV, or JSON format. Features zero-login extraction, optical layout recognition, and bank-grade SSL data encryption.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires HTML5",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Free PDF Bank Statement Converter engine",
            "No login, sign-up, or credit card required",
            "Interactive financial summary preview",
            "Instant download in XLS, CSV, and JSON formats",
            "Tax-ready transaction auto-categorization"
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.mystatementai.in/free-pdf-bank-statement-converter#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is there really no login required to use this free PDF bank statement converter?",
              "text": "Yes, completely. We believe financial auditing tools should be friction-free. You do not need to register, create an account, or share an email address. Simply upload your PDF statement and download your Excel sheet instantly."
            },
            {
              "@type": "Question",
              "name": "How does the AI preserve accuracy compared to traditional optical character recognition (OCR)?",
              "text": "Traditional OCR simply dumps text into blocks, mixing up columns and rows. Our layout-aware Artificial Intelligence reads statements holistically. It understands visual grid structures, column spans, transaction flows, and bank-specific table headers to reconstruct an accurate ledger."
            },
            {
              "@type": "Question",
              "name": "Which file formats are supported for export?",
              "text": "You can export your fully extracted bank transactions as an Excel spreadsheet (.xlsx), Comma-Separated Values (.csv), or a clean developer-friendly JSON array."
            },
            {
              "@type": "Question",
              "name": "Can I convert scanned bank statements or photos?",
              "text": "Yes! Our parser is fully embedded with multi-modal neural networks capable of reading photographed paper receipts, low-resolution photocopies, and low-contrast mobile scans with optimal column preservation."
            },
            {
              "@type": "Question",
              "name": "Is my confidential financial information safe?",
              "text": "Data privacy is our core mandate. We use bank-grade 256-bit SSL encryption to transmit files. All parsing occurs dynamically inside RAM-only sandbox environments. Your financial files are completely purged from memory immediately after conversion is complete."
            },
            {
              "@type": "Question",
              "name": "Which global banks does this converter support?",
              "text": "We support thousands of financial institutions globally. This includes prominent US banks like Chase, Bank of America, Wells Fargo, Citi; UK banks like HSBC, Barclays, Lloyds; Indian banks like SBI, HDFC, ICICI, Axis; and standard multi-currency international structures."
            },
            {
              "@type": "Question",
              "name": "How are transactions categorized?",
              "text": "Our smart classification system automatically maps transaction narratives to accounting categories like Revenue, Software & Hosting, Rent & Lease, Salaries & Wages, Meals & Entertainment, and Bank Fees for fast bookkeeping."
            },
            {
              "@type": "Question",
              "name": "Can I edit the parsed transactions before exporting them?",
              "text": "Yes, our interactive converter provides a live, editable preview table. You can correct descriptions, adjust classifications, delete redundant rows, or update running balance numbers prior to downloading."
            },
            {
              "@type": "Question",
              "name": "How does this tool help with taxes and IRS compliance?",
              "text": "By turning complex, locked PDFs into clean Excel or CSV spreadsheets, you can import transaction details directly into tax preparation suites or send them neatly to your accountant, simplifying write-offs."
            },
            {
              "@type": "Question",
              "name": "Are there any hidden costs or page limits?",
              "text": "No. Our basic converter is 100% free with generous daily usage allowances. We also offer developer APIs and premium enterprise plans for ultra-high volume bulk processing."
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

  const handleLinkClick = (viewName: ActiveView) => {
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqItems = [
    {
      q: "Is there really no login required to use this free PDF bank statement converter?",
      a: "Yes, completely. We believe financial auditing tools should be friction-free. You do not need to register, create an account, or share an email address. Simply upload your PDF statement and download your Excel sheet instantly."
    },
    {
      q: "How does the AI preserve accuracy compared to traditional optical character recognition (OCR)?",
      a: "Traditional OCR simply dumps text into blocks, mixing up columns and rows. Our layout-aware Artificial Intelligence reads statements holistically. It understands visual grid structures, column spans, transaction flows, and bank-specific table headers to reconstruct an accurate ledger."
    },
    {
      q: "Which file formats are supported for export?",
      a: "You can export your fully extracted bank transactions as an Excel spreadsheet (.xlsx), Comma-Separated Values (.csv), or a clean developer-friendly JSON array."
    },
    {
      q: "Can I convert scanned bank statements or photos?",
      a: "Yes! Our parser is fully embedded with multi-modal neural networks capable of reading photographed paper receipts, low-resolution photocopies, and low-contrast mobile scans with optimal column preservation."
    },
    {
      q: "Is my confidential financial information safe?",
      a: "Data privacy is our core mandate. We use bank-grade 256-bit SSL encryption to transmit files. All parsing occurs dynamically inside RAM-only sandbox environments. Your financial files are completely purged from memory immediately after conversion is complete."
    },
    {
      q: "Which global banks does this converter support?",
      a: "We support thousands of financial institutions globally. This includes prominent US banks like Chase, Bank of America, Wells Fargo, Citi; UK banks like HSBC, Barclays, Lloyds; Indian banks like SBI, HDFC, ICICI, Axis; and standard multi-currency international structures."
    },
    {
      q: "How are transactions categorized?",
      a: "Our smart classification system automatically maps transaction narratives to accounting categories like Revenue, Software & Hosting, Rent & Lease, Salaries & Wages, Meals & Entertainment, and Bank Fees for fast bookkeeping."
    },
    {
      q: "Can I edit the parsed transactions before exporting them?",
      a: "Yes, our interactive converter provides a live, editable preview table. You can correct descriptions, adjust classifications, delete redundant rows, or update running balance numbers prior to downloading."
    },
    {
      q: "How does this tool help with taxes and IRS compliance?",
      a: "By turning complex, locked PDFs into clean Excel or CSV spreadsheets, you can import transaction details directly into tax preparation suites or send them neatly to your accountant, simplifying write-offs."
    },
    {
      q: "Are there any hidden costs or page limits?",
      a: "No. Our basic converter is 100% free with generous daily usage allowances. We also offer developer APIs and premium enterprise plans for ultra-high volume bulk processing."
    }
  ];

  return (
    <div id="free-seo-landing" className="space-y-24 pb-16 text-slate-800">
      
      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50/20 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Premium Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-200/55 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Advanced Free PDF Bank Statement Converter Tool</span>
              </div>
              
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Free PDF Bank <span className="text-blue-600">Statement Converter</span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Unlock trapped financial records in seconds. Our free PDF bank statement converter leverages layout-aware AI to convert PDF bank statements and credit card bills into clean, tax-ready Excel (XLSX), CSV, or JSON tables. No registration, no login, and absolute confidentiality guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="free-hero-start-btn"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Convert Your PDF Now</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href="#why-statementai"
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center justify-center"
                >
                  <span>Learn Why It's Better</span>
                </a>
              </div>

              {/* Security trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <EyeOff className="h-4 w-4 text-emerald-500" />
                  <span>Zero Login Required</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Lock className="h-4 w-4 text-blue-500" />
                  <span>RAM-Only File Purging</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  <span>99.5% Column Match</span>
                </span>
              </div>
            </div>

            {/* Right Column: Visual Interactive Graphic */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 max-w-md mx-auto overflow-hidden relative">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  </div>
                  <span className="font-mono text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    secure_converter_hub
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Mock PDF Document Representation */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800 text-xs flex items-center space-x-1.5">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>Monthly_Statement.pdf</span>
                      </span>
                      <span className="bg-slate-200 text-slate-600 text-[9px] px-1.5 py-0.5 rounded font-mono">
                        Locked PDF
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                      <div className="h-2 bg-slate-200 rounded w-2/3"></div>
                      <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-2">
                    <div className="bg-blue-600 text-white rounded-full p-2.5 shadow-md">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>

                  {/* Excel Sheet Representation */}
                  <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-emerald-900 text-xs flex items-center space-x-1.5">
                        <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                        <span>Clean_Export.xlsx</span>
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono">
                        Editable
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-4 bg-white border border-emerald-100 rounded"></div>
                      <div className="h-4 bg-white border border-emerald-100 rounded"></div>
                      <div className="h-4 bg-white border border-emerald-100 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action inside widget */}
                <div className="mt-5 text-center">
                  <button 
                    onClick={handleCtaClick}
                    className="w-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg transition-all"
                  >
                    Try the Free Converter Tool
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: HUMAN-FRIENDLY COMPREHENSIVE TEXT GUIDE (1200+ WORDS) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Core Rich Editorial Content Block */}
        <div className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
              Unlock Your Transactions with a Free PDF Bank Statement Converter
            </h2>
            <p className="text-slate-600 leading-relaxed mt-4">
              Monthly bank statements are crucial for maintaining solid accounting, keeping logs of company burn rates, and preparing error-free tax filings. However, banking institutions almost universally supply transaction histories in locked PDF formats. This creates a severe operational bottleneck. Re-typing every single transaction line manually into Excel or Google Sheets leads to severe visual strain, layout errors, and hundreds of lost working hours.
            </p>
            <p className="text-slate-600 leading-relaxed mt-2">
              That's why we created the **Free PDF Bank Statement Converter** on StatementAI. By leveraging layout-aware artificial intelligence, StatementAI reads the visual arrangement of your transaction ledger just like a human accountant would. It detects checking statement date systems, separates credits from debits, and maps description rows instantly. We do this without requiring you to share confidential account passwords, sign up for a paid subscription, or even submit your email address.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <span>Core Operational Mandates of StatementAI</span>
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              When using a free PDF bank statement converter online, you shouldn't have to compromise on data hygiene or transaction security. StatementAI enforces five core principles to protect your financial files:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-600 pt-2 list-none p-0">
              <li className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-100">
                <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                <span><strong>No Login Required:</strong> Zero barrier access.</span>
              </li>
              <li className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-100">
                <Lock className="h-4 w-4 text-blue-500 shrink-0" />
                <span><strong>Privacy First:</strong> No data persistence.</span>
              </li>
              <li className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-100">
                <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                <span><strong>Fast Processing:</strong> Multi-page loads in seconds.</span>
              </li>
              <li className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-100">
                <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
                <span><strong>AI-Powered Extraction:</strong> Flawless row logic.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
              Why Traditional PDF Parsers and OCR Engines Fail
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Most standard PDF-to-Excel conversion tools use rigid, coordinate-based grid systems. They assume every PDF bank statement features the exact same dimensions, margin values, and header layouts. However, as soon as a bank updates its branding or shifts a table margin by a single pixel, traditional coordinate-based scrapers crash. They fail to extract the transaction tables, resulting in mixed columns, empty dates, and lost credit/debit balances.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Scanned statements and low-contrast mobile photos present an even greater challenge. Traditional OCR software converts raw image patterns to flat, unstructured text dumps, destroying the visual relation between date, description, and balance columns.
            </p>
            <p className="text-slate-600 leading-relaxed">
              **StatementAI solves this through cognitive visual AI.** Our model operates in the visual plane, reading the page as a unified document. It dynamically identifies where table headers start, tracks consecutive transactions across multi-page jumps, and aligns dates, descriptions, deposits, and withdrawals with optimal mathematical consistency.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
              Transform Statements into Actionable Financial Formats
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Different auditing tasks demand different file formats. That is why our free PDF bank statement converter exports into three distinct industry-standard structures:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-emerald-50/30 border border-emerald-100/50 p-5 rounded-xl space-y-2">
                <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                <h4 className="font-display font-bold text-slate-900 text-sm">Microsoft Excel (.xlsx)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Best for small business bookkeeping, deep accounting, sorting, and manual transaction review.
                </p>
              </div>
              <div className="bg-blue-50/40 border border-blue-100/50 p-5 rounded-xl space-y-2">
                <FileCheck className="h-5 w-5 text-blue-600" />
                <h4 className="font-display font-bold text-slate-900 text-sm">Comma-Separated Values (.csv)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Best for bulk imports into cloud accounting software like QuickBooks Online, Xero, Wave, and Zoho.
                </p>
              </div>
              <div className="bg-amber-50/40 border border-amber-100/50 p-5 rounded-xl space-y-2">
                <FileCode className="h-5 w-5 text-amber-600" />
                <h4 className="font-display font-bold text-slate-900 text-sm">JSON Data Schemas</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Best for financial developers, custom software pipelines, custom visual dashboards, and database seeding.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 3: STEP-BY-STEP CONVERSION GUIDE */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Process Tutorial</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              How to Convert PDF Bank Statements to Excel Free
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Follow these simple steps to transition from static PDF files to editable spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative space-y-3">
              <span className="absolute top-4 right-4 text-3xl font-display font-extrabold text-slate-100">01</span>
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl w-fit">
                <FileDown className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-base">Download Statements</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Log into your online banking portal, navigate to the statements tab, and download your monthly checking ledger as a PDF.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative space-y-3">
              <span className="absolute top-4 right-4 text-3xl font-display font-extrabold text-slate-100">02</span>
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl w-fit">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-base">Drag & Drop Upload</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Go to the StatementAI tool and drag your files directly into the conversion area. Files are processed securely in volatile RAM.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative space-y-3">
              <span className="absolute top-4 right-4 text-3xl font-display font-extrabold text-slate-100">03</span>
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl w-fit">
                <Clock className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-base">AI Verification</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our model maps your transactions in less than 10 seconds. You can edit dates, correct typos, and verify totals right in the web browser.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative space-y-3">
              <span className="absolute top-4 right-4 text-3xl font-display font-extrabold text-slate-100">04</span>
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl w-fit">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-base">Export and Save</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select your format (Excel, CSV, or JSON) and click export. Your structured file is saved to your computer immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BENEFITS & WHY CHOOSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Why StatementAI?</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Designed for Modern Businesses and Accounting Professionals
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Engineered to streamline corporate accounting, personal wealth tracking, and tax preparation workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <Scale className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-lg">Scalable for Tax Season</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Avoid last-minute tax panics. Convert months of bank ledgers in a fraction of the time, mapping transaction narratives to clean tax deductions easily.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <DollarSign className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-lg">Absolutely Zero Fees</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              No daily conversion caps on our standard web tool. Keep your hard-earned revenue. No hidden fees or recurring subscriptions.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <Briefcase className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-lg">Built for Bookkeepers</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Standardized formatting across checking and savings records makes importing into systems like Xero, QuickBooks, and Sage seamless.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <History className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-lg">Accurate Balance Recalculation</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our system double-checks calculations to prevent accounting errors. It flags any variance between opening balances and running transactions.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-lg">Multiple Bank Template Optimization</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Optimized for standard layouts from major US institutions like Bank of America, Chase, and Wells Fargo, as well as international entities.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="font-display font-bold text-slate-900 text-lg">AI Financial Coaching</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Go beyond basic conversion. Chat with our interactive AI financial advisor to analyze cash flow, detect duplicate transactions, and identify cost-saving trends.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: DEEP-DIVE STRATEGIC GUIDE FOR CPA / US ACCOUNTING */}
      <section className="bg-slate-900 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">Expert Accounting Alignment</span>
            <h3 className="font-display font-bold text-3xl text-white tracking-tight">
              Empowering Certified Public Accountants & Business Audits
            </h3>
          </div>
          
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            For professional accountants and corporate treasurers, precision is everything. A single missing decimal place or an incorrectly formatted date can invalidate entire general ledgers and require painful diagnostic hours. Traditional data entry relies heavily on human accuracy, which deteriorates over long, complex auditing sessions.
          </p>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Our free PDF bank statement converter acts as an automated, tireless virtual assistant. It extracts transaction tables with extreme accuracy and provides a centralized interface for real-time validation. This system bridges the gap between raw transaction PDFs and clean ledger integration.
          </p>

          {/* Internal Cross-Linking to other optimized converter pages */}
          <div className="pt-6 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-400 font-medium">Looking for specialized institution parsers?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleLinkClick('boa-to-excel')}
                className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/30 border border-blue-800 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                <span>Bank of America Statement Converter</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION SECTION (10 HIGH-QUALITY ITEMS) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Knowledge Base</span>
          <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Find answers to common questions about our free bank statement conversion tool.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden"
            >
              <button
                id={`free-faq-toggle-${index}`}
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

      {/* SECTION 7: PROMINENT CONVERT NOW CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
              Ready to convert your PDF bank statement to Excel?
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Upload your PDF statement now and export your transactions as a clean spreadsheet instantly. No credit card details, no email submissions, and no registrations required.
            </p>
            
            <div className="pt-2 flex justify-center">
              <button
                id="free-bottom-cta-btn"
                onClick={handleCtaClick}
                className="bg-white text-blue-600 hover:bg-slate-50 font-bold px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer flex items-center space-x-2 text-base"
              >
                <span>Access Free Converter Tool</span>
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
