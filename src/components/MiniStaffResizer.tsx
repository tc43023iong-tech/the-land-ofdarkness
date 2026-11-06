import React, { useState } from 'react';
import { Sparkles, Minus, Plus, Volume2 } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { speech } from '../utils/speech';

export const MiniStaffResizer: React.FC = () => {
  // scale from 0.1 (pin) to 1.0 (human size) to 2.2 (pillar)
  const [scale, setScale] = useState<number>(0.85);

  const handleResize = (newScale: number, isGrow: boolean, phrase?: string) => {
    const clamped = Math.max(0.1, Math.min(2.2, newScale));
    setScale(clamped);
    sfx.playResize(isGrow);
    if (phrase) {
      speech.speak(phrase, { rate: 1.1 });
    }
  };

  const getStatusText = () => {
    if (scale <= 0.2) return { en: 'No bigger than a pin! (如繡花針)', zh: '藏入耳中 (Placed inside his ear)' };
    if (scale <= 0.6) return { en: 'Short staff (如意短棒)', zh: '單手揮舞 (Swung easily)' };
    if (scale <= 1.2) return { en: 'Perfect weapon size! (恰稱神兵)', zh: '長丈二尺 (Just a little taller than Wukong)' };
    return { en: 'Giant Iron Pillar! (定海神針)', zh: '重一萬三千五百斤 (13,500 Jin)' };
  };

  const status = getStatusText();

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 shadow-sm text-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-display">
              Interactive Magic Staff / 如意金箍棒
            </h4>
            <p className="text-xs text-amber-800/80">
              Command the iron pillar: "Smaller!" or "Grow!"
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-amber-900 block">{status.en}</span>
          <span className="text-[11px] text-amber-700 font-chinese">{status.zh}</span>
        </div>
      </div>

      {/* Visual Canvas of the Staff */}
      <div className="h-44 bg-gradient-to-b from-sky-900/10 via-sky-800/5 to-amber-900/10 rounded-xl relative overflow-hidden flex items-center justify-center border border-amber-100">
        {/* Height markers */}
        <div className="absolute left-3 inset-y-2 flex flex-col justify-between text-[10px] text-slate-400 select-none">
          <span>Pillar (天界神針)</span>
          <span>Wukong Height (悟空身高)</span>
          <span>Ear Pin (耳中繡花針)</span>
        </div>

        {/* The Staff representation */}
        <div
          className="transition-all duration-300 ease-out flex flex-col items-center justify-between rounded-full shadow-lg relative"
          style={{
            height: `${Math.max(16, scale * 130)}px`,
            width: `${Math.max(6, scale * 26)}px`,
            background: 'linear-gradient(90deg, #b45309 0%, #f59e0b 35%, #fef08a 50%, #f59e0b 65%, #92400e 100%)',
            boxShadow: scale > 1.2 ? '0 0 25px rgba(245, 158, 11, 0.6)' : '0 4px 10px rgba(180, 83, 9, 0.3)'
          }}
        >
          {/* Top golden hoop ring */}
          <div
            className="w-full bg-amber-200 border-b border-amber-600 rounded-t-full transition-all"
            style={{ height: `${Math.max(2, scale * 14)}px` }}
          />

          {/* Center runes */}
          {scale >= 0.7 && (
            <div className="text-[9px] font-bold text-amber-950 font-chinese tracking-widest writing-vertical rotate-180 opacity-80 select-none">
              如意金箍棒
            </div>
          )}

          {/* Bottom golden hoop ring */}
          <div
            className="w-full bg-amber-200 border-t border-amber-600 rounded-b-full transition-all"
            style={{ height: `${Math.max(2, scale * 14)}px` }}
          />
        </div>

        {/* Particle sparkle effects */}
        {scale <= 0.25 && (
          <div className="absolute right-6 top-6 bg-amber-100/90 text-amber-900 text-xs px-2.5 py-1 rounded-md border border-amber-300">
            👂 Fits inside Wukong's ear!
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleResize(scale - 0.25, false, 'Smaller!')}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-amber-200 text-slate-700 hover:bg-amber-100 hover:text-amber-900 shadow-sm active:scale-95 transition-all"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>"Smaller!" (縮小)</span>
          </button>
          <button
            onClick={() => handleResize(scale + 0.25, true, 'Grow!')}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>"Grow!" (變大)</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => handleResize(0.12, false, 'No bigger than a pin!')}
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-800 transition-colors"
          >
            Pin Size (繡花針)
          </button>
          <button
            onClick={() => handleResize(0.85, true, 'This is a perfect weapon for me!')}
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-800 transition-colors"
          >
            Hand Staff (恰稱神鐵)
          </button>
          <button
            onClick={() => handleResize(2.0, true, 'Giant Pillar!')}
            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-800 transition-colors"
          >
            Pillar (鎮海巨柱)
          </button>
        </div>
      </div>
    </div>
  );
};
