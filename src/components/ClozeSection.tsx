import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, HelpCircle, Sparkles, Mic, ChevronRight } from 'lucide-react';
import { CLOZE_ITEMS, VOCABULARY_LIST } from '../data/storyData';
import { ClozeItem } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';

interface ClozeSectionProps {
  onNextPart?: () => void;
}

export const ClozeSection: React.FC<ClozeSectionProps> = ({ onNextPart }) => {
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [activeBlankId, setActiveBlankId] = useState<number | null>(1);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  // Available Word Bank
  const wordBank = ['shrink', 'weapon', 'spirits', 'drag', 'creepy', 'command', 'flee', 'judge'];

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({
      ...prev,
      [id]: val
    }));
  };

  const handleSelectWordFromBank = (word: string) => {
    if (!activeBlankId) return;
    sfx.playClick();
    setUserInputs((prev) => ({
      ...prev,
      [activeBlankId]: word
    }));

    // Auto advance to next blank if correct
    const targetItem = CLOZE_ITEMS.find((c) => c.id === activeBlankId);
    if (targetItem && targetItem.targetWord.toLowerCase() === word.toLowerCase()) {
      sfx.playCorrect();
      const nextId = activeBlankId < CLOZE_ITEMS.length ? activeBlankId + 1 : null;
      setActiveBlankId(nextId);
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

  const handleToggleHint = (id: number) => {
    sfx.playClick();
    setShowHints((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    sfx.playClick();
    setUserInputs({});
    setShowHints({});
    setActiveBlankId(1);
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
            Listen to the characters speak, fill in the missing words from the word bank, and practice shadowing aloud!
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

      {/* Word Bank Bar */}
      <div className="bg-stone-100/90 border border-stone-200 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Word Bank:</span>
          </span>
          <span className="text-[11px] text-stone-500">
            Current Blank: #{activeBlankId || 'None'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {wordBank.map((word) => {
            const isUsed = Object.values(userInputs).some(
              (v) => (v || '').toLowerCase() === word.toLowerCase()
            );

            return (
              <button
                key={word}
                onClick={() => handleSelectWordFromBank(word)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                  isUsed
                    ? 'bg-white/60 text-stone-400 border border-stone-200 line-through'
                    : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 active:scale-95'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cloze Sentences List */}
      <div className="space-y-3">
        {CLOZE_ITEMS.map((item) => {
          const correct = isItemCorrect(item);
          const currentVal = userInputs[item.id] || '';
          const isCurrentActive = activeBlankId === item.id;
          const isSpeaking = speakingId === item.id;

          const parts = item.template.split('{blank}');

          return (
            <div
              key={item.id}
              onClick={() => setActiveBlankId(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isCurrentActive
                  ? 'ring-2 ring-emerald-500/30 border-emerald-400 bg-emerald-50/20'
                  : correct
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-white border-stone-200/80 hover:border-stone-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center">
                    {item.id}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                    {item.speaker}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySentence(item);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      isSpeaking
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                    title="Listen to this line"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen 🔊</span>
                  </button>
                </div>
              </div>

              {/* Cloze Text with interactive blank */}
              <div className="text-sm text-slate-900 leading-loose">
                <span>{parts[0]}</span>
                <span className="inline-block mx-1.5 align-middle">
                  <input
                    type="text"
                    value={currentVal}
                    onFocus={() => setActiveBlankId(item.id)}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder={`[ ${item.id} ]`}
                    className={`w-28 px-2 py-1 text-xs text-center font-bold rounded-md border transition-all outline-none ${
                      correct
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900 shadow-xs'
                        : currentVal.length > 0
                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                        : 'bg-stone-50 border-stone-300 focus:bg-white focus:border-emerald-500'
                    }`}
                  />
                </span>
                <span>{parts[1]}</span>
                {correct && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 inline ml-2 align-middle" />
                )}
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
            Great ear! You have mastered the listening vocabulary in full context.
          </p>
          <div className="pt-2">
            <button
              onClick={onNextPart}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition-all"
            >
              <span>Continue to Part D: Sentence Practice (句型翻譯造句)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
