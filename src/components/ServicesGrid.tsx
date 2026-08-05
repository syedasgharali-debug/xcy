/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ShieldCheck, PackageOpen, Leaf, Building2, CheckCircle2 } from 'lucide-react';
import { SERVICE_OPTIONS } from '../lib/cleaningUtils';
import { ServiceType } from '../types';

interface ServicesGridProps {
  onSelectService: (serviceId: ServiceType) => void;
}

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  // Map icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-olive" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-olive" />;
      case 'PackageOpen':
        return <PackageOpen className="w-6 h-6 text-olive" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-olive" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-olive" />;
      default:
        return <Sparkles className="w-6 h-6 text-olive" />;
    }
  };

  const getIncludes = (id: ServiceType) => {
    switch (id) {
      case 'regular':
        return ['Dust surfaces, tables & shelves', 'Vacuum & mop all flooring', 'Wipe down kitchen exterior surfaces', 'Sanitize shower, toilet & sinks', 'Empty all waste baskets'];
      case 'deep':
        return ['Everything in Regular Clean', 'Dust all high light fixtures & vents', 'Hand-wipe baseboards & moldings', 'Detailed tile grout scrubbing', 'Deep dust blinds & window sills'];
      case 'move-in-out':
        return ['Inside oven & refrigerator', 'Inside all drawers & kitchen cabinets', 'Wash baseboards, doors & doorframes', 'Scrub bathroom lime & mineral scale', 'Full sweep & vacuum of empty spaces'];
      case 'eco':
        return ['100% Certified Eco-Friendly products', 'Kid & pet safe, non-toxic solutions', 'HEPA-filtered dust vacuuming', 'Natural aromatherapy essential oils', 'Complete allergen-reduction dust wipe'];
      case 'office':
        return ['Desk surface cleaning & sanitizing', 'High-traffic lobby & entrance cleanup', 'Sanitize computer keyboards & mice', 'Breakroom & microwave deep clean', 'Trash sorting & scheduled floor buffing'];
      default:
        return [];
    }
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-stone-200/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark tracking-tight">
            Professional Cleaning Services For Your Home & Business
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto mt-4 rounded-full"></div>
          <p className="text-stone-muted mt-4 text-base sm:text-lg leading-relaxed font-light">
            Choose from our specialized local service packages. No long-term commitments, no surprise fees. Pick the package that suits your schedule.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_OPTIONS.map((service) => {
            const inclusions = getIncludes(service.id);
            return (
              <div
                key={service.id}
                className="flex flex-col h-full bg-white border border-stone-200/60 rounded-xl3 hover:border-sage hover:shadow-xl hover:-translate-y-1 transition-all p-7 relative group"
              >
                {/* Header info */}
                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-sage/10 border border-sage/15 rounded-xl">
                    {getIcon(service.icon)}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-stone-muted uppercase tracking-widest font-extrabold leading-none">Starting From</p>
                    <p className="text-2xl font-normal text-stone-dark mt-1 font-serif">${service.basePrice}</p>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-serif text-xl font-bold text-stone-dark mb-2.5 group-hover:text-olive transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-muted mb-6 flex-grow leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-stone-100 mb-5"></div>

                {/* Inclusions */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-olive uppercase tracking-wider mb-3">What's Included:</p>
                  <ul className="space-y-2.5 text-xs text-stone">
                    {inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span className="font-light">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full text-center py-3 bg-stone-100 hover:bg-olive text-stone hover:text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all border border-stone-200 hover:border-transparent cursor-pointer"
                >
                  Select & Book Now
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
