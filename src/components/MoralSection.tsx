import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Volume2, Save, Check, Lightbulb, HeartHandshake, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
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

  const [expandedModelAnswers, setExpandedModelAnswers] = useState<Record<number, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<Record<number, boolean>>({});

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

  const handleSaveManual = (id: number) => {
    sfx.playCorrect();
    try {
      localStorage.setItem('wukong_moral_reflections', JSON.stringify(userReflections));
    } catch {
      // ignore
    }
    setSaveStatus((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSaveStatus((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleSpeakQuestion = (q: MoralQuestion) => {
    sfx.playClick();
    speech.speak(`${q.title}. ${q.question}`);
  };

  const toggleModelAnswer = (id: number) => {
    sfx.playClick();
    setExpandedModelAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/5 rounded-2xl p-5 border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-800 tracking-wider">
            <span>PART E: OPEN-ENDED QUESTIONS & MORAL LESSONS</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Moral Reflections on Sun Wukong's Choices
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <HeartHandshake className="w-4 h-4 text-purple-600" />
          <span>Reflective Learning & Character Education</span>
        </div>
      </div>

      {/* Moral Lessons Cards */}
      <div className="space-y-6">
        {MORAL_QUESTIONS.map((q) => {
          const reflection = userReflections[q.id] || '';
          const isSaved = saveStatus[q.id];
          const isModelOpen = expandedModelAnswers[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-4"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {q.id === 1 ? <ShieldCheck className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-700 tracking-wider">
                      {q.title}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                      {q.question}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeakQuestion(q)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-purple-600 hover:bg-purple-50 transition-colors self-end sm:self-auto shrink-0"
                  title="Listen to question"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Story Context Box */}
              <div className="bg-purple-50/50 rounded-xl p-3.5 border border-purple-100/70 text-xs">
                <span className="font-bold text-purple-900 block mb-1">
                  📖 Story Context:
                </span>
                <p className="text-purple-950 leading-relaxed">{q.storyContext}</p>
              </div>

              {/* Key Concept Vocabulary Tags - KEEP Chinese here */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-stone-400 font-medium">Key Concepts:</span>
                {q.keyConcepts.map((kc) => (
                  <span
                    key={kc.word}
                    className="text-xs px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-md font-medium"
                  >
                    {kc.word} <span className="text-stone-400 font-chinese">({kc.zh})</span>
                  </span>
                ))}
              </div>

              {/* Sentence Starters */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>Sentence Starters:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {q.sentenceStarters.map((starter) => (
                    <button
                      key={starter}
                      onClick={() => handleInsertStarter(q.id, starter)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 text-stone-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-900 transition-all text-left"
                    >
                      "{starter}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection Input Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                    <span>Your Thoughts & Reflection:</span>
                  </label>
                  <button
                    onClick={() => handleSaveManual(q.id)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 flex items-center gap-1 transition-colors"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Saved!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Journal</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={reflection}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder="Write your opinion in English... (e.g. In my opinion, having great power does not mean...)"
                  className="w-full p-3.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-purple-400 bg-stone-50/50 focus:bg-white transition-all leading-relaxed"
                />
              </div>

              {/* Model Answers Accordion */}
              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={() => toggleModelAnswer(q.id)}
                  className="flex items-center justify-between w-full text-xs font-bold text-stone-600 hover:text-purple-700 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Sample Perspectives & Teacher's Guide</span>
                  </span>
                  {isModelOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isModelOpen && (
                  <div className="mt-3 space-y-3 pt-2">
                    {q.sampleResponses.map((sr, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-900">
                            {sr.perspective}
                          </span>
                          <button
                            onClick={() => speech.speak(sr.textEn)}
                            className="p-1 text-stone-400 hover:text-purple-600 transition-colors"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-stone-800 leading-relaxed font-medium">
                          {sr.textEn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
