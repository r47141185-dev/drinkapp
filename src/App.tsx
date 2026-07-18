/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { DRINK_SHOPS, SWEETNESS_OPTIONS, ICE_OPTIONS, HUMOROUS_COMMENTS, getRandomItem, DrinkShop } from "./data";
import InteractiveBobaBackground from "./components/InteractiveBobaBackground";
import FilterDrawer from "./components/FilterDrawer";
import CupIllustration from "./components/CupIllustration";
import ResultCard from "./components/ResultCard";
import { Sliders, HelpCircle, History, Sparkles, Flame, Snowflake, RefreshCw, Star, Trophy, ListCollapse } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DecisionHistoryItem {
  id: string;
  shopName: string;
  drinkName: string;
  sweetness: string;
  ice: string;
  timestamp: string;
  brandColor: string;
}

export default function App() {
  // 1. STATE MANAGEMENT
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);
  const [result, setResult] = useState<{
    shop: DrinkShop;
    drinkName: string;
    sweetness: string;
    ice: string;
    comment: string;
  } | null>(null);

  const [isShaking, setIsShaking] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false); // Controls the 3D card flip
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [decisionCount, setDecisionCount] = useState(0);
  const [recentHistory, setRecentHistory] = useState<DecisionHistoryItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 2. INITIALIZE FROM LOCAL STORAGE ON MOUNT
  useEffect(() => {
    // Load selected shop configurations
    const savedShops = localStorage.getItem("drink_selected_shops");
    if (savedShops) {
      try {
        const parsed = JSON.parse(savedShops);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedShopIds(parsed);
        } else {
          setSelectedShopIds(DRINK_SHOPS.map((s) => s.id));
        }
      } catch (e) {
        setSelectedShopIds(DRINK_SHOPS.map((s) => s.id));
      }
    } else {
      setSelectedShopIds(DRINK_SHOPS.map((s) => s.id));
    }

    // Load decision count
    const savedCount = localStorage.getItem("drink_decision_count");
    if (savedCount) {
      setDecisionCount(parseInt(savedCount, 10) || 0);
    }

    // Load drawing history
    const savedHistory = localStorage.getItem("drink_decision_history");
    if (savedHistory) {
      try {
        setRecentHistory(JSON.parse(savedHistory));
      } catch (e) {
        setRecentHistory([]);
      }
    }
  }, []);

  // 3. TOAST HELPER
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // 4. FILTER ACTIONS
  const handleToggleShop = (id: string) => {
    const next = selectedShopIds.includes(id)
      ? selectedShopIds.filter((x) => x !== id)
      : [...selectedShopIds, id];
    
    if (next.length > 0) {
      setSelectedShopIds(next);
      localStorage.setItem("drink_selected_shops", JSON.stringify(next));
    } else {
      triggerToast("最少要選擇一家飲料店喔！");
    }
  };

  const handleSelectAll = () => {
    const allIds = DRINK_SHOPS.map((s) => s.id);
    setSelectedShopIds(allIds);
    localStorage.setItem("drink_selected_shops", JSON.stringify(allIds));
    triggerToast("已開啟所有飲料店名單！");
  };

  const handleDeselectAll = () => {
    // Default to keeping the first one if empty, but drawer enforces selectedShopIds.length > 1 before allowing clear
    if (DRINK_SHOPS.length > 0) {
      const defaultShop = [DRINK_SHOPS[0].id];
      setSelectedShopIds(defaultShop);
      localStorage.setItem("drink_selected_shops", JSON.stringify(defaultShop));
      triggerToast(`已重置，僅保留「${DRINK_SHOPS[0].name}」`);
    }
  };

  // 5. CORE SELECTOR DECISION LOGIC
  const handleMakeDecision = () => {
    if (selectedShopIds.length === 0) {
      triggerToast("請先在右上角設定中勾選至少一家飲料店喔！");
      return;
    }

    // Start Shaking
    setIsShaking(true);
    setIsRevealing(true); // Shows back side of the card

    // If already has a result, we clear it temporarily so the user sees the cup shake
    setResult(null);

    // After 1.2s, reveal the result (flips the card to front side)
    setTimeout(() => {
      const activeShops = DRINK_SHOPS.filter((s) => selectedShopIds.includes(s.id));
      const chosenShop = getRandomItem(activeShops);
      const chosenDrink = getRandomItem(chosenShop.drinks);
      const chosenSweetness = getRandomItem(SWEETNESS_OPTIONS).value;
      const chosenIce = getRandomItem(ICE_OPTIONS).value;
      const chosenComment = getRandomItem(HUMOROUS_COMMENTS);

      const newResult = {
        shop: chosenShop,
        drinkName: chosenDrink,
        sweetness: chosenSweetness,
        ice: chosenIce,
        comment: chosenComment,
      };

      setResult(newResult);
      setIsShaking(false);
      setIsRevealing(false); // Flip card to show front side!

      // Update counters and history
      const nextCount = decisionCount + 1;
      setDecisionCount(nextCount);
      localStorage.setItem("drink_decision_count", nextCount.toString());

      // Save to recent history
      const historyItem: DecisionHistoryItem = {
        id: Date.now().toString(),
        shopName: chosenShop.name,
        drinkName: chosenDrink,
        sweetness: chosenSweetness,
        ice: chosenIce,
        brandColor: chosenShop.brandColor,
        timestamp: new Date().toLocaleTimeString("zh-TW", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      const updatedHistory = [historyItem, ...recentHistory.slice(0, 9)]; // Keep last 10 entries
      setRecentHistory(updatedHistory);
      localStorage.setItem("drink_decision_history", JSON.stringify(updatedHistory));

    }, 1200);
  };

  // 6. RESET TO IDLE SCREEN
  const handleReset = () => {
    setResult(null);
    setIsShaking(false);
    setIsRevealing(false);
  };

  // 7. CLEAR HISTORY
  const handleClearHistory = () => {
    setRecentHistory([]);
    localStorage.removeItem("drink_decision_history");
    triggerToast("歷史紀錄已清除！");
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-stone-800 antialiased overflow-x-hidden">
      {/* 1. Interactive Boba Background */}
      <InteractiveBobaBackground />

      {/* 2. Top Header Navigation */}
      <header className="relative w-full z-30 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto shrink-0">
        {/* Brand/Logo Section */}
        <div 
          onClick={handleReset}
          className="flex items-center gap-2 cursor-pointer bg-white/70 hover:bg-white/90 px-4 py-2 rounded-full border border-amber-100/60 shadow-sm backdrop-blur-md transition-all active:scale-95"
        >
          <span className="text-2xl">🧋</span>
          <span className="font-display font-black text-amber-900 tracking-wide">
            今天喝什麼？
          </span>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2">
          {/* History Toggle Button */}
          <button
            id="history-toggle-btn"
            onClick={() => setIsHistoryOpen(true)}
            className="w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 border border-amber-100/60 shadow-sm flex items-center justify-center text-amber-900 hover:text-amber-700 transition-all backdrop-blur-md relative active:scale-95"
            title="歷史抽取紀錄"
          >
            <History className="w-5 h-5" />
            {recentHistory.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                {recentHistory.length}
              </span>
            )}
          </button>

          {/* Config Filter Drawer Toggle Button */}
          <button
            id="filter-toggle-btn"
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 border border-amber-100/60 shadow-sm flex items-center justify-center text-amber-900 hover:text-amber-700 transition-all backdrop-blur-md relative active:scale-95"
            title="自訂店家名單"
          >
            <Sliders className="w-5 h-5" />
            {selectedShopIds.length < DRINK_SHOPS.length && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-400 rounded-full border border-white" />
            )}
          </button>
        </div>
      </header>

      {/* 3. Main Stage Container */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-4 z-20 max-w-lg mx-auto w-full">
        
        {/* Title Group - Only visible when result is null or shaking */}
        <AnimatePresence>
          {(!result || isShaking) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-6 pointer-events-none select-none"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 border border-amber-200/50 rounded-full backdrop-blur-sm text-xs text-amber-900 font-bold tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>解決你的手搖選擇障礙</span>
              </div>
              <h1 className="font-display font-black text-5xl sm:text-6xl text-[#D97706] tracking-tight leading-none drop-shadow-sm mb-2">
                今天喝什麼？
              </h1>
              <p className="text-sm sm:text-lg font-bold text-[#92400E] opacity-90 mt-2">
                最懂你的手搖飲抽籤機
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render Stage Screen States */}
        <div className="w-full relative min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!result ? (
              // ================= IDLE STATE =================
              <motion.div
                key="idle-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center w-full"
              >
                {/* Decorative floating cup illustration */}
                <CupIllustration isShaking={isShaking} isRevealed={false} />

                {/* Big Action button */}
                <div className="mt-8 w-full max-w-xs px-2">
                  <motion.button
                    id="decide-main-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMakeDecision}
                    disabled={isShaking}
                    className="w-full py-5 px-10 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white font-display font-black text-2xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-amber-900 cursor-pointer"
                  >
                    <span>🧋 幫我決定！</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              // ================= REVEALED RESULT STATE =================
              <motion.div
                key="result-stage"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="w-full"
              >
                <ResultCard
                  shop={result.shop}
                  drinkName={result.drinkName}
                  sweetness={result.sweetness}
                  ice={result.ice}
                  comment={result.comment}
                  onSpinAgain={handleMakeDecision}
                  isRevealing={isRevealing}
                />

                {/* Go Back / Reset to Cup */}
                <button
                  id="go-back-cup-btn"
                  onClick={handleReset}
                  className="mt-4 mx-auto text-xs font-semibold text-amber-900/40 hover:text-amber-900 bg-amber-50/10 hover:bg-amber-50/40 px-3 py-1.5 rounded-full border border-dashed border-amber-900/10 hover:border-amber-900/30 transition-all flex items-center gap-1"
                >
                  回前頁重搖 ↩
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Stat Counter Bar */}
        <div className="mt-8 px-4 py-2 bg-white/40 border border-amber-100/50 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-2 text-xs text-amber-900/70 select-none">
          <Trophy className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>累計解決了</span>
          <strong className="font-display font-black text-amber-900 text-sm">{decisionCount}</strong>
          <span>次選擇困難！</span>
        </div>
      </main>

      {/* 5. Custom Slide-up Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-[#3D2516] text-amber-50 text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-amber-900/50 flex items-center gap-2 max-w-sm w-[90%] justify-center"
          >
            <span>✨ {toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Filter Configuration Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        shops={DRINK_SHOPS}
        selectedShopIds={selectedShopIds}
        onToggleShop={handleToggleShop}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />

      {/* 7. History Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            {/* History Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
            />

            {/* History Drawer Panel */}
            <motion.div
              id="history-drawer-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-md bg-[#FFFBF8] shadow-2xl z-50 p-6 flex flex-col border-r border-amber-100 rounded-r-3xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-amber-900 leading-tight">
                      近期茶運歷史
                    </h3>
                    <p className="text-xs text-amber-800/60 font-sans">
                      您最近抽到的 10 杯神仙特調
                    </p>
                  </div>
                </div>
                <button
                  id="close-history-btn"
                  onClick={() => setIsHistoryOpen(false)}
                  className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-amber-800 transition-colors"
                  aria-label="Close history"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* History List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-4">
                {recentHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-stone-400">
                    <span className="text-4xl mb-2">🥤</span>
                    <p className="text-sm font-semibold">還沒有任何紀錄喔！</p>
                    <p className="text-xs mt-1">點擊首頁「幫我決定」來抽第一杯吧！</p>
                  </div>
                ) : (
                  recentHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl border border-amber-100/60 shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-sm font-display"
                            style={{ backgroundColor: item.brandColor }}
                          >
                            {item.shopName}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {item.timestamp}
                          </span>
                        </div>
                        <h4 className="font-bold text-stone-800 text-sm mt-1.5 leading-tight">
                          {item.drinkName}
                        </h4>
                        <div className="flex gap-1.5 mt-1">
                          <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-100/50 px-1.5 py-0.2 rounded-md font-semibold">
                            🍬 {item.sweetness}
                          </span>
                          <span className="text-[10px] text-sky-800 bg-sky-50 border border-sky-100/50 px-1.5 py-0.2 rounded-md font-semibold">
                            ❄️ {item.ice}
                          </span>
                        </div>
                      </div>

                      {/* Sparkle badge */}
                      <Star className="w-4 h-4 text-amber-400 opacity-60 group-hover:scale-125 group-hover:text-amber-500 transition-all" />
                    </div>
                  ))
                )}
              </div>

              {/* Actions */}
              {recentHistory.length > 0 && (
                <div className="pt-4 border-t border-amber-100">
                  <button
                    id="clear-history-btn"
                    onClick={handleClearHistory}
                    className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    清除所有歷史紀錄
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer copyright */}
      <footer className="relative w-full z-10 py-6 text-center text-xs text-amber-900/50 select-none pointer-events-none mt-auto flex flex-col items-center gap-2">
        <div className="text-xs sm:text-sm font-black text-[#D97706] opacity-40 uppercase tracking-[0.3em] mb-1">
          珍珠 • 椰果 • 愛玉 • 仙草 • 寒天
        </div>
        <p>© 2026 今天喝什麼？. 甜度、冰量與好運皆新鮮調配。</p>
        <p className="mt-0.5">一杯手搖，一整天的療癒與浪漫 🥤</p>
      </footer>
    </div>
  );
}

// Inline fallback icon to prevent missing imports
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

