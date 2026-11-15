import React, { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { VideoSection } from './components/VideoSection';
import { StoryReader } from './components/StoryReader';
import { VocabularySection } from './components/VocabularySection';
import { QuizSection } from './components/QuizSection';
import { ClozeSection } from './components/ClozeSection';
import { SentenceSection } from './components/SentenceSection';
import { MoralSection } from './components/MoralSection';
import { HomeworkSection } from './components/HomeworkSection';
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
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-5 space-y-6">
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

        {activeTab === 'hw' && (
          <HomeworkSection
            onGoToPartC={() => handleTabChange('cloze')}
          />
        )}
      </main>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-stone-200/80 bg-white/60 py-6 mt-12 text-center text-sm text-stone-500">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-5 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
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
