import React from "react";
import { motion } from "motion/react";

interface CupIllustrationProps {
  isShaking: boolean;
  isRevealed: boolean;
  brandColor?: string;
}

export default function CupIllustration({
  isShaking,
  isRevealed,
  brandColor = "#D5926B" // Default warm milk tea amber
}: CupIllustrationProps) {
  // We can vary the liquid color based on state, but a beautiful warm brown milk-tea gradient is always classic and cute.
  
  return (
    <div className="relative flex flex-col items-center justify-center w-64 h-64 mx-auto select-none">
      {/* Sparkles around the cup when it's idling or revealed */}
      {!isShaking && (
        <>
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5], rotate: [0, 45, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-4 text-amber-400 font-bold text-xl"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ scale: [1.1, 0.7, 1.1], opacity: [0.6, 0.3, 0.6], rotate: [0, -45, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-8 right-2 text-amber-500 font-bold text-lg"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 right-4 text-yellow-400 font-bold text-sm"
          >
            ✦
          </motion.div>
        </>
      )}

      {/* Main Cup Body */}
      <div
        className={`w-48 h-60 transition-all duration-300 relative ${
          isShaking ? "animate-shaking" : "animate-float"
        }`}
      >
        <svg
          viewBox="0 0 200 260"
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(100,70,40,0.15)]"
        >
          <defs>
            {/* Milk Tea Liquid Gradient */}
            <linearGradient id="milkTeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E2D2" />
              <stop offset="60%" stopColor="#E9C5AC" />
              <stop offset="100%" stopColor="#D29E82" />
            </linearGradient>

            {/* Cup Highlight */}
            <linearGradient id="cupReflectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Bubble Shadow */}
            <radialGradient id="bubbleGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#553A2B" />
              <stop offset="70%" stopColor="#301B0E" />
              <stop offset="100%" stopColor="#150904" />
            </radialGradient>

            {/* Red Straw Stripe */}
            <pattern id="stripe" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="10" height="20" fill="#ff7675" />
              <rect x="10" width="10" height="20" fill="#ffffff" />
            </pattern>
          </defs>

          {/* 1. STRAW (Goes deep into the cup) */}
          <motion.g
            animate={isShaking ? { rotate: [-1, 2, -1], y: [0, -4, 0] } : {}}
            transition={{ duration: 0.2, repeat: Infinity }}
            transform="origin-bottom-right"
          >
            {/* Straw tube */}
            <rect x="105" y="10" width="22" height="150" rx="4" fill="url(#stripe)" className="opacity-90" />
            {/* Angled top cut */}
            <path d="M105 10 L127 10 L127 0 L105 5 Z" fill="#ff4d4d" />
          </motion.g>

          {/* 2. LIQUID (Behind Cup Front) */}
          <path
            d="M 46 80 L 154 80 L 140 230 C 139 238, 134 240, 125 240 L 75 240 C 66 240, 61 238, 60 230 Z"
            fill="url(#milkTeaGrad)"
          />

          {/* Wave top effect on milk tea liquid */}
          <path
            d="M 46 80 Q 73 85, 100 80 T 154 80 L 154 85 L 46 85 Z"
            fill="#FBE9DD"
            className="opacity-70"
          />

          {/* 3. PEARLS (BOBA BUBBLES) AT THE BOTTOM */}
          {/* Static rendering of cute bouncy pearls inside */}
          <g>
            {/* Row 1 */}
            <circle cx="72" cy="225" r="9" fill="url(#bubbleGrad)" />
            <circle cx="90" cy="230" r="9.5" fill="url(#bubbleGrad)" />
            <circle cx="110" cy="227" r="10" fill="url(#bubbleGrad)" />
            <circle cx="128" cy="223" r="9" fill="url(#bubbleGrad)" />

            {/* Row 2 */}
            <circle cx="63" cy="211" r="9.5" fill="url(#bubbleGrad)" />
            <circle cx="81" cy="216" r="9" fill="url(#bubbleGrad)" />
            <circle cx="99" cy="218" r="10" fill="url(#bubbleGrad)" />
            <circle cx="119" cy="214" r="9" fill="url(#bubbleGrad)" />
            <circle cx="136" cy="210" r="9.5" fill="url(#bubbleGrad)" />

            {/* Row 3 (Loose/floating bubbles) */}
            <motion.circle
              cx="75"
              cy="185"
              r="9"
              fill="url(#bubbleGrad)"
              animate={isShaking ? { y: [-20, 20, -20], x: [-10, 10, -10] } : { y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="120"
              cy="190"
              r="8.5"
              fill="url(#bubbleGrad)"
              animate={isShaking ? { y: [-35, 15, -35], x: [10, -10, 10] } : { y: [0, -8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.circle
              cx="95"
              cy="165"
              r="9.5"
              fill="url(#bubbleGrad)"
              animate={isShaking ? { y: [-40, 30, -40], x: [5, -5, 5] } : { y: [0, -12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
          </g>

          {/* 4. KAWAII FACE ON THE CUP */}
          <g>
            {isShaking ? (
              // Excited / dizzy face during shaking
              <>
                {/* Eyes (X_X / Squinting paths) */}
                <path d="M 72 135 L 82 143 M 82 135 L 72 143" stroke="#4a3325" strokeWidth="3" strokeLinecap="round" />
                <path d="M 118 135 L 128 143 M 128 135 L 118 143" stroke="#4a3325" strokeWidth="3" strokeLinecap="round" />
                {/* Mouth (Open O) */}
                <circle cx="100" cy="155" r="8" fill="#4a3325" />
                <circle cx="100" cy="153" r="5" fill="#ff7675" />
              </>
            ) : isRevealed ? (
              // Happy / satisfied face after reveal
              <>
                {/* Cheerful arching eyes */}
                <path d="M 68 142 Q 76 132, 84 142" fill="none" stroke="#4a3325" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 116 142 Q 124 132, 132 142" fill="none" stroke="#4a3325" strokeWidth="4.5" strokeLinecap="round" />
                {/* Happy open smile */}
                <path d="M 92 153 Q 100 168, 108 153" fill="none" stroke="#4a3325" strokeWidth="4" strokeLinecap="round" />
                {/* Tongue inside smile */}
                <path d="M 95 156 Q 100 166, 105 156 Z" fill="#ff7675" />
              </>
            ) : (
              // Classic cute smiling face (Idle)
              <>
                {/* Standard friendly eyes with highlights */}
                <circle cx="76" cy="138" r="5.5" fill="#4a3325" />
                <circle cx="74.5" cy="136" r="1.8" fill="#ffffff" />
                
                <circle cx="124" cy="138" r="5.5" fill="#4a3325" />
                <circle cx="122.5" cy="136" r="1.8" fill="#ffffff" />

                {/* Blush on cheeks */}
                <ellipse cx="64" cy="146" rx="7" ry="4.5" fill="#ff9f80" className="opacity-70" />
                <ellipse cx="136" cy="146" rx="7" ry="4.5" fill="#ff9f80" className="opacity-70" />

                {/* Cute small cat-like smile */}
                <path d="M 94 150 Q 100 155, 106 150" fill="none" stroke="#4a3325" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* 5. CUP CONTOUR AND RIM */}
          {/* Cup Front Glass Shading */}
          <path
            d="M 40 50 L 160 50 L 143 230 C 142 242, 135 246, 125 246 L 75 246 C 65 246, 58 242, 57 230 Z"
            fill="url(#cupReflectGrad)"
          />

          {/* Cup Outlines */}
          <path
            d="M 40 50 L 160 50 L 143 230 C 142 242, 135 246, 125 246 L 75 246 C 65 246, 58 242, 57 230 Z"
            fill="none"
            stroke="#4a3325"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Lid (Top cap sealing) */}
          <rect x="34" y="44" width="132" height="10" rx="5" fill="#FFFFFF" stroke="#4a3325" strokeWidth="5" />
        </svg>

        {/* Liquid level bouncing inside visually */}
        {isShaking && (
          <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none select-none">
            <span className="text-xs font-bold text-amber-900 bg-amber-100/90 py-1 px-2.5 rounded-full border border-amber-300 shadow-md animate-bounce">
              正在搖勻中... 🧋
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
