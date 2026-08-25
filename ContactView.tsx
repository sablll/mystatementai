/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    // Success transition
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Support Channels</span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
          We're Here To Help
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Have an uncommon bank statement coordinate structure? Reach our financial engineering team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
        
        {/* Left Side: Info & SLA Pledge */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg shadow-blue-600/10 space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-100" />
                <h4 className="font-display font-semibold text-base text-white">Our SLA Response Pledge</h4>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                As a standard for our finance clients, we commit to responding to all platform inquiries in **under 2 hours** during business hours.
              </p>
              <div className="h-[1px] bg-blue-500/30"></div>
              <p className="text-[11px] text-blue-200 font-mono">
                Support Hours: Mon - Fri | 8:00 AM - 7:00 PM EST
              </p>
            </div>

            {/* Channels List */}
            <div className="space-y-4 text-slate-600 text-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white text-blue-600 border border-slate-100 rounded-xl shrink-0 shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-semibold text-slate-900">Email Support</h5>
                  <p className="text-xs font-mono">support@statementai.com</p>
                  <p className="text-[11px] text-slate-400">Average reply: 45 minutes</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white text-blue-600 border border-slate-100 rounded-xl shrink-0 shadow-xs">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-semibold text-slate-900">Enterprise Hotline</h5>
                  <p className="text-xs font-mono">+1 (800) 555-STAT (7828)</p>
                  <p className="text-[11px] text-slate-400">Available for premium corporate clients</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white text-blue-600 border border-slate-100 rounded-xl shrink-0 shadow-xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-semibold text-slate-900">HQ Office</h5>
                  <p className="text-xs font-normal">100 Pine Street, Floor 22</p>
                  <p className="text-xs text-slate-400">San Francisco, CA 94111</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security stamp */}
          <div className="flex items-center space-x-3 bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-500 text-xs">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>We never store statements or passcodes transmitted via contact forms. Files are entirely protected.</span>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-md">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <h3 className="font-display font-bold text-xl text-slate-900">Submit a support request</h3>
              
              {errorMsg && (
                <div className="p-3 bg-rose-50 text-rose-800 text-xs font-semibold rounded-lg border border-rose-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 block">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-250 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/30"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 block">Work Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-250 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/30"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-bold text-slate-700 block">Inquiry Type</label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-250 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/30"
                >
                  <option value="General Inquiry">General Inquiry & Help</option>
                  <option value="Format Request">Custom Bank Sheet Format Profile</option>
                  <option value="Enterprise Solution">Enterprise Volume & API Licensing</option>
                  <option value="Billing Support">Billing & Subscription</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 block">Detailed Message *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell us about the banks or features you are using, or upload issues you encounter..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-250 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/30"
                ></textarea>
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md cursor-pointer transition flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          ) : (
            /* SUCCESS VIEW */
            <div className="text-center py-10 space-y-6 animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. We've assigned ticket <strong>#STAT-{Math.floor(1000 + Math.random() * 9000)}</strong> to your inquiry.
                </p>
                <p className="text-xs text-slate-400">
                  A verification confirmation has been sent to <strong>{formData.email}</strong>. Our accounting support team will reply within 2 hours.
                </p>
              </div>

              <div className="pt-4">
                <button
                  id="contact-reset-btn"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
                >
                  Submit another ticket
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
