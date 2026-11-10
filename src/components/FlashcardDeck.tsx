/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, RotateCw, CheckCircle, HelpCircle, Shuffle, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import { Flashcard } from '../types/curriculum';
import { FLASHCARDS } from '../data/curriculumData';

export const FlashcardDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(FLASHCARDS.map((c) => c.category)))];

  const filteredCards = FLASHCARDS.filter((card) => {
    if (categoryFilter === 'all') return true;
    return card.category === categoryFilter;
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!currentCard) {
    return <div className="p-8 text-center text-stone-500">لا توجد بطاقات في هذا التصنيف.</div>;
  }

  const isMastered = !!masteredIds[currentCard.id];
  const totalMasteredCount = Object.values(masteredIds).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-stone-900 dark:text-slate-100">
      
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1">
            <Award className="w-4 h-4" />
            <span>المراجعة السريعة للامتحانات</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-amiri text-stone-900 dark:text-white">
            بطاقات الاستذكار للحدود والقواعد الأصولية
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400 font-tajawal mt-1">
            اختبر استحضارك للمصطلحات والتعريفات والقواعد المقررة في الصفحات 1 إلى 125.
          </p>
        </div>

        {/* Mastered Counter */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs font-semibold font-tajawal text-purple-900 dark:text-purple-300">
            أتقنت: {totalMasteredCount} من {FLASHCARDS.length}
          </div>
          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 border border-stone-200 dark:border-slate-700 transition-colors"
            title="ترتيب عشوائي"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategoryFilter(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === cat
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? 'جميع البطاقات' : cat}
          </button>
        ))}
      </div>

      {/* Interactive 3D Flip Card Container */}
      <div className="perspective-1000 my-6">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full min-h-[340px] sm:min-h-[380px] p-6 sm:p-10 rounded-3xl cursor-pointer select-none transition-all duration-500 shadow-xl border flex flex-col justify-between ${
            isFlipped
              ? 'bg-purple-950 text-white border-purple-800'
              : 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white border-stone-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-700'
          }`}
        >
          {/* Card Top Label */}
          <div className="flex items-center justify-between text-xs">
            <span className={`px-2.5 py-0.5 rounded-md font-bold font-tajawal ${
              isFlipped ? 'bg-purple-900 text-purple-200' : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}>
              {currentCard.category}
            </span>

            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs tabular-nums ${isFlipped ? 'text-purple-300' : 'text-stone-400 dark:text-slate-500'}`}>
                صفحة {currentCard.pageNumber}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`p-1 rounded-md transition-colors ${
                  isMastered ? 'text-emerald-400' : 'text-stone-300 hover:text-stone-500'
                }`}
                title={isMastered ? 'تم الحفظ' : 'تمييز كـ محفوظ'}
              >
                <Bookmark className={`w-4 h-4 ${isMastered ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Central Question or Answer */}
          <div className="my-auto py-6 text-center space-y-4">
            {!isFlipped ? (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold block">
                  السؤال أو المصطلح الأصولي
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-amiri leading-relaxed">
                  {currentCard.front}
                </h3>
                <span className="text-xs text-stone-400 dark:text-slate-500 block pt-2">
                  (انقر فوق البطاقة لكشف الجواب والضابط)
                </span>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-200">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block">
                  الجواب والضابط المحرر
                </span>
                <p className="text-xl sm:text-2xl font-bold font-amiri text-purple-100 leading-relaxed">
                  {currentCard.back}
                </p>
                <div className="mt-4 p-3 rounded-xl bg-purple-900/60 border border-purple-700/60 text-xs sm:text-sm text-purple-200 font-tajawal max-w-lg mx-auto">
                  <span className="font-bold text-amber-300 block mb-0.5">القاعدة والضابط:</span>
                  {currentCard.keyRule}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Strip */}
          <div className="flex items-center justify-between text-xs text-stone-400 dark:text-slate-500 pt-3 border-t border-stone-100 dark:border-slate-800/80">
            <span className="font-mono tabular-nums">
              البطاقة {currentIndex + 1} من {filteredCards.length}
            </span>

            <div className="flex items-center gap-1.5 font-tajawal">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'انقر لإعادة السؤال' : 'انقر لقلب البطاقة'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:bg-stone-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>البطاقة السابقة</span>
        </button>

        <button
          onClick={() => toggleMastered(currentCard.id)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            isMastered
              ? 'bg-emerald-600 text-white'
              : 'bg-stone-200 dark:bg-slate-800 text-stone-800 dark:text-slate-200 hover:bg-emerald-100'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isMastered ? 'تم إتقانها بنجاح' : 'تحديد كـ متقنة'}</span>
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
        >
          <span>البطاقة التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
