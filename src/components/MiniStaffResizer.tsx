import React, { useState } from 'react';
import { Sparkles, Minus, Plus, Volume2, ArrowRightLeft, Maximize2, Minimize2, Check } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { speech } from '../utils/speech';

export const MiniStaffResizer: React.FC = () => {
  // scale from 0.12 (pin) to 0.85 (hand staff) to 2.1 (giant pillar)
  const [scale, setScale] = useState<number>(2.0); // Default to Giant Pillar so users immediately see 13,500 Jin!
  const [showSimultaneousComparison, setShowSimultaneousComparison] = useState<boolean>(false);

  const handleResize = (newScale: number, isGrow: boolean, phrase?: string) => {
    const clamped = Math.max(0.12, Math.min(2.1, newScale));
    setScale(clamped);
    sfx.playResize(isGrow);
    if (phrase) {
      speech.speak(phrase, { rate: 1.05 });
    }
  };

  const currentMode = scale <= 0.3 ? 'pin' : scale <= 1.25 ? 'staff' : 'pillar';

  const getStatusText = () => {
    if (currentMode === 'pin') {
      return {
        en: 'No bigger than a pin! (如繡花針)',
        zh: '藏入耳中 (Placed inside his ear)',
        weight: '輕如鴻毛 (Weightless)',
        height: '~5 cm (Pin Size)'
      };
    }
    if (currentMode === 'staff') {
      return {
        en: 'A perfect weapon for me! (恰稱神兵)',
        zh: '長丈二尺 (Just a little taller than Wukong)',
        weight: '恰稱神手 (Balanced battle weapon)',
        height: '~2 m (Hand Staff)'
      };
    }
    return {
      en: 'Giant Iron Pillar! (定海神針)',
      zh: '重一萬三千五百斤 (13,500 Jin)',
      weight: '重一萬三千五百斤 (13,500 Jin)',
      height: '~20 m (Giant Ocean Pillar)'
    };
  };

  const status = getStatusText();

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-amber-100/50 to-orange-50/70 border-2 border-amber-300/80 rounded-2xl p-5 shadow-sm text-slate-800 transition-all">
      {/* Header with Title and Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/80 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-800 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-700 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 font-display tracking-tight">
                Interactive Magic Staff / 如意金箍棒
              </h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 border border-amber-300">
                展開清晰對比
              </span>
            </div>
            <p className="text-xs text-amber-900/80 font-medium">
              Command the iron pillar: <span className="font-bold text-amber-950">"Smaller!"</span> or <span className="font-bold text-amber-950">"Grow!"</span>
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <button
          onClick={() => {
            setShowSimultaneousComparison(!showSimultaneousComparison);
            sfx.playClick();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/80 shadow-xs transition-colors self-start sm:self-auto"
        >
          {showSimultaneousComparison ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-amber-700" />
              <span>互動變化舞台 (Interactive Stage)</span>
            </>
          ) : (
            <>
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>三態並列對比 (Side-by-Side Compare)</span>
            </>
          )}
        </button>
      </div>

      {/* Prominent Current Status Banner */}
      <div className="bg-amber-900 text-amber-50 rounded-xl p-3.5 mb-4 shadow-sm border border-amber-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
            Current Magical Form (當前形態)
          </span>
          <div className="text-base font-bold text-amber-100 flex items-center gap-2">
            <span>{status.en}</span>
          </div>
          <p className="text-xs text-amber-200 font-chinese mt-0.5 font-medium">
            {status.zh}
          </p>
        </div>

        <div className="text-left sm:text-right bg-amber-950/60 sm:bg-transparent p-2 sm:p-0 rounded-lg border sm:border-0 border-amber-800">
          <span className="text-[11px] text-amber-400 block font-semibold">Weight & Height (規格):</span>
          <span className="text-xs font-bold text-amber-200 block font-chinese">
            {status.weight}
          </span>
          <span className="text-[11px] text-amber-300 font-mono">
            {status.height}
          </span>
        </div>
      </div>

      {/* 3 Expanded Side-by-Side Comparison Preset Cards (展開清晰對比) */}
      <div className="mb-4">
        <div className="text-xs font-bold text-stone-700 mb-2 flex items-center justify-between">
          <span>Three Forms Comparison (三種神鐵形態切換與尺寸對比):</span>
          <span className="text-[11px] text-amber-800 font-normal">點擊快速切換形態</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Card 1: Pin Size */}
          <button
            onClick={() => handleResize(0.12, false, 'Smaller! No bigger than a pin!')}
            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              currentMode === 'pin'
                ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                : 'bg-white/80 border-amber-200/70 hover:bg-amber-50 hover:border-amber-300'
            }`}
          >
            {currentMode === 'pin' && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                <span>📌</span>
                <span>Pin Size (繡花針)</span>
              </div>
              <p className="text-[11px] font-semibold text-amber-900">
                No bigger than a pin!
              </p>
              <p className="text-[11px] text-stone-600 font-chinese mt-0.5">
                藏入耳中 · 隨身攜帶
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-800">
              <span className="font-mono">~5 cm</span>
              <span className="font-bold">Placed inside his ear</span>
            </div>
          </button>

          {/* Card 2: Hand Staff */}
          <button
            onClick={() => handleResize(0.85, true, 'This is a perfect weapon for me!')}
            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              currentMode === 'staff'
                ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                : 'bg-white/80 border-amber-200/70 hover:bg-amber-50 hover:border-amber-300'
            }`}
          >
            {currentMode === 'staff' && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                <span>🗡️</span>
                <span>Hand Staff (恰稱神鐵)</span>
              </div>
              <p className="text-[11px] font-semibold text-amber-900">
                A perfect weapon for me!
              </p>
              <p className="text-[11px] text-stone-600 font-chinese mt-0.5">
                長丈二尺 · 揮舞自如
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-800">
              <span className="font-mono">~2 m</span>
              <span className="font-bold">A little taller than Wukong</span>
            </div>
          </button>

          {/* Card 3: Giant Pillar */}
          <button
            onClick={() => handleResize(2.0, true, 'Giant Pillar! One thousand five hundred jin!')}
            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              currentMode === 'pillar'
                ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                : 'bg-white/80 border-amber-200/70 hover:bg-amber-50 hover:border-amber-300'
            }`}
          >
            {currentMode === 'pillar' && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                <span>🏛️</span>
                <span>Pillar (鎮海巨柱)</span>
              </div>
              <p className="text-[11px] font-semibold text-amber-900">
                Giant Iron Pillar! (定海神針)
              </p>
              <p className="text-[11px] text-stone-600 font-chinese mt-0.5">
                重一萬三千五百斤 (13,500 Jin)
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-800">
              <span className="font-mono">~20 m</span>
              <span className="font-bold font-chinese">東海鎮海神珍鐵</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mode A: Interactive Resizing Stage */}
      {!showSimultaneousComparison ? (
        <div className="space-y-4">
          {/* Visual Canvas of the Staff */}
          <div className="h-56 bg-gradient-to-b from-sky-950/40 via-sky-900/20 to-amber-950/30 rounded-xl relative overflow-hidden flex items-center justify-center border border-amber-200/80 shadow-inner">
            {/* Height marker guides */}
            <div className="absolute left-3 inset-y-3 flex flex-col justify-between text-[11px] text-amber-950/70 font-semibold select-none pointer-events-none">
              <div className="flex items-center gap-1.5 bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-200/50">
                <span>🏛️ Pillar (鎮海巨柱 · 20m)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-200/50">
                <span>🐵 Wukong Height (悟空身高 · 1.2m)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-200/50">
                <span>👂 Pin Size (耳中繡花針 · 5cm)</span>
              </div>
            </div>

            {/* Height baseline dashed lines */}
            <div className="absolute inset-x-0 top-6 border-b border-dashed border-amber-400/40 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-amber-400/40 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-6 border-b border-dashed border-amber-400/40 pointer-events-none" />

            {/* Sun Wukong visual scale reference */}
            <div className="absolute right-4 bottom-4 flex flex-col items-center opacity-85 select-none pointer-events-none">
              <div className="w-12 h-20 rounded-xl bg-amber-900/10 border border-amber-400/40 flex flex-col items-center justify-center p-1 text-center shadow-xs">
                <span className="text-xl">🐵</span>
                <span className="text-[9px] font-bold text-amber-950 font-chinese leading-tight">
                  孫悟空<br/>(1.2 m)
                </span>
              </div>
            </div>

            {/* The Magic Golden Staff itself */}
            <div
              className="transition-all duration-300 ease-out flex flex-col items-center justify-between rounded-full relative z-10"
              style={{
                height: `${Math.max(20, scale * 100)}px`,
                width: `${Math.max(6, scale * 22)}px`,
                background: 'linear-gradient(90deg, #92400e 0%, #b45309 20%, #f59e0b 45%, #fef08a 55%, #f59e0b 65%, #92400e 100%)',
                boxShadow:
                  scale > 1.2
                    ? '0 0 35px rgba(245, 158, 11, 0.7), 0 0 15px rgba(234, 88, 12, 0.5)'
                    : scale > 0.4
                    ? '0 6px 18px rgba(180, 83, 9, 0.4)'
                    : '0 2px 6px rgba(180, 83, 9, 0.3)'
              }}
            >
              {/* Top golden hoop ring */}
              <div
                className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 border-b border-amber-600 rounded-t-full shadow-xs"
                style={{ height: `${Math.max(3, scale * 12)}px` }}
              />

              {/* Center runes engraving */}
              {scale >= 0.6 && (
                <div
                  className="font-bold text-amber-950 font-chinese tracking-widest writing-vertical rotate-180 opacity-90 select-none text-center"
                  style={{ fontSize: `${Math.max(8, Math.min(13, scale * 7))}px` }}
                >
                  如意金箍棒
                  {scale >= 1.4 && <span className="block text-[8px] mt-1 font-mono">13,500斤</span>}
                </div>
              )}

              {/* Bottom golden hoop ring */}
              <div
                className="w-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 border-t border-amber-600 rounded-b-full shadow-xs"
                style={{ height: `${Math.max(3, scale * 12)}px` }}
              />
            </div>

            {/* Special contextual badge overlay */}
            {currentMode === 'pin' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-amber-100/95 text-amber-900 text-xs px-3 py-1.5 rounded-full border border-amber-300 shadow-sm flex items-center gap-1.5 animate-bounce">
                <span>👂</span>
                <span className="font-semibold">Fits inside Wukong's ear! (藏入耳中)</span>
              </div>
            )}
            {currentMode === 'pillar' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-amber-900/90 text-amber-100 text-xs px-3.5 py-1.5 rounded-full border border-amber-500 shadow-md flex items-center gap-1.5">
                <span>🌊</span>
                <span className="font-semibold">Ocean Calming Pillar (定海神珍 · 重一萬三千五百斤)</span>
              </div>
            )}
          </div>

          {/* Action Command Controls */}
          <div className="bg-white/90 rounded-xl p-4 border border-amber-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Primary Command Voice Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResize(scale - 0.35, false, 'Smaller!')}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-100 active:scale-95 shadow-sm transition-all"
                >
                  <Minus className="w-4 h-4 text-amber-700" />
                  <span>"Smaller!" (縮小)</span>
                </button>
                <button
                  onClick={() => handleResize(scale + 0.35, true, 'Grow!')}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-amber-600 text-white hover:bg-amber-700 active:scale-95 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>"Grow!" (變大)</span>
                </button>
              </div>

              {/* Pronounce Practice Button */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    speech.speak('Smaller!', { rate: 1.0 });
                    sfx.playClick();
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  title="聽發音: Smaller!"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>念 "Smaller!"</span>
                </button>
                <button
                  onClick={() => {
                    speech.speak('Grow!', { rate: 1.0 });
                    sfx.playClick();
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  title="聽發音: Grow!"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>念 "Grow!"</span>
                </button>
              </div>
            </div>

            {/* Continuous Resize Slider */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 mb-1.5">
                <span>Continuous Resizing Slider (連續縮放拉桿):</span>
                <span className="font-mono text-amber-800">Scale: {Math.round(scale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.12"
                max="2.1"
                step="0.05"
                value={scale}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  const isGrow = val > scale;
                  handleResize(val, isGrow);
                }}
                className="w-full accent-amber-600 h-2 bg-amber-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Pin (如針)</span>
                <span>Hand Staff (長丈二尺)</span>
                <span>Pillar (定海神針)</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mode B: Simultaneous 3-Form Side-by-Side Comparison Canvas */
        <div className="bg-white/95 rounded-xl p-5 border border-amber-300 shadow-sm space-y-4">
          <div className="text-center pb-2 border-b border-amber-100">
            <h5 className="text-sm font-bold text-slate-900 font-display">
              Side-by-Side Scale Comparison (三種型態同時並列對比)
            </h5>
            <p className="text-xs text-stone-500">
              Clear visual comparison of Pin Size vs. Hand Staff vs. Giant Pillar relative to Sun Wukong
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 items-end h-64 bg-gradient-to-b from-sky-950/20 via-sky-900/10 to-amber-950/20 rounded-xl p-4 border border-amber-100">
            {/* 1. Pin Size Column */}
            <div className="flex flex-col items-center justify-end h-full">
              <div className="mb-2 text-center">
                <span className="text-[10px] font-bold text-amber-900 block">Pin Size (如針)</span>
                <span className="text-[9px] text-stone-500 font-mono">~5 cm</span>
              </div>
              {/* Tiny Pin Staff */}
              <div
                className="w-1.5 h-5 rounded-full bg-amber-500 shadow-xs mb-2 transition-transform hover:scale-125 cursor-pointer"
                onClick={() => handleResize(0.12, false, 'No bigger than a pin!')}
                title="Click to select Pin Size"
              />
              <div className="w-full bg-white/80 rounded-lg p-1.5 text-center border border-amber-200">
                <span className="text-[10px] font-bold text-amber-900 block">藏入耳中</span>
                <span className="text-[9px] text-stone-500">Inside ear</span>
              </div>
            </div>

            {/* 2. Hand Staff Column (with Wukong) */}
            <div className="flex flex-col items-center justify-end h-full">
              <div className="mb-2 text-center">
                <span className="text-[10px] font-bold text-amber-900 block">Hand Staff (隨手)</span>
                <span className="text-[9px] text-stone-500 font-mono">~2 m</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                {/* Wukong silhouette reference */}
                <div className="w-8 h-20 bg-amber-950/20 border border-amber-400/40 rounded flex flex-col items-center justify-center text-[10px]">
                  <span>🐵</span>
                </div>
                {/* Hand Staff (a little taller than Wukong) */}
                <div
                  className="w-3.5 h-28 rounded-full bg-gradient-to-b from-amber-600 via-amber-400 to-amber-700 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleResize(0.85, true, 'A perfect weapon for me!')}
                  title="Click to select Hand Staff"
                />
              </div>
              <div className="w-full bg-white/80 rounded-lg p-1.5 text-center border border-amber-200">
                <span className="text-[10px] font-bold text-amber-900 block">長丈二尺</span>
                <span className="text-[9px] text-stone-500">Battle Weapon</span>
              </div>
            </div>

            {/* 3. Giant Pillar Column */}
            <div className="flex flex-col items-center justify-end h-full">
              <div className="mb-2 text-center">
                <span className="text-[10px] font-bold text-amber-900 block">Pillar (巨柱)</span>
                <span className="text-[9px] text-stone-500 font-mono">~20 m</span>
              </div>
              {/* Giant Pillar stretching full height */}
              <div
                className="w-8 h-48 rounded-t-lg bg-gradient-to-b from-amber-600 via-yellow-400 to-amber-800 shadow-md mb-2 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center"
                onClick={() => handleResize(2.0, true, 'Giant Pillar! One thousand five hundred jin!')}
                title="Click to select Giant Pillar"
              >
                <span className="text-[8px] font-bold text-amber-950 font-chinese writing-vertical rotate-180">
                  如意金箍棒
                </span>
              </div>
              <div className="w-full bg-white/80 rounded-lg p-1.5 text-center border border-amber-200">
                <span className="text-[10px] font-bold text-amber-900 block font-chinese">重一萬三千五百斤</span>
                <span className="text-[9px] text-stone-500 font-mono">13,500 Jin</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setShowSimultaneousComparison(false);
                sfx.playClick();
              }}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline"
            >
              返回互動調控舞台 (Return to Interactive Resizer)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
