import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { VideoSection } from './components/VideoSection';
import { StoryReader } from './components/StoryReader';
import { VocabularySection } from './components/VocabularySection';
import { QuizSection } from './components/QuizSection';
import { ClozeSection } from './components/ClozeSection';
import { SentenceSection } from './components/SentenceSection';
import { MoralSection } from './components/MoralSection';
import { BookOpen, Sparkles, Brain, CheckSquare, MessageCircle, Volume2, Shield } from 'lucide-react';
import { sfx } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('story');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sfx.muted = nextMute;
    if (!nextMute) {
      sfx.playClick();
    }
  };

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Strict Top Bar Contract Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Subtle Editorial Hero Kicker */}
        <div className="border-b border-stone-200/80 pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
            <span>Chapter 7</span>
            <span aria-hidden="true">·</span>
            <span>The Land of Darkness</span>
            <span aria-hidden="true">·</span>
            <span>西遊記第七話：幽冥界與生死簿</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
                Journey to the West: The Land of Darkness
              </h1>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'video' && (
          <VideoSection
            onStartStory={() => handleTabChange('story')}
          />
        )}

        {activeTab === 'story' && (
          <StoryReader
            onNavigateToVocab={() => handleTabChange('vocab')}
            onNavigateToQuiz={() => handleTabChange('quiz')}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabularySection
            onNextPart={() => handleTabChange('quiz')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            onNextPart={() => handleTabChange('cloze')}
          />
        )}

        {activeTab === 'cloze' && (
          <ClozeSection
            onNextPart={() => handleTabChange('sentence')}
          />
        )}

        {activeTab === 'sentence' && (
          <SentenceSection
            onNextPart={() => handleTabChange('moral')}
          />
        )}

        {activeTab === 'moral' && (
          <MoralSection />
        )}
      </main>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-stone-200/80 bg-white/60 py-6 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Journey to the West 7: The Land of Darkness</span>
            <span aria-hidden="true">·</span>
            <span>西遊記互動故事學習</span>
          </div>
          <div className="flex items-center gap-3 text-stone-400">
            <span>Original Story Excerpt</span>
            <span aria-hidden="true">·</span>
            <span>English Learning Companion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
