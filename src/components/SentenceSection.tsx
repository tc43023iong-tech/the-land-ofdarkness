import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';
import { SENTENCE_PRACTICE_ITEMS } from '../data/storyData';
import { SentencePracticeItem } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';

interface SentenceSectionProps {
  onNextPart?: () => void;
}

export const SentenceSection: React.FC<SentenceSectionProps> = ({ onNextPart }) => {
  const [selectedPatternFilter, setSelectedPatternFilter] = useState<number | 'all'>('all');
  const [builtSentences, setBuiltSentences] = useState<Record<number, string[]>>({});
  const [typedInputs, setTypedInputs] = useState<Record<number, string>>({});
  const [inputMode, setInputMode] = useState<'tiles' | 'typing'>('tiles');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const filteredItems = selectedPatternFilter === 'all'
    ? SENTENCE_PRACTICE_ITEMS
    : SENTENCE_PRACTICE_ITEMS.filter((item) => item.patternNumber === selectedPatternFilter);

  const handleTileClick = (itemId: number, word: string) => {
    sfx.playClick();
    setBuiltSentences((prev) => {
      const current = prev[itemId] || [];
      const updated = [...current, word];

      // Auto-check if matches target sentence
      const target = SENTENCE_PRACTICE_ITEMS.find((s) => s.id === itemId);
      if (target && updated.join(' ') === target.scrambledWords.join(' ')) {
        sfx.playCorrect();
      }

      return { ...prev, [itemId]: updated };
    });
  };

  const handleRemoveTile = (itemId: number, index: number) => {
    sfx.playClick();
    setBuiltSentences((prev) => {
      const current = prev[itemId] || [];
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, [itemId]: updated };
    });
  };

  const handleClearSentence = (itemId: number) => {
    sfx.playClick();
    setBuiltSentences((prev) => ({ ...prev, [itemId]: [] }));
    setTypedInputs((prev) => ({ ...prev, [itemId]: '' }));
  };

  const handleSpeakSentence = (text: string) => {
    sfx.playClick();
    speech.speak(text);
  };

  const isSentenceCorrect = (item: SentencePracticeItem) => {
    if (inputMode === 'tiles') {
      const current = builtSentences[item.id] || [];
      const built = current.join(' ').trim().toLowerCase().replace(/[.,?!]/g, '');
      const expected = item.en.trim().toLowerCase().replace(/[.,?!]/g, '');
      return built === expected;
    } else {
      const typed = (typedInputs[item.id] || '').trim().toLowerCase().replace(/[.,?!]/g, '');
      const expected = item.en.trim().toLowerCase().replace(/[.,?!]/g, '');
      return typed === expected;
    }
  };

  const completedCount = SENTENCE_PRACTICE_ITEMS.filter(isSentenceCorrect).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 rounded-2xl p-5 border border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-orange-800 tracking-wider">
            <span>PART D: SENTENCE TRANSLATION PRACTICE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-0.5">
            Translate into English Using Part A Vocabulary
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1">
            Build each sentence using word tiles or type directly. Master 5 essential sentence patterns!
          </p>
        </div>

        {/* Mode Toggle & Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs sm:text-sm text-stone-500 block">Progress</span>
            <span className="text-base font-bold text-orange-700">
              {completedCount} / {SENTENCE_PRACTICE_ITEMS.length} Solved
            </span>
          </div>
          <div className="flex items-center bg-white border border-stone-200 p-1 rounded-xl text-sm font-semibold">
            <button
              onClick={() => {
                setInputMode('tiles');
                sfx.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                inputMode === 'tiles' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              Word Tiles
            </button>
            <button
              onClick={() => {
                setInputMode('typing');
                sfx.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                inputMode === 'typing' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              Typing
            </button>
          </div>
        </div>
      </div>

      {/* Sentence Pattern Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            setSelectedPatternFilter('all');
            sfx.playClick();
          }}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            selectedPatternFilter === 'all'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          All 10 Sentences
        </button>
        {[1, 2, 3, 4, 5].map((num) => {
          const sample = SENTENCE_PRACTICE_ITEMS.find((s) => s.patternNumber === num);
          return (
            <button
              key={num}
              onClick={() => {
                setSelectedPatternFilter(num);
                sfx.playClick();
              }}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedPatternFilter === num
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              Pattern {num}: {sample?.pattern.split(' ')[0]}...
            </button>
          );
        })}
      </div>

      {/* Sentences List */}
      <div className="space-y-6">
        {filteredItems.map((item) => {
          const isCorrect = isSentenceCorrect(item);
          const currentTiles = builtSentences[item.id] || [];
          const isRevealed = revealedAnswers[item.id];
          const patternParts = item.pattern.split(/(\[[^\]]+\])/g);

          return (
            <div
              key={item.id}
              className={`p-5 sm:p-7 rounded-3xl border-2 transition-all shadow-xs ${
                isCorrect
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-white border-stone-200/90'
              }`}
            >
              {/* Header with Eye-catching Dashed Pattern Banner (matching reference style) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="inline-flex flex-wrap items-center bg-[#FFF4D6] border-[3px] border-dashed border-[#F59E0B] rounded-2xl px-5 py-2.5 font-pattern text-xl sm:text-2xl font-bold tracking-wide leading-snug shadow-2xs">
                  <span className="text-[#D2520B] mr-1.5">{item.patternNumber}.</span>
                  <span>
                    {patternParts.map((part, idx) =>
                      part.startsWith('[') && part.endsWith(']') ? (
                        <span key={idx} className="text-[#0C7A5E]">
                          {part}
                        </span>
                      ) : (
                        <span key={idx} className="text-[#D2520B]">
                          {part}
                        </span>
                      )
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      setRevealedAnswers((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                      sfx.playClick();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-orange-100 text-sm text-stone-700 hover:text-orange-900 font-semibold transition-colors cursor-pointer"
                  >
                    {isRevealed ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <button
                    onClick={() => handleSpeakSentence(item.en)}
                    className="p-2.5 rounded-xl bg-stone-100 text-stone-600 hover:text-orange-700 hover:bg-orange-100 transition-colors cursor-pointer"
                    title="Pronounce Answer"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Target Prompt & Interactive Sentence Area inside clean light-sky container */}
              <div className="rounded-2xl bg-sky-50/40 border-2 border-sky-200/80 p-4 sm:p-5 space-y-4">
                {/* Crystal-clear Chinese Question Prompt */}
                <div className="flex items-start gap-3">
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-chinese leading-snug tracking-normal">
                    {item.zh}
                  </p>
                </div>

                {/* Interactive Sentence Construction Area */}
                {inputMode === 'tiles' ? (
                <div className="space-y-3">
                  {/* Built sentence slot */}
                  <div className="min-h-[56px] p-3 bg-white rounded-xl border-2 border-dashed border-sky-200 flex flex-wrap items-center gap-2">
                    {currentTiles.length === 0 ? (
                      <span className="text-sm sm:text-base text-stone-400 italic pl-1">
                        Click word tiles below to build the sentence...
                      </span>
                    ) : (
                      currentTiles.map((word, wIdx) => (
                        <button
                          key={`${word}-${wIdx}`}
                          onClick={() => handleRemoveTile(item.id, wIdx)}
                          className="px-3.5 py-1.5 bg-orange-600 text-white rounded-lg text-base font-semibold hover:bg-rose-600 active:scale-95 transition-all shadow-2xs"
                          title="點擊移除此單詞"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available scrambled word tiles */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {item.scrambledWords.map((word, wIdx) => {
                        const countInBuilt = currentTiles.filter((w) => w === word).length;
                        const totalInScrambled = item.scrambledWords.filter((w) => w === word).length;
                        const isAllUsed = countInBuilt >= totalInScrambled;

                        return (
                          <button
                            key={`${word}-${wIdx}`}
                            disabled={isAllUsed}
                            onClick={() => handleTileClick(item.id, word)}
                            className={`px-3.5 py-2 rounded-lg text-base font-semibold transition-all shadow-2xs ${
                              isAllUsed
                                ? 'bg-stone-100 text-stone-300 border border-stone-200 cursor-not-allowed'
                                : 'bg-white border border-stone-300 text-slate-800 hover:border-orange-400 hover:bg-orange-50 active:scale-95'
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>

                    {currentTiles.length > 0 && (
                      <button
                        onClick={() => handleClearSentence(item.id)}
                        className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Free Typing Mode */
                <div className="space-y-2">
                  <input
                    type="text"
                    value={typedInputs[item.id] || ''}
                    onChange={(e) =>
                      setTypedInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    placeholder="Type your English translation here..."
                    className="w-full px-4 py-2.5 text-base rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 bg-white"
                  />
                </div>
              )}

              {/* Status & Revealed Answer */}
              <div className="mt-3 flex items-center justify-between text-sm sm:text-base">
                <div>
                  {isCorrect ? (
                    <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Perfect! Correct</span>
                    </span>
                  ) : isRevealed ? (
                    <div className="bg-amber-50 text-amber-950 p-3 rounded-lg border border-amber-200">
                      <strong>Answer:</strong> {item.en}
                    </div>
                  ) : null}
                </div>
              </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {completedCount === SENTENCE_PRACTICE_ITEMS.length && (
        <div className="bg-orange-50 border border-orange-300 rounded-2xl p-6 text-center space-y-2.5">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            All 10 Sentence Patterns Mastered!
          </h3>
          <p className="text-sm sm:text-base text-stone-600 max-w-md mx-auto">
            You can now accurately use "shrink", "command", "weapon", "drag", "spirit", "creepy", "judge", and "flee" in full sentences!
          </p>
          <div className="pt-2">
            <button
              onClick={onNextPart}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm sm:text-base font-bold hover:bg-orange-700 shadow-sm transition-all"
            >
              <span>Continue to Part E: Moral Lessons</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
