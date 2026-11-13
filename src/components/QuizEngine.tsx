/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/curriculum';
import { QUIZ_QUESTIONS } from '../data/curriculumData';

export const QuizEngine: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-stone-900 dark:text-slate-100">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 mx-auto flex items-center justify-center text-amber-700 dark:text-amber-300">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 block font-tajawal">
              اكتمل الاختبار التجريبي
            </span>
            <h2 className="study-title text-3xl sm:text-4xl font-bold tabular-nums">
              نتيجتك: {score} من {totalQuestions} ({percentage}%)
            </h2>
            <p className="study-subtext text-stone-600 dark:text-slate-400 max-w-md mx-auto">
              {percentage >= 85
                ? 'إتقان متكامل للمسائل والحدود الأصولية وثمرات الخلاف في الصفحات ١ إلى ١٤١.'
                : percentage >= 65
                ? 'مستوى جيد جداً! يُنصح بمراجعة المسائل الدقيقة كأوقات الواجب الموسع وحكم الشرط وأقسام الرخص.'
                : 'يُنصح بإعادة مراجعة المقتطفات الأصيلة وجداول مقارنة المذاهب لتعزيز الاستيعاب.'}
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 text-stone-900 dark:text-slate-100">
      
      {/* Quiz Header */}
      <header className="border-b border-stone-200 dark:border-slate-800 pb-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-slate-500 font-tajawal">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
            <span>الاختبار التحريري التجريبي · ص ١ - ١٤١</span>
          </div>

          <span className="tabular-nums font-medium">
            السؤال {currentQuestionIndex + 1} من {totalQuestions}
          </span>
        </div>

        <h1 className="study-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
          قياس الفهم والاستيعاب الأصولي
        </h1>

        <div className="w-full h-1.5 bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-l from-rose-500 to-amber-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </header>

      {/* Question Card */}
      <div className="p-6 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-7">
        
        <div className="space-y-2">
          <span className="text-xs text-stone-400 dark:text-slate-500 tabular-nums font-tajawal block">
            صفحة {currentQ.pageNumber} من المقرر
          </span>
          <h2 className="study-heading text-xl sm:text-2xl font-bold text-stone-950 dark:text-white leading-[1.6]">
            {currentQ.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let optionClasses =
              'border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-800/40 text-stone-800 dark:text-slate-100 hover:border-amber-400 dark:hover:border-amber-600';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionClasses =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-semibold';
              } else if (isSelected && !isCorrect) {
                optionClasses =
                  'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-semibold';
              } else {
                optionClasses =
                  'opacity-45 border-stone-200 dark:border-slate-800 text-stone-400 dark:text-slate-500';
              }
            } else if (isSelected) {
              optionClasses =
                'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-semibold shadow-xs';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-right px-5 py-4 rounded-xl border text-base leading-[1.75] transition-all flex items-center justify-between gap-4 ${optionClasses}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-7 h-7 rounded-lg bg-stone-200/70 dark:bg-slate-700/70 flex items-center justify-center font-mono text-xs tabular-nums shrink-0 text-stone-600 dark:text-slate-300">
                    {idx + 1}
                  </span>
                  <span className="font-tajawal">{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}

                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Callout */}
        {isAnswerSubmitted && (
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 space-y-1.5 animate-in fade-in duration-200">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block font-tajawal">
              التأصيل الأصولي · ص {currentQ.pageNumber}
            </span>
            <p className="study-body text-stone-700 dark:text-slate-200">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Actions Button */}
        <div className="pt-2 flex justify-end">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedOption === null
                  ? 'opacity-40 cursor-not-allowed bg-stone-200 dark:bg-slate-800 text-stone-500'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs'
              }`}
            >
              تحقق من الإجابة
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors shadow-xs"
            >
              <span>{currentQuestionIndex < totalQuestions - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
