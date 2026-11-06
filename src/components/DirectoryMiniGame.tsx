import React, { useState } from 'react';
import { PenTool, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import { speech } from '../utils/speech';

interface RegistryEntry {
  id: string;
  name: string;
  zhName: string;
  status: string;
  isCrossed: boolean;
  isTarget?: boolean;
}

const INITIAL_ENTRIES: RegistryEntry[] = [
  {
    id: 'wukong',
    name: 'Sun Wukong (Monkey King)',
    zhName: '孫悟空 (天生石猴)',
    status: 'Born from a stone 300 years ago. Died today.',
    isCrossed: false,
    isTarget: true
  },
  {
    id: 'gibbon',
    name: 'Elder Gibbon',
    zhName: '通臂猿猴 (長老)',
    status: 'Age 120. Destined to expire this autumn.',
    isCrossed: false
  },
  {
    id: 'baboon',
    name: 'Red-Bottomed Baboon',
    zhName: '赤尻馬猴 (左將軍)',
    status: 'Age 98. Time on Earth is over.',
    isCrossed: false
  },
  {
    id: 'macaque',
    name: 'Forest Macaque & Troop',
    zhName: '水簾洞大小群猴',
    status: 'All 840 monkeys and apes of Flower Fruit Mountain.',
    isCrossed: false
  }
];

export const DirectoryMiniGame: React.FC = () => {
  const [entries, setEntries] = useState<RegistryEntry[]>(INITIAL_ENTRIES);
  const [allCrossed, setAllCrossed] = useState<boolean>(false);

  const handleCrossOut = (id: string) => {
    sfx.playBrush();
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, isCrossed: !entry.isCrossed };
      }
      return entry;
    });

    setEntries(updated);

    const targetNowCrossed = updated.find((e) => e.id === id)?.isCrossed;
    if (targetNowCrossed) {
      if (id === 'wukong') {
        speech.speak('Yes, I can! I am going to live forever!', { rate: 1.05 });
      }
    }

    const completed = updated.every((e) => e.isCrossed);
    if (completed && !allCrossed) {
      setAllCrossed(true);
      sfx.playCorrect();
      setTimeout(() => {
        speech.speak('Now I really will live forever, and so will all of my subjects!', { rate: 1.0 });
      }, 500);
    }
  };

  const handleReset = () => {
    setEntries(INITIAL_ENTRIES);
    setAllCrossed(false);
    sfx.playClick();
  };

  const handleCrossAll = () => {
    sfx.playBrush();
    setEntries(entries.map((e) => ({ ...e, isCrossed: true })));
    setAllCrossed(true);
    sfx.playCorrect();
    speech.speak('Now I really will live forever, and so will all of my subjects!', { rate: 1.0 });
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 border border-stone-800 shadow-xl overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-300 font-display flex items-center gap-1.5">
              <span>The Directory of the Dead</span>
              <span className="text-xs text-amber-400/80 font-chinese">(地府生死簿)</span>
            </h4>
            <p className="text-xs text-stone-400">
              Click with Wukong's magic ink brush to cross out the names!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCrossAll}
            className="text-xs px-2.5 py-1 rounded bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 border border-amber-500/30 transition-all"
          >
            Cross Out All (一筆勾銷)
          </button>
          <button
            onClick={handleReset}
            title="Reset directory"
            className="p-1.5 rounded text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Parchment Book Layout */}
      <div className="bg-[#f7f2e4] text-stone-900 p-5 rounded-xl shadow-inner border-2 border-stone-700/40 relative font-serif">
        {/* Book Spine Center Divider */}
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-stone-300/60 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => handleCrossOut(entry.id)}
              className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all relative overflow-hidden group ${
                entry.isCrossed
                  ? 'bg-red-50/80 border-red-200'
                  : 'bg-white/70 border-stone-300 hover:bg-white hover:border-amber-400 hover:shadow-sm'
              }`}
            >
              {/* Crossed out ink line animation */}
              {entry.isCrossed && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-11/12 h-1.5 bg-red-800/85 -rotate-2 rounded-full shadow-sm" />
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${entry.isCrossed ? 'line-through text-red-900/60' : 'text-stone-900'}`}>
                      {entry.name}
                    </span>
                    <span className="text-xs text-stone-600 font-chinese">
                      {entry.zhName}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${entry.isCrossed ? 'line-through text-red-800/40' : 'text-stone-600'}`}>
                    {entry.status}
                  </p>
                </div>

                <div className="shrink-0 ml-2">
                  {entry.isCrossed ? (
                    <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Immortal!</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-stone-600 group-hover:text-amber-800 group-hover:underline">
                      Click to cross ✒️
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Banner */}
        {allCrossed && (
          <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-950 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong>All Names Crossed Out! (名冊皆除)</strong> — Sun Wukong and all his monkey subjects will live forever!
              </div>
            </div>
            <button
              onClick={() => speech.speak('"Now I really will live forever," said Wukong. "And so will all of my subjects!"')}
              className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-medium hover:bg-emerald-700 shrink-0 ml-2"
            >
              Play Quote 🔊
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
