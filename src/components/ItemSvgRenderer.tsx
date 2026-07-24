import React from 'react';

interface SvgProps {
  type: string;
  className?: string;
  accentColor?: string;
  style?: React.CSSProperties;
}

export const ItemSvgRenderer: React.FC<SvgProps> = ({ type, className = '', accentColor = '#3b82f6', style }) => {
  switch (type) {
    // DESKS
    case 'desk-bamboo':
      return (
        <svg viewBox="0 0 400 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Desk Top */}
          <rect x="20" y="50" width="360" height="24" rx="6" fill="#e6ccb2" stroke="#b08968" strokeWidth="3" />
          <rect x="24" y="54" width="352" height="6" rx="2" fill="#ddb892" opacity="0.6" />
          {/* Bevel Shadow */}
          <rect x="20" y="74" width="360" height="6" fill="#7f5539" opacity="0.4" />
          {/* Motorized Leg Columns */}
          <rect x="50" y="80" width="24" height="100" rx="4" fill="#333" />
          <rect x="326" y="80" width="24" height="100" rx="4" fill="#333" />
          {/* Inner Leg Extensions */}
          <rect x="54" y="110" width="16" height="70" fill="#111" />
          <rect x="330" y="110" width="16" height="70" fill="#111" />
          {/* Feet */}
          <rect x="30" y="176" width="64" height="12" rx="4" fill="#222" />
          <rect x="306" y="176" width="64" height="12" rx="4" fill="#222" />
          {/* Cable Grommet */}
          <circle cx="340" cy="62" r="6" fill="#7f5539" stroke="#582f0e" strokeWidth="1.5" />
          {/* Smart Handset Controller */}
          <rect x="320" y="74" width="24" height="8" rx="2" fill="#000" stroke="#555" strokeWidth="1" />
          <circle cx="325" cy="78" r="1.5" fill="#10b981" />
        </svg>
      );

    case 'desk-teak':
      return (
        <svg viewBox="0 0 400 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Solid Teak Top */}
          <rect x="15" y="45" width="370" height="32" rx="4" fill="#7f4f24" stroke="#582f0e" strokeWidth="3" />
          <path d="M 20 55 Q 200 50 380 55" stroke="#936639" strokeWidth="2" opacity="0.5" />
          <path d="M 25 65 Q 180 62 375 65" stroke="#936639" strokeWidth="1.5" opacity="0.4" />
          {/* Drawers / Pedestal Base */}
          <rect x="30" y="77" width="90" height="105" rx="3" fill="#582f0e" stroke="#3d1e03" strokeWidth="2" />
          <line x1="30" y1="128" x2="120" y2="128" stroke="#3d1e03" strokeWidth="2" />
          <rect x="65" y="98" width="20" height="6" rx="2" fill="#d4af37" />
          <rect x="65" y="148" width="20" height="6" rx="2" fill="#d4af37" />
          {/* Solid Wooden Right Legs */}
          <rect x="340" y="77" width="26" height="105" rx="2" fill="#582f0e" stroke="#3d1e03" strokeWidth="2" />
        </svg>
      );

    case 'desk-white':
      return (
        <svg viewBox="0 0 400 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Modern White Top */}
          <rect x="25" y="52" width="350" height="22" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
          <rect x="25" y="74" width="350" height="5" fill="#94a3b8" opacity="0.3" />
          {/* Sleek Aluminum Legs */}
          <path d="M 50 79 L 40 182 H 60 L 70 79 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 350 79 L 360 182 H 340 L 330 79 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );

    // CHAIRS
    case 'chair-mesh':
      return (
        <svg viewBox="0 0 240 320" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Headrest */}
          <rect x="85" y="15" width="70" height="35" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="108" y="50" width="24" height="20" fill="#94a3b8" />
          {/* Ergo Backrest frame */}
          <path d="M 60 70 Q 120 60 180 70 L 170 190 Q 120 200 70 190 Z" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
          {/* Translucent Mesh Pattern */}
          <path d="M 70 85 H 170 M 68 105 H 172 M 68 125 H 172 M 70 145 H 170 M 72 165 H 168" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
          {/* Lumbar Cushion */}
          <rect x="80" y="155" width="80" height="22" rx="8" fill="#e2e8f0" opacity="0.8" />
          {/* Armrests */}
          <rect x="35" y="130" width="25" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="180" y="130" width="25" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
          {/* Cushion */}
          <rect x="55" y="190" width="130" height="35" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          {/* Gas Lift Cylinder */}
          <rect x="110" y="225" width="20" height="45" fill="#cbd5e1" />
          {/* 5-Star Base & Wheels */}
          <path d="M 120 270 L 40 300 M 120 270 L 200 300 M 120 270 L 120 310 M 120 270 L 70 280 M 120 270 L 170 280" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="40" cy="300" r="7" fill="#64748b" />
          <circle cx="200" cy="300" r="7" fill="#64748b" />
          <circle cx="120" cy="310" r="7" fill="#64748b" />
        </svg>
      );

    case 'chair-leather':
      return (
        <svg viewBox="0 0 240 320" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Plush Executive Backrest */}
          <rect x="60" y="25" width="120" height="165" rx="20" fill="#4a3b32" stroke="#2c221e" strokeWidth="3" />
          {/* Tufted Leather Stitching */}
          <line x1="75" y1="75" x2="165" y2="75" stroke="#785946" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="75" y1="125" x2="165" y2="125" stroke="#785946" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="120" cy="75" r="4" fill="#2c221e" />
          <circle cx="120" cy="125" r="4" fill="#2c221e" />
          {/* Wooden / Chrome Armrests */}
          <rect x="35" y="115" width="22" height="60" rx="8" fill="#d4af37" stroke="#2c221e" strokeWidth="2" />
          <rect x="183" y="115" width="22" height="60" rx="8" fill="#d4af37" stroke="#2c221e" strokeWidth="2" />
          {/* Cushion */}
          <rect x="50" y="185" width="140" height="40" rx="12" fill="#4a3b32" stroke="#2c221e" strokeWidth="3" />
          {/* Gas Lift */}
          <rect x="110" y="225" width="20" height="45" fill="#d4af37" />
          {/* Chrome Base */}
          <path d="M 120 270 L 40 300 M 120 270 L 200 300 M 120 270 L 120 310" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
          <circle cx="40" cy="300" r="8" fill="#1e293b" />
          <circle cx="200" cy="300" r="8" fill="#1e293b" />
        </svg>
      );

    case 'chair-active':
      return (
        <svg viewBox="0 0 240 320" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Minimalist Backrest */}
          <rect x="80" y="60" width="80" height="120" rx="16" fill="#f8fafc" opacity="0.9" stroke="#94a3b8" strokeWidth="3" />
          {/* Cushion */}
          <rect x="65" y="180" width="110" height="30" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <rect x="112" y="210" width="16" height="60" fill="#cbd5e1" />
          <circle cx="120" cy="285" r="35" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        </svg>
      );

    // MONITORS
    case 'monitor-single':
      return (
        <svg viewBox="0 0 280 180" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UltraThin Frame */}
          <rect x="10" y="10" width="260" height="140" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
          {/* Screen Display with Code Graphic */}
          <rect x="16" y="16" width="248" height="128" rx="4" fill="#ffffff" />
          {/* Dummy Lines */}
          <rect x="26" y="28" width="60" height="6" rx="2" fill="#38bdf8" />
          <rect x="92" y="28" width="40" height="6" rx="2" fill="#f43f5e" />
          <rect x="36" y="42" width="120" height="6" rx="2" fill="#4ade80" />
          <rect x="36" y="56" width="80" height="6" rx="2" fill="#c084fc" />
          <rect x="50" y="70" width="140" height="6" rx="2" fill="#fbbf24" />
          <rect x="26" y="98" width="90" height="6" rx="2" fill="#38bdf8" />
          {/* Monitor Stand */}
          <rect x="125" y="150" width="30" height="22" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="95" y="170" width="90" height="8" rx="3" fill="#cbd5e1" />
        </svg>
      );

    case 'monitor-dual':
      return (
        <svg viewBox="0 0 460 180" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Monitor */}
          <g transform="rotate(-4 110 80)">
            <rect x="10" y="10" width="210" height="130" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
            <rect x="15" y="15" width="200" height="120" rx="3" fill="#fff" />
            <rect x="25" y="28" width="80" height="6" rx="2" fill="#38bdf8" />
            <rect x="25" y="42" width="120" height="6" rx="2" fill="#4ade80" />
            <rect x="25" y="56" width="60" height="6" rx="2" fill="#f43f5e" />
          </g>
          {/* Right Monitor */}
          <g transform="rotate(4 350 80)">
            <rect x="240" y="10" width="210" height="130" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
            <rect x="245" y="15" width="200" height="120" rx="3" fill="#fff" />
            <rect x="255" y="28" width="100" height="6" rx="2" fill="#c084fc" />
            <rect x="255" y="42" width="130" height="6" rx="2" fill="#fbbf24" />
          </g>
          {/* Dual Gas Spring Arm Mount */}
          <path d="M 230 170 L 230 135 M 230 145 L 110 130 M 230 145 L 350 130" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
          <rect x="195" y="168" width="70" height="10" rx="4" fill="#94a3b8" />
        </svg>
      );

    case 'monitor-curved':
      return (
        <svg viewBox="0 0 360 180" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Curved Ultrawide Display Frame */}
          <path d="M 15 25 Q 180 10 345 25 L 340 145 Q 180 135 20 145 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
          <path d="M 22 30 Q 180 18 338 30 L 333 140 Q 180 130 27 140 Z" fill="#fff" />
          {/* Grid Layout inside Ultrawide */}
          <rect x="40" y="40" width="120" height="80" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="175" y="40" width="140" height="80" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          {/* Stand */}
          <path d="M 180 140 L 180 170 M 140 175 L 180 170 L 220 175" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    // LIGHTING
    case 'lamp-screenbar':
      return (
        <svg viewBox="0 0 300 60" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Screenbar Body */}
          <rect x="20" y="10" width="260" height="12" rx="4" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
          {/* LED Light Strip */}
          <rect x="30" y="20" width="240" height="4" fill="#ffb703" opacity="0.9" />
          {/* Light Projection Cone */}
          <polygon points="30,24 0,60 300,60 270,24" fill="url(#screenbarGlow)" opacity="0.35" />
          <defs>
            <linearGradient id="screenbarGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffb703" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'lamp-brass':
      return (
        <svg viewBox="0 0 100 160" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Brass Base */}
          <rect x="25" y="140" width="50" height="12" rx="4" fill="#d4af37" stroke="#997b15" strokeWidth="2" />
          {/* Curved Arm */}
          <path d="M 50 140 C 50 80 85 60 70 30" stroke="#d4af37" strokeWidth="5" fill="none" />
          {/* Shade */}
          <path d="M 50 30 L 90 50 H 50 Z" fill="#b8860b" stroke="#78590d" strokeWidth="2" />
          {/* Warm Light Glow */}
          <circle cx="70" cy="55" r="30" fill="#fb8500" opacity="0.35" filter="blur(4px)" />
        </svg>
      );

    // ACCESSORIES
    case 'keyboard-mouse':
      return (
        <svg viewBox="0 0 240 60" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Keyboard */}
          <rect x="10" y="10" width="150" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* Keycaps Grid */}
          <rect x="18" y="16" width="134" height="28" rx="3" fill="#e2e8f0" />
          <rect x="22" y="20" width="10" height="6" fill="#cbd5e1" />
          <rect x="36" y="20" width="10" height="6" fill="#94a3b8" />
          <rect x="50" y="20" width="10" height="6" fill="#94a3b8" />
          <rect x="50" y="34" width="50" height="6" fill="#cbd5e1" /> {/* Spacebar */}
          {/* Mouse */}
          <rect x="185" y="12" width="32" height="36" rx="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="201" y1="12" x2="201" y2="26" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="201" cy="22" r="2.5" fill="#38bdf8" />
        </svg>
      );

    case 'speakers':
      return (
        <svg viewBox="0 0 100 120" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Speaker Cabinet */}
          <rect x="15" y="10" width="70" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Tweeter */}
          <circle cx="50" cy="35" r="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="35" r="5" fill="#e63946" />
          {/* Woofer Cone */}
          <circle cx="50" cy="75" r="22" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="3" />
          <circle cx="50" cy="75" r="10" fill="#94a3b8" />
        </svg>
      );

    // BALI LIFESTYLE
    case 'plant-monstera':
      return (
        <svg viewBox="0 0 140 180" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rattan Woven Pot */}
          <path d="M 40 120 L 45 170 H 95 L 100 120 Z" fill="#ddb892" stroke="#b08968" strokeWidth="3" />
          <line x1="40" y1="135" x2="100" y2="135" stroke="#7f5539" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="42" y1="152" x2="98" y2="152" stroke="#7f5539" strokeWidth="2" strokeDasharray="4 2" />
          {/* Stems */}
          <path d="M 70 120 Q 50 80 30 50" stroke="#15803d" strokeWidth="4" fill="none" />
          <path d="M 70 120 Q 75 70 90 35" stroke="#15803d" strokeWidth="4" fill="none" />
          <path d="M 70 120 Q 90 90 115 70" stroke="#15803d" strokeWidth="4" fill="none" />
          {/* Monstera Leaves with Cutouts */}
          <path d="M 30 50 C 10 30 0 60 25 80 C 45 90 55 60 30 50 Z" fill="#22c55e" stroke="#166534" strokeWidth="2" />
          <path d="M 90 35 C 70 10 110 0 120 30 C 125 55 100 60 90 35 Z" fill="#16a34a" stroke="#166534" strokeWidth="2" />
          <path d="M 115 70 C 130 50 140 90 110 105 C 95 110 100 85 115 70 Z" fill="#15803d" stroke="#166534" strokeWidth="2" />
        </svg>
      );

    case 'espresso-machine':
      return (
        <svg viewBox="0 0 140 140" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Machine Body */}
          <rect x="20" y="20" width="100" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
          {/* Top Bean Hopper */}
          <rect x="40" y="5" width="60" height="16" rx="4" fill="#6f4e37" stroke="#3d1e03" strokeWidth="2" />
          {/* Pressure Gauge */}
          <circle cx="70" cy="45" r="10" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <line x1="70" y1="45" x2="74" y2="39" stroke="#ef4444" strokeWidth="2" />
          {/* Portafilter Handle */}
          <rect x="45" y="70" width="50" height="12" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="95" y="73" width="30" height="6" rx="2" fill="#6f4e37" />
          {/* Espresso Cup */}
          <rect x="60" y="95" width="20" height="18" rx="4" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
        </svg>
      );

    case 'surfboard':
      return (
        <svg viewBox="0 0 100 300" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Surfboard Body */}
          <path d="M 50 10 C 85 70 95 180 80 280 C 65 295 35 295 20 280 C 5 180 15 70 50 10 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />
          {/* Stripe Graphics */}
          <path d="M 50 10 Q 75 140 50 290" stroke="#f43f5e" strokeWidth="8" fill="none" opacity="0.85" />
          <path d="M 50 10 Q 35 140 50 290" stroke="#fbbf24" strokeWidth="6" fill="none" opacity="0.85" />
        </svg>
      );

    case 'beanbag':
      return (
        <svg viewBox="0 0 200 140" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Beanbag Lounge Cushion */}
          <path d="M 30 70 C 20 20 180 20 170 70 C 185 120 15 120 30 70 Z" fill="#fdf2f8" stroke="#f472b6" strokeWidth="4" />
          <path d="M 50 65 Q 100 95 150 65" stroke="#db2777" strokeWidth="3" fill="none" opacity="0.4" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="8" fill={accentColor} opacity="0.1" stroke={accentColor} strokeWidth="2" />
        </svg>
      );
  }
};
