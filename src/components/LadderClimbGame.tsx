import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Volume2, Sparkles, Check, X, Users, Award, Play } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/storyData';
import { sfx } from '../utils/soundEffects';

// --- Cute Retro Pixel / Mosaic Art SVG Avatars ---
export const PixelWukong: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Golden Hair */}
    <rect x="4" y="2" width="8" height="2" fill="#D97706" />
    <rect x="3" y="4" width="10" height="2" fill="#F59E0B" />
    {/* Red Circlet & Gold Jewel */}
    <rect x="3" y="5" width="10" height="1" fill="#DC2626" />
    <rect x="7" y="4" width="2" height="1" fill="#FDE047" />
    {/* Face */}
    <rect x="3" y="6" width="10" height="5" fill="#FDE68A" />
    {/* Eyes */}
    <rect x="5" y="7" width="2" height="2" fill="#1E293B" />
    <rect x="9" y="7" width="2" height="2" fill="#1E293B" />
    <rect x="5" y="7" width="1" height="1" fill="#FFFFFF" />
    <rect x="9" y="7" width="1" height="1" fill="#FFFFFF" />
    {/* Muzzle */}
    <rect x="6" y="9" width="4" height="2" fill="#FB923C" />
    <rect x="7" y="10" width="2" height="1" fill="#B91C1C" />
    {/* Ears */}
    <rect x="2" y="6" width="1" height="3" fill="#D97706" />
    <rect x="13" y="6" width="1" height="3" fill="#D97706" />
    {/* Armor & Cape */}
    <rect x="4" y="11" width="8" height="3" fill="#B45309" />
    <rect x="6" y="12" width="4" height="2" fill="#FBBF24" />
    <rect x="3" y="11" width="1" height="3" fill="#DC2626" />
    <rect x="12" y="11" width="1" height="3" fill="#DC2626" />
    {/* Boots */}
    <rect x="4" y="14" width="3" height="2" fill="#451A03" />
    <rect x="9" y="14" width="3" height="2" fill="#451A03" />
  </svg>
);

export const PixelDragon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Gold Antlers */}
    <rect x="3" y="1" width="2" height="2" fill="#F59E0B" />
    <rect x="4" y="2" width="2" height="2" fill="#FBBF24" />
    <rect x="11" y="1" width="2" height="2" fill="#F59E0B" />
    <rect x="10" y="2" width="2" height="2" fill="#FBBF24" />
    {/* Head */}
    <rect x="5" y="3" width="6" height="2" fill="#0284C7" />
    <rect x="7" y="2" width="2" height="1" fill="#38BDF8" />
    {/* Face */}
    <rect x="4" y="5" width="8" height="6" fill="#0EA5E9" />
    <rect x="3" y="6" width="1" height="4" fill="#0284C7" />
    <rect x="12" y="6" width="1" height="4" fill="#0284C7" />
    {/* Golden Eyes */}
    <rect x="5" y="6" width="2" height="2" fill="#FEF08A" />
    <rect x="9" y="6" width="2" height="2" fill="#FEF08A" />
    <rect x="6" y="6" width="1" height="2" fill="#0F172A" />
    <rect x="10" y="6" width="1" height="2" fill="#0F172A" />
    {/* Whiskers & Snout */}
    <rect x="5" y="9" width="6" height="2" fill="#E0F2FE" />
    <rect x="2" y="10" width="3" height="1" fill="#F97316" />
    <rect x="11" y="10" width="3" height="1" fill="#F97316" />
    {/* Body */}
    <rect x="4" y="11" width="8" height="3" fill="#0369A1" />
    <rect x="6" y="11" width="4" height="3" fill="#38BDF8" />
    {/* Claws */}
    <rect x="4" y="14" width="3" height="2" fill="#F59E0B" />
    <rect x="9" y="14" width="3" height="2" fill="#F59E0B" />
  </svg>
);

