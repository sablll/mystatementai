/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Lock, Scale, Calendar, FileText } from 'lucide-react';

export function PrivacyView() {
  return (
    <div id="privacy-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in text-slate-700">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">StatementAI Legal</span>
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last Updated: July 17, 2026</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold">GDPR & CCPA Compliant</span>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm leading-relaxed text-slate-600">
        StatementAI is committed to protecting your corporate financial records. This Privacy Policy details how we handle, process, and protect your PDF bank statement files and personal account data. We do not rent, sell, or commercialize your financial transaction records to any third party under any circumstances.
      </div>

      {/* Structured Content */}
      <div className="space-y-6 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center space-x-2">
            <Lock className="h-5 w-5 text-blue-600" />
            <span>1. Volatile Memory & File Retention</span>
          </h3>
          <p>
            When you upload a bank statement PDF to StatementAI:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Standard Mode:</strong> Statements are processed immediately, and transaction tables are loaded into your local browser state. Uploaded source files are retained in secure, encrypted cloud block storage for exactly seven (7) days to allow you to re-download before being permanently purged.
            </li>
            <li>
              <strong>Zero-Storage Mode:</strong> If Zero-Storage is enabled, your statement file is streamed directly to a volatile sandbox container. The layout parsing executes in-RAM, the extracted cells are returned to your browser, and the file is immediately and permanently deleted from our server cache the very same millisecond. No backups, cache logs, or copies are retained.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <span>2. Data Collection and Usage</span>
          </h3>
          <p>
            We collect basic account metadata to keep your platform service active:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Account Information:</strong> If you register, we collect your name, email address, company name, and encrypted credential hashes.
            </li>
            <li>
              <strong>Usage Telemetry:</strong> We monitor conversion volume metrics (e.g. number of pages parsed, bank template IDs matched) to govern system health and billing tier allocations.
            </li>
            <li>
              <strong>Transaction Logs:</strong> Unless explicitly saved, we never store parsed transaction rows.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>3. Advanced Cryptography Standards</span>
          </h3>
          <p>
            All connection layers utilize TLS 1.3 and SHA-256 hashing. All files stored during the standard 7-day backup grace period are fully encrypted using military-grade AES-256 block ciphers with rotating keys. Access is restricted exclusively to authorized server daemons—human administrators cannot open or view your file data.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900 flex items-center space-x-2">
            <Scale className="h-5 w-5 text-blue-600" />
            <span>4. Your Data Subject Rights (GDPR)</span>
          </h3>
          <p>
            Under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you retain the absolute right to download, modify, restrict, or request the total deletion of all corporate and personal files associated with your workspace. To issue a structural data purge request, write directly to <span className="font-mono text-xs text-blue-600 font-semibold">compliance@statementai.com</span>.
          </p>
        </section>

      </div>

    </div>
  );
}

export function TermsView() {
  return (
    <div id="terms-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in text-slate-700">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">StatementAI Legal</span>
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
          Terms & Conditions
        </h1>
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last Updated: July 17, 2026</span>
          <span>•</span>
          <span className="text-slate-500">Service Version 2.4</span>
        </div>
      </div>

      {/* Intro */}
      <p className="text-sm leading-relaxed">
        Welcome to StatementAI. By accessing, browsing, or utilizing our cloud-based PDF Bank Statement Converter web services, you agree to be bound by these standard Terms & Conditions. Please read them thoroughly before uploading financial documentation.
      </p>

      {/* Structured Content */}
      <div className="space-y-6 text-sm leading-relaxed">
        
        {/* Term 1 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900">
            1. Terms of Service & Acceptable Use
          </h3>
          <p>
            You represent and warrant that you hold the legal authority, ownership, or explicit permission to upload, parse, and structure all bank statements, ledgers, and credit records transmitted to StatementAI. You are strictly forbidden from uploading fraudulent templates, stolen statements, or documents containing malicious payloads designed to intercept or breach container networks.
          </p>
        </section>

        {/* Term 2 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900">
            2. Limitation of Liability & Double-Entry Reconciliations
          </h3>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-2 font-normal">
            <p className="font-semibold">⚠️ CRITICAL FINANCIAL DOUBLE-CHECK NOTICE FOR CPAs:</p>
            <p>
              While StatementAI operates with a verified 99.5% accuracy rate, you acknowledge that our platform is an automated processing aid—NOT a certified accountant. Our OCR parser cannot replace professional bookkeeping auditing. You are strictly required to double-check and balance all calculated ending values prior to tax filings, payroll audits, or board disclosures.
            </p>
            <p>
              StatementAI accepts zero responsibility or liability for incorrect ledger figures, omitted line items, shifted decimals, or compliance fees resulting from unchecked automated sheet exports.
            </p>
          </div>
        </section>

        {/* Term 3 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900">
            3. Free Tiers & Subscription Billings
          </h3>
          <p>
            We offer complimentary parsing of up to three (3) bank statement PDFs per month per user. For higher volume processing, custom coordinate profile maps, or team permission groups, you must purchase a paid corporate plan. Subscriptions bill automatically and can be cancelled at any time through your dashboard settings.
          </p>
        </section>

        {/* Term 4 */}
        <section className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-slate-900">
            4. Service Availability & SLA
          </h3>
          <p>
            We aim for 99.9% platform availability. However, service disruptions for urgent security patching, server updates, or cloud container migrations may occur. In no event shall StatementAI be liable for any temporary loss of productivity, server downtime, or disrupted API transfers.
          </p>
        </section>

      </div>

    </div>
  );
}
