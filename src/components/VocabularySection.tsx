import React, { useState } from 'react';
import { Volume2, Check, Brain, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/storyData';
import { VocabWord } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';
import { PictureWordMatchGame } from './PictureWordMatchGame';

interface VocabularySectionProps {
  onNextPart?: () => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({ onNextPart }) => {
  const [selectedWordId, setSelectedWordId] = useState<string>(VOCABULARY_LIST[0].id);
  const [masteredWords, setMasteredWords] = useState<Set<string>>(new Set());
  const [isTestMode, setIsTestMode] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const activeWord = VOCABULARY_LIST.find((w) => w.id === selectedWordId) || VOCABULARY_LIST[0];

  const handleSpeak = (text: string, rate: number = 0.9) => {
    sfx.playClick();
    speech.speak(text, { rate });
  };

  const toggleMastery = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playClick();
    setMasteredWords((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        sfx.playCorrect();
      }
      return next;
    });
  };

  const toggleFlip = (id: string) => {
    sfx.playClick();
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 rounded-2xl p-5 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 tracking-wider">
            <span>PART A: CORE VOCABULARY</span>
            <span aria-hidden="true">·</span>
            <span>重點單字與插圖</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Journey to the West Vocabulary (西遊記必備詞彙)
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Explore all 8 story words with custom scene illustrations, authentic pronunciation, and story quotes.
          </p>
        </div>

        {/* Progress & Flashcard Mode Switch */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-stone-500 block">Mastery Progress</span>
            <span className="text-sm font-bold text-amber-700">
              {masteredWords.size} / {VOCABULARY_LIST.length} Mastered
            </span>
          </div>
          <button
            onClick={() => {
              setIsTestMode(!isTestMode);
              sfx.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              isTestMode
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>{isTestMode ? 'Exit Test Mode' : 'Flashcard Test Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Vocabulary Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 8 Word Cards Grid with Illustrations (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VOCABULARY_LIST.map((vocab) => {
            const isSelected = selectedWordId === vocab.id;
            const isMastered = masteredWords.has(vocab.id);
            const isFlipped = flippedCards.has(vocab.id);

            return (
              <div
                key={vocab.id}
                onClick={() => {
                  if (isTestMode) {
                    toggleFlip(vocab.id);
                  } else {
                    setSelectedWordId(vocab.id);
                    handleSpeak(vocab.word);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative select-none flex gap-3 ${
                  isSelected && !isTestMode
                    ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                    : 'bg-white border-stone-200/80 hover:border-amber-300 hover:bg-stone-50/60'
                }`}
              >
                {/* Word Illustration Thumbnail */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200 shadow-2xs relative group">
                  <img
                    src={vocab.image}
                    alt={vocab.imageAlt || vocab.word}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>

                {/* Word Info & Definition */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    {/* Top line: part of speech, phonetic, buttons */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
                          {vocab.partOfSpeech.split(' ')[0]}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono truncate">
                          {vocab.phonetic}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(vocab.word);
                          }}
                          className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
                          title="Pronounce word"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => toggleMastery(vocab.id, e)}
                          className={`p-1 rounded-full transition-colors ${
                            isMastered
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-stone-300 hover:text-stone-400'
                          }`}
                          title={isMastered ? 'Mastered' : 'Mark as mastered'}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {isTestMode && !isFlipped ? (
                      <div className="py-2 text-center">
                        <span className="text-base font-bold text-slate-800 font-display">
                          {vocab.word}
                        </span>
                        <p className="text-[11px] text-amber-600 mt-1">點擊翻牌 🔄</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-extrabold text-slate-900 font-display">
                            {vocab.word}
                          </span>
                          <span className="text-xs font-bold text-amber-800 font-chinese">
                            {vocab.zh}
                          </span>
                        </div>

                        {vocab.pastForm && (
                          <span className="text-[10px] text-stone-500 block">
                            Past: <strong className="text-stone-700">{vocab.pastForm}</strong>
                          </span>
                        )}

                        <p className="text-[11px] text-stone-500 line-clamp-1 italic mt-1">
                          "{vocab.storyQuote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Word Spotlight Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Word Spotlight · 單詞圖解
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span>{activeWord.word}</span>
                <span className="text-lg font-normal text-stone-400 font-mono">
                  {activeWord.phonetic}
                </span>
              </h3>
            </div>
            <button
              onClick={() => handleSpeak(activeWord.word)}
              className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm hover:bg-amber-600 active:scale-95 transition-all"
              title="Pronounce word"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Featured Large Illustration */}
          <div className="rounded-2xl overflow-hidden aspect-square max-h-72 w-full bg-stone-100 border border-stone-200 shadow-sm relative group mx-auto">
            <img
              src={activeWord.image}
              alt={activeWord.imageAlt || activeWord.word}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="text-xs font-bold bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                {activeWord.word} · {activeWord.zh}
              </span>
              {activeWord.pastForm && (
                <span className="text-[11px] bg-amber-600/90 px-2 py-0.5 rounded text-white font-medium">
                  Past: {activeWord.pastForm}
                </span>
              )}
            </div>
          </div>

          {/* Meaning & Grammar */}
          <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200/70">
            <span className="text-xs text-amber-800 font-medium block">
              {activeWord.partOfSpeech}
            </span>
            <div className="text-xl font-bold text-amber-950 font-chinese mt-0.5">
              {activeWord.zh}
            </div>
          </div>

          {/* Story Quote Context */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>In the Story (原著情境)</span>
            </span>
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/60">
              <p className="text-sm text-stone-800 italic leading-relaxed font-serif">
                "{activeWord.storyQuote}"
              </p>
              <button
                onClick={() => handleSpeak(activeWord.storyQuote)}
                className="mt-2 text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1 font-medium"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Story Quote</span>
              </button>
            </div>
          </div>

          {/* Next Section CTA */}
          <div className="pt-2">
            <button
              onClick={onNextPart}
              className="w-full py-2.5 px-4 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>Continue to Part B: Multiple Choice</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Picture-Word Matching Mini Game */}
      <PictureWordMatchGame />
    </div>
  );
};
