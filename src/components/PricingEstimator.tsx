/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, Bed, Bath, Percent, Refrigerator, Flame, Maximize2, Layers, Grid, Sparkles, HelpCircle } from 'lucide-react';
import { calculateCleaningPrice, SERVICE_OPTIONS, FREQUENCY_OPTIONS, ADD_ONS } from '../lib/cleaningUtils';
import { ServiceType, CleaningFrequency } from '../types';

interface PricingEstimatorProps {
  onOpenBookingWithDetails: (details: {
    serviceType: ServiceType;
    homeSize: number;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    addOns: string[];
    estimatedPrice: number;
  }) => void;
  onOpenQuoteWithDetails: (details: {
    serviceType: ServiceType;
    homeSize: number;
    bedrooms: number;
    bathrooms: number;
    frequency: CleaningFrequency;
    estimatedPrice: number;
  }) => void;
}

export default function PricingEstimator({
  onOpenBookingWithDetails,
  onOpenQuoteWithDetails,
}: PricingEstimatorProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>('regular');
  const [homeSize, setHomeSize] = useState<number>(1500);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi-weekly');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<number>(0);

  // Recalculate anytime inputs change
  useEffect(() => {
    const price = calculateCleaningPrice({
      serviceType: selectedService,
      homeSize,
      bedrooms,
      bathrooms,
      frequency,
      selectedAddOnIds: selectedAddOns,
    });
    setEstimate(price);
  }, [selectedService, homeSize, bedrooms, bathrooms, frequency, selectedAddOns]);

  const handleAddOnToggle = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const getAddOnIcon = (iconName: string) => {
    switch (iconName) {
      case 'Refrigerator':
        return <Refrigerator className="w-5 h-5 text-olive" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-olive" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-olive" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-olive" />;
      case 'Grid':
        return <Grid className="w-5 h-5 text-olive" />;
      default:
        return <Sparkles className="w-5 h-5 text-olive" />;
    }
  };

  const currentFrequencyOption = FREQUENCY_OPTIONS.find((f) => f.id === frequency);
  const currentDiscountText = currentFrequencyOption?.discount && currentFrequencyOption.discount > 0
    ? `Includes ${currentFrequencyOption.discount * 100}% frequency discount`
    : 'No commitments. Cancel anytime.';

  return (
    <section id="estimator" className="py-24 bg-[#F5F5F0] border-t border-stone-200/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark tracking-tight">
            Interactive Cost Estimator
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto mt-4 rounded-full"></div>
          <p className="text-stone-muted mt-4 text-base leading-relaxed font-light">
            Configure your home details below to get an instant pricing estimate. Real rates, calculated transparently.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configurator Panel */}
          <div className="lg:col-span-7 bg-white border border-stone-200/40 p-6 sm:p-8 rounded-xl3 shadow-xl space-y-8">
            
            {/* Step 1: Service Type */}
            <div>
              <label className="text-xs font-bold text-olive uppercase tracking-widest block mb-3.5">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SERVICE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedService(item.id)}
                    className={`p-3 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedService === item.id
                        ? 'bg-sage/10 border-sage text-olive'
                        : 'bg-cream-light border-stone-200 text-stone-muted hover:border-sage/40'
                    }`}
                  >
                    {item.name.replace(' House Cleaning', '').replace(' Clean Special', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sizing Details */}
            <div>
              <label className="text-xs font-bold text-olive uppercase tracking-widest block mb-4">
                2. Specify Home Layout
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Size Slider */}
                <div className="sm:col-span-3 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone flex items-center gap-1.5 font-light">
                      <Home className="w-4 h-4 text-stone-muted" />
                      Home Size (Square Feet)
                    </span>
                    <span className="text-olive font-bold font-serif text-lg">{homeSize.toLocaleString()} sqft</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={homeSize}
                    onChange={(e) => setHomeSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-olive"
                  />
                  <div className="flex justify-between text-[10px] text-stone-muted font-medium">
                    <span>500 sqft</span>
                    <span>2,500 sqft</span>
                    <span>5,000 sqft</span>
                  </div>
                </div>

                {/* Bedrooms Counter */}
                <div className="bg-cream-light border border-stone-150 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-bold text-stone mb-2">
                    <span className="flex items-center gap-1.5 font-light">
                      <Bed className="w-4 h-4 text-stone-muted" />
                      Bedrooms
                    </span>
                    <span className="text-olive text-sm font-serif">{bedrooms}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={bedrooms <= 0}
                      onClick={() => setBedrooms(bedrooms - 1)}
                      className="flex-1 bg-white hover:bg-stone-50 border border-stone-200 text-stone font-black rounded-lg py-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      disabled={bedrooms >= 8}
                      onClick={() => setBedrooms(bedrooms + 1)}
                      className="flex-1 bg-white hover:bg-stone-50 border border-stone-200 text-stone font-black rounded-lg py-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bathrooms Counter */}
                <div className="bg-cream-light border border-stone-150 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-bold text-stone mb-2">
                    <span className="flex items-center gap-1.5 font-light">
                      <Bath className="w-4 h-4 text-stone-muted" />
                      Bathrooms
                    </span>
                    <span className="text-olive text-sm font-serif">{bathrooms}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={bathrooms <= 1}
                      onClick={() => setBathrooms(bathrooms - 1)}
                      className="flex-1 bg-white hover:bg-stone-50 border border-stone-200 text-stone font-black rounded-lg py-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      disabled={bathrooms >= 6}
                      onClick={() => setBathrooms(bathrooms + 1)}
                      className="flex-1 bg-white hover:bg-stone-50 border border-stone-200 text-stone font-black rounded-lg py-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Info badge */}
                <div className="bg-sage/10 border border-sage/20 rounded-xl p-3 flex items-center justify-center text-center">
                  <p className="text-[11px] text-stone-muted leading-normal font-light">
                    Living rooms, dining rooms, hallways & kitchen are automatically included.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Frequency */}
            <div>
              <label className="text-xs font-bold text-olive uppercase tracking-widest block mb-3">
                3. Choose Frequency
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {FREQUENCY_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id)}
                    className={`p-3 text-left rounded-xl border text-xs transition-all relative cursor-pointer ${
                      frequency === item.id
                        ? 'bg-sage/10 border-sage text-olive font-bold'
                        : 'bg-cream-light border-stone-200 text-stone-muted font-semibold hover:border-sage/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      {item.discount > 0 && (
                        <span className="bg-sage text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                          -{item.discount * 100}%
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Optional Add-ons */}
            <div>
              <label className="text-xs font-bold text-olive uppercase tracking-widest block mb-4">
                4. Select Optional Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addOn) => {
                  const isChecked = selectedAddOns.includes(addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      onClick={() => handleAddOnToggle(addOn.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'bg-sage/10 border-sage'
                          : 'bg-cream-light border-stone-200 hover:border-sage/40'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isChecked ? 'bg-sage text-white' : 'bg-stone-100 text-stone-muted'}`}>
                        {getAddOnIcon(addOn.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold text-stone-dark truncate">{addOn.name}</p>
                          <p className="text-xs font-extrabold text-olive shrink-0">+${addOn.price}</p>
                        </div>
                        <p className="text-[10px] text-stone-muted truncate mt-0.5 font-light">{addOn.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Pricing Estimation Summary Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-stone-200/50 p-6 sm:p-8 rounded-xl3 shadow-xl flex flex-col justify-between text-center">
            
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage/10 border border-sage/20 text-olive rounded-full text-[10px] font-extrabold uppercase tracking-widest mx-auto mb-6">
                <Percent className="w-3.5 h-3.5" />
                <span>Instant Online Pricing</span>
              </div>

              {/* Pricing Display */}
              <p className="text-sm font-bold text-stone-muted uppercase tracking-wider">Estimated Pricing</p>
              <div className="my-5 flex items-baseline justify-center">
                <span className="text-2xl font-normal text-olive mr-1 font-serif">$</span>
                <span className="text-6xl sm:text-7xl font-light text-stone-dark tracking-tight leading-none font-serif">
                  {estimate}
                </span>
                {frequency !== 'one-time' && (
                  <span className="text-sm font-bold text-stone-muted ml-1.5">/ clean</span>
                )}
              </div>

              {/* Discount / commitment info */}
              <p className="text-xs text-olive font-semibold mb-8 max-w-xs mx-auto leading-relaxed">
                {currentDiscountText}
              </p>

              {/* Details review list */}
              <div className="bg-cream-light border border-stone-200/50 rounded-xl p-4 text-left text-xs space-y-2.5 mb-8">
                <div className="flex justify-between text-stone-muted">
                  <span>Home layout selected</span>
                  <span className="text-stone-dark font-bold">{bedrooms} Bed / {bathrooms} Bath</span>
                </div>
                <div className="flex justify-between text-stone-muted">
                  <span>Approximate size</span>
                  <span className="text-stone-dark font-bold">{homeSize.toLocaleString()} sqft</span>
                </div>
                <div className="flex justify-between text-stone-muted">
                  <span>Frequency tier</span>
                  <span className="text-stone-dark font-bold">{FREQUENCY_OPTIONS.find((f) => f.id === frequency)?.name}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-stone-muted">
                    <span>Selected add-ons</span>
                    <span className="text-stone-dark font-bold">{selectedAddOns.length} active</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3.5">
              <button
                onClick={() => onOpenBookingWithDetails({
                  serviceType: selectedService,
                  homeSize,
                  bedrooms,
                  bathrooms,
                  frequency,
                  addOns: selectedAddOns,
                  estimatedPrice: estimate,
                })}
                className="w-full py-4 btn-primary text-base cursor-pointer"
              >
                <span>Confirm & Book Clean</span>
              </button>
              
              <button
                onClick={() => onOpenQuoteWithDetails({
                  serviceType: selectedService,
                  homeSize,
                  bedrooms,
                  bathrooms,
                  frequency,
                  estimatedPrice: estimate,
                })}
                className="w-full py-3 bg-transparent hover:bg-stone-50 border border-stone-300 hover:border-stone-400 text-stone font-bold text-sm rounded-full transition-all cursor-pointer"
              >
                Request Custom Quote
              </button>

              <p className="text-[10px] text-stone-muted font-medium">
                *Final invoice may be adjusted depending on on-site inspection. Estimates are non-binding.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
