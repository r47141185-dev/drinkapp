import React from "react";
import { DrinkShop } from "../data";
import { X, Check, Eye, EyeOff, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shops: DrinkShop[];
  selectedShopIds: string[];
  onToggleShop: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  shops,
  selectedShopIds,
  onToggleShop,
  onSelectAll,
  onDeselectAll
}: FilterDrawerProps) {
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
          />

          {/* Drawer Panel */}
          <motion.div
            id="filter-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="filter-drawer fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FFFBF8] shadow-2xl z-50 p-6 flex flex-col border-l border-amber-100 rounded-l-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <Filter className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-amber-900 leading-tight">
                    自訂飲料店名單
                  </h3>
                  <p className="text-xs text-amber-800/60 font-sans">
                    篩選你想抽取的店家（至少保留一家）
                  </p>
                </div>
              </div>
              <button
                id="close-filter-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-amber-800 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 my-4">
              <button
                id="select-all-shops-btn"
                onClick={onSelectAll}
                className="flex-1 py-2 px-3 rounded-xl border border-amber-200/60 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                開啟全部 ({shops.length})
              </button>
              <button
                id="deselect-all-shops-btn"
                onClick={onDeselectAll}
                disabled={selectedShopIds.length <= 1}
                className="flex-1 py-2 px-3 rounded-xl border border-transparent bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-stone-100 text-stone-700 disabled:text-stone-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <EyeOff className="w-3.5 h-3.5" />
                清除全部
              </button>
            </div>

            {/* Shops List (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-1">
              {shops.map((shop) => {
                const isSelected = selectedShopIds.includes(shop.id);
                const isOnlyOne = selectedShopIds.length === 1 && isSelected;

                return (
                  <motion.div
                    key={shop.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      if (!isOnlyOne) {
                        onToggleShop(shop.id);
                      }
                    }}
                    className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-white border-amber-200 shadow-md shadow-amber-900/5"
                        : "bg-stone-50/70 border-stone-100 text-stone-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Brand Logo Circular Badge */}
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${
                          isSelected ? "" : "grayscale opacity-50 bg-stone-200 text-stone-500"
                        }`}
                        style={{
                          background: isSelected ? shop.brandColor : undefined,
                          color: isSelected ? "#FFFFFF" : undefined,
                        }}
                      >
                        <span className="truncate max-w-[40px] text-[11px] leading-tight text-center px-1 font-display">
                          {shop.logoText}
                        </span>
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4
                            className={`font-bold text-sm ${
                              isSelected ? "text-amber-900" : "text-stone-400 font-medium"
                            }`}
                          >
                            {shop.name}
                          </h4>
                          {isSelected && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 font-semibold">
                              已開啟
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                          {shop.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Indicator */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isSelected
                            ? "bg-amber-500 border-amber-600 text-white"
                            : "bg-white border-stone-200 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    {/* Disable warning tooltip overlay if only one and user hovers */}
                    {isOnlyOne && (
                      <div className="absolute inset-0 bg-[#FFFBF8]/10 rounded-2xl cursor-not-allowed" title="最少必須選擇一家店喔！" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Tip */}
            <div className="mt-4 pt-4 border-t border-amber-100 flex items-center gap-2 text-xs text-amber-800/60 bg-amber-50/40 p-3 rounded-2xl">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>篩選結果將儲存在您的瀏覽器中，下次打開也會保留您的設定！</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
