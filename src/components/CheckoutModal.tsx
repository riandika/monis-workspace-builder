'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RentalDuration } from '@/types/workspace';
import { ActiveItem } from '@/app/page';
import { X, CheckCircle2, ShieldCheck, MapPin, CreditCard, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeItems: ActiveItem[];
  duration: RentalDuration;
  monthlyTotal: number;
  discountedTotal: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  activeItems,
  duration,
  discountedTotal,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    area: 'Canggu',
    address: '',
  });

  if (!isOpen) return null;

  const getDurationLabel = () => {
    switch (duration) {
      case '1w':
        return '1 Week';
      case '1m':
        return '1 Month';
      case '3m':
        return '3 Months (15% OFF)';
      case '6m':
        return '6 Months (25% OFF)';
    }
  };

  const getDurationMultiplier = (dur: RentalDuration) => dur === '1w' ? 0.35 : dur === '3m' ? 0.85 : dur === '6m' ? 0.75 : 1;
  const getDurationSuffix = (dur: RentalDuration) => dur === '1w' ? '/wk' : '/mo';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#3b82f6', '#f59e0b', '#10b981'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl overflow-hidden text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-extrabold text-xs shadow-md">
              M
            </div>
            <div>
              <h3 className="text-base font-bold text-black">Review & Rent Workspace</h3>
              <p className="text-xs text-gray-500">Monis Bali Office Equipment Rental</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-black">Workspace Order Confirmed! 🎉</h2>
            <p className="text-sm text-gray-600 max-w-md">
              Thank you, <span className="text-black font-bold">{formData.fullName || 'Digital Nomad'}</span>! The Monis team is preparing your dream setup. We will deliver it to <span className="text-black font-medium">{formData.area}</span> as scheduled!
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Back to Configurator
              </button>
            </div>
          </div>
        ) : (
          /* FORM & ORDER BREAKDOWN */
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Selected Items Summary */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Setup Items Breakdown
              </h4>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                {activeItems.map((a) => (
                  <div key={a.instanceId} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-gray-100 shadow-sm">
                    <span className="font-medium text-gray-800 line-clamp-1">{a.product.name}</span>
                    <span className="text-black font-bold">${Math.round(a.product.priceMonthly * getDurationMultiplier(duration))}</span>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-gray-500">Duration: {getDurationLabel()}</div>
                  <div className="text-sm font-bold text-black">Total Estimate</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-blue-600">${discountedTotal}<span className="text-sm text-gray-500 font-medium">{getDurationSuffix(duration)}</span></div>
                  <div className="text-[10px] text-gray-500 font-medium">Includes free Bali setup & delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[10px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Zero deposit required for verified nomads. Cancel anytime.</span>
              </div>
            </div>

            {/* Right: Bali Delivery Form */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                Delivery Details (Bali)
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">WhatsApp Phone</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      placeholder="812..."
                      value={formData.phone}
                      onChange={(e) => {
                        // Only allow numbers and +
                        const val = e.target.value.replace(/[^0-9+]/g, '');
                        setFormData({ ...formData, phone: val });
                      }}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Bali Area</label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
                    >
                      <option value="Canggu">Canggu</option>
                      <option value="Seminyak">Seminyak</option>
                      <option value="Ubud">Ubud</option>
                      <option value="Pererenan">Pererenan</option>
                      <option value="Uluwatu">Uluwatu</option>
                      <option value="Sanur">Sanur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">Villa / Workspace Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Jl. Batu Bolong No. 88, Villa Sunset"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-black hover:bg-gray-800 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  Confirm & Rent Workspace
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
