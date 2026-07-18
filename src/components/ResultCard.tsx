import React, { useState } from "react";
import { DrinkShop, SWEETNESS_OPTIONS, ICE_OPTIONS } from "../data";
import { Copy, RefreshCw, Check, Sparkles, Smile, Coffee, BadgeAlert, Award } from "lucide-react";
import { motion } from "motion/react";

interface ResultCardProps {
  shop: DrinkShop;
  drinkName: string;
  sweetness: string;
  ice: string;
  comment: string;
  onSpinAgain: () => void;
  isRevealing: boolean;
}

export default function ResultCard({
  shop,
  drinkName,
  sweetness,
  ice,
  comment,
  onSpinAgain,
  isRevealing
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  // Find the sub-descriptions for sweetness and ice
  const sweetnessDesc = SWEETNESS_OPTIONS.find((o) => o.value === sweetness)?.desc || "";
  const iceDesc = ICE_OPTIONS.find((o) => o.value === ice)?.desc || "";

  // Copy result text to clipboard
  const handleCopy = () => {
    const textToCopy = `🥤 今天喝什麼？推薦結果 🥤
------------------------
【店家】${shop.name}
【品項】${drinkName}
【甜度】${sweetness} (${sweetnessDesc})
【冰量】${ice} (${iceDesc})
------------------------
💬 專屬評語：${comment}
💡 點此看今天茶運：${window.location.href}
#今天喝什麼 #手搖飲推薦`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Determine if the brand needs white or dark text on its background
  const isDarkBrand = ["kebuke", "tp-tea", "fifty-lan", "dejeng", "guiji"].includes(shop.id);

  return (
    <div className="w-full max-w-sm mx-auto perspective-1000 my-4 select-none">
      {/* 3D Rotating Wrapper */}
      <motion.div
        className="relative transform-style-3d w-full"
        initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
        animate={{ 
          rotateY: isRevealing ? 180 : 0, 
          scale: 1, 
          opacity: 1 
        }}
        transition={{ 
          type: "spring", 
          damping: 18, 
          stiffness: 100,
          mass: 1.2
        }}
      >
        {/* ================= CARD BACK SIDE (Shown during drawing) ================= */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-amber-100 to-orange-200 border-4 border-white shadow-2xl rounded-3xl p-6 flex flex-col items-center justify-center min-h-[460px] z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Ornate back patterns */}
          <div className="absolute inset-4 border-2 border-dashed border-amber-800/20 rounded-2xl pointer-events-none" />
          
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              🔮
            </motion.div>
          </div>

          <h3 className="font-display font-black text-2xl text-amber-900 tracking-wider">
            正在調配茶運...
          </h3>
          <p className="text-sm text-amber-800/70 mt-2 text-center px-4">
            手搖大師正在搖勻泡沫與幸福，<br />
            請稍候一秒鐘！
          </p>

          {/* Shaking bubbles decoration */}
          <div className="flex gap-2 mt-6">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-600 animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>

        {/* ================= CARD FRONT SIDE (The revealed result) ================= */}
        <div className="w-full backface-hidden bg-white border-8 border-[#FCD34D] shadow-2xl rounded-[40px] overflow-hidden flex flex-col min-h-[480px]">
          {/* Receipt Body */}
          <div className="p-8 flex-1 flex flex-col justify-between relative">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Header Badge */}
              <div className="bg-[#FEF3C7] px-6 py-2 rounded-full text-[#B45309] font-display font-black text-lg sm:text-xl tracking-widest shadow-sm flex items-center gap-1.5 animate-bounce">
                <Sparkles className="w-5 h-5 text-[#D97706] shrink-0" />
                恭喜抽中
              </div>

              {/* Shop Display with circular brand logo */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-display font-black text-sm shadow-md animate-pulse"
                  style={{
                    backgroundColor: shop.brandColor,
                    color: "#FFFFFF"
                  }}
                >
                  <span className="truncate max-w-[48px] leading-tight text-center px-1">
                    {shop.logoText}
                  </span>
                </div>
                <h4 id="shopName" className="text-3xl sm:text-4xl font-display font-black text-[#1F2937]">
                  {shop.name}
                </h4>
              </div>

              {/* Drink Display */}
              <div className="flex flex-col items-center w-full">
                <h2 id="drinkName" className="text-3xl sm:text-4xl font-display font-black text-[#D97706] mb-3 text-center leading-tight tracking-wide">
                  {drinkName}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 text-sm sm:text-base font-bold text-[#6B7280]">
                  <span id="sugarLevel" className="bg-stone-100 px-4 py-1.5 rounded-xl border border-stone-200/50 shadow-sm flex items-center gap-1">
                    🍬 {sweetness}
                  </span>
                  <span id="iceLevel" className="bg-stone-100 px-4 py-1.5 rounded-xl border border-stone-200/50 shadow-sm flex items-center gap-1">
                    ❄️ {ice}
                  </span>
                </div>
              </div>

              {/* Humorous Comment with matching border */}
              <div className="bg-[#F9FAFB] border-l-4 border-[#FCD34D] p-4 italic text-[#4B5563] text-sm sm:text-base w-full rounded-r-2xl text-left shadow-inner">
                「<span id="humorText">{comment}</span>」
              </div>
            </div>

            {/* Subtle Tea Leaf accent footer */}
            <div className="mt-6 pt-4 border-t border-dashed border-stone-200 flex justify-center items-center">
              <span className="text-[10px] font-mono text-stone-400 tracking-wider">
                飲用這杯特調，開啟你今天的完美幸運！🧋
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Control Buttons matching Vibrant Palette theme perfectly */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center relative z-20">
        <button
          id="spin-again-btn"
          onClick={onSpinAgain}
          disabled={isRevealing}
          className="bg-[#D97706] hover:bg-[#B45309] text-white font-display font-black text-xl sm:text-2xl px-10 py-4 rounded-full shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 border-b-4 border-amber-900 cursor-pointer w-full sm:flex-1"
        >
          <RefreshCw className={`w-6 h-6 ${isRevealing ? "animate-spin" : ""}`} />
          <span>再選一次！</span>
        </button>

        <button
          id="copy-result-btn"
          onClick={handleCopy}
          className="bg-white border-4 border-[#D97706] text-[#D97706] hover:bg-[#FFFBEB] font-display font-bold text-lg px-8 py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer w-full sm:flex-1"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
              <span className="text-emerald-700">已複製！</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-[#D97706]" />
              <span>複製結果</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
