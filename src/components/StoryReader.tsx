import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square, FastForward, Sparkles, BookOpen, ChevronLeft, ChevronRight, Eye, Wand2 } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';
import { StoryScene, StorySentence } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';
import { DirectoryMiniGame } from './DirectoryMiniGame';

interface StoryReaderProps {
  onNavigateToQuiz?: () => void;
  onNavigateToVocab?: () => void;
}

// List of all annotated target phrases sorted longest to shortest for accurate matching
const ANNOTATED_TERMS = [
  'your time on Earth is over',
  'the palace of darkness',
  'Palace of Darkness',
  'the jade emperor',
  'Jade Emperor',
  'the dragon queen',
  'Dragon Queen',
  'drew a line through',
  'clenched his fists',
  'Born from a stone',
  'land of darkness',
  'Land of Darkness',
  'a jar of ink',
  'jar of ink',
  'shook his head',
  'flipped through',
  'crossed out',
  'knocked out',
  'live forever',
  'iron pillar',
  'supposed to',
  'supposes to',
  'entrance gate',
  'Let go of',
  'let go of',
  'Died today',
  'died today',
  'hesitated',
  'Directory',
  'directory',
  'creature',
  'struggled',
  'commanded',
  'subjects',
  'Nonsense',
  'nonsense',
  'nervous',
  'declared',
  'spirits',
  'grabbed',
  'dragged',
  'magical',
  'smaller',
  'Smaller',
  'trouble',
  'Shaking',
  'plucked',
  'attack',
  'amazed',
  'creepy',
  'demons',
  'Demons',
  'ghosts',
  'shrank',
  'handed',
  'glared',
  'cheered',
  'weapon',
  'stomped',
  'swung',
  'Judge',
  'judge',
  'feast',
  'brush',
  'I bet',
  'yanked',
  'lift',
  'grow',
  'Grow',
  'fled',
  'pin',
  'report'
];

const ANNOTATED_REGEX = new RegExp(
  `(${ANNOTATED_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*(\\([^)]*[\\u4e00-\\u9fa5][^)]*\\))`,
  'gi'
);

const renderHighlighterText = (text: string, isInline: boolean) => {
  if (!isInline) return text;

  const matches = [...text.matchAll(ANNOTATED_REGEX)];
  if (matches.length === 0) return text;

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;

  matches.forEach((m, idx) => {
    const start = m.index ?? 0;
    if (start > lastIdx) {
      parts.push(text.slice(lastIdx, start));
    }

    const term = m[1];
    const zh = m[2];

    parts.push(
      <mark
        key={`hl-${idx}`}
        className="relative inline-flex items-baseline bg-amber-200/95 hover:bg-yellow-200 text-amber-950 font-bold px-1.5 py-0.5 mx-0.5 rounded-md border-b-2 border-amber-400 shadow-2xs transition-colors cursor-help"
        title={`${term} ${zh}`}
      >
        <span>{term}</span>
        <span className="text-amber-800 font-chinese text-[0.84em] font-normal ml-1">
          {zh}
        </span>
      </mark>
    );

    lastIdx = start + m[0].length;
  });

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts;
};

// --- Story Characters Pixel Art SVG Avatars ---
export const PixelNarrator: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Wooden Roller Top */}
    <rect x="2" y="2" width="12" height="2" fill="#78350F" />
    <rect x="1" y="2" width="1" height="2" fill="#D97706" />
    <rect x="14" y="2" width="1" height="2" fill="#D97706" />
    {/* Parchment Body */}
    <rect x="3" y="4" width="10" height="8" fill="#FEF3C7" />
    <rect x="4" y="4" width="8" height="8" fill="#FFFBEB" />
    {/* Ancient Text lines */}
    <rect x="5" y="5" width="6" height="1" fill="#92400E" />
    <rect x="5" y="7" width="5" height="1" fill="#B45309" />
    <rect x="5" y="9" width="4" height="1" fill="#B45309" />
    {/* Crimson Wax Seal */}
    <rect x="10" y="8" width="2" height="2" fill="#DC2626" />
    {/* Wooden Roller Bottom */}
    <rect x="2" y="12" width="12" height="2" fill="#78350F" />
    <rect x="1" y="12" width="1" height="2" fill="#D97706" />
    <rect x="14" y="12" width="1" height="2" fill="#D97706" />
    {/* Blue Quill Feather */}
    <rect x="11" y="3" width="1" height="2" fill="#3B82F6" />
    <rect x="12" y="2" width="2" height="2" fill="#60A5FA" />
    <rect x="13" y="1" width="1" height="2" fill="#93C5FD" />
  </svg>
);

