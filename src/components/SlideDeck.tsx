/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Layers,
  FileText,
  Sparkles,
  Bookmark,
  Compass,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { Lesson, KeyPoint, PDFExcerpt } from '../types/curriculum';
import { LESSONS, PDF_EXCERPTS } from '../data/curriculumData';

interface SlideDeckProps {
  onOpenExcerpt: (excerpt: PDFExcerpt) => void;
  onSwitchToHub: (lessonId?: number) => void;
  targetLessonId?: number;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({
  onOpenExcerpt,
  onSwitchToHub,
  targetLessonId,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetLessonId) {
      const idx = LESSONS.findIndex((l) => l.id === targetLessonId);
      if (idx !== -1) setCurrentSlideIndex(idx);
    }
  }, [targetLessonId]);

  const totalSlides = LESSONS.length;
  const currentLesson: Lesson = LESSONS[currentSlideIndex];

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
      );
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        setCurrentSlideIndex(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between islamic-pattern bg-stone-100/60 dark:bg-slate-950 text-stone-900 dark:text-slate-100 pb-20">
      
      {/* Quiet Top Control Strip */}
      <div className="w-full border-b border-stone-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xs px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>فهرس الدروس</span>
          </button>

          <span className="text-stone-300 dark:text-slate-700 hidden sm:inline" aria-hidden="true">·</span>

          <span className="hidden sm:inline truncate text-xs text-stone-400 dark:text-slate-500 font-tajawal">
            {currentLesson.unit}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-stone-400 dark:text-slate-500 tabular-nums font-tajawal">
            {currentSlideIndex + 1} / {totalSlides}
          </span>

          <div className="w-24 sm:w-32 h-1.5 bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-l from-amber-500 to-emerald-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Slide Reading Surface */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex items-start">
        <article
          ref={slideRef}
          className="w-full bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg space-y-8"
        >
          {/* Tier 1: Title & Quiet Unboxed Metadata */}
          <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500 font-tajawal">
                <span className="text-amber-700 dark:text-amber-400/90 font-medium">{currentLesson.number}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{currentLesson.pageRange}</span>
              </div>
              <h1 className="study-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
                {currentLesson.title}
              </h1>
            </div>

            <button
              onClick={() => onSwitchToHub(currentLesson.id)}
              className="self-start sm:self-end inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span>عرض في لوحة المذاكرة</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </header>

          {/* Tier 2: Quiet Editorial Introduction */}
          <p className="study-subtext text-stone-600 dark:text-slate-300 bg-stone-50/80 dark:bg-slate-800/30 rounded-2xl px-5 py-4 border border-stone-200/60 dark:border-slate-800/80">
            <span className="text-xs font-semibold text-stone-400 dark:text-slate-500 block mb-1">
              تمهيد الدرس
            </span>
            {currentLesson.introduction}
          </p>

          {/* Tier 1 (Dominant Focal Content): Core Material */}
          <section className="space-y-6">
            {currentLesson.keyPoints.map((point: KeyPoint, idx: number) => {
              const excerpt = PDF_EXCERPTS[point.excerptId];
              return (
                <div
                  key={point.id}
                  className="p-6 sm:p-7 rounded-2xl bg-stone-50/50 dark:bg-slate-800/40 border border-stone-200/80 dark:border-slate-800 hover:border-amber-400/70 dark:hover:border-amber-600/60 transition-colors space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-stone-400 dark:text-slate-500 tabular-nums block">
                        المسألة {idx + 1}
                      </span>
                      <h2 className="study-heading text-xl sm:text-2xl font-bold text-stone-950 dark:text-white">
                        {point.title}
                      </h2>
                    </div>

                    {excerpt && (
                      <button
                        onClick={() => onOpenExcerpt(excerpt)}
                        className="shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
                        title={`عرض نص المقرر الأصلي ص ${excerpt.pageNumber}`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>النص الأصلي · ص {excerpt.pageNumber}</span>
                      </button>
                    )}
                  </div>

                  {/* Primary Study Text — High contrast, generous font & line-height */}
                  <p className="study-body text-stone-800 dark:text-slate-100 font-normal">
                    {point.summary}
                  </p>

                  {/* Supporting Details — Clearly separated & stepped down */}
                  {point.details && point.details.length > 0 && (
                    <div className="pt-4 border-t border-stone-200/70 dark:border-slate-700/60">
                      <span className="text-xs font-medium text-stone-400 dark:text-slate-500 block mb-2.5">
                        التفصيل والتمثيل
                      </span>
                      <ul className="space-y-2.5 study-subtext text-stone-600 dark:text-slate-300 pr-1">
                        {point.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-start gap-2.5">
                            <span className="text-amber-600/70 dark:text-amber-400/70 mt-1 text-xs shrink-0" aria-hidden="true">◆</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* Tier 2: Quiet Exam Guidance (Visually distinct from core material) */}
          {currentLesson.examTips && currentLesson.examTips.length > 0 && (
            <aside className="pt-5 border-t border-stone-200/70 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>توجيهات للمراجعة والامتحان</span>
              </div>
              <ul className="space-y-1.5 text-sm leading-[1.8] text-stone-500 dark:text-slate-400 font-tajawal pr-1">
                {currentLesson.examTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600/60 dark:text-emerald-500/60 mt-1 text-xs" aria-hidden="true">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </article>
      </main>

      {/* Bottom Navigation Controls */}
      <footer className="fixed bottom-0 inset-x-0 z-30 bg-stone-50/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-stone-200 dark:border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed text-stone-400 dark:text-slate-600'
                : 'bg-stone-200 dark:bg-slate-800 hover:bg-stone-300 dark:hover:bg-slate-700 text-stone-800 dark:text-white'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>الدرس السابق</span>
          </button>

          <span className="hidden sm:inline text-xs text-stone-400 dark:text-slate-500 font-tajawal">
            التنقل بالأسهم أو المسافة
          </span>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-40 cursor-not-allowed text-stone-400 dark:text-slate-600'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs'
            }`}
          >
            <span>الدرس التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Slide Navigation Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-start"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm sm:max-w-md h-full bg-white dark:bg-slate-900 border-l border-stone-200 dark:border-slate-800 p-5 overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-bold font-amiri text-xl text-stone-900 dark:text-white">
                  فهرس شرائح المنهج (ص 1 - 141)
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-white text-sm"
              >
                إغلاق
              </button>
            </div>

            <div className="flex-1 divide-y divide-stone-100 dark:divide-slate-800 mt-3 space-y-1">
              {LESSONS.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full text-right p-3.5 rounded-xl transition-colors flex items-center justify-between gap-3 ${
                    idx === currentSlideIndex
                      ? 'bg-amber-100/90 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 font-bold'
                      : 'hover:bg-stone-50 dark:hover:bg-slate-800/60 text-stone-700 dark:text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs block text-stone-400 dark:text-slate-500 font-tajawal font-normal">
                      {lesson.number} · {lesson.pageRange}
                    </span>
                    <span className="text-base font-amiri block leading-snug">
                      {lesson.title}
                    </span>
                  </div>

                  {idx === currentSlideIndex && (
                    <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
