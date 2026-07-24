'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Trash2, Move, ZoomIn, ZoomOut, Maximize, Wallpaper } from 'lucide-react';
import { ItemSvgRenderer } from '@/components/ItemSvgRenderer';
import { ActiveItem } from '@/app/page';
import { RentalDuration } from '@/types/workspace';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface WorkspaceCanvasProps {
  activeItems: ActiveItem[];
  itemPositions: Record<string, { x: number; y: number }>;
  onUpdatePosition: (instanceId: string, pos: { x: number; y: number }) => void;
  onRemoveItem: (instanceId: string) => void;
  duration: RentalDuration;
}

type WallpaperType = 'minimal' | 'stripes' | 'terrazzo' | 'grid';

export const WorkspaceCanvas: React.FC<WorkspaceCanvasProps> = ({
  activeItems,
  itemPositions,
  onUpdatePosition,
  onRemoveItem,
  duration,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomWrapperRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [wallpaper, setWallpaper] = useState<WallpaperType>('minimal');
  const [showWallpaperMenu, setShowWallpaperMenu] = useState(false);

  useEffect(() => {
    if (!itemsContainerRef.current || !containerRef.current) return;

    const draggableElements = itemsContainerRef.current.querySelectorAll('.gsap-draggable-item');

    const draggables = Draggable.create(draggableElements, {
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: containerRef.current,
      inertia: true,
      onDragStart: function () {
        gsap.to(this.target, { scale: 1.05, filter: 'brightness(1.1)', duration: 0.2 });
      },
      onDragEnd: function () {
        gsap.to(this.target, { scale: 1, filter: 'brightness(1)', duration: 0.2 });
        // Save position to state
        const instanceId = this.target.getAttribute('data-id');
        if (instanceId) {
          onUpdatePosition(instanceId, { x: this.x, y: this.y });
        }
      },
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, [activeItems, onUpdatePosition]);

  // Initial Entrance Animation ONLY for newly added items
  useEffect(() => {
    if (!itemsContainerRef.current) return;
    const items = itemsContainerRef.current.querySelectorAll('.gsap-item-wrapper:not(.animated)');
    
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: 'back.out(1.2)', 
          onComplete: function() {
            items.forEach(el => el.classList.add('animated'));
          }
        }
      );
    }
  }, [activeItems]);

  const handleZoom = (amount: number) => {
    const newScale = Math.min(Math.max(scale + amount, 0.5), 1.5);
    setScale(newScale);
    gsap.to(zoomWrapperRef.current, { scale: newScale, duration: 0.3, ease: 'power2.out' });
  };

  const handleResetZoom = () => {
    setScale(1);
    gsap.to(zoomWrapperRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  const getDurationMultiplier = (dur: RentalDuration) => dur === '1w' ? 0.35 : dur === '3m' ? 0.85 : dur === '6m' ? 0.75 : 1;
  const getDurationSuffix = (dur: RentalDuration) => dur === '1w' ? '/wk' : '/mo';

  const getWallpaperClass = () => {
    switch (wallpaper) {
      case 'stripes':
        return 'bg-[#fafafa] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#f3f4f6_10px,#f3f4f6_12px)]';
      case 'terrazzo':
        return 'bg-[#fafafa] bg-[url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83-54.627 54.627-.83-.83L54.627 0zM14.28 0l.83.83L0 15.11l-.83-.83L14.28 0zM36.19 0l.83.83L0 37.02l-.83-.83L36.19 0zM0 58.93l.83.83L.83 60H0v-1.07z\' fill=\'%23e5e7eb\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")]';
      case 'grid':
        return 'bg-white bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:24px_24px]';
      case 'minimal':
      default:
        return 'bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:30px_30px]';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full h-[500px] md:h-[650px] bg-white border border-gray-200 overflow-hidden flex flex-col justify-center items-center rounded-2xl select-none"
    >
      {/* Wall Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${getWallpaperClass()}`} />

      {/* Floor - 3D Isometric Circular Stage/Saucer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[15%] w-[95%] h-[800px] rounded-full bg-white border-b-[24px] border-r-[4px] border-l-[4px] border-gray-200 shadow-[0_40px_80px_rgba(0,0,0,0.08),inset_0_20px_40px_rgba(0,0,0,0.02)]" 
          style={{ transform: 'rotateX(70deg)' }} 
        />
        {/* Subtle reflection/highlight on the floor */}
        <div 
          className="absolute top-[15%] w-[95%] h-[800px] rounded-full border border-gray-50 bg-gradient-to-tr from-transparent via-white/50 to-transparent" 
          style={{ transform: 'rotateX(70deg)' }} 
        />
      </div>

      {/* Helper & Controls */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 shadow-sm">
        <Move className="w-3.5 h-3.5 text-blue-500" />
        <span>Drag to reposition</span>
      </div>

      {/* Top Right Controls (Wallpaper & Zoom) */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
        
        {/* Wallpaper Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowWallpaperMenu(!showWallpaperMenu)} 
            className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 cursor-pointer transition-colors text-xs font-bold text-gray-700"
            title="Change Wallpaper"
          >
            <Wallpaper className="w-3.5 h-3.5 text-pink-500" />
            <span>Wall</span>
          </button>
          
          {showWallpaperMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-2 flex flex-col gap-1 w-32 animate-fadeIn z-50">
              {(['minimal', 'stripes', 'terrazzo', 'grid'] as WallpaperType[]).map((wp) => (
                <button
                  key={wp}
                  onClick={() => {
                    setWallpaper(wp);
                    setShowWallpaperMenu(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${wallpaper === wp ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <span className="capitalize">{wp}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
          <button onClick={() => handleZoom(-0.1)} className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500" title="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={handleResetZoom} className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500" title="Reset Zoom">
            <Maximize className="w-4 h-4" />
          </button>
          <button onClick={() => handleZoom(0.1)} className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500" title="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Zoom Wrapper */}
      <div ref={zoomWrapperRef} className="relative w-full h-full flex items-center justify-center transform-origin-center pt-10">
        <div ref={itemsContainerRef} className="relative w-full h-full flex items-center justify-center">
          {activeItems.map((activeItem) => {
            const { instanceId, product } = activeItem;
            // Use saved position or default
            const pos = itemPositions[instanceId] || product.defaultPosition;
            const price = Math.round(product.priceMonthly * getDurationMultiplier(duration));

            return (
              <div
                key={instanceId}
                data-id={instanceId}
                className="gsap-draggable-item gsap-item-wrapper absolute cursor-grab active:cursor-grabbing group/item drop-shadow-2xl"
                style={{
                  zIndex: product.zIndex,
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                }}
              >
                <div className="relative transition-transform flex justify-center items-center">
                  <ItemSvgRenderer
                    type={product.svgIcon}
                    accentColor={product.accentColor}
                    className="pointer-events-none"
                    style={{
                      width: product.category === 'desks' ? '500px' : 
                             product.category === 'monitors' ? '250px' :
                             product.category === 'chairs' ? '200px' :
                             product.category === 'bali-lifestyle' ? '200px' : '100px'
                    }}
                  />

                  {/* Tooltip & Actions */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-2 bg-white text-gray-800 text-[10px] px-2.5 py-1.5 rounded-lg border border-gray-200 shadow-xl z-50 whitespace-nowrap font-bold">
                    <div className="flex flex-col">
                      <span>{product.name}</span>
                      <span className="text-blue-600">${price}{getDurationSuffix(duration)}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(instanceId);
                      }}
                      className="p-1.5 hover:bg-red-50 text-red-500 rounded-md transition-colors cursor-pointer pointer-events-auto"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