export const PixelWukong: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
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
    {/* Peach Muzzle */}
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

export const PixelDragonKing: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Gold Antlers */}
    <rect x="3" y="1" width="2" height="2" fill="#F59E0B" />
    <rect x="4" y="2" width="2" height="2" fill="#FBBF24" />
    <rect x="11" y="1" width="2" height="2" fill="#F59E0B" />
    <rect x="10" y="2" width="2" height="2" fill="#FBBF24" />
    {/* Crown */}
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
    {/* Whiskers */}
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

export const PixelDragonQueen: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 16 16" className={`${className} inline-block`} shapeRendering="crispEdges">
    {/* Jade Pearl Tiara */}
    <rect x="6" y="1" width="4" height="1" fill="#14B8A6" />
    <rect x="7" y="0" width="2" height="1" fill="#5EEAD4" />
    <rect x="4" y="2" width="8" height="2" fill="#0D9488" />
    {/* Pearl Gemstones */}
    <rect x="5" y="2" width="1" height="1" fill="#FFFFFF" />
    <rect x="10" y="2" width="1" height="1" fill="#FFFFFF" />
    {/* Elegant Teal Face */}
    <rect x="4" y="4" width="8" height="7" fill="#2DD4BF" />
    <rect x="3" y="5" width="1" height="4" fill="#0F766E" />
    <rect x="12" y="5" width="1" height="4" fill="#0F766E" />
    {/* Graceful Purple Eyes */}
    <rect x="5" y="6" width="2" height="2" fill="#A855F7" />
    <rect x="9" y="6" width="2" height="2" fill="#A855F7" />
    <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" />
    <rect x="9" y="6" width="1" height="1" fill="#FFFFFF" />
    {/* Royal Muzzle */}
    <rect x="6" y="8" width="4" height="2" fill="#CCFBF1" />
    <rect x="7" y="9" width="2" height="1" fill="#EC4899" />
    {/* Silk Robe */}
    <rect x="4" y="11" width="8" height="3" fill="#115E59" />
    <rect x="6" y="11" width="4" height="3" fill="#99F6E4" />
    {/* Hem */}
    <rect x="4" y="14" width="3" height="2" fill="#0F766E" />
    <rect x="9" y="14" width="3" height="2" fill="#0F766E" />
  </svg>
);

export const PixelJudge: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
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

const renderSpeakerAvatar = (speaker?: string, className = 'w-3.5 h-3.5') => {
  switch (speaker) {
    case 'Sun Wukong':
    case 'Wukong':
      return <PixelWukong className={className} />;
    case 'Narrator':
      return <PixelNarrator className={className} />;
    case 'Dragon King':
      return <PixelDragonKing className={className} />;
    case 'Dragon Queen':
      return <PixelDragonQueen className={className} />;
    case 'Judge of the Dead':
      return <PixelJudge className={className} />;
    default:
      return <PixelNarrator className={className} />;
  }
};