export const PixelJudge: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Winged Official Magistrate Hat */}
    <rect x="1" y="3" width="3" height="2" fill="#581C87" />
    <rect x="12" y="3" width="3" height="2" fill="#581C87" />
    <rect x="4" y="2" width="8" height="3" fill="#7E22CE" />
    <rect x="6" y="1" width="4" height="2" fill="#9333EA" />
    <rect x="7" y="3" width="2" height="2" fill="#FBBF24" />
    {/* Face */}
    <rect x="4" y="5" width="8" height="5" fill="#FED7AA" />
    {/* Sharp Brows & Eyes */}
    <rect x="4" y="6" width="3" height="1" fill="#1E1B4B" />
    <rect x="9" y="6" width="3" height="1" fill="#1E1B4B" />
    <rect x="5" y="7" width="2" height="1" fill="#0F172A" />
    <rect x="9" y="7" width="2" height="1" fill="#0F172A" />
    {/* Beard */}
    <rect x="5" y="9" width="6" height="3" fill="#1E293B" />
    <rect x="6" y="12" width="4" height="2" fill="#0F172A" />
    {/* Robe */}
    <rect x="3" y="11" width="10" height="3" fill="#6B21A8" />
    <rect x="6" y="11" width="4" height="3" fill="#FDE047" />
    {/* Shoes */}
    <rect x="4" y="14" width="3" height="2" fill="#1E1B4B" />
    <rect x="9" y="14" width="3" height="2" fill="#1E1B4B" />
  </svg>
);

export const PixelSpirit: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Floating Ghost Wisps */}
    <rect x="6" y="1" width="4" height="2" fill="#34D399" />
    <rect x="4" y="3" width="8" height="2" fill="#10B981" />
    <rect x="3" y="5" width="10" height="5" fill="#059669" />
    {/* Glowing Eyes */}
    <rect x="5" y="6" width="2" height="2" fill="#C084FC" />
    <rect x="9" y="6" width="2" height="2" fill="#C084FC" />
    <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" />
    <rect x="9" y="6" width="1" height="1" fill="#FFFFFF" />
    {/* Mystic Mouth */}
    <rect x="7" y="9" width="2" height="1" fill="#064E3B" />
    {/* Floating Tail */}
    <rect x="4" y="10" width="8" height="3" fill="#10B981" />
    <rect x="3" y="13" width="3" height="2" fill="#34D399" />
    <rect x="7" y="13" width="2" height="3" fill="#059669" />
    <rect x="10" y="13" width="3" height="2" fill="#6EE7B7" />
    {/* Sparks */}
    <rect x="1" y="7" width="1" height="1" fill="#A7F3D0" />
    <rect x="14" y="8" width="1" height="1" fill="#A7F3D0" />
  </svg>
);

// Render avatar component by type
const renderAvatar = (type: string, className = 'w-6 h-6') => {
  switch (type) {
    case 'wukong':
      return <PixelWukong className={className} />;
    case 'dragon':
      return <PixelDragon className={className} />;
    case 'judge':
      return <PixelJudge className={className} />;
    case 'spirit':
      return <PixelSpirit className={className} />;
    default:
      return <PixelWukong className={className} />;
  }
};

interface QuestionItem {
  vocabId: string;
  zh: string;
  correctWord: string;
  options: string[];
}

interface PlayerSimultaneousState {
  id: number;
  name: string; // English Name
  subtitle: string;
  avatarType: 'wukong' | 'dragon' | 'judge' | 'spirit';
  color: string;
  bgColor: string;
  borderColor: string;
  accentBg: string;
  step: number; // 0 to 8 rungs
  isFinished: boolean;
  finishRank?: number;
  questionPool: QuestionItem[];
  currentQIndex: number;
  selectedOption: string | null;
  feedback: 'idle' | 'correct' | 'wrong';
  isChecking: boolean;
}

