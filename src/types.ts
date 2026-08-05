/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceType = 'regular' | 'deep' | 'move-in-out' | 'eco' | 'office';

export type CleaningFrequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

export interface Booking {
  id: string;
  zipCode: string;
  serviceType: ServiceType;
  homeSize: number; // in sqft
  bedrooms: number;
  bathrooms: number;
  frequency: CleaningFrequency;
  preferredDate: string;
  preferredTime: string;
  addOns: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialInstructions: string;
  estimatedPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  zipCode: string;
  serviceType: ServiceType;
  homeSize: number;
  bedrooms: number;
  bathrooms: number;
  frequency: CleaningFrequency;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredContact: 'email' | 'phone' | 'text';
  specialNotes: string;
  estimatedPrice: number;
  quoteAmount?: number;
  status: 'pending-quote' | 'quote-sent' | 'scheduled' | 'declined';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  location: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'billing' | 'policies';
}
