import React, { useState, useEffect } from 'react';
import { CheckCircle2, Volume2, RotateCcw, ChevronRight, Film, Headphones, Check } from 'lucide-react';
import { CLOZE_ITEMS } from '../data/storyData';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';
import { PixelNarrator, PixelWukong, PixelJudge } from './StoryReader';

interface HomeworkSectionProps {
  onGoToPartC: () => void;
}

const renderSpeakerAvatar = (speaker?: string, className = 'w-4 h-4') => {
  switch (speaker) {
    case 'Sun Wukong':
    case 'Wukong':
      return <PixelWukong className={className} />;
    case 'Judge of the Dead':
    case 'Judge':
      return <PixelJudge className={className} />;
    case 'Narrator':
    default:
      return <PixelNarrator className={className} />;
  }
};

const getSpeakerBadgeClass = (speaker?: string) => {
  switch (speaker) {
    case 'Sun Wukong':
    case 'Wukong':
      return 'bg-amber-100 text-amber-950 border-amber-300';
    case 'Judge of the Dead':
    case 'Judge':
      return 'bg-purple-100 text-purple-950 border-purple-300';
    case 'Narrator':
    default:
      return 'bg-stone-100 text-stone-800 border-stone-300';
  }
};

export const HomeworkSection: React.FC<HomeworkSectionProps> = ({ onGoToPartC }) => {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('wukong_hw_shadowing');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [speakingId, setSpeakingId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wukong_hw_shadowing', JSON.stringify(completedItems));
    } catch {
      // ignore
    }
  }, [completedItems]);

  const handleToggleCompleted = (id: number) => {
    const nextState = !completedItems[id];
    setCompletedItems((prev) => ({
      ...prev,
      [id]: nextState
    }));
    if (nextState) {
      sfx.playCorrect();
    } else {
      sfx.playClick();
    }
  };

  const handleSpeak = (id: number, text: string) => {
    sfx.playClick();
    setSpeakingId(id);
    speech.speak(text, {
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null)
    });
  };

  const handleReset = () => {
    sfx.playClick();
    setCompletedItems({});
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const isAllDone = completedCount === CLOZE_ITEMS.length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Homework Primary Hero Card */}
      <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/15 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs sm:text-sm font-black tracking-wider uppercase shadow-xs">
              <span>HW · HOMEWORK ASSIGNMENT</span>
            </div>
            
            {/* Main Explicit Assignment Directive */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Practice shadowing Part C aloud.
            </h2>
            
            <p className="text-sm sm:text-base text-stone-700 font-medium">
              大聲跟讀 Part C 的 8 句原版動畫對白，模仿角色的發音、抑揚頓挫與語調節奏！
            </p>
          </div>

          {/* Quick Progress Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 bg-white/80 p-4 rounded-2xl border border-amber-200 shrink-0 shadow-2xs">
            <span className="text-sm text-stone-600 font-medium">Completed</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 font-display">
              {completedCount} / {CLOZE_ITEMS.length}
            </span>
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer text-sm flex items-center gap-1.5"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Action Button to Open Part C directly */}
        <div className="mt-5 pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-amber-900">
            <Headphones className="w-5 h-5 text-amber-600 shrink-0" />
            <span>跟讀口訣：聽一遍 ➔ 輕聲跟 ➔ 大聲讀出聲！</span>
          </div>

          <button
            onClick={onGoToPartC}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Film className="w-4 h-4 text-stone-950" />
            <span>Go to Part C: Listening & Shadowing</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Shadowing Practice Checklist (All 8 Sentences from Part C) */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>📋 Part C Shadowing Checklist (跟讀自我檢查清單)</span>
          </h3>
          <span className="text-sm text-stone-600">
            點擊勾選標記為已大聲朗讀完成
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CLOZE_ITEMS.map((item) => {
            const isDone = Boolean(completedItems[item.id]);
            const isSpeaking = speakingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleToggleCompleted(item.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200/90 shadow-2xs'
                }`}
              >
                {/* Interactive Checkbox */}
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                      : 'border-stone-300 bg-stone-50 group-hover:border-amber-400'
                  }`}
                >
                  {isDone && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </div>

                {/* Sentence Information */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-500">
                        #{item.id}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-lg border ${getSpeakerBadgeClass(
                          item.speaker
                        )}`}
                      >
                        <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                          {renderSpeakerAvatar(item.speaker, 'w-4 h-4')}
                        </span>
                        <span>{item.speaker}</span>
                      </span>

                      <span className="text-xs sm:text-sm font-mono font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                        ⏱ {item.videoTimeLabel}
                      </span>
                    </div>

                    {/* Audio Listen Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(item.id, item.fullEn);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                        isSpeaking
                          ? 'bg-amber-600 text-white animate-pulse'
                          : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900 border border-stone-200'
                      }`}
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Listen 🔊</span>
                    </button>
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                    {item.fullEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Celebration Card When Finished */}
      {isAllDone && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-2 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            Awesome Job! Homework Completed! 🎉
          </h3>
          <p className="text-sm sm:text-base text-stone-700 max-w-md mx-auto">
            You practiced shadowing all 8 sentences from Part C aloud with confidence and clear pronunciation!
          </p>
        </div>
      )}
    </div>
  );
};
