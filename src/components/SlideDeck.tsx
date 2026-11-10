/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Layers, 
  FileText, 
  RotateCcw, 
  Sparkles, 
  Bookmark,
  Compass,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { Lesson, KeyPoint, PDFExcerpt } from '../types/curriculum';
import { LESSONS, PDF_EXCERPTS } from '../data/curriculumData';

interface SlideDeckProps {
  onOpenExcerpt: (excerpt: PDFExcerpt) => void;
  onSwitchToHub: (lessonId?: number) => void;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ onOpenExcerpt, onSwitchToHub }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const totalSlides = LESSONS.length;
  const currentLesson: Lesson = LESSONS[currentSlideIndex];

  // GSAP animation on slide change
  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, y: 15, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // In RTL: ArrowLeft is Next, ArrowRight is Previous
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
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between islamic-pattern bg-stone-100/60 dark:bg-slate-950 text-stone-900 dark:text-slate-100 pb-16">
      
      {/* Top Slide Control Bar */}
      <div className="w-full border-b border-stone-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 font-medium transition-colors border border-stone-200 dark:border-slate-700"
            title="فهرس الشرائح والدروس"
          >
            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>فهرس الدروس</span>
          </button>

          <span className="text-stone-400 dark:text-slate-600">|</span>

          <span className="font-tajawal text-stone-500 dark:text-slate-400">
            {currentLesson.unit}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-tajawal font-medium text-stone-600 dark:text-slate-300 tabular-nums">
            الشريحة {currentSlideIndex + 1} من {totalSlides}
          </span>

          <div className="w-24 sm:w-36 h-2 bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-l from-amber-500 to-emerald-600 transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center">
        <div
          ref={slideRef}
          className="w-full bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-300"
        >
          {/* Header of the Slide */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-400 font-semibold mb-1">
                <span>{currentLesson.number}</span>
                <span>·</span>
                <span className="tabular-nums font-mono">الصفحات: {currentLesson.pageRange}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-amiri text-stone-900 dark:text-white">
                {currentLesson.title}
              </h1>
            </div>

            <button
              onClick={() => onSwitchToHub(currentLesson.id)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>فتح في لوحة المذاكرة</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

          {/* Lesson Introduction */}
          <div className="my-5 p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-stone-700 dark:text-amber-100/90 text-sm leading-relaxed font-tajawal">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">مدخل الدرس والمقصد:</span>
            {currentLesson.introduction}
          </div>

          {/* Key Summarized Points with Clickable Excerpt Button for each */}
          <div className="space-y-4 my-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-slate-400 font-tajawal">
              الخلاصة المنهجية والنقاط الجوهرية (انقر زر المقتطف لعرض نص الـ PDF):
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {currentLesson.keyPoints.map((point: KeyPoint) => {
                const excerpt = PDF_EXCERPTS[point.excerptId];
                return (
                  <div
                    key={point.id}
                    className="group relative p-4 sm:p-5 rounded-2xl bg-stone-50/80 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700/80 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <h3 className="text-base sm:text-lg font-bold font-amiri text-stone-900 dark:text-slate-100 leading-snug">
                          {point.title}
                        </h3>
                        <p className="text-stone-700 dark:text-slate-300 text-sm leading-relaxed font-tajawal">
                          {point.summary}
                        </p>

                        {point.details && point.details.length > 0 && (
                          <ul className="mt-2 space-y-1 text-xs sm:text-sm text-stone-600 dark:text-slate-300 list-disc list-inside">
                            {point.details.map((detail, idx) => (
                              <li key={idx} className="leading-normal">{detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Clickable Excerpt Button */}
                      {excerpt && (
                        <button
                          onClick={() => onOpenExcerpt(excerpt)}
                          className="shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 font-tajawal text-xs font-semibold shadow-xs transition-all duration-150 active:scale-95"
                          title={`عرض مقتطف نص المقرر ص ${excerpt.pageNumber}`}
                        >
                          <FileText className="w-4 h-4" />
                          <span>عرض مقتطف ص {excerpt.pageNumber}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Tips Callout */}
          {currentLesson.examTips && currentLesson.examTips.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>تنبيهات وتوجيهات للامتحان:</span>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-emerald-100/90 list-disc list-inside font-tajawal">
                {currentLesson.examTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom Navigation Controls (Reveal.js Style) */}
      <footer className="fixed bottom-0 inset-x-0 z-30 bg-stone-50/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-stone-200 dark:border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed text-stone-400 dark:text-slate-600'
                : 'bg-stone-200 dark:bg-slate-800 hover:bg-stone-300 dark:hover:bg-slate-700 text-stone-800 dark:text-white'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>الشريحة السابقة (السهم الأيمن)</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 dark:text-slate-400 font-mono">
            <span>استخدم مفاتيح الأسهم أو مسافة للتنقل</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-40 cursor-not-allowed text-stone-400 dark:text-slate-600'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs'
            }`}
          >
            <span>الشريحة التالية (السهم الأيسر)</span>
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
                <h3 className="font-bold font-amiri text-lg text-stone-900 dark:text-white">
                  فهرس شرائح المنهج (ص 1 - 125)
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
                  className={`w-full text-right p-3 rounded-xl transition-colors flex items-center justify-between gap-2 ${
                    idx === currentSlideIndex
                      ? 'bg-amber-100/90 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 font-bold'
                      : 'hover:bg-stone-50 dark:hover:bg-slate-800/60 text-stone-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-[11px] block text-stone-400 dark:text-slate-500 font-tajawal">
                      {lesson.number} · {lesson.pageRange}
                    </span>
                    <span className="text-sm font-amiri block">
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
