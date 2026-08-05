/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceType, CleaningFrequency, AddOnItem } from '../types';

export const SERVICE_OPTIONS = [
  {
    id: 'regular' as ServiceType,
    name: 'Regular House Cleaning',
    description: 'Perfect for keeping your home consistently pristine. Includes dusting, vacuuming, mopping, kitchen surface wipedowns, and bathroom cleaning.',
    basePrice: 120,
    icon: 'Sparkles',
  },
  {
    id: 'deep' as ServiceType,
    name: 'Deep Clean Special',
    description: 'An intensive, detailed top-to-bottom refresh. Includes everything in regular cleaning plus baseboard washing, detailed grout scrub, light fixtures, and vents.',
    basePrice: 185,
    icon: 'ShieldCheck',
  },
  {
    id: 'move-in-out' as ServiceType,
    name: 'Move In / Move Out',
    description: 'Breathe easy during transitions. A comprehensive cleaning designed to meet landlord inspection standards or prep your new place for immediate move-in.',
    basePrice: 240,
    icon: 'PackageOpen',
  },
  {
    id: 'eco' as ServiceType,
    name: 'Green Eco Cleaning',
    description: 'Pet-friendly, children-safe, and 100% sustainable. We use exclusively certified biodegradable, non-toxic products to protect your health and environment.',
    basePrice: 135,
    icon: 'Leaf',
  },
  {
    id: 'office' as ServiceType,
    name: 'Commercial & Office',
    description: 'Keep your workplace safe, productive, and inviting. Customized deep cleaning for corporate offices, clinics, retail shops, and shared workspaces.',
    basePrice: 210,
    icon: 'Building2',
  },
];

export const FREQUENCY_OPTIONS = [
  { id: 'weekly' as CleaningFrequency, name: 'Weekly', discount: 0.20, label: 'Save 20% - Recommended for busy households' },
  { id: 'bi-weekly' as CleaningFrequency, name: 'Bi-Weekly', discount: 0.15, label: 'Save 15% - Our most popular schedule' },
  { id: 'monthly' as CleaningFrequency, name: 'Monthly', discount: 0.10, label: 'Save 10% - Great for routine maintenance' },
  { id: 'one-time' as CleaningFrequency, name: 'One-Time Clean', discount: 0.00, label: 'Standard rate - No commitment required' },
];

export const ADD_ONS: AddOnItem[] = [
  { id: 'inside-fridge', name: 'Inside Refrigerator', price: 35, icon: 'Refrigerator', description: 'Deep clean, organize, and sanitize inside the fridge.' },
  { id: 'inside-oven', name: 'Inside Oven', price: 45, icon: 'Flame', description: 'Bake-off baked-on grease and carbon residues.' },
  { id: 'interior-windows', name: 'Interior Windows', price: 50, icon: 'Maximize2', description: 'Streak-free polish of internal glass panes and frames.' },
  { id: 'cabinet-cleaning', name: 'Cabinet Interiors', price: 40, icon: 'Layers', description: 'Wipe down empty cabinets and drawer interior shelves.' },
  { id: 'deep-carpet', name: 'Carpet Deep Scrub', price: 90, icon: 'Grid', description: 'Steam clean and deodorize carpet fibers.' },
];

export function calculateCleaningPrice(params: {
  serviceType: ServiceType;
  homeSize: number;
  bedrooms: number;
  bathrooms: number;
  frequency: CleaningFrequency;
  selectedAddOnIds: string[];
}): number {
  const service = SERVICE_OPTIONS.find((s) => s.id === params.serviceType) || SERVICE_OPTIONS[0];
  let price = service.basePrice;

  // Add for square footage (above 1000 sqft base)
  if (params.homeSize > 1000) {
    const extraSqFt = params.homeSize - 1000;
    price += extraSqFt * 0.08; // 8 cents per extra sqft
  }

  // Add for rooms
  price += params.bedrooms * 15;
  price += params.bathrooms * 25;

  // Add for add-ons
  params.selectedAddOnIds.forEach((id) => {
    const addOn = ADD_ONS.find((a) => a.id === id);
    if (addOn) {
      price += addOn.price;
    }
  });

  // Apply frequency discount
  const freq = FREQUENCY_OPTIONS.find((f) => f.id === params.frequency) || FREQUENCY_OPTIONS[3];
  price = price * (1 - freq.discount);

  return Math.round(price);
}

export const FAQS = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Are MaidClean teams professional, bonded, and insured?',
    answer: 'Yes, absolutely. Every MaidClean cleaning specialist undergoes a rigorous criminal background check, professional training, and is fully bonded and insured. This protects your home and provides total peace of mind.',
  },
  {
    id: 'faq-2',
    category: 'policies',
    question: 'What is your 24-Hour Cleaning Guarantee?',
    answer: 'We take enormous pride in our workmanship. If you are ever unsatisfied with any area we cleaned, notify us within 24 hours of your appointment. We will send a team back immediately to re-clean those specific areas free of charge.',
  },
  {
    id: 'faq-3',
    category: 'services',
    question: 'Do I need to be home when the cleaners arrive?',
    answer: 'No, you do not need to be home. Most of our clients prefer to provide a lockbox code, door keypad passcode, or leave a key with the front desk. If you prefer to be home during the service, that is perfectly fine too!',
  },
  {
    id: 'faq-4',
    category: 'services',
    question: 'Do you bring your own cleaning supplies and vacuums?',
    answer: 'Yes! We arrive fully equipped with professional-grade, sanitizing cleaning products, HEPA-filter vacuums, fresh microfiber cloths, and extendable dusters. If you have specialty surfaces (like unsealed marble or antique wood) and prefer we use your specific products, just let us know.',
  },
  {
    id: 'faq-5',
    category: 'billing',
    question: 'Is there a penalty for cancelling or rescheduling an appointment?',
    answer: 'We understand that plans change. You can cancel or reschedule any service up to 24 hours before your appointment without any penalty. Cancelations or rescheduling within 24 hours are subject to a small $50 booking preservation fee.',
  },
  {
    id: 'faq-6',
    category: 'policies',
    question: 'How do you handle pets in the home?',
    answer: 'We love pets! All our cleaning specialists are pet-friendly. We do ask that if you have aggressive or highly anxious pets, they are secured in a comfortable room or crate so our team can move around safely with vacuums and tools.',
  },
];

export const REVIEWS = [
  {
    id: 'r-1',
    author: 'Sarah Jenkins',
    rating: 5,
    date: 'July 24, 2026',
    location: 'Boston, MA',
    text: 'MaidClean has saved my sanity! With three kids and a busy job, I could never keep up. The bi-weekly team is punctual, extremely detail-oriented, and sweet with our golden retriever. Highly recommend!',
    verified: true,
  },
  {
    id: 'r-2',
    author: 'Marcus Vance',
    rating: 5,
    date: 'August 1, 2026',
    location: 'Cambridge, MA',
    text: 'I used their Move Out Clean for my apartment. The landlord is notoriously strict, but the apartment looked better than when I moved in! Got my entire security deposit back. Super easy to book online.',
    verified: true,
  },
  {
    id: 'r-3',
    author: 'Clara Thompson',
    rating: 5,
    date: 'July 18, 2026',
    location: 'Quincy, MA',
    text: 'The 24-hour guarantee is real! Once, they missed dusting the top shelf of my bookshelf. I called, and they had a friendly team out the very next morning to make it right. Amazing customer service.',
    verified: true,
  },
];
