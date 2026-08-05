/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Clock, CreditCard, Sparkles } from 'lucide-react';
import { calculateCleaningPrice, SERVICE_OPTIONS, FREQUENCY_OPTIONS, ADD_ONS } from '../lib/cleaningUtils';
import { ServiceType, CleaningFrequency, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZip?: string;
  initialDetails?: {
    serviceType: ServiceType;
    homeSize: number;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    addOns: string[];
    estimatedPrice: number;
  } | null;
  onSubmitBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialZip = '',
  initialDetails = null,
  onSubmitBooking,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState(initialZip || '02108');
  const [serviceType, setServiceType] = useState<ServiceType>('regular');
  const [homeSize, setHomeSize] = useState<number>(1500);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi-weekly');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Scheduling
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');

  // Client info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'onsite'>('onsite');
  
  // Card mock state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [validationError, setValidationError] = useState('');

  // Set initial form states
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
        setSelectedAddOns(initialDetails.addOns);
        setStep(2); // Skip directly to scheduling since sizes are prefilled
      } else {
        setSelectedAddOns([]);
      }

      // Default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPreferredDate(tomorrow.toISOString().split('T')[0]);
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
    selectedAddOnIds: selectedAddOns,
  });

  const handleNextStep = () => {
    if (step === 1) {
      if (!/^\d{5}$/.test(zipCode)) {
        setValidationError('Please enter a valid 5-digit ZIP code');
        return;
      }
      if (!preferredDate) {
        setValidationError('Please choose your preferred appointment date');
        return;
      }
      
      const chosenDate = new Date(preferredDate);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (chosenDate < today) {
        setValidationError('Appointment date cannot be in the past');
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

  const handleAddOnToggle = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
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

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
        setValidationError('Please enter a valid 16-digit credit card number');
        return;
      }
    }

    setValidationError('');

    onSubmitBooking({
      zipCode,
      serviceType,
      homeSize,
      bedrooms,
      bathrooms,
      frequency,
      preferredDate,
      preferredTime,
      addOns: selectedAddOns,
      customerName,
      customerEmail,
      customerPhone,
      specialInstructions,
      estimatedPrice,
    });

    const bId = `VC-B-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingId(bId);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#433E3F]/80 backdrop-blur-sm animate-fadeIn">
      
      <div className="bg-white border border-stone-200/80 rounded-xl3 max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header Ribbon */}
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
            
            {/* Header info */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-olive">Step {step} of 2</span>
              <h2 className="text-xl font-serif font-light text-stone-dark mt-1">Book Your Appointment</h2>
              <p className="text-xs text-stone-muted mt-1 font-light">Select date and details to reserve your cleaning slot.</p>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#FAFAF9] border border-stone-200 rounded-xl3 mb-6 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-stone-muted font-bold uppercase tracking-wider">Estimated Total</p>
                <p className="text-2xl font-serif font-light text-stone-dark mt-0.5">${estimatedPrice}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-olive font-bold px-2.5 py-1.5 bg-sage/10 border border-sage/20 rounded-full">
                  {FREQUENCY_OPTIONS.find((f) => f.id === frequency)?.name}
                </span>
              </div>
            </div>

            {validationError && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-150 text-red-700 text-xs font-semibold rounded-xl">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: Layout & Schedule */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Quick Zip and Service */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Local ZIP Code</label>
                      <input
                        type="text"
                        maxLength={5}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                        placeholder="ZIP (e.g. 02108)"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Cleaning Package</label>
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
                  </div>

                  {/* Size and frequency */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Size (sqft)</label>
                      <input
                        type="number"
                        min={100}
                        max={10000}
                        required
                        value={homeSize || ''}
                        onChange={(e) => setHomeSize(Number(e.target.value))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Beds</label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-2 py-3 text-stone-dark outline-none"
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map(i => (
                          <option key={i} value={i}>{i === 0 ? 'Studio' : `${i} Bed`}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Baths</label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-2 py-3 text-stone-dark outline-none"
                      >
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map(i => (
                          <option key={i} value={i}>{i} Bath</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time selection */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sage" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sage" />
                        Arrival window
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                      >
                        <option value="morning">Morning (8 AM - 11 AM)</option>
                        <option value="midday">Mid-day (11 AM - 2 PM)</option>
                        <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Add-ons Select list in step 1 directly */}
                  <div className="pt-2">
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-2.5">
                      Add-on Services (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ADD_ONS.map((addOn) => {
                        const active = selectedAddOns.includes(addOn.id);
                        return (
                          <button
                            key={addOn.id}
                            type="button"
                            onClick={() => handleAddOnToggle(addOn.id)}
                            className={`p-2.5 text-left rounded-xl border text-[11px] font-bold flex justify-between items-center transition-all cursor-pointer ${
                              active
                                ? 'bg-sage/15 border-sage text-olive'
                                : 'bg-cream-light border-stone-200 text-stone-muted'
                            }`}
                          >
                            <span>{addOn.name}</span>
                            <span className="text-[10px] text-olive">+${addOn.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3.5 btn-primary text-base cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Contact & Checkout</span>
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Checkout & contact */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-4 py-3 text-stone-dark outline-none"
                        placeholder="Sarah Thompson"
                      />
                    </div>

                    <div className="sm:col-span-1.5">
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                        placeholder="sarah@example.com"
                      />
                    </div>

                    <div className="sm:col-span-1.5">
                      <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl px-3 py-3 text-stone-dark outline-none"
                        placeholder="617-555-0199"
                      />
                    </div>
                  </div>

                  {/* Payment options */}
                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-2">Payment preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('onsite')}
                        className={`p-3 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'onsite'
                            ? 'bg-sage/15 border-sage text-olive'
                            : 'bg-cream-light border-stone-200 text-stone-muted'
                        }`}
                      >
                        💵 Pay After Cleaning
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'bg-sage/15 border-sage text-olive'
                            : 'bg-cream-light border-stone-200 text-stone-muted'
                        }`}
                      >
                        💳 Pay with Credit Card
                      </button>
                    </div>
                  </div>

                  {/* Card payment detail */}
                  {paymentMethod === 'card' && (
                    <div className="p-3.5 bg-[#FAFAF9] border border-stone-200 rounded-xl3 space-y-3 animate-slideIn">
                      <div>
                        <label className="text-[10px] font-bold text-stone-muted uppercase block mb-1">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-stone-muted" />
                          <input
                            type="text"
                            maxLength={19}
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-white border border-stone-200 focus:border-sage text-xs rounded-lg pl-9 pr-3 py-2 text-stone-dark font-mono outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-stone-muted uppercase block mb-1">Expiry</label>
                          <input
                            type="text"
                            maxLength={5}
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full bg-white border border-stone-200 focus:border-sage text-xs rounded-lg px-3 py-2 text-stone-dark font-mono outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-stone-muted uppercase block mb-1">CVC</label>
                          <input
                            type="text"
                            maxLength={3}
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                            placeholder="123"
                            className="w-full bg-white border border-stone-200 focus:border-sage text-xs rounded-lg px-3 py-2 text-stone-dark font-mono outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-stone-dark uppercase block mb-1.5">Special Instructions</label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={2}
                      className="w-full bg-[#FAFAF9] border border-stone-250 focus:border-sage focus:ring-1 focus:ring-sage text-xs font-semibold rounded-xl p-3 text-stone-dark outline-none resize-none"
                      placeholder="e.g. key code is 4821, please double-lock the back patio. Dog is friendly..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 bg-stone-100 hover:bg-stone-200 text-stone-dark font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center cursor-pointer"
                    >
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 btn-primary text-base cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Schedule Cleaning</span>
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
              <h2 className="text-xl font-serif font-light text-stone-dark">Cleaning Scheduled!</h2>
              <p className="text-xs text-stone-muted leading-relaxed max-w-sm mx-auto">
                Excellent, <span className="text-stone-dark font-bold">{customerName}</span>. Your cleaning appointment is confirmed for <span className="text-olive font-bold">{preferredDate}</span>.
              </p>
            </div>

            <div className="bg-[#FAFAF9] border border-stone-200 p-4 rounded-xl3 max-w-xs mx-auto text-left">
              <p className="text-[10px] text-stone-muted font-bold uppercase tracking-widest text-center">Your Booking ID</p>
              <p className="text-lg font-mono font-bold text-olive mt-1 text-center">{bookingId}</p>
              <div className="h-px bg-stone-200 my-2.5"></div>
              <p className="text-[10px] text-stone-muted leading-relaxed">
                📅 <strong>Date:</strong> {preferredDate} <br />
                ⏰ <strong>Window:</strong> {preferredTime === 'morning' ? '8 AM - 11 AM' : preferredTime === 'midday' ? '11 AM - 2 PM' : '2 PM - 5 PM'} <br />
                🏠 <strong>Provider:</strong> VerdantCleaners Boston Metro
              </p>
            </div>

            <p className="text-[11px] text-stone-muted">
              Our professional cleaning crew will arrive during your selected arrival window. You can easily modify, cancel, or track this reservation anytime inside your{' '}
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
