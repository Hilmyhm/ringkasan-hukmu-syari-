/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft, BookmarkCheck } from 'lucide-react';
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

          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 block font-tajawal">
              اكتمل الاختبار التجريبي بنجاح!
            </span>
            <h2 className="text-3xl font-bold font-amiri">
              نتيجتك: {score} من {totalQuestions} ({percentage}%)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400 font-tajawal max-w-md mx-auto">
              {percentage >= 85
                ? 'ممتاز جداً! إتقان متكامل للمسائل والحدود الأصولية وثمرات الخلاف في الصفحات 1 إلى 141.'
                : percentage >= 65
                ? 'مستوى جيد جداً! يُنصح بمراجعة المسائل الدقيقة كأوقات الواجب الموسع وحكم الشرط قبل الاختبار.'
                : 'تحتاج إلى إعادة قراءة المقتطفات الأصيلة وجداول مقارنة المذاهب لتعزيز الاستيعاب.'}
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-stone-900 dark:text-slate-100">
      
      {/* Quiz Header */}
      <div className="border-b border-stone-200 dark:border-slate-800 pb-5">
        <div className="flex items-center justify-between text-xs mb-1">
          <div className="flex items-center gap-1.5 font-semibold text-rose-800 dark:text-rose-400">
            <HelpCircle className="w-4 h-4" />
            <span>الاختبار التحريري التجريبي (ص 1 - 141)</span>
          </div>

          <span className="font-mono tabular-nums text-stone-500 dark:text-slate-400 font-semibold">
            السؤال {currentQuestionIndex + 1} من {totalQuestions}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-amiri text-stone-900 dark:text-white">
          قياس الفهم والاستيعاب الأصولي
        </h1>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-stone-200 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-linear-to-l from-rose-500 to-amber-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500">
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>مرجع المسألة: صفحة {currentQ.pageNumber} من المقرر</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-amiri text-stone-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let optionClasses = 'border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-800/40 text-stone-800 dark:text-slate-200 hover:border-amber-400 dark:hover:border-amber-600';

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                optionClasses = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-bold';
              } else {
                optionClasses = 'opacity-50 border-stone-200 dark:border-slate-800 text-stone-400 dark:text-slate-500';
              }
            } else if (isSelected) {
              optionClasses = 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-bold shadow-xs';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionClasses}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-stone-200/60 dark:bg-slate-700/60 flex items-center justify-center font-mono text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-tajawal leading-normal">{option}</span>
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

        {/* Explanation Card */}
        {isAnswerSubmitted && (
          <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 space-y-1.5 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block font-tajawal">
              التعليل والتأصيل الأصولي (ص {currentQ.pageNumber}):
            </span>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 font-tajawal leading-relaxed">
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
              className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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
              className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
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
