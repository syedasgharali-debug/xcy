/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Mail, Send, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-stone-dark border-t border-stone-800 text-stone-muted text-xs font-normal">
      
      {/* Top section with newsletter and contact cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-stone-800 pb-12 items-start">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-olive text-cream-light p-2 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-serif font-light text-white tracking-tight">
                Verdant<span className="text-sage italic">Cleaners</span>
              </span>
            </div>
            <p className="text-stone-muted leading-relaxed text-xs font-light">
              Molly Maid-inspired premium residential and commercial cleaning services. Serving local communities since 2012 with 100% bonded, background-checked, and academy-trained cleaning professionals.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-sage" />
              <span>Mon-Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">Services</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#services" className="hover:text-sage transition-colors">Regular Cleaning</a></li>
              <li><a href="#services" className="hover:text-sage transition-colors">Deep Clean Special</a></li>
              <li><a href="#services" className="hover:text-sage transition-colors">Move-In / Move-Out</a></li>
              <li><a href="#services" className="hover:text-sage transition-colors">Green Eco Cleaning</a></li>
              <li><a href="#services" className="hover:text-sage transition-colors">Commercial Cleaning</a></li>
            </ul>
          </div>

          {/* Location / Info Column */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">Contact Branch</h4>
            <ul className="space-y-2.5 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>100 Blue Hill Avenue, Suite 300<br />Boston, MA 02119</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <a href="tel:18005550199" className="hover:text-sage transition-colors">(800) 555-0199</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <a href="mailto:boston@verdantcleaners.com" className="hover:text-sage transition-colors">boston@verdantcleaners.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">Special Offers</h4>
            <p className="text-stone-muted leading-relaxed font-light">
              Subscribe to get seasonal promotion coupon codes, home care checklists, and priority slot availability alerts.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-[#5A5A40]/15 border border-[#5A5A40]/30 text-cream-light rounded-xl flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4 shrink-0 text-sage" />
                <span className="font-semibold">Thanks for subscribing! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-[#2C292A] border border-stone-800 focus:border-sage focus:ring-1 focus:ring-sage rounded-lg px-3 py-2 text-xs text-white outline-none placeholder-stone-500"
                />
                <button
                  type="submit"
                  className="bg-olive hover:bg-olive/90 text-white font-bold p-2 px-3 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright and disclosures */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} VerdantCleaners Inc. All rights reserved. Locally owned and operated franchise.</p>
            <p className="text-stone-300 font-medium">A website by <span className="text-sage font-bold tracking-wide">Anoosha Rizvi</span></p>
          </div>
          <div className="flex gap-4 font-semibold">
            <a href="#privacy" className="hover:text-stone-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-stone-400">Terms of Service</a>
            <a href="#sitemap" className="hover:text-stone-400">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
