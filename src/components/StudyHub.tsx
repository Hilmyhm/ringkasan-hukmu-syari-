/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  FileText,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Presentation,
} from 'lucide-react';
import { KeyPoint, PDFExcerpt } from '../types/curriculum';
import { LESSONS, PDF_EXCERPTS } from '../data/curriculumData';

interface StudyHubProps {
  onOpenExcerpt: (excerpt: PDFExcerpt) => void;
  onJumpToSlide: (lessonId: number) => void;
  initialLessonId?: number;
}

export const StudyHub: React.FC<StudyHubProps> = ({
  onOpenExcerpt,
  onJumpToSlide,
  initialLessonId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [expandedLessonIds, setExpandedLessonIds] = useState<Record<number, boolean>>(() => {
    const map: Record<number, boolean> = {};
    if (initialLessonId) {
      map[initialLessonId] = true;
    } else {
      map[1] = true;
      map[2] = true;
    }
    return map;
  });

  const toggleExpand = (id: number) => {
    setExpandedLessonIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const map: Record<number, boolean> = {};
    LESSONS.forEach((l) => (map[l.id] = true));
    setExpandedLessonIds(map);
  };

  const collapseAll = () => {
    setExpandedLessonIds({});
  };

  const filteredLessons = useMemo(() => {
    return LESSONS.filter((lesson) => {
      if (selectedUnit !== 'all' && !lesson.unit.includes(selectedUnit)) {
        return false;
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();

      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchIntro = lesson.introduction.toLowerCase().includes(q);
      const matchPoints = lesson.keyPoints.some(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          (p.details && p.details.some((d) => d.toLowerCase().includes(q)))
      );
      const matchPages = lesson.pageRange.includes(q);

      return matchTitle || matchIntro || matchPoints || matchPages;
    });
  }, [searchQuery, selectedUnit]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-stone-900 dark:text-slate-100">
      
      {/* Hero Header */}
      <section className="relative p-7 sm:p-9 rounded-3xl bg-linear-to-r from-amber-950 to-emerald-950 text-white shadow-lg overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <p className="text-xs font-medium text-amber-200/80 font-tajawal">
            بكالوريوس الشريعة · مقرر أصل ٣١١٠
          </p>
          <h1 className="study-title text-3xl sm:text-4xl font-bold">
            لوحة المذاكرة الشاملة والتحليل الفقهي (ص ١ - ١٤١)
          </h1>
          <p className="study-subtext text-stone-200/90 max-w-2xl">
            استعراض هيكلي شامل لمباحث المقرر من مبادئ الأصول ومذاهب الأئمة إلى تفاصيل الحكم التكليفي والوضعي، مع إمكانية استعراض النصوص الأصلية لكل مسألة.
          </p>
        </div>

        {/* Clean Unboxed Stats Strip */}
        <div className="mt-7 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="block text-2xl font-bold font-mono tabular-nums text-amber-300">141</span>
            <span className="text-xs text-stone-300/80 font-tajawal">صفحة موثقة</span>
          </div>
          <div>
            <span className="block text-2xl font-bold font-mono tabular-nums text-emerald-300">{LESSONS.length}</span>
            <span className="text-xs text-stone-300/80 font-tajawal">درساً علمياً</span>
          </div>
          <div>
            <span className="block text-2xl font-bold font-mono tabular-nums text-cyan-300">4</span>
            <span className="text-xs text-stone-300/80 font-tajawal">مذاهب مقارنة</span>
          </div>
          <div>
            <span className="block text-2xl font-bold font-mono tabular-nums text-rose-300">100%</span>
            <span className="text-xs text-stone-300/80 font-tajawal">نصوص أصلية مرتبطة</span>
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-stone-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المسائل أو الصفحات..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-sm sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500 font-tajawal transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-3 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-white"
            >
              مسح
            </button>
          )}
        </div>

        {/* Unit Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `جميع الأبواب (${LESSONS.length})` },
            { id: 'مقدمة', label: 'مقدمة الأصول' },
            { id: 'التكليفي', label: 'الحكم التكليفي' },
            { id: 'الوضعي', label: 'الحكم الوضعي' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedUnit(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedUnit === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Expand/Collapse Toggle */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500 shrink-0">
          <button onClick={expandAll} className="hover:text-amber-600 transition-colors whitespace-nowrap">
            فتح الكل
          </button>
          <span aria-hidden="true">·</span>
          <button onClick={collapseAll} className="hover:text-amber-600 transition-colors whitespace-nowrap">
            طي الكل
          </button>
        </div>
      </div>

      {/* Search results message */}
      {searchQuery && (
        <div className="text-xs text-stone-400 dark:text-slate-500 px-1">
          نتائج البحث ({filteredLessons.length}): «{searchQuery}»
        </div>
      )}

      {/* Lessons Accordion List */}
      <div className="space-y-5">
        {filteredLessons.map((lesson) => {
          const isExpanded = !!expandedLessonIds[lesson.id];

          return (
            <article
              key={lesson.id}
              className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(lesson.id)}
                className="w-full text-right p-5 sm:p-7 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70 dark:hover:bg-slate-800/35 select-none transition-colors"
              >
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 dark:text-slate-500 font-tajawal">
                    <span className="font-semibold text-amber-700 dark:text-amber-400/90">{lesson.number}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{lesson.pageRange}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lesson.unit}</span>
                  </div>
                  <h2 className="study-heading text-xl sm:text-2xl font-bold text-stone-950 dark:text-white">
                    {lesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToSlide(lesson.id);
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-600 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-200 text-xs font-medium transition-colors whitespace-nowrap"
                    title="الانتقال إلى هذه الشريحة في العرض"
                  >
                    <Presentation className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>عرض بالشرائح</span>
                  </button>

                  <div className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-5 sm:px-7 pb-7 pt-5 border-t border-stone-100 dark:border-slate-800/80 space-y-7">
                  
                  {/* Quiet Lesson Intro */}
                  <p className="study-subtext text-stone-600 dark:text-slate-300 leading-relaxed">
                    {lesson.introduction}
                  </p>

                  {/* Core Study Material — Dominant Visual Focus */}
                  <div className="space-y-5">
                    {lesson.keyPoints.map((point: KeyPoint) => {
                      const excerpt = PDF_EXCERPTS[point.excerptId];

                      return (
                        <div
                          key={point.id}
                          className="p-5 sm:p-6 rounded-2xl bg-stone-50/70 dark:bg-slate-800/40 border border-stone-200/80 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700/60 transition-colors space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <h3 className="study-heading font-bold text-xl sm:text-[22px] text-stone-950 dark:text-white flex-1">
                              {point.title}
                            </h3>

                            {excerpt && (
                              <button
                                onClick={() => onOpenExcerpt(excerpt)}
                                className="shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 text-xs sm:text-sm font-semibold font-tajawal transition-all whitespace-nowrap"
                              >
                                <FileText className="w-4 h-4" />
                                <span>النص الأصلي · ص {excerpt.pageNumber}</span>
                              </button>
                            )}
                          </div>

                          {/* Primary Material Body */}
                          <p className="study-body text-stone-800 dark:text-slate-100">
                            {point.summary}
                          </p>

                          {/* Secondary Elaborations */}
                          {point.details && point.details.length > 0 && (
                            <ul className="pt-3.5 border-t border-stone-200/70 dark:border-slate-700/60 space-y-2 study-subtext text-stone-600 dark:text-slate-300">
                              {point.details.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="text-amber-600/70 dark:text-amber-400/70 mt-1 text-xs shrink-0" aria-hidden="true">◆</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Secondary Metadata Footer: Outcomes & Exam Tips clearly separated and quieter */}
                  <div className="pt-5 border-t border-stone-200/70 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-500 dark:text-slate-400 font-tajawal">
                    {lesson.learningOutcomes && lesson.learningOutcomes.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-stone-400 dark:text-slate-500 block">
                          أهداف الدرس
                        </span>
                        <ul className="space-y-1.5 leading-[1.75]">
                          {lesson.learningOutcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600/70 dark:text-emerald-500/70 shrink-0 mt-1" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lesson.examTips && lesson.examTips.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-emerald-700/80 dark:text-emerald-400/80 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>توجيهات للامتحان</span>
                        </span>
                        <ul className="space-y-1.5 leading-[1.75]">
                          {lesson.examTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600/60 dark:text-emerald-500/60 mt-1 text-xs" aria-hidden="true">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
