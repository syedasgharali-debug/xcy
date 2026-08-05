/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Phone, CalendarCheck2, FileText, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (zip?: string) => void;
  onOpenQuote: (zip?: string) => void;
  onToggleDashboard: () => void;
  activeBookingsCount: number;
}

export default function Header({
  onOpenBooking,
  onOpenQuote,
  onToggleDashboard,
  activeBookingsCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/60 shadow-sm text-stone">
      {/* Top Notification Bar */}
      <div className="w-full bg-olive text-cream-light text-center py-1.5 px-4 text-xs font-semibold tracking-wide">
        ✨ Save 20% on Recurring Services — Insured, Bonded & Background-Checked Cleaners
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-olive text-white p-2 sm:p-2.5 rounded-full shadow-sm flex items-center justify-center shrink-0">
              <Sparkles className="w-4.5 h-4.5 sm:w-5 h-5 text-cream-light" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-dark sm:text-2xl whitespace-nowrap">
                Verdant<span className="text-olive font-serif italic font-normal">Cleaners</span>
              </span>
              <p className="text-[10px] text-stone-muted font-bold uppercase tracking-wider hidden sm:block">
                A Premium Eco-Friendly Cleaning Service
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs xl:text-sm font-medium text-stone/80 uppercase tracking-wider">
            <a href="#services" className="hover:text-olive transition-colors whitespace-nowrap">Our Services</a>
            <a href="#estimator" className="hover:text-olive transition-colors whitespace-nowrap">Pricing Estimator</a>
            <a href="#faq" className="hover:text-olive transition-colors whitespace-nowrap">FAQs</a>
          </nav>

          {/* Contact & CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* Phone (Shown only on xl and above) */}
            <div className="hidden xl:flex items-center space-x-2 text-stone shrink-0">
              <div className="p-1.5 bg-sage/10 rounded-full text-olive">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-stone-muted font-bold uppercase leading-none">Call Our Experts</p>
                <a href="tel:18005550199" className="text-xs font-bold text-stone-dark hover:text-olive transition-colors">
                  (800) 555-0199
                </a>
              </div>
            </div>

            {/* Hub Trigger Button */}
            <button
              onClick={onToggleDashboard}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 text-xs bg-sage/10 hover:bg-sage/25 text-olive font-bold rounded-full transition-all whitespace-nowrap cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">My Cleaning Hub</span>
              <span className="inline xl:hidden">My Hub</span>
              {activeBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Request Quote Button (Shown only on xl and above) */}
            <button
              onClick={() => onOpenQuote()}
              className="hidden xl:inline-block px-3.5 py-2 text-xs bg-transparent hover:bg-stone-50 text-stone border border-stone-250 font-bold rounded-full transition-all whitespace-nowrap cursor-pointer"
            >
              Request Quote
            </button>

            {/* Book Online Button */}
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary px-3.5 py-1.5 xl:px-4 xl:py-2 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Online
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 lg:hidden">
            {/* Quick Hub for Mobile */}
            <button
              onClick={onToggleDashboard}
              className="relative p-1.5 sm:p-2 text-olive bg-sage/15 rounded-full hover:bg-sage/25 transition-all shrink-0 cursor-pointer"
              aria-label="My Cleaning Hub"
            >
              <User className="w-4.5 h-4.5 sm:w-5 h-5" />
              {activeBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs btn-primary whitespace-nowrap shrink-0 cursor-pointer font-bold"
            >
              Book Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-stone hover:text-olive focus:outline-none shrink-0 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 h-6" /> : <Menu className="w-5 h-5 sm:w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-semibold text-stone/80">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-olive">Our Services</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="hover:text-olive">Pricing Estimator</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-olive">FAQs</a>
          </nav>

          <div className="h-px bg-stone-100 my-4"></div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 text-center text-sm font-bold border border-stone-300 text-stone rounded-full"
            >
              Request Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-bold btn-primary"
            >
              Book Online
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2 pt-2 text-stone-muted text-sm font-semibold">
            <Phone className="w-4 h-4 text-olive" />
            <a href="tel:18005550199">(800) 555-0199</a>
          </div>
        </div>
      )}
    </header>
  );
}
