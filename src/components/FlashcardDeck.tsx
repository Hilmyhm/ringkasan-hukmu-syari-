/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Award, RotateCw, CheckCircle, Shuffle, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import gsap from 'gsap';
import { Flashcard } from '../types/curriculum';
import { FLASHCARDS } from '../data/curriculumData';

export const FlashcardDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const cardInnerRef = useRef<HTMLDivElement>(null);

  const categories = ['all', ...Array.from(new Set(FLASHCARDS.map((c) => c.category)))];

  const filteredCards = FLASHCARDS.filter((card) => {
    if (categoryFilter === 'all') return true;
    return card.category === categoryFilter;
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  // Smooth GSAP 3D flip synced with transform-style: preserve-3d
  useEffect(() => {
    if (cardInnerRef.current) {
      gsap.to(cardInnerRef.current, {
        rotateY: isFlipped ? 180 : 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [isFlipped]);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 text-stone-900 dark:text-slate-100">
      
      {/* Header Strip */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500 font-tajawal">
            <Award className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
            <span>استذكار الحدود والقواعد · ص ١ - ١٤١</span>
          </div>
          <h1 className="study-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
            بطاقات الاستذكار الأصولية
          </h1>
        </div>

        {/* Clean Unboxed Counter + Shuffle */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 font-tajawal tabular-nums">
            تم إتقان <strong className="text-purple-700 dark:text-purple-300">{totalMasteredCount}</strong> من {FLASHCARDS.length}
          </span>
          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-600 dark:text-slate-200 border border-stone-200 dark:border-slate-700 transition-colors"
            title="بطاقة عشوائية"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategoryFilter(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              categoryFilter === cat
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat === 'all' ? 'جميع البطاقات' : cat}
          </button>
        ))}
      </div>

      {/* Interactive 3D Flip Card */}
      <div className="flashcard-scene my-6">
        <div
          ref={cardInnerRef}
          onClick={() => setIsFlipped(!isFlipped)}
          className="flashcard-inner w-full min-h-[360px] sm:min-h-[400px] cursor-pointer select-none"
        >
          {/* Front Face */}
          <div className="flashcard-face absolute inset-0 p-7 sm:p-10 rounded-3xl shadow-xl border bg-white dark:bg-slate-900 text-stone-900 dark:text-white border-stone-200 dark:border-slate-800 hover:border-purple-400/70 dark:hover:border-purple-600/70 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-400 dark:text-slate-500">
              <span>{currentCard.category} · صفحة {currentCard.pageNumber}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isMastered ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-300 hover:text-stone-500'
                }`}
                title={isMastered ? 'تم الحفظ' : 'تمييز كـ متقنة'}
              >
                <Bookmark className={`w-4 h-4 ${isMastered ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="my-auto py-6 text-center max-w-2xl mx-auto">
              <h2 className="study-title text-2xl sm:text-3xl font-bold text-stone-950 dark:text-white leading-[1.6]">
                {currentCard.front}
              </h2>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 dark:text-slate-500 pt-4 border-t border-stone-100 dark:border-slate-800/80">
              <span className="tabular-nums font-tajawal">
                {currentIndex + 1} / {filteredCards.length}
              </span>
              <span className="inline-flex items-center gap-1.5 font-tajawal">
                <RotateCw className="w-3.5 h-3.5" />
                <span>انقر لعرض الجواب</span>
              </span>
            </div>
          </div>

          {/* Back Face */}
          <div className="flashcard-face flashcard-face-back absolute inset-0 p-7 sm:p-10 rounded-3xl shadow-xl border bg-purple-950 text-white border-purple-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-purple-300/80">
              <span>الجواب المحرر · صفحة {currentCard.pageNumber}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isMastered ? 'text-emerald-400' : 'text-purple-300/50 hover:text-purple-200'
                }`}
                title={isMastered ? 'تم الحفظ' : 'تمييز كـ متقنة'}
              >
                <Bookmark className={`w-4 h-4 ${isMastered ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="my-auto py-4 text-center space-y-5 max-w-2xl mx-auto">
              <p className="study-heading text-xl sm:text-2xl font-bold text-white leading-[1.75]">
                {currentCard.back}
              </p>

              <div className="pt-4 border-t border-purple-800/80 text-right max-w-xl mx-auto">
                <span className="text-xs font-semibold text-amber-300 block mb-1">
                  القاعدة والضابط
                </span>
                <p className="study-subtext text-purple-100/90">
                  {currentCard.keyRule}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-purple-300/70 pt-4 border-t border-purple-800/70">
              <span className="tabular-nums font-tajawal">
                {currentIndex + 1} / {filteredCards.length}
              </span>
              <span className="inline-flex items-center gap-1.5 font-tajawal">
                <RotateCw className="w-3.5 h-3.5" />
                <span>انقر للعودة للسؤال</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:bg-stone-50 dark:hover:bg-slate-800 text-sm font-semibold transition-colors whitespace-nowrap"
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابقة</span>
        </button>

        <button
          onClick={() => toggleMastered(currentCard.id)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
            isMastered
              ? 'bg-emerald-600 text-white'
              : 'bg-stone-200/80 dark:bg-slate-800 text-stone-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-950/60'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isMastered ? 'تم إتقانها' : 'تحديد كـ متقنة'}</span>
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold transition-colors shadow-xs whitespace-nowrap"
        >
          <span>التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
