/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, ClipboardList, Trash2, Edit3, Check, X, FileText, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Booking, QuoteRequest } from '../types';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  quotes: QuoteRequest[];
  onCancelBooking: (id: string) => void;
  onRescheduleBooking: (id: string, date: string, time: string) => void;
  onAcceptQuote: (quoteId: string) => void;
}

export default function Dashboard({
  isOpen,
  onClose,
  bookings,
  quotes,
  onCancelBooking,
  onRescheduleBooking,
  onAcceptQuote,
}: DashboardProps) {
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('morning');

  if (!isOpen) return null;

  const handleRescheduleSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!newDate) return;
    onRescheduleBooking(id, newDate, newTime);
    setReschedulingId(null);
  };

  const getServiceLabel = (serviceId: string) => {
    switch (serviceId) {
      case 'regular': return 'Regular Cleaning';
      case 'deep': return 'Deep Clean Special';
      case 'move-in-out': return 'Move In / Out Clean';
      case 'eco': return 'Green Eco Cleaning';
      case 'office': return 'Office & Commercial';
      default: return 'Cleaning Service';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 bg-sage/15 text-olive border border-sage/30 text-[10px] font-bold rounded-full uppercase">Confirmed</span>;
      case 'pending':
        return <span className="px-2.5 py-1 bg-[#F5F5F0] text-stone border border-stone-250 text-[10px] font-bold rounded-full uppercase">Pending Assignee</span>;
      case 'completed':
        return <span className="px-2.5 py-1 bg-stone-100 text-stone-muted text-[10px] font-bold rounded-full uppercase">Completed</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold rounded-full uppercase">Cancelled</span>;
      
      // Quotes
      case 'pending-quote':
        return <span className="px-2.5 py-1 bg-[#F5F5F0] text-stone border border-stone-250 text-[10px] font-bold rounded-full uppercase">Reviewing</span>;
      case 'quote-sent':
        return <span className="px-2.5 py-1 bg-sage/15 text-olive border border-sage/30 text-[10px] font-bold rounded-full uppercase">Quote Sent</span>;
      case 'scheduled':
        return <span className="px-2.5 py-1 bg-sage text-white text-[10px] font-bold rounded-full uppercase">Booked</span>;
      default:
        return <span className="px-2.5 py-1 bg-stone-100 text-stone-dark text-[10px] font-bold rounded-full uppercase">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-end bg-[#433E3F]/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Sliding Panel */}
      <div className="bg-white border-l border-stone-200/80 w-full max-w-xl min-h-screen shadow-2xl flex flex-col justify-between relative animate-slideLeft">
        
        {/* Scrollable Container */}
        <div className="p-6 sm:p-8 flex-grow overflow-y-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sage/15 border border-sage/20 text-olive rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-light text-stone-dark">My Cleaning Hub</h2>
                <p className="text-[11px] text-stone-muted mt-0.5 font-light">Manage your quotes and cleaning schedule</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-muted hover:text-stone-dark hover:bg-stone-50 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Vitals Summary */}
          <div className="p-4 bg-[#FAFAF9] border border-stone-200/80 rounded-xl3 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone font-bold border border-stone-200">
              <User className="w-5 h-5 text-olive" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-dark">Quick Access Profile</p>
              <p className="text-[10px] text-stone-muted mt-0.5 font-light">Syncing local cookies & localStorage</p>
              <div className="flex items-center gap-1 text-[9px] text-olive font-bold mt-1 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                <span>Verified Client Hub</span>
              </div>
            </div>
          </div>

          {/* Section A: My Cleaning Schedule */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-muted uppercase tracking-wider flex items-center gap-2 font-serif">
              <Calendar className="w-4 h-4 text-olive" />
              Active Cleaning Bookings ({bookings.length})
            </h3>

            {bookings.length === 0 ? (
              <div className="p-6 bg-[#FAFAF9] border border-stone-200 rounded-xl3 text-center space-y-2">
                <p className="text-xs text-stone-muted font-medium">No bookings found on this device.</p>
                <p className="text-[10px] text-stone-400 font-light">Complete an instant online booking to seed your schedule.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-5 bg-white border border-stone-200 rounded-xl3 relative space-y-4 shadow-sm"
                  >
                    {/* Top line */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-stone-muted block uppercase">{booking.id}</span>
                        <h4 className="text-sm font-bold text-stone-dark mt-0.5">{getServiceLabel(booking.serviceType)}</h4>
                        <p className="text-[10px] text-stone-muted mt-0.5 font-light">
                          {booking.bedrooms} Bed / {booking.bathrooms} Bath • {booking.homeSize.toLocaleString()} sqft
                        </p>
                      </div>
                      <div className="shrink-0">{getStatusBadge(booking.status)}</div>
                    </div>

                    {/* Schedule block */}
                    <div className="p-3 bg-[#FAFAF9] border border-stone-150 rounded-xl flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-stone-dark">
                        <Calendar className="w-4 h-4 text-olive" />
                        <span className="font-semibold">{booking.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-muted font-light">
                        <Clock className="w-3.5 h-3.5 text-stone-muted" />
                        <span className="font-semibold capitalize">{booking.preferredTime} arrival</span>
                      </div>
                    </div>

                    {/* Cost and Instructions */}
                    <div className="flex justify-between items-baseline pt-1">
                      <div>
                        <span className="text-[10px] text-stone-muted font-semibold block uppercase">Estimate Fee</span>
                        <span className="text-lg font-serif font-light text-stone-dark">${booking.estimatedPrice}</span>
                      </div>
                      
                      {booking.status !== 'cancelled' && reschedulingId !== booking.id && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setReschedulingId(booking.id);
                              setNewDate(booking.preferredDate);
                              setNewTime(booking.preferredTime);
                            }}
                            className="p-2 bg-stone-50 hover:bg-stone-100 border border-stone-250 text-stone-dark rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Reschedule</span>
                          </button>
                          <button
                            onClick={() => onCancelBooking(booking.id)}
                            className="p-2 bg-stone-50 hover:bg-red-50 hover:text-red-700 border border-stone-250 hover:border-red-200 text-stone-muted rounded-lg text-xs font-bold transition-all cursor-pointer"
                            title="Cancel Appointment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Inline Rescheduling Form */}
                    {reschedulingId === booking.id && (
                      <form onSubmit={(e) => handleRescheduleSubmit(e, booking.id)} className="p-4 bg-[#FAFAF9] border border-stone-200 rounded-xl3 space-y-3 mt-2 animate-fadeIn">
                        <p className="text-xs font-bold text-stone-dark uppercase tracking-wider font-serif">Reschedule Appointment</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-stone-muted uppercase font-semibold">New Date</label>
                            <input
                              type="date"
                              required
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                              className="w-full bg-white border border-stone-250 rounded px-2.5 py-1.5 text-xs text-stone-dark outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-muted uppercase font-semibold">Arrival Window</label>
                            <select
                              value={newTime}
                              onChange={(e) => setNewTime(e.target.value)}
                              className="w-full bg-white border border-stone-250 rounded px-2 py-1.5 text-xs text-stone-dark outline-none"
                            >
                              <option value="morning">Morning (8-11am)</option>
                              <option value="midday">Midday (11-2pm)</option>
                              <option value="afternoon">Afternoon (2-5pm)</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => setReschedulingId(null)}
                            className="px-3 py-1.5 bg-stone-100 text-stone-dark text-xs font-bold rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-olive text-white text-xs font-bold rounded hover:bg-olive/95 cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section B: My Custom Quotes */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-semibold text-stone-muted uppercase tracking-wider flex items-center gap-2 font-serif">
              <FileText className="w-4 h-4 text-olive" />
              Custom Quote Requests ({quotes.length})
            </h3>

            {quotes.length === 0 ? (
              <div className="p-6 bg-[#FAFAF9] border border-stone-200 rounded-xl3 text-center">
                <p className="text-xs text-stone-muted font-medium">No custom quote requests active.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="p-5 bg-white border border-stone-200 rounded-xl3 space-y-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-stone-muted block uppercase">{quote.id}</span>
                        <h4 className="text-sm font-bold text-stone-dark mt-0.5">{getServiceLabel(quote.serviceType)}</h4>
                        <p className="text-[10px] text-stone-muted mt-0.5 font-light">
                          {quote.bedrooms} Bed / {quote.bathrooms} Bath • {quote.homeSize.toLocaleString()} sqft
                        </p>
                      </div>
                      <div className="shrink-0">{getStatusBadge(quote.status)}</div>
                    </div>

                    {/* Frequency Details */}
                    <div className="flex justify-between items-center text-xs text-stone-muted font-light">
                      <span>Frequency desired:</span>
                      <span className="text-stone-dark font-bold capitalize">{quote.frequency}</span>
                    </div>

                    {/* Pricing summary */}
                    <div className="flex justify-between items-center border-t border-stone-100 pt-3">
                      <div>
                        <span className="text-[9px] text-stone-muted font-semibold block uppercase">Quote estimate</span>
                        <span className="text-base font-serif font-light text-stone-dark">${quote.quoteAmount || quote.estimatedPrice}</span>
                      </div>

                      {quote.status === 'quote-sent' && (
                        <button
                          onClick={() => onAcceptQuote(quote.id)}
                          className="px-3.5 py-2 bg-olive hover:bg-olive/90 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept & Book Clean</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Support Hotline */}
        <div className="p-5 bg-[#FAFAF9] border-t border-stone-200 text-center text-xs">
          <p className="text-stone-muted leading-normal font-semibold">
            Need urgent changes? Talk to our office directly: <br />
            <a href="tel:18005550199" className="text-olive font-black hover:underline mt-1 inline-block">
              (800) 555-0199
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
