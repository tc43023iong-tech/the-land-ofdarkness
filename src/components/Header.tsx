import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

export type NavTab = 'story' | 'vocab' | 'quiz' | 'cloze' | 'sentence' | 'moral';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#story"
        onClick={(e) => {
          e.preventDefault();
          onTabChange('story');
          sfx.playClick();
        }}
        className="text-lg font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display flex items-center gap-2 hover:opacity-85 transition-opacity"
      >
        <span className="text-xl">🐒</span>
        <span>Journey to the West</span>
      </a>

      {/* Zone 2: Concise single-line navigation links */}
      <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-stone-600 overflow-x-auto max-w-full pb-0.5 scrollbar-none">
        <button
          onClick={() => {
            onTabChange('story');
            sfx.playClick();
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'story'
              ? 'text-amber-800 border-amber-600'
              : 'border-transparent text-stone-600 hover:border-stone-300'
          }`}
        >
          Story Reader
        </button>
        <button
          onClick={() => {
            onTabChange('vocab');
            sfx.playClick();
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'vocab'
              ? 'text-amber-800 border-amber-600'
              : 'border-transparent text-stone-600 hover:border-stone-300'
          }`}
        >
          Vocabulary (A)
        </button>
        <button
          onClick={() => {
            onTabChange('quiz');
            sfx.playClick();
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'quiz'
              ? 'text-amber-800 border-amber-600'
              : 'border-transparent text-stone-600 hover:border-stone-300'
          }`}
        >
          Quiz (B)
        </button>
        <button
          onClick={() => {
            onTabChange('cloze');
            sfx.playClick();
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'cloze'
              ? 'text-amber-800 border-amber-600'
              : 'border-transparent text-stone-600 hover:border-stone-300'
          }`}
        >
          Listening (C)
        </button>
        <button
          onClick={() => {
            onTabChange('sentence');
            sfx.playClick();
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'sentence'
              ? 'text-amber-800 border-amber-600'
              : 'border-transparent text-stone-600 hover:border-stone-300'
          }`}
        >
          Sentences (D)
        </button>
        <button
          onClick={() => {
            onTabChange('moral');
            sfx.playClick();
          }}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'moral'
              ? 'text-amber-800 border-amber-600'
              : 'border-transparent text-stone-600 hover:border-stone-300'
          }`}
        >
          Moral Lessons (E)
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMute}
          className="p-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs"
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-stone-400" />
              <span className="hidden sm:inline">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Sound On</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
