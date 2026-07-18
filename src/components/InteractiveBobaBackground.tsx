import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PearlParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export default function InteractiveBobaBackground() {
  const [clickPearls, setClickPearls] = useState<PearlParticle[]>([]);
  const [autoParticles, setAutoParticles] = useState<Array<{ id: number; left: number; delay: number; size: number; speed: number; type: string }>>([]);

  // Generate some automatic floating particles in the background
  useEffect(() => {
    const types = ["pearl", "leaf", "ice", "cup"];
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * -20, // Negative delay so they start at different positions
      size: Math.random() * 12 + 8, // 8px to 20px
      speed: Math.random() * 15 + 15, // 15s to 30s
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setAutoParticles(initialParticles);
  }, []);

  // Handle clicking the background to spawn a falling bouncy boba pearl
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn if clicking on the background container itself (not on buttons/cards)
    if ((e.target as HTMLElement).closest("button, .interactive-card, .filter-drawer")) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPearl: PearlParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 14 + 12, // 12px to 26px
      rotation: Math.random() * 360,
    };

    setClickPearls((prev) => [...prev.slice(-15), newPearl]); // Limit to max 15 to avoid performance lag
  };

  // Clean up click pearls after their animation ends (e.g., 2.5 seconds)
  useEffect(() => {
    if (clickPearls.length === 0) return;
    const timer = setTimeout(() => {
      setClickPearls((prev) => prev.filter((p) => Date.now() - p.id < 2400));
    }, 2500);
    return () => clearTimeout(timer);
  }, [clickPearls]);

  return (
    <div
      id="bg-interactive-container"
      className="fixed inset-0 w-full h-full bg-[#FFFBEB] bubble-pattern overflow-hidden select-none cursor-pointer"
      onClick={handleBackgroundClick}
    >
      {/* Vibrant Palette Theme Background Decorations */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FDE68A] rounded-full opacity-40 pointer-events-none" />
      <div className="absolute top-20 right-10 w-24 h-24 bg-[#FBCFE8] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#D1FAE5] rounded-full opacity-60 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#FEF3C7] rounded-full opacity-80 pointer-events-none" />
      
      <div className="absolute top-1/2 left-10 w-6 h-6 bg-[#433422] rounded-full opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 right-40 w-4 h-4 bg-[#433422] rounded-full opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-20 w-8 h-8 bg-[#433422] rounded-full opacity-10 pointer-events-none" />

      {/* Floating Straw decoration in top right with matching vibe */}
      <div className="absolute top-[-40px] right-[5%] w-16 h-80 bg-amber-400/10 rounded-full rotate-45 pointer-events-none border-l-4 border-dashed border-amber-400/20" />
      
      {/* Auto Floating Background Elements */}
      {autoParticles.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute bottom-[-10%] pointer-events-none select-none opacity-20"
            style={{
              left: `${p.left}%`,
              animation: `floatUp ${p.speed}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.type === "pearl" && (
              <div 
                className="bg-[#3D2516] rounded-full shadow-inner"
                style={{ width: `${p.size}px`, height: `${p.size}px` }}
              />
            )}
            {p.type === "leaf" && (
              <svg 
                width={p.size * 1.5} 
                height={p.size * 1.5} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#4a773c" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 9.2a7 7 0 0 1-8 8.8Z" />
                <path d="M19 2c-2.26 4.33-5.27 7.14-8 8" />
              </svg>
            )}
            {p.type === "ice" && (
              <div 
                className="border-2 border-sky-300 bg-sky-100/30 rounded-md backdrop-blur-[1px]"
                style={{ 
                  width: `${p.size}px`, 
                  height: `${p.size}px`,
                  transform: `rotate(${p.left * 3}deg)` 
                }}
              />
            )}
            {p.type === "cup" && (
              <svg 
                width={p.size * 1.8} 
                height={p.size * 1.8} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#a06040" 
                strokeWidth="1.5"
                className="opacity-40"
              >
                <path d="M6 3h12" />
                <path d="m5 8 1.5 13A2 2 0 0 0 8.5 23h7a2 2 0 0 0 2-1.8L19 8" />
                <path d="M9 13a3 3 0 0 0 6 0" />
              </svg>
            )}
          </div>
        );
      })}

      {/* CSS for floatUp - purely local animation so React doesn't re-render it */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.25;
          }
          90% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-115vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Dynamic click-generated bouncy boba pearls */}
      <AnimatePresence>
        {clickPearls.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x - p.size / 2, y: p.y - p.size / 2, opacity: 1, scale: 0.8 }}
            animate={{
              y: [p.y - p.size / 2, window.innerHeight - p.size * 1.5, window.innerHeight - p.size * 4, window.innerHeight - p.size * 1.5],
              x: p.x - p.size / 2 + (Math.random() * 40 - 20),
              rotate: p.rotation + 180,
            }}
            transition={{
              y: {
                times: [0, 0.5, 0.75, 1],
                duration: 1.2,
                ease: ["easeIn", "easeOut", "easeIn", "easeOut"]
              },
              x: { duration: 1.2, ease: "linear" },
              rotate: { duration: 1.2, ease: "linear" }
            }}
            exit={{ opacity: 0, scale: 0, y: window.innerHeight + 50, transition: { duration: 0.5 } }}
            className="absolute rounded-full pointer-events-none select-none z-10"
            style={{
              width: p.size,
              height: p.size,
              background: "radial-gradient(circle at 35% 35%, #4A3325, #22140D 70%, #000000 100%)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3), inset -1px -1px 3px rgba(255, 255, 255, 0.1)"
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Click Toast Hint */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-amber-900/30 bg-amber-50/20 px-3 py-1 rounded-full backdrop-blur-[1px] pointer-events-none select-none">
        點選背景可以加料珍珠喔 🧋
      </div>
    </div>
  );
}