export const StoryReader: React.FC<StoryReaderProps> = ({ onNavigateToQuiz, onNavigateToVocab }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [annotationMode, setAnnotationMode] = useState<'inline' | 'hover' | 'english'>('inline');
  const [isPlayingScene, setIsPlayingScene] = useState<boolean>(false);
  const [currentSentenceId, setCurrentSentenceId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [showAllZh, setShowAllZh] = useState<boolean>(false);
  const [revealedSentenceZh, setRevealedSentenceZh] = useState<Record<string, boolean>>({});

  const activeScene: StoryScene = STORY_SCENES[activeSceneIndex];

  // Stop audio on unmount or scene change
  useEffect(() => {
    return () => {
      speech.stop();
    };
  }, [activeSceneIndex]);

  const handlePlaySentence = (sentence: StorySentence) => {
    sfx.playClick();
    setCurrentSentenceId(sentence.id);
    speech.speak(sentence.en, {
      rate: speechRate,
      onEnd: () => setCurrentSentenceId(null),
      onError: () => setCurrentSentenceId(null)
    });
  };

  const handlePlayScene = () => {
    if (isPlayingScene) {
      speech.stop();
      setIsPlayingScene(false);
      setCurrentSentenceId(null);
      return;
    }

    setIsPlayingScene(true);
    let index = 0;

    const playNext = () => {
      if (index >= activeScene.sentences.length) {
        setIsPlayingScene(false);
        setCurrentSentenceId(null);
        return;
      }

      const s = activeScene.sentences[index];
      setCurrentSentenceId(s.id);
      index++;

      speech.speak(s.en, {
        rate: speechRate,
        onEnd: () => {
          setTimeout(playNext, 400);
        },
        onError: () => {
          setIsPlayingScene(false);
          setCurrentSentenceId(null);
        }
      });
    };

    playNext();
  };

  const getSpeakerBadgeClass = (speaker?: string) => {
    switch (speaker) {
      case 'Sun Wukong':
      case 'Wukong':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'Dragon King':
        return 'bg-blue-100 text-blue-950 border-blue-300';
      case 'Dragon Queen':
        return 'bg-teal-100 text-teal-950 border-teal-300';
      case 'Judge of the Dead':
        return 'bg-purple-100 text-purple-950 border-purple-300';
      case 'Narrator':
        return 'bg-stone-100 text-stone-800 border-stone-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Scene Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-3 border border-amber-900/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Scene Steps */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {STORY_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                sfx.playClick();
                setActiveSceneIndex(idx);
                speech.stop();
                setIsPlayingScene(false);
                setCurrentSentenceId(null);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeSceneIndex === idx
                  ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                  : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              <span>{scene.zhTitle.split('與')[0]}</span>
            </button>
          ))}
        </div>

        {/* View Controls & Annotation Mode */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => {
                setAnnotationMode('inline');
                sfx.playClick();
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                annotationMode === 'inline' ? 'bg-white text-amber-900 font-bold shadow-xs' : 'text-stone-600'
              }`}
              title="難詞直接加螢光筆標註中文"
            >
              螢光標註 (Highlighter)
            </button>
            <button
              onClick={() => {
                setAnnotationMode('english');
                sfx.playClick();
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                annotationMode === 'english' ? 'bg-white text-amber-900 font-bold shadow-xs' : 'text-stone-600'
              }`}
              title="純英文沉浸式閱讀"
            >
              純英文 (Pure)
            </button>
          </div>
        </div>
      </div>

      {/* Main Storyboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Illustration & Scene Tools (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm overflow-hidden group">
            {/* Scene Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider">
                  SCENE {activeScene.id} OF 4
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {activeScene.title}
                </h3>
                <p className="text-xs text-stone-500 font-chinese">{activeScene.zhTitle}</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 bg-stone-100 text-stone-600 rounded-lg">
                📍 {activeScene.location}
              </span>
            </div>

            {/* Illustration Canvas */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
              <img
                src={activeScene.image}
                alt={activeScene.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-medium drop-shadow-md leading-relaxed">
                  {activeScene.summary}
                </p>
              </div>
            </div>

            {/* Audio Deck Controls */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={handlePlayScene}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isPlayingScene
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {isPlayingScene ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Audio (停止朗讀)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Listen to Scene (朗讀全段)</span>
                  </>
                )}
              </button>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <span>Speed:</span>
                {[0.8, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setSpeechRate(rate);
                      sfx.playClick();
                    }}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                      speechRate === rate
                        ? 'bg-amber-100 text-amber-900'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeScene.interactiveType === 'cross_out' && (
            <DirectoryMiniGame />
          )}
        </div>

        {/* Right Column: Sentence-by-sentence Story Reader (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Story Text · 點擊句子發音</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowAllZh(!showAllZh);
                    sfx.playClick();
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  {showAllZh ? '隱藏中文翻譯' : '顯示中文翻譯'}
                </button>
                <span className="text-[11px] text-stone-400">
                  {activeScene.sentences.length} Sentences
                </span>
              </div>
            </div>

            {/* Sentences List */}
            <div className="space-y-4">
              {activeScene.sentences.map((sentence) => {
                const isActive = currentSentenceId === sentence.id;
                const displayText = annotationMode === 'inline' ? sentence.annotated : sentence.en;
                const isZhRevealed = showAllZh || Boolean(revealedSentenceZh[sentence.id]);

                return (
                  <div
                    key={sentence.id}
                    onClick={() => handlePlaySentence(sentence)}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-50/90 border-amber-300 shadow-sm scale-[1.01]'
                        : 'bg-stone-50/40 border-stone-200/60 hover:bg-amber-50/40 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {sentence.speaker && (
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-md border shadow-2xs ${getSpeakerBadgeClass(
                              sentence.speaker
                            )}`}
                          >
                            <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                              {renderSpeakerAvatar(sentence.speaker, 'w-3.5 h-3.5')}
                            </span>
                            <span>{sentence.speaker}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sfx.playClick();
                            setRevealedSentenceZh((prev) => ({
                              ...prev,
                              [sentence.id]: !prev[sentence.id]
                            }));
                          }}
                          className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                            isZhRevealed
                              ? 'bg-amber-100 text-amber-900 font-medium'
                              : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                          }`}
                          title="點擊顯示/隱藏此句中文翻譯"
                        >
                          {isZhRevealed ? '隱藏翻譯' : '查看翻譯'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySentence(sentence);
                          }}
                          className={`p-1 rounded-md transition-colors ${
                            isActive
                              ? 'text-amber-700 bg-amber-200'
                              : 'text-stone-400 hover:text-amber-600 hover:bg-stone-100'
                          }`}
                          title="朗讀此句"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* English with bracketed annotations & highlighter effect */}
                    <p className={`text-base leading-relaxed ${isActive ? 'text-amber-950 font-semibold' : 'text-slate-900'}`}>
                      {renderHighlighterText(displayText, annotationMode === 'inline')}
                    </p>

                    {/* Chinese translation line - hidden unless toggled */}
                    {isZhRevealed && (
                      <p className="text-xs text-stone-500 font-chinese mt-2 pt-1.5 border-t border-stone-200/50 leading-relaxed animate-fadeIn">
                        {sentence.zh}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Scene Pagination Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                disabled={activeSceneIndex === 0}
                onClick={() => {
                  sfx.playClick();
                  setActiveSceneIndex((prev) => Math.max(0, prev - 1));
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  activeSceneIndex === 0
                    ? 'text-stone-300 cursor-not-allowed'
                    : 'text-stone-700 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Scene</span>
              </button>

              <span className="text-xs text-stone-600 font-medium">
                {activeSceneIndex + 1} / {STORY_SCENES.length}
              </span>

              {activeSceneIndex < STORY_SCENES.length - 1 ? (
                <button
                  onClick={() => {
                    sfx.playClick();
                    setActiveSceneIndex((prev) => Math.min(STORY_SCENES.length - 1, prev + 1));
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-sm"
                >
                  <span>Next Scene</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNavigateToVocab}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                >
                  <span>Study Vocabulary (Part A)</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
