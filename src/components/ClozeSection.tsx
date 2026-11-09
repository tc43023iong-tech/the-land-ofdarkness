import React, { useState, useRef } from 'react';
import { Volume2, CheckCircle2, RotateCcw, ChevronRight, ChevronLeft, Check, Film, Play, RotateCw } from 'lucide-react';
import { CLOZE_ITEMS } from '../data/storyData';
import { ClozeItem } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';
import { PixelNarrator, PixelWukong, PixelJudge } from './StoryReader';

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

const renderSpeakerAvatar = (speaker?: string, className = 'w-3.5 h-3.5') => {
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

export const ClozeSection: React.FC<ClozeSectionProps> = ({ onNextPart }) => {
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [activeClipId, setActiveClipId] = useState<number>(1);
  const [clipPlayCounter, setClipPlayCounter] = useState<number>(0);
  const [hasStartedVideo, setHasStartedVideo] = useState<boolean>(false);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);

  const activeItem = CLOZE_ITEMS.find((c) => c.id === activeClipId) || CLOZE_ITEMS[0];

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

  const handlePlayTTS = (item: ClozeItem) => {
    sfx.playClick();
    setSpeakingId(item.id);
    speech.speak(item.fullEn, {
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null)
    });
  };

  const handlePlayClip = (item: ClozeItem, shouldScroll = false) => {
    sfx.playClick();
    setActiveClipId(item.id);
    setClipPlayCounter((prev) => prev + 1);
    setHasStartedVideo(true);

    if (shouldScroll && videoPlayerRef.current) {
      videoPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handlePrevClip = () => {
    const prevId = activeClipId > 1 ? activeClipId - 1 : CLOZE_ITEMS.length;
    const item = CLOZE_ITEMS.find((c) => c.id === prevId);
    if (item) {
      handlePlayClip(item);
    }
  };

  const handleNextClip = () => {
    const nextId = activeClipId < CLOZE_ITEMS.length ? activeClipId + 1 : 1;
    const item = CLOZE_ITEMS.find((c) => c.id === nextId);
    if (item) {
      handlePlayClip(item);
    }
  };

  const handleReplayClip = () => {
    handlePlayClip(activeItem);
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
            <div className="flex items-center -space-x-1 ml-1 bg-white/80 p-0.5 rounded-lg border border-emerald-200 shadow-2xs">
              <span className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center p-0.5" title="Wukong">
                <PixelWukong className="w-3.5 h-3.5" />
              </span>
              <span className="w-5 h-5 rounded-md bg-stone-50 border border-stone-200 flex items-center justify-center p-0.5" title="Narrator">
                <PixelNarrator className="w-3.5 h-3.5" />
              </span>
              <span className="w-5 h-5 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center p-0.5" title="Judge of the Dead">
                <PixelJudge className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Fill in the Blanks with Part A Vocabulary
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Listen to the characters speak in the authentic animation, choose the missing words directly under each question, and practice shadowing aloud!
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

      {/* Main Split Layout: Left Video Player, Right Questions List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Synchronized Video Clip Player */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          <div
            ref={videoPlayerRef}
            className="bg-white rounded-2xl border-2 border-amber-400/90 shadow-md overflow-hidden transition-all"
          >
            {/* Player Header Bar */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-3.5 py-2.5 text-white flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <Film className="w-4 h-4 text-amber-100" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-black tracking-wider uppercase opacity-90 truncate">
                    原版動畫片段跟讀 (Clip Player)
                  </div>
                  <div className="text-xs font-semibold text-amber-100 flex items-center gap-1.5">
                    <span>第 {activeItem.id} 題</span>
                    <span>•</span>
                    <span className="bg-amber-900/60 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold text-amber-200">
                      ⏱ {activeItem.videoTimeLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Clip Switcher */}
              <div className="flex items-center gap-1 bg-black/25 p-1 rounded-xl shrink-0">
                <button
                  onClick={handlePrevClip}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="上一句片段"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReplayClip}
                  className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                  title="重播目前這一段"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>重播</span>
                </button>
                <button
                  onClick={handleNextClip}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="下一句片段"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded 16:9 Responsive YouTube Player */}
            <div className="bg-stone-900 relative">
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                {hasStartedVideo ? (
                  <iframe
                    key={`${activeItem.id}-${clipPlayCounter}`}
                    className="w-full h-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/rBTRYTXqarI?start=${activeItem.videoStart || 0}&end=${activeItem.videoEnd || 0}&autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
                    title={`Journey to the West Part C Clip ${activeItem.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center text-white bg-radial from-stone-800 to-black">
                    <div
                      className="w-14 h-14 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg mb-2 hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => handlePlayClip(activeItem)}
                    >
                      <Play className="w-7 h-7 ml-0.5 fill-current" />
                    </div>
                    <h4 className="text-sm font-bold text-amber-300">
                      點擊播放第 {activeItem.id} 題動畫片段
                    </h4>
                    <span className="text-[11px] font-mono font-bold text-amber-200 mt-0.5 bg-black/40 px-2 py-0.5 rounded">
                      ⏱ {activeItem.videoTimeLabel}
                    </span>
                    <button
                      onClick={() => handlePlayClip(activeItem)}
                      className="mt-2.5 px-3.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      🎬 開始播放
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Under Video: Prompt Information (Without revealing target answer word!) */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${getSpeakerBadgeClass(
                    activeItem.speaker
                  )}`}
                >
                  <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                    {renderSpeakerAvatar(activeItem.speaker, 'w-3.5 h-3.5')}
                  </span>
                  <span>{activeItem.speaker}</span>
                </span>

                <span className="text-xs text-stone-600 font-medium truncate">
                  聆聽語音，在右側選出正確單詞
                </span>
              </div>

              {isItemCorrect(activeItem) ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300 shrink-0 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-700" />
                  已答對
                </span>
              ) : (
                <span className="text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300 shrink-0">
                  作答中
                </span>
              )}
            </div>

            {/* Quick 8-Item Navigation Pills */}
            <div className="px-3 py-2 bg-stone-100/80 border-t border-stone-200/80 flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-stone-500 shrink-0 mr-1">題號:</span>
              <div className="flex items-center justify-between gap-1 w-full">
                {CLOZE_ITEMS.map((c) => {
                  const isCurrent = activeItem.id === c.id;
                  const isDone = isItemCorrect(c);
                  return (
                    <button
                      key={c.id}
                      onClick={() => handlePlayClip(c)}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                        isCurrent
                          ? 'bg-amber-600 text-white shadow-xs'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                          : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                      }`}
                      title={`第 ${c.id} 題 (${c.videoTimeLabel})`}
                    >
                      {c.id}
                      {isDone && !isCurrent && <span className="text-[9px] ml-0.5 text-emerald-700">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Shadowing Practice Tip Card */}
          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <span>💡 影子跟讀小撇步 (Shadowing Tip)</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              點選題目右方的「🎬 播放片段」，一邊看動畫一邊模仿角色的語調、抑揚頓挫與發音，然後在右邊選出正確單詞！
            </p>
          </div>
        </div>

        {/* Right Column: Cloze Questions List */}
        <div className="lg:col-span-7 space-y-4">
          {CLOZE_ITEMS.map((item) => {
            const correct = isItemCorrect(item);
            const currentVal = (userInputs[item.id] || '').trim();
            const hasInput = currentVal.length > 0;
            const isTTSActive = speakingId === item.id;
            const isThisClipActive = activeClipId === item.id && hasStartedVideo;
            const options = SCRAMBLED_OPTIONS_MAP[item.id] || SCRAMBLED_OPTIONS_MAP[1];

            const parts = item.template.split('{blank}');

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isThisClipActive
                    ? 'bg-amber-50/40 border-amber-400 shadow-md ring-2 ring-amber-300/60'
                    : correct
                    ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                    : hasInput
                    ? 'bg-amber-50/20 border-amber-200'
                    : 'bg-white border-stone-200/90 shadow-2xs'
                }`}
              >
                {/* Top Row: Speaker, Controls, and Thumbnail */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3.5">
                  {/* Illustration Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 shadow-2xs relative group self-start">
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
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg border shadow-2xs ${getSpeakerBadgeClass(
                            item.speaker
                          )}`}
                        >
                          <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                            {renderSpeakerAvatar(item.speaker, 'w-3.5 h-3.5')}
                          </span>
                          <span>{item.speaker}</span>
                        </span>

                        {isThisClipActive && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                            左側播放中
                          </span>
                        )}
                      </div>

                      {/* Dual Audio / Video Playback Actions */}
                      <div className="flex items-center gap-1.5">
                        {/* Video Clip Play Button */}
                        <button
                          onClick={() => handlePlayClip(item, false)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer ${
                            isThisClipActive
                              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400'
                              : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                          }`}
                          title={`在左側播放第 ${item.id} 題片段 (${item.videoTimeLabel})`}
                        >
                          <Film className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>🎬 播放片段 ({item.videoTimeLabel})</span>
                        </button>

                        {/* Computer Voice Synthesis Option */}
                        <button
                          onClick={() => handlePlayTTS(item)}
                          className={`p-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                            isTTSActive
                              ? 'bg-emerald-600 text-white animate-pulse'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                          title="使用語音朗讀 (TTS 朗讀)"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Cloze Sentence with inline blank */}
                    <div className="text-sm sm:text-base text-slate-900 leading-relaxed pt-0.5">
                      <span className="font-medium">{parts[0]}</span>
                      <span className="inline-block mx-1.5 align-middle">
                        <span
                          className={`inline-flex items-center justify-center min-w-[85px] px-2.5 py-0.5 text-xs sm:text-sm font-bold rounded-lg border transition-all ${
                            correct
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-900 shadow-xs'
                              : hasInput
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-stone-50 border-stone-300 text-stone-400'
                          }`}
                        >
                          {hasInput ? currentVal : `[ ${item.id} ]`}
                          {correct && <Check className="w-3.5 h-3.5 text-emerald-700 ml-1 inline" />}
                        </span>
                      </span>
                      <span className="font-medium">{parts[1]}</span>
                    </div>

                    {/* Expanded Scrambled Word Options Directly Under Each Question */}
                    <div className="mt-2.5 pt-2.5 border-t border-stone-100">
                      {correct && (
                        <div className="flex items-center justify-end mb-1">
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct!</span>
                          </span>
                        </div>
                      )}

                      {/* Word buttons laid out cleanly in scrambled order */}
                      <div className="flex flex-wrap gap-1.5">
                        {options.map((word) => {
                          const isSelected = currentVal.toLowerCase() === word.toLowerCase();
                          const isWordCorrectChoice = isSelected && correct;
                          const isWordWrongChoice = isSelected && !correct;

                          return (
                            <button
                              key={word}
                              type="button"
                              onClick={() => handleSelectWordForItem(item.id, word)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer ${
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
                Great ear! You have listened to the authentic animation clips and mastered all 8 key vocabulary words in context!
              </p>
              <div className="pt-2">
                <button
                  onClick={onNextPart}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition-all cursor-pointer"
                >
                  <span>Continue to Part D: Sentence Practice</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

