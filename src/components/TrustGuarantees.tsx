/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../lib/cleaningUtils';

export default function TrustGuarantees() {
  return (
    <section className="py-24 bg-white border-t border-stone-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Done Right Guarantee block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Guarantee Graphic Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4]">
              {/* Outer Glow */}
              <div className="absolute -inset-1.5 bg-sage/20 rounded-xl3 blur-lg pointer-events-none"></div>

              {/* Image Frame */}
              <div className="relative w-full h-full rounded-xl3 overflow-hidden border border-stone-200/60 bg-[#FAFAF9] shadow-xl">
                <img
                  src="/src/assets/images/cleaning_professionals_1785940458072.jpg"
                  alt="Friendly, Professional Cleaning Specialists"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Shield Badge */}
                <div className="absolute top-4 right-4 bg-olive border border-olive/90 text-white p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center w-16 h-16">
                  <Award className="w-6 h-6 text-cream-light" />
                  <span className="text-[8px] font-black uppercase mt-1 tracking-wider">Vetted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sage/10 border border-sage/20 text-olive rounded-full text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-olive" />
              <span>Full Liability Insurance & Bond Protection</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark tracking-tight leading-tight">
              Our Famous <span className="text-olive italic font-serif">24-Hour</span> Done Right Guarantee
            </h2>

            <p className="text-stone-muted leading-relaxed text-base font-light">
              At VerdantCleaners, we treat your home like our own. We hire only the finest cleaning professionals, train them rigorously in our custom academies, and equip them with safe, premium supplies.
            </p>

            <div className="p-6 bg-[#FAFAF9] border border-stone-200/60 rounded-xl3 space-y-5 shadow-sm">
              <div className="flex gap-4">
                <div className="p-2.5 bg-sage/15 border border-sage/20 rounded-xl text-olive shrink-0 h-10 w-10 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-dark mb-1 font-serif">Uncompromising Satisfaction</h4>
                  <p className="text-xs text-stone-muted leading-relaxed font-light">
                    If you are ever disappointed with any corner of your clean, simply call us within 24 hours of our visit. We will send a team right back to re-clean it to perfection at absolutely zero cost to you.
                  </p>
                </div>
              </div>

              <div className="h-px bg-stone-200/60"></div>

              <div className="flex gap-4">
                <div className="p-2.5 bg-sage/15 border border-sage/20 rounded-xl text-olive shrink-0 h-10 w-10 flex items-center justify-center">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-dark mb-1 font-serif">Bonded & Screened Employees</h4>
                  <p className="text-xs text-stone-muted leading-relaxed font-light">
                    We never hire subcontractors. Every maid who enters your home is an official, vetted, W-2 VerdantCleaners employee, background-checked and highly trustworthy.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Client Reviews Section */}
        <div className="border-t border-stone-200/50 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-bold text-olive uppercase tracking-widest mb-2">Social Proof</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-dark tracking-tight">
              What Our Satisfied Neighbors Say
            </h2>
            <div className="w-12 h-0.5 bg-sage mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-[#FAFAF9] border border-stone-200/60 rounded-xl3 p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-stone-muted leading-relaxed mb-6 italic font-light">
                    "{review.text}"
                  </p>
                </div>

                {/* Reviewer Meta */}
                <div className="flex items-center justify-between border-t border-stone-200/50 pt-4">
                  <div>
                    <p className="text-xs font-bold text-stone-dark">{review.author}</p>
                    <p className="text-[10px] text-stone-muted font-semibold uppercase tracking-wider mt-0.5">
                      {review.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-sage/15 border border-sage/20 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 text-olive" />
                    <span className="text-[9px] text-olive font-bold uppercase tracking-wider">Verified Clean</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
