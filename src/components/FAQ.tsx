/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../lib/cleaningUtils';

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'services' | 'billing' | 'policies'>('all');

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS
    : FAQS.filter(faq => faq.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'About VerdantCleaners' },
    { id: 'services', name: 'The Cleaning Process' },
    { id: 'billing', name: 'Pricing & Billing' },
    { id: 'policies', name: 'Our Policies' },
  ];

  return (
    <section id="faq" className="py-24 bg-[#F5F5F0] border-t border-stone-200/50 scroll-mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark tracking-tight flex items-center justify-center gap-2.5">
            <HelpCircle className="w-7 h-7 text-olive shrink-0" />
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto mt-4 rounded-full"></div>
          <p className="text-stone-muted mt-4 text-base leading-relaxed font-light">
            Everything you need to know about preparing for our clean, guarantees, billing cycles, and pet arrangements.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setOpenFaqId(null);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-sage border-sage text-white shadow-md shadow-sage/10'
                  : 'bg-white border-stone-250 text-stone-muted hover:border-sage/40 hover:text-stone-dark'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-xl3 overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-sage/40 shadow-sm' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center text-left p-5 text-sm font-semibold text-stone-dark outline-none select-none cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className={`p-1 bg-stone-50 border border-stone-250 rounded-lg text-stone-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-olive border-sage/30 bg-sage/10' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Body Content */}
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-60 opacity-100 border-t border-stone-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="p-5 text-xs text-stone-muted leading-relaxed font-light bg-[#FAFAF9]">
                    {faq.answer.replace(/MaidClean/g, 'VerdantCleaners')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Callout Footer */}
        <div className="mt-14 p-6 bg-white border border-stone-200 rounded-xl3 text-center shadow-sm">
          <p className="text-xs text-stone-muted font-light leading-relaxed">
            Have a question not answered here? Our live coordinators are available Monday through Saturday. <br />
            <a href="tel:18005550199" className="text-olive hover:text-olive/80 font-bold underline decoration-1 mt-1 inline-block">
              Call us directly: (800) 555-0199
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
