'use client';

import React, { useState } from 'react';
import { CategoryType, ProductItem, WorkspacePreset, RentalDuration } from '@/types/workspace';
import { ItemSvgRenderer } from '@/components/ItemSvgRenderer';
import { ActiveItem } from '@/app/page';
import {
  DESKS,
  CHAIRS,
  MONITORS,
  LIGHTING,
  ACCESSORIES,
  BALI_LIFESTYLE,
  PRESETS,
} from '@/data/products';
import {
  Armchair,
  Check,
  Plus,
  Sparkles,
  Search,
  Monitor,
  Lamp,
  Headphones,
  Palmtree,
  Zap,
} from 'lucide-react';

interface CatalogSidebarProps {
  activeItems: ActiveItem[];
  onAddItem: (item: ProductItem) => void;
  onApplyPreset: (preset: WorkspacePreset) => void;
  duration: RentalDuration;
}

export const CatalogSidebar: React.FC<CatalogSidebarProps> = ({
  activeItems,
  onAddItem,
  onApplyPreset,
  duration,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryType | 'presets'>('presets');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CategoryType | 'presets'; label: string; icon: React.ReactNode }[] = [
    { id: 'presets', label: 'Presets', icon: <Zap className="w-4 h-4 text-amber-500" /> },
    { id: 'desks', label: 'Desks', icon: <span className="text-sm font-bold">Desk</span> },
    { id: 'chairs', label: 'Chairs', icon: <Armchair className="w-4 h-4" /> },
    { id: 'monitors', label: 'Displays', icon: <Monitor className="w-4 h-4" /> },
    { id: 'lighting', label: 'Lights', icon: <Lamp className="w-4 h-4" /> },
    { id: 'accessories', label: 'Tech Accessories', icon: <Headphones className="w-4 h-4" /> },
    { id: 'bali-lifestyle', label: 'Bali Vibe', icon: <Palmtree className="w-4 h-4 text-green-600" /> },
  ];

  const getItemsForTab = () => {
    switch (activeTab) {
      case 'desks':
        return DESKS;
      case 'chairs':
        return CHAIRS;
      case 'monitors':
        return MONITORS;
      case 'lighting':
        return LIGHTING;
      case 'accessories':
        return ACCESSORIES;
      case 'bali-lifestyle':
        return BALI_LIFESTYLE;
      default:
        return [];
    }
  };

  const currentItems = getItemsForTab().filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDurationMultiplier = (dur: RentalDuration) => dur === '1w' ? 0.35 : dur === '3m' ? 0.85 : dur === '6m' ? 0.75 : 1;
  const getDurationSuffix = (dur: RentalDuration) => dur === '1w' ? '/wk' : '/mo';

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-5">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-100">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      {activeTab !== 'presets' && (
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      )}

      {/* Tab Content */}
      <div className="custom-scrollbar">
        {activeTab === 'presets' ? (
          /* PRESETS SECTION */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => onApplyPreset(preset)}
                className="group relative bg-white border border-gray-200 hover:border-black rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-black flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {preset.title}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 rounded-full">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{preset.description}</p>
                <button className="w-full py-2 bg-gray-50 group-hover:bg-black text-gray-700 group-hover:text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center cursor-pointer gap-1">
                  <span>Apply Preset</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* REGULAR CATALOG ITEMS */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map((item) => {
              // Count how many instances of this item are active
              const countInWorkspace = activeItems.filter(a => a.product.id === item.id).length;
              const hasAdded = countInWorkspace > 0;
              const price = Math.round(item.priceMonthly * getDurationMultiplier(duration));

              return (
                <div
                  key={item.id}
                  onClick={() => onAddItem(item)}
                  className={`group relative border rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    hasAdded
                      ? 'bg-blue-50/50 border-blue-500 ring-1 ring-blue-500 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {/* Badge Counter */}
                  {hasAdded && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs font-bold flex items-center justify-center rounded-full z-10 shadow-md">
                      {countInWorkspace}
                    </div>
                  )}

                  <div>
                    {/* Item Image Preview using SVGs */}
                    <div className="w-full h-32 mb-3 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50/50 group-hover:bg-gray-100/50 transition-colors">
                      <ItemSvgRenderer
                        type={item.svgIcon}
                        accentColor={item.accentColor}
                        className="max-h-full max-w-full drop-shadow-sm transition-transform group-hover:scale-105 duration-300"
                        style={{
                          width:
                            item.category === 'desks'
                              ? '80%'
                              : item.category === 'chairs'
                              ? '40%'
                              : item.category === 'monitors'
                              ? '60%'
                              : item.category === 'bali-lifestyle'
                              ? '60%'
                              : '40%',
                        }}
                      />
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-sm font-bold text-black">
                      ${price} <span className="text-xs text-gray-400 font-normal">{getDurationSuffix(duration)}</span>
                    </span>

                    <button
                      className="px-3 py-1.5 rounded-full cursor-pointer text-xs font-bold flex items-center gap-1 bg-black text-white hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
