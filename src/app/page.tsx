'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ProductItem, RentalDuration, WorkspacePreset } from '@/types/workspace';
import { DESKS, CHAIRS, ALL_PRODUCTS } from '@/data/products';
import { WorkspaceCanvas } from '@/components/WorkspaceCanvas';
import { CatalogSidebar } from '@/components/CatalogSidebar';
import { CheckoutModal } from '@/components/CheckoutModal';
import {
  ShoppingBag,
  RefreshCw,
  Calendar,
  Check,
} from 'lucide-react';

export interface ActiveItem {
  instanceId: string;
  product: ProductItem;
}

export default function Home() {
  // Default is just one desk and one chair with fixed IDs to prevent hydration mismatch
  const [activeWorkspaceItems, setActiveWorkspaceItems] = useState<ActiveItem[]>([
    { instanceId: 'default-desk-1', product: DESKS[0] },
    { instanceId: 'default-chair-1', product: CHAIRS[0] },
  ]);

  const [duration, setDuration] = useState<RentalDuration>('1m');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Position state to preserve dragged locations using instanceId
  const [itemPositions, setItemPositions] = useState<Record<string, {x: number, y: number}>>({});

  const handleUpdatePosition = useCallback((instanceId: string, pos: {x: number, y: number}) => {
    setItemPositions(prev => ({ ...prev, [instanceId]: pos }));
  }, []);

  // Add any item to workspace (can add multiples)
  const handleAddItem = (product: ProductItem) => {
    setActiveWorkspaceItems((prev) => [
      ...prev,
      { instanceId: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, product },
    ]);
  };

  const handleRemoveItem = (instanceId: string) => {
    setActiveWorkspaceItems((prev) => prev.filter((a) => a.instanceId !== instanceId));
    // Clean up position state
    setItemPositions((prev) => {
      const newPos = { ...prev };
      delete newPos[instanceId];
      return newPos;
    });
  };

  // Apply Preset
  const handleApplyPreset = (preset: WorkspacePreset) => {
    const foundDesk = DESKS.find((d) => d.id === preset.deskId);
    const foundChair = CHAIRS.find((c) => c.id === preset.chairId);
    const presetAccs = ALL_PRODUCTS.filter((p) => preset.accessoryIds.includes(p.id));
    
    const newItems: ActiveItem[] = [];
    const newPositions: Record<string, { x: number; y: number }> = {};
    let counter = 0;
    
    const addPresetItem = (prod: ProductItem) => {
      const instanceId = `preset-${prod.id}-${counter++}`;
      newItems.push({ instanceId, product: prod });
      if (preset.presetPositions && preset.presetPositions[prod.id]) {
        newPositions[instanceId] = preset.presetPositions[prod.id];
      }
    };

    if (foundDesk) addPresetItem(foundDesk);
    if (foundChair) addPresetItem(foundChair);
    presetAccs.forEach(addPresetItem);

    setActiveWorkspaceItems(newItems);
    setItemPositions(newPositions);
  };

  // Reset setup
  const handleReset = () => {
    setActiveWorkspaceItems([
      { instanceId: 'default-desk-1', product: DESKS[0] },
      { instanceId: 'default-chair-1', product: CHAIRS[0] },
    ]);
    setItemPositions({}); // Reset positions
  };

  // Monthly Total calculation
  const monthlyTotal = useMemo(() => {
    return activeWorkspaceItems.reduce((acc, curr) => acc + curr.product.priceMonthly, 0);
  }, [activeWorkspaceItems]);

  // Discounted total based on duration
  const discountedTotal = useMemo(() => {
    switch (duration) {
      case '1w':
        return Math.round(monthlyTotal * 0.35); // 1 week roughly 35% of monthly
      case '1m':
        return monthlyTotal;
      case '3m':
        return Math.round(monthlyTotal * 0.85); // 15% discount for 3m
      case '6m':
        return Math.round(monthlyTotal * 0.75); // 25% discount for 6m
      default:
        return monthlyTotal;
    }
  }, [monthlyTotal, duration]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200 pb-16">
      
      {/* 1. TOP HEADER NAVIGATION - LIGHT THEME */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 md:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo - Just black text */}
          <div className="flex items-center gap-3">
             <a href="/" className="flex items-center gap-2 cursor-pointer" aria-label="monis home">
                <span className="text-3xl font-black tracking-tighter text-black">monis</span>
             </a>
          </div>

          {/* Quick Rent Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="p-2.5 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
              title="Reset Workspace"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-full shadow-md transition-all scale-[1.02] hover:scale-[1.04] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Rent Setup (${discountedTotal}{duration === '1w' ? '/wk' : '/mo'})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT: CANVAS TOP, CATALOG BOTTOM */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 flex flex-col gap-6">
        
        {/* TOP: VISUAL CANVAS FULL WIDTH */}
        <div className="flex flex-col gap-4">
          
          {/* Duration Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Rental Duration:</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200">
              {(['1w', '1m', '3m', '6m'] as RentalDuration[]).map((d) => {
                const labels: Record<RentalDuration, string> = {
                  '1w': '1 Wk',
                  '1m': '1 Mo',
                  '3m': '3 Mos (-15%)',
                  '6m': '6 Mos (-25%)',
                };
                const active = duration === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {labels[d]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive GSAP Canvas */}
          <WorkspaceCanvas
            activeItems={activeWorkspaceItems}
            itemPositions={itemPositions}
            onUpdatePosition={handleUpdatePosition}
            onRemoveItem={handleRemoveItem}
            duration={duration}
          />

          {/* Current Selection Pill Stats */}
          <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
            <span className="text-gray-500 font-medium">Active Items ({activeWorkspaceItems.length}):</span>
            {activeWorkspaceItems.map((a) => (
              <span
                key={a.instanceId}
                className="bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-blue-500" /> {a.product.name}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM: CATALOG FULL WIDTH */}
        <div className="w-full pt-4">
          <CatalogSidebar
            activeItems={activeWorkspaceItems}
            onAddItem={handleAddItem}
            onApplyPreset={handleApplyPreset}
            duration={duration}
          />
        </div>
      </div>

      {/* 3. CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        activeItems={activeWorkspaceItems}
        duration={duration}
        monthlyTotal={monthlyTotal}
        discountedTotal={discountedTotal}
      />
    </main>
  );
}
