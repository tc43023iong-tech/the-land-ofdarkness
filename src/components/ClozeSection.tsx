import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, ChevronRight, Check } from 'lucide-react';
import { CLOZE_ITEMS } from '../data/storyData';
import { ClozeItem } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';

interface ClozeSectionProps {
  onNextPart?: () => void;
}

// Scrambled / shuffled word options per question (no fixed predictable order)
const SCRAMBLED_OPTIONS_MAP: Record<number, string[]> = {
  1: ['commanded', 'creepy', 'shrank', 'fled', 'weapon', 'dragged', 'Judge', 'spirits'],
  2: ['spirits', 'weapon', 'dragged', 'shrank', 'Judge', 'commanded', 'fled', 'creepy'],
  3: ['creepy', 'fled', 'spirits', 'dragged', 'Judge', 'weapon', 'shrank', 'commanded'],
  4: ['dragged', 'shrank', 'Judge', 'commanded', 'weapon', 'spirits', 'creepy', 'fled'],
  5: ['Judge', 'creepy', 'fled', 'spirits', 'shrank', 'dragged', 'commanded', 'weapon'],
  6: ['fled', 'commanded', 'weapon', 'shrank', 'creepy', 'dragged', 'Judge', 'spirits'],
  7: ['weapon', 'spirits', 'fled', 'dragged', 'commanded', 'shrank', 'Judge', 'creepy'],
  8: ['shrank', 'Judge', 'creepy', 'commanded', 'spirits', 'fled', 'weapon', 'dragged']
};

export const ClozeSection: React.FC<ClozeSectionProps> = ({ onNextPart }) => {
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const handleSelectWordForItem = (itemId: number, word: string) => {
    const isCurrentlySelected = (userInputs[itemId] || '').toLowerCase() === word.toLowerCase();
    
    // Toggle off if already selected
    if (isCurrentlySelected) {
      sfx.playClick();
      setUserInputs((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
      return;
    }

    const targetItem = CLOZE_ITEMS.find((c) => c.id === itemId);
    const isCorrect = targetItem && targetItem.targetWord.toLowerCase() === word.toLowerCase();

    setUserInputs((prev) => ({
      ...prev,
      [itemId]: word
    }));

    if (isCorrect) {
      sfx.playCorrect();
    } else {
      sfx.playClick();
    }
  };

  const handlePlaySentence = (item: ClozeItem) => {
    sfx.playClick();
    setSpeakingId(item.id);
    speech.speak(item.fullEn, {
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null)
    });
  };

  const handleReset = () => {
    sfx.playClick();
    setUserInputs({});
  };

  const isItemCorrect = (item: ClozeItem) => {
    const input = (userInputs[item.id] || '').trim().toLowerCase();
    return input === item.targetWord.toLowerCase();
  };

  const correctCount = CLOZE_ITEMS.filter(isItemCorrect).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 rounded-2xl p-5 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider">
            <span>PART C: LISTENING & SHADOWING</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Fill in the Blanks with Part A Vocabulary
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Listen to the characters speak, choose the missing words directly under each question, and practice shadowing aloud!
          </p>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-stone-500 block">Progress</span>
            <span className="text-sm font-bold text-emerald-700">
              {correctCount} / {CLOZE_ITEMS.length} Completed
            </span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            title="Reset All Blanks"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cloze Sentences List */}
      <div className="space-y-4">
        {CLOZE_ITEMS.map((item) => {
          const correct = isItemCorrect(item);
          const currentVal = (userInputs[item.id] || '').trim();
          const hasInput = currentVal.length > 0;
          const isSpeaking = speakingId === item.id;
          const options = SCRAMBLED_OPTIONS_MAP[item.id] || SCRAMBLED_OPTIONS_MAP[1];

          const parts = item.template.split('{blank}');

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                correct
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  : hasInput
                  ? 'bg-amber-50/30 border-amber-200'
                  : 'bg-white border-stone-200/90 shadow-2xs'
              }`}
            >
              {/* Top Row: Speaker, Audio and Thumbnail */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Illustration Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 shadow-2xs relative group self-start">
                  <img
                    src={item.image}
                    alt={item.speaker}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-1 left-1 w-5 h-5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center justify-center">
                    {item.id}
                  </div>
                </div>

                {/* Main Question & Sentence Area */}
                <div className="flex-1 w-full min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-200/60">
                      {item.speaker}
                    </span>

                    <button
                      onClick={() => handlePlaySentence(item)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                        isSpeaking
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-stone-100 text-stone-700 hover:bg-emerald-100 hover:text-emerald-900'
                      }`}
                      title="Listen to this line"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen 🔊</span>
                    </button>
                  </div>

                  {/* Cloze Sentence with inline blank (Clean slot without 'blank' text) */}
                  <div className="text-sm sm:text-base text-slate-900 leading-relaxed pt-1">
                    <span className="font-medium">{parts[0]}</span>
                    <span className="inline-block mx-2 align-middle">
                      <span
                        className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 text-xs sm:text-sm font-bold rounded-lg border transition-all ${
                          correct
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900 shadow-xs'
                            : hasInput
                            ? 'bg-rose-50 border-rose-300 text-rose-900'
                            : 'bg-stone-50 border-stone-300 text-stone-400'
                        }`}
                      >
                        {hasInput ? currentVal : `[ ${item.id} ]`}
                        {correct && <Check className="w-3.5 h-3.5 text-emerald-700 ml-1.5 inline" />}
                      </span>
                    </span>
                    <span className="font-medium">{parts[1]}</span>
                  </div>

                  {/* Expanded Scrambled Word Options Directly Under Each Question */}
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    {correct && (
                      <div className="flex items-center justify-end mb-1.5">
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct!</span>
                        </span>
                      </div>
                    )}

                    {/* Word buttons laid out cleanly in scrambled order */}
                    <div className="flex flex-wrap gap-2">
                      {options.map((word) => {
                        const isSelected = currentVal.toLowerCase() === word.toLowerCase();
                        const isWordCorrectChoice = isSelected && correct;
                        const isWordWrongChoice = isSelected && !correct;

                        return (
                          <button
                            key={word}
                            type="button"
                            onClick={() => handleSelectWordForItem(item.id, word)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs active:scale-95 ${
                              isWordCorrectChoice
                                ? 'bg-emerald-600 text-white font-bold border-2 border-emerald-500 shadow-sm ring-2 ring-emerald-300'
                                : isWordWrongChoice
                                ? 'bg-rose-100 text-rose-900 border-2 border-rose-400 font-bold'
                                : 'bg-white hover:bg-emerald-50 text-stone-700 border border-stone-200 hover:border-emerald-400 hover:text-emerald-900'
                            }`}
                          >
                            <span>{word}</span>
                            {isWordCorrectChoice && <span className="ml-1">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {correctCount === CLOZE_ITEMS.length && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            All 8 Listening & Shadowing Blanks Completed!
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Great ear! You have mastered the listening vocabulary in full context without scrolling.
          </p>
          <div className="pt-2">
            <button
              onClick={onNextPart}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition-all"
            >
              <span>Continue to Part D: Sentence Practice</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