const PLAYER_CONFIGS: Array<{
  name: string;
  subtitle: string;
  avatarType: 'wukong' | 'dragon' | 'judge' | 'spirit';
  color: string;
  bgColor: string;
  borderColor: string;
  accentBg: string;
}> = [
  {
    name: 'Wukong',
    subtitle: 'Monkey King',
    avatarType: 'wukong',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentBg: 'bg-amber-500'
  },
  {
    name: 'Dragon King',
    subtitle: 'Eastern Sea Ruler',
    avatarType: 'dragon',
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-300',
    accentBg: 'bg-sky-500'
  },
  {
    name: 'Judge',
    subtitle: 'Judge of Dead',
    avatarType: 'judge',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentBg: 'bg-purple-500'
  },
  {
    name: 'Spirit',
    subtitle: 'Underworld Guard',
    avatarType: 'spirit',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentBg: 'bg-emerald-500'
  }
];

// Generate an 8-question pool for a player
const generatePlayerPool = (): QuestionItem[] => {
  const shuffled = [...VOCABULARY_LIST].sort(() => Math.random() - 0.5);

  return shuffled.map((vocab) => {
    // 3 distractors from the remaining 7 words
    const others = VOCABULARY_LIST.filter((v) => v.id !== vocab.id).map((v) => v.word);
    const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [vocab.word, ...distractors].sort(() => Math.random() - 0.5);

    return {
      vocabId: vocab.id,
      zh: vocab.zh,
      correctWord: vocab.word,
      options
    };
  });
};

