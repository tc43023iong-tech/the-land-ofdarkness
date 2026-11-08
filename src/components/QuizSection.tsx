import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Trophy, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/storyData';
import { QuizQuestion } from '../types/story';
import { speech } from '../utils/speech';
import { sfx } from '../utils/soundEffects';

interface QuizSectionProps {
  onNextPart?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onNextPart }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, key: 'A' | 'B' | 'C' | 'D', correctAnswer: 'A' | 'B' | 'C' | 'D') => {
    if (selectedAnswers[questionId]) return; // already answered

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: key
    }));

    if (key === correctAnswer) {
      sfx.playCorrect();
    } else {
      sfx.playWrong();
    }
  };

  const handleSpeakQuestion = (q: QuizQuestion) => {
    sfx.playClick();
    speech.speak(q.question);
  };

  const handleReset = () => {
    sfx.playClick();
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/5 rounded-2xl p-5 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider">
            <span>PART B: COMPREHENSION QUIZ</span>
            <span aria-hidden="true">·</span>
            <span>故事理解選擇題</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Part B: Multiple Choice Questions
          </h2>
        </div>

        {/* Score & Controls */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-stone-500 block">Score</span>
            <span className="text-base font-bold text-blue-700">
              {correctCount} / {QUIZ_QUESTIONS.length} Correct
            </span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = Boolean(userAnswer);
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                  : 'bg-white border-stone-200/80 shadow-2xs'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
                {/* Left Side: Question Illustration */}
                {q.image && (
                  <div className="w-full sm:w-48 md:w-44 lg:w-48 h-36 sm:h-40 md:h-44 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200 shadow-2xs relative group self-start">
                    <img
                      src={q.image}
                      alt={q.imageAlt || q.question}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-blue-700/80 backdrop-blur-xs text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {idx + 1}
                    </div>
                  </div>
                )}

                {/* Right Side: Question Header, Options & Explanation */}
                <div className="flex-1 w-full min-w-0">
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2.5">
                      {!q.image && (
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                      )}
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeakQuestion(q)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                      title="Listen to question"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                    {q.options.map((opt) => {
                      const isSelected = userAnswer === opt.key;
                      const isThisCorrect = opt.key === q.correctAnswer;

                      let optionStyle = 'bg-stone-50 border-stone-200 hover:bg-stone-100 hover:border-blue-300 text-slate-800';

                      if (isAnswered) {
                        if (isThisCorrect) {
                          optionStyle = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-semibold shadow-xs';
                        } else if (isSelected && !isThisCorrect) {
                          optionStyle = 'bg-rose-100/80 border-rose-400 text-rose-950';
                        } else {
                          optionStyle = 'bg-stone-50/60 border-stone-200 text-stone-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(q.id, opt.key, q.correctAnswer)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${optionStyle}`}
                        >
                          <span className="font-bold text-xs w-5 h-5 rounded-md flex items-center justify-center shrink-0 bg-white/70 shadow-xs">
                            {opt.key}
                          </span>
                          <div className="flex-1">
                            <span className="text-sm block">{opt.text}</span>
                          </div>
                          {isAnswered && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {isAnswered && isSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Dropdown on answered */}
                  {isAnswered && (
                    <div className={`mt-3.5 p-3.5 rounded-xl text-xs space-y-1.5 ${
                      isCorrect ? 'bg-emerald-50/80 text-emerald-950' : 'bg-rose-50/80 text-rose-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Correct! 正確解答</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Not quite! 正確答案是 {q.correctAnswer}</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                      <p className="italic text-stone-600 border-t border-stone-200/60 pt-1 mt-1">
                        📖 Story Quote: "{q.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {answeredCount === QUIZ_QUESTIONS.length && (
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/5 rounded-2xl p-5 border border-emerald-300 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Quiz Completed! You scored {correctCount} / {QUIZ_QUESTIONS.length}
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            {correctCount === 5
              ? 'Outstanding! You have mastered the details of this story perfectly!'
              : 'Great job! Review any questions you missed and continue to Part C!'}
          </p>

          <div className="pt-2">
            <button
              onClick={onNextPart}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
            >
              <span>Continue to Part C: Listening & Shadowing (填空與朗讀)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
