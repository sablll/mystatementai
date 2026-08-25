/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { ActiveView } from '../types';

interface FaqViewProps {
  setView: (view: ActiveView) => void;
}

export default function FaqView({ setView }: FaqViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  // Group by category if we want, or list them with badges
  return (
    <div id="faq-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Answers Center</span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Need details about OCR coordinate mapping, security compliance, or accounting ledger layouts? We have answers.
        </p>
      </div>

      {/* Interactive Search */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          id="faq-search-input"
          type="text"
          placeholder="Search questions about security, integrations, exports, formats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white shadow-xs"
        />
      </div>

      {/* Accordion Questions */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl border border-slate-100 text-slate-400">
            No matching questions found. Try looking for "security", "QuickBooks", or "banks".
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`bg-white rounded-2xl border transition duration-200 overflow-hidden ${
                  isOpen ? 'border-blue-500 shadow-sm' : 'border-slate-150 hover:border-slate-300'
                }`}
              >
                <button
                  id={`faq-accordion-toggle-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-slate-900 hover:text-blue-600 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="h-5 w-5 text-blue-500 shrink-0" />
                    <span className="text-sm md:text-base">{faq.question}</span>
                  </div>
                  <span className="text-slate-400">
                    {isOpen ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-sm text-slate-600 leading-relaxed space-y-3 bg-slate-50/50 pt-1 border-t border-slate-50">
                    <p className="font-sans font-normal">{faq.answer}</p>
                    <div className="pt-2">
                      <span className="inline-flex items-center text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-semibold">
                        Tag: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Support CTA Footer Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-800">
        <div className="space-y-1.5 text-center md:text-left">
          <h4 className="font-display font-semibold text-lg">Still have questions about custom layouts?</h4>
          <p className="text-sm text-slate-400">
            Our CPA support team can build custom coordinate layout profiles for uncommon bank sheets.
          </p>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <button
            id="faq-contact-btn"
            onClick={() => setView('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer transition shadow-md flex items-center space-x-1.5"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>

    </div>
  );
}
