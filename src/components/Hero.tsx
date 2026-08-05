/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, Shield, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (zip: string) => void;
  onOpenQuote: (zip: string) => void;
}

export default function Hero({ onOpenBooking, onOpenQuote }: HeroProps) {
  const [zipInput, setZipInput] = useState('');
  const [zipChecked, setZipChecked] = useState(false);
  const [zipError, setZipError] = useState('');
  const [isEligible, setIsEligible] = useState(false);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) {
      setZipError('Please enter a ZIP code');
      return;
    }

    const cleanZip = zipInput.trim();
    if (!/^\d{5}$/.test(cleanZip)) {
      setZipError('Please enter a valid 5-digit ZIP code');
      setZipChecked(false);
      return;
    }

    setZipError('');
    setZipChecked(true);
    // Simulating serving almost all US ZIP codes (except some imaginary ones)
    if (cleanZip.startsWith('0') || cleanZip.startsWith('1') || cleanZip.startsWith('2') || cleanZip.startsWith('9') || cleanZip.startsWith('3') || cleanZip.startsWith('8') || cleanZip.startsWith('4') || cleanZip.startsWith('7') || cleanZip.startsWith('5') || cleanZip.startsWith('6')) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F5F0] pt-12 pb-20 md:py-28">
      {/* Background soft organic blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sage/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-12 right-1/4 w-[400px] h-[400px] bg-olive/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text and search */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-stone-200/50 text-olive rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sage" />
              <span>Boston Metro & surrounding towns</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-light text-stone-dark tracking-tight leading-[1.1] md:mb-6">
              A clean home,<br />
              <span className="italic text-olive font-serif">naturally</span> simple.
            </h1>

            <p className="text-lg text-stone/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Trust the local cleaning service that is insured, background-checked, and backed by our famous <span className="text-stone-dark font-medium underline decoration-sage decoration-2">24-Hour Satisfaction Guarantee</span>. We handle the dust so you can handle your life.
            </p>

            {/* ZIP checking box */}
            <div className="max-w-md mx-auto lg:mx-0 p-6 bg-white rounded-xl3 border border-stone-200/40 shadow-xl">
              <h3 className="text-xs font-bold text-stone uppercase tracking-widest mb-3 flex items-center justify-center lg:justify-start gap-1.5">
                <MapPin className="w-4 h-4 text-olive" />
                Find local rates & availability:
              </h3>

              <form onSubmit={handleZipCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value.replace(/\D/g, ''));
                    setZipChecked(false);
                    setZipError('');
                  }}
                  placeholder="Enter 5-digit ZIP"
                  className="flex-1 bg-cream-light border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage text-stone rounded-xl px-4 py-3 text-base placeholder-stone-muted outline-none transition-all font-semibold tracking-wider text-center"
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check ZIP</span>
                </button>
              </form>

              {zipError && (
                <p className="mt-2.5 text-xs font-semibold text-rose-600 text-left pl-1">{zipError}</p>
              )}

              {zipChecked && isEligible && (
                <div className="mt-4 p-4 bg-sage/10 border border-sage/20 rounded-xl text-left animate-fadeIn">
                  <p className="text-xs font-semibold text-olive flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-olive shrink-0" />
                    Excellent! VerdantCleaners is active in {zipInput}!
                  </p>
                  <div className="mt-3 flex gap-2.5">
                    <button
                      onClick={() => onOpenBooking(zipInput)}
                      className="flex-1 text-center py-2.5 btn-primary text-xs cursor-pointer"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => onOpenQuote(zipInput)}
                      className="flex-1 text-center py-2.5 bg-transparent hover:bg-stone-50 text-stone text-xs font-bold border border-stone-300 rounded-full transition-all cursor-pointer"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              )}

              {zipChecked && !isEligible && (
                <p className="mt-3 text-xs font-semibold text-rose-600 text-left pl-1">
                  We don't serve {zipInput} yet. Join our waitlist!
                </p>
              )}
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center space-x-1">
                  <Shield className="w-5 h-5 text-olive" />
                  <span className="text-stone font-bold text-xs">Bonded & Insured</span>
                </div>
                <p className="text-[11px] text-stone-muted mt-0.5">100% Client Protected</p>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center space-x-1">
                  <Award className="w-5 h-5 text-olive" />
                  <span className="text-stone font-bold text-xs">24-Hr Guarantee</span>
                </div>
                <p className="text-[11px] text-stone-muted mt-0.5">Perfect Clean or Free Return</p>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-5 h-5 text-olive" />
                  <span className="text-stone font-bold text-xs">No Contracts</span>
                </div>
                <p className="text-[11px] text-stone-muted mt-0.5">Cancel or Skip Anytime</p>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square lg:aspect-auto">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-sage/20 to-olive/20 rounded-[2.5rem] opacity-30 blur-xl pointer-events-none"></div>
              
              {/* Image Frame */}
              <div className="relative w-full rounded-xl3 overflow-hidden border border-stone-200/50 bg-white shadow-xl">
                <img
                  src="/src/assets/images/hero_clean_home_1785940439985.jpg"
                  alt="Sparkling Clean Modern Living Room"
                  className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/10] md:aspect-video lg:aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating trust badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-stone-100 p-4 rounded-xl shadow-lg flex items-center justify-between text-stone">
                  <div>
                    <p className="text-xs text-olive font-extrabold uppercase tracking-widest">Client Satisfaction</p>
                    <p className="text-lg font-black text-stone-dark mt-0.5 font-serif">4.9/5 Rating</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-sage text-cream-light text-[10px] font-bold flex items-center justify-center"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-olive text-cream-light text-[10px] font-bold flex items-center justify-center">
                      +10k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
