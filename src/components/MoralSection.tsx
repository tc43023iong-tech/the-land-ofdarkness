import React, { useState } from 'react';
import { Sparkles, MessageSquare, Volume2, HeartHandshake, BookOpen, Quote } from 'lucide-react';
import { MORAL_QUESTIONS } from '../data/storyData';
import { MoralQuestion } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';

export const MoralSection: React.FC = () => {
  const [userReflections, setUserReflections] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('wukong_moral_reflections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState<number | 'all'>('all');

  const handleTextChange = (id: number, text: string) => {
    setUserReflections((prev) => {
      const updated = { ...prev, [id]: text };
      try {
        localStorage.setItem('wukong_moral_reflections', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleInsertStarter = (id: number, starter: string) => {
    sfx.playClick();
    setUserReflections((prev) => {
      const current = prev[id] || '';
      const spacer = current.length > 0 && !current.endsWith('\n') ? ' ' : '';
      const updated = { ...prev, [id]: `${current}${spacer}${starter} ` };
      try {
        localStorage.setItem('wukong_moral_reflections', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSpeakQuestion = (q: MoralQuestion) => {
    sfx.playClick();
    speech.speak(`${q.title}. ${q.question}`);
  };

  const filteredQuestions = activeTab === 'all'
    ? MORAL_QUESTIONS
    : MORAL_QUESTIONS.filter((q) => q.id === activeTab);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/5 rounded-2xl p-5 border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-800 tracking-wider">
            <span>PART E: MORAL LESSONS</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            What Can We Learn from Sun Wukong?
          </h2>
          <p className="text-xs text-stone-600 mt-1 font-medium">
            being kind, following rules, and asking for help.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-purple-700 bg-white/80 px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
          <HeartHandshake className="w-4 h-4 text-purple-600" />
          <span className="font-semibold">Character & Moral Reflection</span>
        </div>
      </div>

      {/* Lesson Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            setActiveTab('all');
            sfx.playClick();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
            activeTab === 'all'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-purple-50'
          }`}
        >
          All Lessons
        </button>
        {MORAL_QUESTIONS.map((q) => (
          <button
            key={q.id}
            onClick={() => {
              setActiveTab(q.id);
              sfx.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
              activeTab === q.id
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-purple-50'
            }`}
          >
            Lesson {q.id}
          </button>
        ))}
      </div>

      {/* Structured Moral Lesson Cards */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const reflection = userReflections[q.id] || '';

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden"
            >
              {/* Question Header Banner */}
              <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50/30 p-5 border-b border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {q.id}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
                      {q.title}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                      {q.question}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Two-Column Structured Layout */}
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Context with Illustration, Key Words & Sentence Starters (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* 1. Story Context Card with Custom Illustration */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>Story Context (故事背景):</span>
                    </div>

                    {/* Scene Illustration for Lesson 1 and Lesson 2 */}
                    {q.image && (
                      <div className="w-full h-44 rounded-xl overflow-hidden border border-amber-200/80 shadow-2xs relative group">
                        <img
                          src={q.image}
                          alt={q.imageAlt || q.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      {q.storyContext}
                    </p>
                  </div>

                  {/* 2. Key Words Card */}
                  <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-3.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Key Words (核心詞彙):</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {q.keyConcepts.map((kc) => (
                        <div
                          key={kc.word}
                          className="bg-white border border-stone-200 px-2.5 py-1.5 rounded-lg text-xs flex flex-col justify-center shadow-2xs"
                        >
                          <span className="font-bold text-slate-800">{kc.word}</span>
                          <span className="text-[10px] text-purple-700 font-chinese font-medium">
                            {kc.zh}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Sentence Starters & Writing Canvas (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Sentence Starters Card */}
                  <div className="bg-purple-50/50 border border-purple-200/70 rounded-xl p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5 text-purple-600" />
                        <span>Sentence Starters:</span>
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {q.sentenceStarters.map((starter) => (
                        <button
                          key={starter}
                          onClick={() => handleInsertStarter(q.id, starter)}
                          className="w-full text-left text-xs p-2 rounded-lg bg-white border border-purple-200/90 text-purple-950 hover:bg-purple-100/80 hover:border-purple-400 active:scale-98 transition-all flex items-center justify-between group shadow-2xs"
                          title="Click to insert into your reflection"
                        >
                          <span className="font-medium">"{starter}"</span>
                          <span className="text-[10px] text-purple-600 font-bold group-hover:translate-x-0.5 transition-transform">
                            + Use
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clean Writing Canvas Box (without words count and Save Journal text) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                      <span>Your Thoughts:</span>
                    </label>

                    <textarea
                      rows={7}
                      value={reflection}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder="Write your thoughts here... Click Sentence Starters above for ideas!"
                      className="w-full p-4 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-purple-500 bg-stone-50/30 focus:bg-white transition-all leading-relaxed shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