export const LadderClimbGame: React.FC = () => {
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(4);
  const [players, setPlayers] = useState<PlayerSimultaneousState[]>([]);
  const [finishCounter, setFinishCounter] = useState<number>(0);

  // Initialize simultaneous players
  const resetGame = (count: 2 | 3 | 4) => {
    sfx.playClick();
    const initList: PlayerSimultaneousState[] = [];

    for (let i = 0; i < count; i++) {
      const cfg = PLAYER_CONFIGS[i];
      initList.push({
        id: i + 1,
        name: cfg.name,
        subtitle: cfg.subtitle,
        avatarType: cfg.avatarType,
        color: cfg.color,
        bgColor: cfg.bgColor,
        borderColor: cfg.borderColor,
        accentBg: cfg.accentBg,
        step: 0,
        isFinished: false,
        questionPool: generatePlayerPool(),
        currentQIndex: 0,
        selectedOption: null,
        feedback: 'idle',
        isChecking: false
      });
    }

    setPlayers(initList);
    setFinishCounter(0);
  };

  useEffect(() => {
    resetGame(playerCount);
  }, [playerCount]);

  // Handle simultaneous answer selection for an individual player
  const handlePlayerAnswer = (playerIndex: number, option: string) => {
    const targetPlayer = players[playerIndex];
    if (!targetPlayer || targetPlayer.isFinished || targetPlayer.isChecking) return;

    const currentQ = targetPlayer.questionPool[targetPlayer.currentQIndex];
    const isCorrect = option.toLowerCase() === currentQ.correctWord.toLowerCase();

    // 1. Play sound effect immediately
    if (isCorrect) {
      sfx.playCorrect();
    } else {
      sfx.playWrong();
    }

    // 2. Set checking and feedback for THIS player only
    setPlayers((prev) => {
      const next = [...prev];
      const p = { ...next[playerIndex] };
      p.isChecking = true;
      p.selectedOption = option;
      p.feedback = isCorrect ? 'correct' : 'wrong';

      if (isCorrect) {
        const nextStep = Math.min(8, p.step + 1);
        p.step = nextStep;

        if (nextStep >= 8 && !p.isFinished) {
          p.isFinished = true;
          // Calculate rank
          setFinishCounter((prevCount) => {
            const nextRank = prevCount + 1;
            p.finishRank = nextRank;
            return nextRank;
          });
        }
      }

      next[playerIndex] = p;
      return next;
    });

    // 3. Clear feedback and advance question for THIS player after brief delay
    setTimeout(() => {
      setPlayers((prev) => {
        const next = [...prev];
        const p = { ...next[playerIndex] };
        p.isChecking = false;
        p.selectedOption = null;
        p.feedback = 'idle';

        // Cycle to next question if not finished
        if (!p.isFinished) {
          p.currentQIndex = (p.currentQIndex + 1) % p.questionPool.length;
        }

        next[playerIndex] = p;
        return next;
      });
    }, 450);
  };

  const allPlayersFinished = players.length > 0 && players.every((p) => p.isFinished);
  const finishedCount = players.filter((p) => p.isFinished).length;

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-yellow-50/80 border-2 border-amber-300 rounded-3xl p-4 sm:p-7 shadow-sm space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-amber-200/90 px-2.5 py-0.5 rounded-full border border-amber-300">
              Simultaneous Multiplayer · 全員同步競技
            </span>
            {finishedCount > 0 && !allPlayersFinished && (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 animate-pulse">
                已有 {finishedCount} 位登頂 · 比賽繼續進行中！
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-1">
            Vocabulary Ladder Climb Race (8階單字爬爬梯)
          </h3>
        </div>

        {/* Player Count Switcher & Reset Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-amber-300 p-1 rounded-xl text-xs font-bold shadow-2xs">
            <span className="text-stone-400 px-2 text-[11px] flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>人數:</span>
            </span>
            {[2, 3, 4].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setPlayerCount(cnt as 2 | 3 | 4)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  playerCount === cnt
                    ? 'bg-amber-600 text-white shadow-2xs font-extrabold'
                    : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
                }`}
              >
                {cnt} Players
              </button>
            ))}
          </div>

          <button
            onClick={() => resetGame(playerCount)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 shadow-2xs transition-colors"
            title="重新開始爬爬梯比賽"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Race</span>
          </button>
        </div>
      </div>

      {/* Simultaneous Player Columns Grid */}
      <div
        className={`grid gap-4 ${
          playerCount === 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
            : playerCount === 3
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {players.map((player, pIdx) => {
          const currentQ = player.questionPool[player.currentQIndex];

          return (
            <div
              key={player.id}
              className={`rounded-2xl border-2 flex flex-col justify-between transition-all p-3.5 sm:p-4 relative shadow-2xs ${
                player.isFinished
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : `${player.borderColor} ${player.bgColor}`
              }`}
            >
              {/* Top Player Header: Pixel SVG Avatar + English Name */}
              <div className="flex items-center justify-between pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex items-center justify-center p-1">
                    {renderAvatar(player.avatarType, 'w-6 h-6')}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {player.name}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-medium block">
                      {player.subtitle}
                    </span>
                  </div>
                </div>

                {player.isFinished ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs animate-bounce">
                    <Trophy className="w-3 h-3 text-yellow-300" />
                    <span>Rank #{player.finishRank}</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/90 border border-stone-200 text-stone-700 shadow-2xs">
                    Step {player.step}/8
                  </span>
                )}
              </div>

              {/* Ladder Track with 8 Rungs */}
              <div className="my-3 bg-white/80 rounded-xl p-2.5 border border-stone-200/60 shadow-inner">
                <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 mb-1 px-1">
                  <span>🚩 Summit (Step 8)</span>
                  <span>Ground (0)</span>
                </div>

                <div className="w-full h-44 bg-amber-100/30 rounded-lg border border-amber-300/70 relative flex flex-col justify-between py-1.5 px-2 overflow-hidden shadow-2xs">
                  {/* Vertical ladder rails */}
                  <div className="absolute left-6 inset-y-0 w-1 bg-amber-800/30 rounded-full" />
                  <div className="absolute right-6 inset-y-0 w-1 bg-amber-800/30 rounded-full" />

                  {/* 8 Rungs */}
                  {[8, 7, 6, 5, 4, 3, 2, 1].map((rungNum) => {
                    const isOccupied = player.step === rungNum;

                    return (
                      <div
                        key={rungNum}
                        className="relative w-full h-4 flex items-center justify-center"
                      >
                        {/* Horizontal wooden rung bar */}
                        <div className="w-14 h-1 bg-amber-800/40 rounded-full" />

                        {/* Rung number label */}
                        <span className="absolute left-1 text-[8px] font-bold text-stone-400 font-mono">
                          {rungNum}
                        </span>

                        {/* Player Pixel Avatar climbing on current rung */}
                        {isOccupied && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-300 transform scale-110">
                            <div className="w-6 h-6 rounded-lg bg-white border border-amber-500 shadow-xs flex items-center justify-center p-0.5 animate-bounce">
                              {renderAvatar(player.avatarType, 'w-5 h-5')}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Base Step 0 (Ground) */}
                  {player.step === 0 && (
                    <div className="absolute bottom-1 inset-x-0 flex items-center justify-center z-10">
                      <div className="w-6 h-6 rounded-lg bg-white border border-stone-300 shadow-xs flex items-center justify-center p-0.5">
                        {renderAvatar(player.avatarType, 'w-4 h-4')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Player's Dedicated Answering Console */}
              {player.isFinished ? (
                /* Player Finished State */
                <div className="bg-white/95 rounded-xl p-4 border border-emerald-300 text-center space-y-2 shadow-2xs animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h5 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                    Summit Conquered! 🏆
                  </h5>
                  <p className="text-[11px] text-stone-600">
                    Finished in <strong>Rank #{player.finishRank}</strong>!
                  </p>
                  <p className="text-[10px] text-stone-400 italic">
                    Waiting for other players to finish...
                  </p>
                </div>
              ) : currentQ ? (
                /* Interactive Simultaneous Question Box */
                <div className="bg-white/95 rounded-xl p-3 border border-stone-200/80 shadow-2xs space-y-2.5">
                  {/* Target Chinese Question Prompt */}
                  <div className="bg-amber-100/60 rounded-lg p-2 text-center border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block tracking-wide">
                      Select English for:
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-chinese mt-0.5 tracking-wide">
                      「 {currentQ.zh} 」
                    </div>
                  </div>

                  {/* 4 English Options (2x2 Grid) */}
                  <div className="grid grid-cols-2 gap-2">
                    {currentQ.options.map((option) => {
                      const isSelected = player.selectedOption === option;
                      const isTargetCorrect =
                        option.toLowerCase() === currentQ.correctWord.toLowerCase();

                      let btnStyle =
                        'bg-stone-50 hover:bg-amber-50 text-slate-800 border-stone-200 hover:border-amber-300';

                      if (player.isChecking) {
                        if (isTargetCorrect) {
                          btnStyle =
                            'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-300 font-extrabold';
                        } else if (isSelected && !isTargetCorrect) {
                          btnStyle = 'bg-rose-100 text-rose-900 border-rose-400 font-bold';
                        }
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={player.isChecking}
                          onClick={() => handlePlayerAnswer(pIdx, option)}
                          className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all active:scale-95 truncate shadow-2xs ${btnStyle}`}
                          title={option}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* All Players Finished: Grand Celebration Ceremony */}
      {allPlayersFinished && (
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-md animate-fadeIn">
          <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-sm">
            <Trophy className="w-8 h-8 text-yellow-200" />
          </div>

          <div>
            <h4 className="text-2xl font-extrabold text-slate-900 font-display">
              🎉 全員成功登頂！爬爬梯比賽圓滿完成！
            </h4>
            <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
              恭喜所有玩家皆完成 8 階西遊記單字考驗，全員順利登上定海神針頂峰！
            </p>
          </div>

          {/* Final Standings Podium Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            {[...players]
              .sort((a, b) => (a.finishRank || 99) - (b.finishRank || 99))
              .map((p, idx) => (
                <div
                  key={p.id}
                  className="bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center p-1.5 mb-1">
                    {renderAvatar(p.avatarType, 'w-7 h-7')}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{p.name}</span>
                  <span className="text-[10px] text-stone-500">{p.subtitle}</span>
                  <span className="text-[10px] font-extrabold mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Rank #{idx + 1}
                  </span>
                </div>
              ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => resetGame(playerCount)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-amber-700 shadow-md active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>再來一局爬爬梯比賽 (Play Again)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
