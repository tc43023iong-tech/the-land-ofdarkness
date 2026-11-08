import React, { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw, CheckCircle2, Sparkles, Volume2, Trophy, ArrowRight, Check } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/storyData';
import { VocabWord } from '../types/story';
import { sfx } from '../utils/soundEffects';

interface MatchItem {
  id: string;
  word: string;
  zh: string;
  image: string;
  imageAlt?: string;
}

export const PictureWordMatchGame: React.FC = () => {
  // Shuffled items for images and words
  const [imageCards, setImageCards] = useState<MatchItem[]>([]);
  const [wordCards, setWordCards] = useState<MatchItem[]>([]);

  // Selection states
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<{ imageId: string; wordId: string } | null>(null);

  // Game stats
  const [moves, setMoves] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Initialize and shuffle
  const startNewGame = () => {
    sfx.playClick();
    const items: MatchItem[] = VOCABULARY_LIST.map((v) => ({
      id: v.id,
      word: v.word,
      zh: v.zh,
      image: v.image,
      imageAlt: v.imageAlt
    }));

    // Randomize images order
    const shuffledImages = [...items].sort(() => Math.random() - 0.5);
    // Randomize words order
    const shuffledWords = [...items].sort(() => Math.random() - 0.5);

    setImageCards(shuffledImages);
    setWordCards(shuffledWords);
    setSelectedImageId(null);
    setSelectedWordId(null);
    setMatchedIds(new Set());
    setWrongMatch(null);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Handle clicking an image card
  const handleSelectImage = (id: string) => {
    if (matchedIds.has(id)) return;
    sfx.playClick();

    // If a word was already selected, check match
    if (selectedWordId) {
      checkMatch(id, selectedWordId);
    } else {
      setSelectedImageId(id === selectedImageId ? null : id);
    }
  };

  // Handle clicking a word card
  const handleSelectWord = (id: string, word: string) => {
    if (matchedIds.has(id)) {
      return;
    }
    sfx.playClick();

    // If an image was already selected, check match
    if (selectedImageId) {
      checkMatch(selectedImageId, id);
    } else {
      setSelectedWordId(id === selectedWordId ? null : id);
    }
  };

  // Check matching logic
  const checkMatch = (imgId: string, wrdId: string) => {
    setMoves((prev) => prev + 1);

    if (imgId === wrdId) {
      // Correct match!
      sfx.playCorrect();

      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.add(imgId);
        if (next.size === VOCABULARY_LIST.length) {
          setGameWon(true);
        }
        return next;
      });

      setSelectedImageId(null);
      setSelectedWordId(null);
      setWrongMatch(null);
    } else {
      // Wrong match
      sfx.playWrong();
      setWrongMatch({ imageId: imgId, wordId: wrdId });
      setTimeout(() => {
        setWrongMatch(null);
        setSelectedImageId(null);
        setSelectedWordId(null);
      }, 700);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/15 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                Mini Game · 看圖配對遊戲
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
              Picture & Word Match Challenge (看圖配對單詞)
            </h3>
            <p className="text-xs text-stone-600">
              Click a picture, then click its matching English word! (點選圖片後，點選對應的英文單詞)
            </p>
          </div>
        </div>

        {/* Game Stats & Reset */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-[11px] text-stone-500 block">Matched</span>
            <span className="text-sm font-bold text-amber-800">
              {matchedIds.size} / {VOCABULARY_LIST.length} Pairs
            </span>
          </div>

          <div className="text-right border-l border-amber-200 pl-3">
            <span className="text-[11px] text-stone-500 block">Moves</span>
            <span className="text-sm font-bold text-stone-700">
              {moves}
            </span>
          </div>

          <button
            onClick={startNewGame}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 shadow-2xs transition-colors"
            title="Shuffle and play again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle (重新洗牌)</span>
          </button>
        </div>
      </div>

      {/* Main Matching Playfield */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Side: 8 Picture Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span>🖼️ Step 1: Select a Picture</span>
            </span>
            <span className="text-[11px] text-stone-400">
              {matchedIds.size} matched
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {imageCards.map((item) => {
              const isMatched = matchedIds.has(item.id);
              const isSelected = selectedImageId === item.id;
              const isWrong = wrongMatch?.imageId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectImage(item.id)}
                  disabled={isMatched}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative block group cursor-pointer ${
                    isMatched
                      ? 'border-emerald-500 opacity-90 shadow-2xs'
                      : isWrong
                      ? 'border-rose-400 ring-2 ring-rose-300 animate-shake'
                      : isSelected
                      ? 'border-amber-500 ring-3 ring-amber-400 shadow-sm scale-105'
                      : 'border-stone-200 hover:border-amber-400 hover:shadow-2xs active:scale-95'
                  }`}
                  title="Click to select picture"
                >
                  <img
                    src={item.image}
                    alt={item.word}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isMatched && (
                    <div className="absolute inset-0 bg-emerald-600/60 backdrop-blur-2xs flex items-center justify-center text-white">
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  )}
                  {isSelected && !isMatched && (
                    <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white animate-pulse absolute top-2 right-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: 8 Word Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span>🔤 Step 2: Match with Word</span>
            </span>
            <span className="text-[11px] text-stone-400">
              Click to hear audio
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2.5">
            {wordCards.map((item) => {
              const isMatched = matchedIds.has(item.id);
              const isSelected = selectedWordId === item.id;
              const isWrong = wrongMatch?.wordId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectWord(item.id, item.word)}
                  disabled={isMatched}
                  className={`p-3 rounded-xl border text-left transition-all relative flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50/90 border-emerald-400 text-emerald-900 opacity-90 shadow-2xs'
                      : isWrong
                      ? 'bg-rose-100 border-rose-400 text-rose-900 animate-shake'
                      : isSelected
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400/80 shadow-sm scale-[1.02]'
                      : 'bg-white border-stone-200/90 text-slate-800 hover:border-amber-400 hover:bg-amber-50/40 shadow-2xs active:scale-98'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold block truncate">
                        {item.word}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-chinese block truncate">
                      {item.zh}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    {isMatched ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <Volume2 className="w-4 h-4 text-stone-400 hover:text-amber-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Victory Celebration Card */}
      {gameWon && (
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border-2 border-amber-400 rounded-2xl p-6 text-center space-y-3 shadow-md animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 font-display">
              🎉 Fantastic Job! All 8 Words Matched!
            </h4>
            <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
              You matched all 8 custom story illustrations in <span className="font-bold text-amber-900">{moves} moves</span>. You have mastered the core Part A vocabulary!
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={startNewGame}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 shadow-sm active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again with Shuffled Cards (再玩一次)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
