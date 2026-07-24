export type CategoryType = 'desks' | 'chairs' | 'monitors' | 'lighting' | 'accessories' | 'bali-lifestyle';

export interface ProductItem {
  id: string;
  name: string;
  category: CategoryType;
  priceMonthly: number; // in USD or IDR equivalent
  description: string;
  badge?: string;
  dimensions?: string;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  svgIcon: string;
  accentColor?: string;
}

export interface WorkspacePreset {
  id: string;
  title: string;
  description: string;
  badge: string;
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  // Map of productId -> {x, y} for perfect preset arrangement
  presetPositions: Record<string, { x: number; y: number }>;
}

export type RentalDuration = '1w' | '1m' | '3m' | '6m';
