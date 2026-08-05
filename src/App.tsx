/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import PricingEstimator from './components/PricingEstimator';
import TrustGuarantees from './components/TrustGuarantees';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Modals
import BookingModal from './components/BookingModal';
import QuoteRequestModal from './components/QuoteRequestModal';
import Dashboard from './components/Dashboard';

import { Booking, QuoteRequest, ServiceType, CleaningFrequency } from './types';

// Default mock seed data to make the Client Hub feel alive immediately
const SEED_BOOKINGS: Booking[] = [
  {
    id: 'MC-B-29185',
    zipCode: '02108',
    serviceType: 'regular',
    homeSize: 1500,
    bedrooms: 3,
    bathrooms: 2,
    frequency: 'bi-weekly',
    preferredDate: '2026-08-14',
    preferredTime: 'morning',
    addOns: [],
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah@example.com',
    customerPhone: '6175550199',
    specialInstructions: 'Clean towels in primary bathroom linen closet.',
    estimatedPrice: 157,
    status: 'confirmed',
    createdAt: '2026-08-01T10:00:00Z',
  },
];

const SEED_QUOTES: QuoteRequest[] = [
  {
    id: 'MC-Q-73912',
    zipCode: '02108',
    serviceType: 'deep',
    homeSize: 2200,
    bedrooms: 4,
    bathrooms: 2.5,
    frequency: 'one-time',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah@example.com',
    customerPhone: '6175550199',
    preferredContact: 'email',
    specialNotes: 'Interested in getting heavy tile scale removed from guest tub.',
    estimatedPrice: 325,
    quoteAmount: 295,
    status: 'quote-sent',
    createdAt: '2026-08-03T14:30:00Z',
  },
];

export default function App() {
  // Persistence state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  // Modal display states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);

  // Intent pre-fill states
  const [selectedZip, setSelectedZip] = useState('02108');
  const [estimatorDetails, setEstimatorDetails] = useState<{
    serviceType: ServiceType;
    homeSize: number;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    addOns: string[];
    estimatedPrice: number;
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('maidclean_bookings');
    const savedQuotes = localStorage.getItem('maidclean_quotes');

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings(SEED_BOOKINGS);
      localStorage.setItem('maidclean_bookings', JSON.stringify(SEED_BOOKINGS));
    }

    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    } else {
      setQuotes(SEED_QUOTES);
      localStorage.setItem('maidclean_quotes', JSON.stringify(SEED_QUOTES));
    }
  }, []);

  // Sync to localStorage
  const saveBookingsState = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('maidclean_bookings', JSON.stringify(newBookings));
  };

  const saveQuotesState = (newQuotes: QuoteRequest[]) => {
    setQuotes(newQuotes);
    localStorage.setItem('maidclean_quotes', JSON.stringify(newQuotes));
  };

  // Triggerers
  const handleOpenBooking = (zip?: string) => {
    setSelectedZip(zip || '02108');
    setEstimatorDetails(null);
    setIsBookingOpen(true);
  };

  const handleOpenQuote = (zip?: string) => {
    setSelectedZip(zip || '02108');
    setEstimatorDetails(null);
    setIsQuoteOpen(true);
  };

  const handleServiceSelect = (serviceId: ServiceType) => {
    setSelectedZip('02108');
    setEstimatorDetails({
      serviceType: serviceId,
      homeSize: 1500,
      bedrooms: 3,
      bathrooms: 2,
      frequency: 'bi-weekly',
      addOns: [],
      estimatedPrice: 157,
    });
    setIsBookingOpen(true);
  };

  const handleBookingWithEstimator = (details: typeof estimatorDetails) => {
    setEstimatorDetails(details);
    setIsBookingOpen(true);
  };

  const handleQuoteWithEstimator = (details: any) => {
    setEstimatorDetails({
      ...details,
      addOns: [],
    });
    setIsQuoteOpen(true);
  };

  // CRUD actions for Cleaning Hub
  const handleAddBookingSubmit = (newB: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const freshBooking: Booking = {
      ...newB,
      id: `MC-B-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    saveBookingsState([freshBooking, ...bookings]);
  };

  const handleAddQuoteSubmit = (newQ: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const freshQuote: QuoteRequest = {
      ...newQ,
      id: `MC-Q-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'pending-quote',
      createdAt: new Date().toISOString(),
    };
    saveQuotesState([freshQuote, ...quotes]);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
    saveBookingsState(updated);
  };

  const handleRescheduleBooking = (id: string, date: string, time: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, preferredDate: date, preferredTime: time } : b
    );
    saveBookingsState(updated);
  };

  const handleAcceptQuote = (quoteId: string) => {
    const quote = quotes.find((q) => q.id === quoteId);
    if (!quote) return;

    // 1. Mark quote as scheduled
    const updatedQuotes = quotes.map((q) => (q.id === quoteId ? { ...q, status: 'scheduled' as const } : q));
    saveQuotesState(updatedQuotes);

    // 2. Spawn a confirmed booking
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 4); // default 4 days from now
    
    const convertedBooking: Booking = {
      id: `MC-B-${Math.floor(10000 + Math.random() * 90000)}`,
      zipCode: quote.zipCode,
      serviceType: quote.serviceType,
      homeSize: quote.homeSize,
      bedrooms: quote.bedrooms,
      bathrooms: quote.bathrooms,
      frequency: quote.frequency,
      preferredDate: tomorrow.toISOString().split('T')[0],
      preferredTime: 'morning',
      addOns: [],
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerPhone: quote.customerPhone,
      specialInstructions: 'Quote converted to booking. Review specialized bathroom scope.',
      estimatedPrice: quote.quoteAmount || quote.estimatedPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    saveBookingsState([convertedBooking, ...bookings]);
  };

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-cream text-stone font-sans selection:bg-sage selection:text-white">
      
      {/* Header element */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenQuote={handleOpenQuote}
        onToggleDashboard={() => setIsHubOpen(true)}
        activeBookingsCount={activeBookingsCount}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenQuote={handleOpenQuote}
        />

        {/* Services Listings Grid */}
        <ServicesGrid
          onSelectService={handleServiceSelect}
        />

        {/* Dynamic Pricing Estimator Widget */}
        <PricingEstimator
          onOpenBookingWithDetails={handleBookingWithEstimator}
          onOpenQuoteWithDetails={handleQuoteWithEstimator}
        />

        {/* 24-Hour Guarantee & Customer Reviews */}
        <TrustGuarantees />

        {/* Categorized Accordion FAQ */}
        <FAQ />
      </main>

      {/* Footer block */}
      <Footer />

      {/* ================= MODALS ================= */}

      {/* Booking Form Step-by-Step wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setEstimatorDetails(null);
        }}
        initialZip={selectedZip}
        initialDetails={estimatorDetails}
        onSubmitBooking={handleAddBookingSubmit}
      />

      {/* Quote Request Form Step-by-Step wizard */}
      <QuoteRequestModal
        isOpen={isQuoteOpen}
        onClose={() => {
          setIsQuoteOpen(false);
          setEstimatorDetails(null);
        }}
        initialZip={selectedZip}
        initialDetails={estimatorDetails}
        onSubmitQuote={handleAddQuoteSubmit}
      />

      {/* Dashboard - Cleaning Hub slider */}
      <Dashboard
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        bookings={bookings}
        quotes={quotes}
        onCancelBooking={handleCancelBooking}
        onRescheduleBooking={handleRescheduleBooking}
        onAcceptQuote={handleAcceptQuote}
      />

    </div>
  );
}
