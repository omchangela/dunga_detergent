"use client";

import React from "react";

interface Icon3DProps {
  type:
    | "germs"
    | "stains"
    | "fragrance"
    | "floors"
    | "hands"
    | "all-surfaces"
    | "formula"
    | "brighten"
    | "eco"
    | "price"
    | "shield"
    | "award";
  size?: number;
  className?: string;
}

export default function ThreeDIcon({ type, size = 64, className = "" }: Icon3DProps) {
  const s = size;

  switch (type) {
    case "germs":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="germSphere" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff7b90" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
            <radialGradient id="shieldGrad" cx="30%" cy="25%" r="75%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#fee2e2" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.4" />
            </radialGradient>
            <filter id="shadowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.35" />
            </filter>
          </defs>
          {/* Outer Glass Aura */}
          <circle cx="50" cy="50" r="42" fill="url(#shieldGrad)" filter="url(#shadowRed)" />
          {/* Main 3D Shield Base */}
          <path
            d="M50 16C36 24 26 24 24 38C24 64 50 82 50 82C50 82 76 64 76 38C74 24 64 24 50 16Z"
            fill="url(#germSphere)"
          />
          {/* Gloss Highlight */}
          <path
            d="M50 20C40 26 31 26 28 37C28 54 44 69 49 76C49 76 49 20 50 20Z"
            fill="#ffffff"
            opacity="0.35"
          />
          {/* Checkmark 3D */}
          <path
            d="M40 48L46 54L60 38"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "stains":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sparkleGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <filter id="shadowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2563eb" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Background Glass Bubble */}
          <circle cx="50" cy="50" r="42" fill="#eff6ff" filter="url(#shadowBlue)" />
          {/* 3D 4-point Diamond Star */}
          <path
            d="M50 15L59 39L83 50L59 61L50 85L41 61L17 50L41 39Z"
            fill="url(#sparkleGrad)"
          />
          {/* Specular Facet Highlights */}
          <path d="M50 15L59 39L50 50Z" fill="#ffffff" opacity="0.6" />
          <path d="M83 50L59 61L50 50Z" fill="#60a5fa" opacity="0.5" />
          <path d="M50 85L41 61L50 50Z" fill="#1d4ed8" opacity="0.7" />
          <path d="M17 50L41 39L50 50Z" fill="#ffffff" opacity="0.8" />
          {/* Mini Sparkle */}
          <circle cx="70" cy="28" r="4" fill="#60a5fa" />
          <circle cx="28" cy="70" r="3" fill="#93c5fd" />
        </svg>
      );

    case "fragrance":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="purpleGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="55%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4c1d95" />
            </radialGradient>
            <filter id="shadowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#7c3aed" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#f5f3ff" filter="url(#shadowPurple)" />
          {/* Droplet Body */}
          <path
            d="M50 18C50 18 24 50 24 64C24 78.36 35.64 90 50 90C64.36 90 76 78.36 76 64C76 50 50 18 50 18Z"
            fill="url(#purpleGrad)"
            transform="scale(0.85) translate(8, 5)"
          />
          {/* Curved Wind Ribbons */}
          <path
            d="M32 44C40 38 52 46 64 36"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M38 56C46 50 56 58 68 48"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Glass Specular Glare */}
          <ellipse cx="44" cy="55" rx="6" ry="12" transform="rotate(-25 44 55)" fill="#ffffff" opacity="0.5" />
        </svg>
      );

    case "floors":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cyanGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
            <filter id="shadowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#06b6d4" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#ecfeff" filter="url(#shadowCyan)" />
          {/* Isometric Tile Floor */}
          <path d="M50 24L78 40L50 56L22 40Z" fill="url(#cyanGrad)" />
          <path d="M22 40L50 56L50 72L22 56Z" fill="#0891b2" />
          <path d="M50 56L78 40L78 56L50 72Z" fill="#0e7490" />
          {/* Mirror Reflection Sheen */}
          <path d="M42 32L68 46L54 54L28 40Z" fill="#ffffff" opacity="0.45" />
          {/* Sparkle on surface */}
          <circle cx="62" cy="38" r="3.5" fill="#ffffff" />
        </svg>
      );

    case "hands":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="greenGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>
            <filter id="shadowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#16a34a" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#f0fdf4" filter="url(#shadowGreen)" />
          {/* 3D Heart */}
          <path
            d="M50 74C50 74 24 56 24 40C24 30 32 24 40 24C45 24 48 27 50 30C52 27 55 24 60 24C68 24 76 30 76 40C76 56 50 74 50 74Z"
            fill="url(#greenGrad)"
          />
          {/* Gentle Protective Palm Curve */}
          <path
            d="M32 40C32 34 38 30 42 30C46 30 48 33 50 35C50 48 36 58 36 58"
            fill="#ffffff"
            opacity="0.4"
          />
          {/* Dewdrop Highlight */}
          <circle cx="42" cy="36" r="3" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case "all-surfaces":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="amberGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <filter id="shadowAmber" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#fffbeb" filter="url(#shadowAmber)" />
          {/* 3 stacked layers */}
          <path d="M50 20L78 32L50 44L22 32Z" fill="url(#amberGrad)" />
          <path d="M22 32L50 44L50 48L22 36Z" fill="#d97706" />
          <path d="M50 44L78 32L78 36L50 48Z" fill="#b45309" />

          <path d="M50 38L78 50L50 62L22 50Z" fill="url(#amberGrad)" opacity="0.85" />
          <path d="M22 50L50 62L50 66L22 54Z" fill="#d97706" />
          <path d="M50 62L78 50L78 54L50 66Z" fill="#b45309" />

          <path d="M50 56L78 68L50 80L22 68Z" fill="url(#amberGrad)" opacity="0.7" />
          <path d="M22 68L50 80L50 84L22 72Z" fill="#d97706" />
          <path d="M50 80L78 68L78 72L50 84Z" fill="#b45309" />
          {/* Top gloss */}
          <path d="M40 26L68 36L56 42L28 32Z" fill="#ffffff" opacity="0.45" />
        </svg>
      );

    case "formula":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="flaskGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <filter id="shadowFlask" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2563eb" floodOpacity="0.3" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#eff6ff" filter="url(#shadowFlask)" />
          {/* Flask shape */}
          <path
            d="M44 20H56V34L76 72C79 78 75 84 68 84H32C25 84 21 78 24 72L44 34V20Z"
            fill="url(#flaskGrad)"
          />
          {/* Liquid level */}
          <path
            d="M32 58L27 68C25 73 28 78 34 78H66C72 78 75 73 73 68L68 58C60 62 40 54 32 58Z"
            fill="#38bdf8"
          />
          {/* Flask neck lip */}
          <rect x="42" y="16" width="16" height="6" rx="3" fill="#93c5fd" />
          {/* Bubble particles */}
          <circle cx="48" cy="68" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="56" cy="62" r="2.5" fill="#ffffff" opacity="0.7" />
          <circle cx="42" cy="72" r="2" fill="#ffffff" opacity="0.9" />
          {/* Glass highlight */}
          <path d="M46 22H50V34L35 64" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      );

    case "brighten":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="goldGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </radialGradient>
            <filter id="shadowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#eab308" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#fefce8" filter="url(#shadowGold)" />
          {/* Glowing Sun Rays */}
          <path
            d="M50 20L54 34L68 28L60 40L74 46L60 52L72 62L58 64L62 78L50 68L38 78L42 64L28 62L40 52L26 46L40 40L32 28L46 34Z"
            fill="url(#goldGrad)"
          />
          {/* Inner Mirror Center */}
          <circle cx="50" cy="50" r="16" fill="#ffffff" opacity="0.85" />
          <circle cx="48" cy="46" r="5" fill="#ffffff" />
        </svg>
      );

    case "eco":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="leafGrad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#052e16" />
            </radialGradient>
            <filter id="shadowEco" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#16a34a" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#f0fdf4" filter="url(#shadowEco)" />
          {/* 3D Leaf */}
          <path
            d="M32 72C32 72 34 52 50 36C66 20 82 18 82 18C82 18 80 34 64 50C48 66 32 72 32 72Z"
            fill="url(#leafGrad)"
          />
          {/* Leaf vein */}
          <path d="M32 72C42 58 56 44 82 18" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M48 52C54 50 60 52 64 50" stroke="#86efac" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M42 60C46 59 50 60 54 58" stroke="#86efac" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          {/* Water drop on leaf */}
          <circle cx="65" cy="35" r="4" fill="#ffffff" opacity="0.7" />
          <circle cx="63" cy="33" r="1.5" fill="#ffffff" />
        </svg>
      );

    case "price":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 100 100"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="coinGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
            <filter id="shadowCoin" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.35" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="#fef2f2" filter="url(#shadowCoin)" />
          {/* 3D Coin Badge */}
          <circle cx="50" cy="50" r="28" fill="url(#coinGrad)" />
          <circle cx="50" cy="50" r="23" stroke="#fecaca" strokeWidth="2" strokeDasharray="3,3" />
          <text
            x="50"
            y="58"
            fontFamily="Outfit"
            fontSize="26"
            fontWeight="900"
            fill="#ffffff"
            textAnchor="middle"
          >
            ₹
          </text>
          {/* Specular glare */}
          <path
            d="M32 38C38 30 56 26 66 32"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );

    default:
      return null;
  }
}
