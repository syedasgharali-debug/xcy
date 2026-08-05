/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Mail, Phone, MessageSquare, Sparkles, MapPin } from 'lucide-react';
import { calculateCleaningPrice, SERVICE_OPTIONS, FREQUENCY_OPTIONS } from '../lib/cleaningUtils';
import { ServiceType, CleaningFrequency, QuoteRequest } from '../types';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZip?: string;
  initialDetails?: {
    serviceType: ServiceType;
    homeSize: number;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    estimatedPrice: number;
  } | null;
  onSubmitQuote: (quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export default function QuoteRequestModal({
  isOpen,
  onClose,
  initialZip = '',
  initialDetails = null,
  onSubmitQuote,
}: QuoteRequestModalProps) {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState(initialZip || '02108');
  const [serviceType, setServiceType] = useState<ServiceType>('regular');
  const [homeSize, setHomeSize] = useState<number>(1500);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi-weekly');

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'text'>('email');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');
  const [validationError, setValidationError] = useState('');

  // Handle default initial value updates when modal opens with details
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setStep(1);
      setValidationError('');
      if (initialZip) {
        setZipCode(initialZip);
      }
      if (initialDetails) {
        setServiceType(initialDetails.serviceType);
        setHomeSize(initialDetails.homeSize);
        setBedrooms(initialDetails.bedrooms);
        setBathrooms(initialDetails.bathrooms);
        setFrequency(initialDetails.frequency);
        setStep(2); // Skip directly to step 2 as details are pre-filled
      }
    }
  }, [isOpen, initialDetails, initialZip]);

  if (!isOpen) return null;

  // Real-time calculated price
  const estimatedPrice = calculateCleaningPrice({
    serviceType,
    homeSize,
    bedrooms,
    bathrooms,
    frequency,
    selectedAddOnIds: [],
  });

  const handleNextStep = () => {
    if (step === 1) {
      if (!/^\d{5}$/.test(zipCode)) {
        setValidationError('Please enter a valid 5-digit ZIP code');
        return;
      }
      if (homeSize < 100 || homeSize > 10000) {
        setValidationError('Please enter a realistic home size between 100 and 10,000 sqft');
        return;
      }
      setValidationError('');
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('Please enter your full name');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setValidationError('Please enter a valid email address');
      return;
    }
    if (!/^\d{10}$/.test(customerPhone.replace(/\D/g, ''))) {
      setValidationError('Please enter a valid 10-digit phone number');
      return;
    }

    setValidationError('');
    
    // Submit upwards
    onSubmitQuote({
      zipCode,
      serviceType,
      homeSize,
      bedrooms,
      bathrooms,
      frequency,
      customerName,
      customerEmail,
      customerPhone,
      preferredContact,
      specialNotes,
      estimatedPrice,
    });

    const ref = `VC-Q-${Math.floor(10000 + Math.random() * 90000)}`;
    setQuoteReference(ref);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#433E3F]/80 backdrop-blur-sm animate-fadeIn">
      
      <div className="bg-white border border-stone-200/80 rounded-xl3 max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header decoration */}
        <div className="h-1.5 bg-olive"></div>

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-muted hover:text-stone-dark p-2 hover:bg-stone-50 rounded-xl transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-olive">Step {step} of 2</span>
              <h2 className="text-xl font-serif font-light text-stone-dark mt-1">Request a Custom Cleaning Quote</h2>
              <p className="text-xs text-stone-muted mt-1 font-light">Get precise rates reviewed by our local branch managers.</p>
            </div>

            {/* Estimated Price Bar */}
            <div className="p-3 bg-[#FAFAF9] border border-stone-200 rounded-xl3 mb-6 flex justify-between items-center">
              <div>
                <p className="text-[9px] text-stone-muted font-bold uppercase tracking-wider">Live Est. Rate</p>
                <p className="text-lg font-serif font-light text-stone-dark mt-0.5">
                  ${estimatedPrice}
                  <span className="text-[10px] font-normal text-stone-muted"> / clean</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-olive font-semibold px-2 py-1 bg-sage/10 border border-sage/20 rounded-lg">
                  {FREQUENCY_OPTIONS.find((f) => f.id === frequency)?.name}
                </span>
              </div>
            </div>

            {validationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-150 text-red-700 text-xs font-semibold rounded-xl leading-relaxed">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: Property and sizing */}
              {step === 1 && (
                <div className="space-y-4 animate-slideIn">
                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Local ZIP Code</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-stone-muted" />
                      <input
                        type="text"
                        maxLength={5}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-sm rounded-xl pl-10 pr-4 py-3 text-stone-dark outline-none font-semibold tracking-wider"
                        placeholder="ZIP Code (e.g. 02108)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Service Tier</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value as ServiceType)}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                      >
                        {SERVICE_OPTIONS.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Home Size (SQFT)</label>
                      <input
                        type="number"
                        min={100}
                        max={10000}
                        required
                        value={homeSize || ''}
                        onChange={(e) => setHomeSize(Number(e.target.value))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-4 py-3 text-stone-dark outline-none"
                        placeholder="Size (e.g. 1500)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Bedrooms</label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <option key={num} value={num}>{num === 0 ? 'Studio (0)' : `${num} Bedrooms`}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Bathrooms</label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                      >
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map((num) => (
                          <option key={num} value={num}>{num} Bathrooms</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Desired Frequency</label>
                    <div className="grid grid-cols-2 gap-2">
                      {FREQUENCY_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrequency(f.id)}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all cursor-pointer ${
                            frequency === f.id
                              ? 'bg-sage/15 border-sage text-olive'
                              : 'bg-cream-light border-stone-200 text-stone-muted'
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3.5 btn-primary text-base cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Contact & Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Contact Info */}
              {step === 2 && (
                <div className="space-y-4 animate-slideIn">
                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-4 py-3 text-stone-dark outline-none"
                      placeholder="e.g. Sarah Jenkins"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-4 py-3 text-stone-dark outline-none"
                        placeholder="sarah@example.com"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-4 py-3 text-stone-dark outline-none"
                        placeholder="e.g. 6175550199"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-2">Preferred Contact Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'email', label: 'Email', icon: <Mail className="w-3.5 h-3.5" /> },
                        { id: 'phone', label: 'Phone Call', icon: <Phone className="w-3.5 h-3.5" /> },
                        { id: 'text', label: 'SMS Text', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPreferredContact(item.id as any)}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            preferredContact === item.id
                              ? 'bg-sage/15 border-sage text-olive'
                              : 'bg-cream-light border-stone-200 text-stone-muted'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Special Instructions / Notes</label>
                    <textarea
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl p-3 text-stone-dark outline-none resize-none"
                      placeholder="Mention any pets, security code instructions, hard water, or priority rooms..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 bg-stone-100 hover:bg-stone-200 text-stone-dark font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 btn-primary text-base cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Quote Request</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-sage/10 border-2 border-sage rounded-full flex items-center justify-center mx-auto text-olive">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-serif font-light text-stone-dark">Quote Request Received!</h2>
              <p className="text-xs text-stone-muted leading-relaxed max-w-sm mx-auto">
                Thank you, <span className="text-stone-dark font-bold">{customerName}</span>. Your details have been transmitted to the branch serving <span className="text-olive font-bold">{zipCode}</span>.
              </p>
            </div>

            <div className="bg-[#FAFAF9] border border-stone-200 p-4 rounded-xl3 max-w-xs mx-auto">
              <p className="text-[10px] text-stone-muted font-bold uppercase tracking-widest">Your Tracking Reference</p>
              <p className="text-lg font-mono font-bold text-olive mt-1">{quoteReference}</p>
              <p className="text-[9px] text-stone-muted mt-2">
                We will email/text your official quote within <span className="text-stone-dark font-semibold">2 hours</span>.
              </p>
            </div>

            <p className="text-xs text-stone-muted font-medium">
              You can check the status of this quote request anytime inside your{' '}
              <span className="text-stone-dark font-bold">My Cleaning Hub</span>.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-dark font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
