/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookmarkCheck,
  Presentation,
  Compass
} from 'lucide-react';
import { Lesson, KeyPoint, PDFExcerpt } from '../types/curriculum';
import { LESSONS, PDF_EXCERPTS } from '../data/curriculumData';

interface StudyHubProps {
  onOpenExcerpt: (excerpt: PDFExcerpt) => void;
  onJumpToSlide: (lessonId: number) => void;
  initialLessonId?: number;
}

export const StudyHub: React.FC<StudyHubProps> = ({ 
  onOpenExcerpt, 
  onJumpToSlide, 
  initialLessonId 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [expandedLessonIds, setExpandedLessonIds] = useState<Record<number, boolean>>(() => {
    // Expand first lesson or the initial requested lesson by default
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

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return LESSONS.filter((lesson) => {
      // Unit filter
      if (selectedUnit !== 'all' && !lesson.unit.includes(selectedUnit)) {
        return false;
      }

      // Search query
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-stone-900 dark:text-slate-100">
      
      {/* Hero Welcome Strip */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-linear-to-r from-amber-900 to-emerald-900 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold backdrop-blur-xs">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>المستوى الدراسي: بكالوريوس الشريعة (أصل 3110)</span>
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-amiri leading-tight">
            لوحة المذاكرة الشاملة والتحليل الفقهي (ص 1 - 125)
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 font-tajawal leading-relaxed">
            استعراض هيكلي شامل لكتاب المقرر من مبادئ علم الأصول وتدوين الرسالة ومذاهب الأئمة الأربعة، إلى تفاصيل الحكم التكليفي والحكم الوضعي والسبب والشرط، مع وصول فوري للنصوص الأصلية من الـ PDF.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="block text-xl font-bold font-mono text-amber-300">125</span>
            <span className="text-[11px] text-stone-300 font-tajawal">صفحة مشروحة وموثقة</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="block text-xl font-bold font-mono text-emerald-300">19</span>
            <span className="text-[11px] text-stone-300 font-tajawal">درساً ووحدة علمية</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="block text-xl font-bold font-mono text-cyan-300">4</span>
            <span className="text-[11px] text-stone-300 font-tajawal">مذاهب فقهية مقارنة</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="block text-xl font-bold font-mono text-rose-300">100%</span>
            <span className="text-[11px] text-stone-300 font-tajawal">مقتطفات حرفية بضغطة زر</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute right-3.5 top-3 text-stone-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المسائل، التعريفات، أو الصفحات..."
            className="w-full pl-4 pr-10 py-2 rounded-xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-tajawal transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-2.5 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-white"
            >
              مسح
            </button>
          )}
        </div>

        {/* Unit Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedUnit === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
            }`}
          >
            جميع الأبواب ({LESSONS.length})
          </button>
          <button
            onClick={() => setSelectedUnit('مقدمة')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedUnit === 'مقدمة'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
            }`}
          >
            مقدمة الأصول ومناهجه
          </button>
          <button
            onClick={() => setSelectedUnit('التكليفي')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedUnit === 'التكليفي'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
            }`}
          >
            الحكم التكليفي (الواجب - المكروه)
          </button>
          <button
            onClick={() => setSelectedUnit('الوضعي')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedUnit === 'الوضعي'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200'
            }`}
          >
            الحكم الوضعي (السبب والشرط)
          </button>
        </div>

        {/* Expand/Collapse Toggle */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-stone-500 dark:text-slate-400">
          <button onClick={expandAll} className="hover:text-amber-600 transition-colors">
            فتح الكل
          </button>
          <span>·</span>
          <button onClick={collapseAll} className="hover:text-amber-600 transition-colors">
            طي الكل
          </button>
        </div>
      </div>

      {/* Search results message */}
      {searchQuery && (
        <div className="text-xs text-stone-500 dark:text-slate-400">
          تم العثور على {filteredLessons.length} درس يطابق البحث: "{searchQuery}"
        </div>
      )}

      {/* Lessons Accordion List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => {
          const isExpanded = !!expandedLessonIds[lesson.id];

          return (
            <div
              key={lesson.id}
              className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(lesson.id)}
                className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70 dark:hover:bg-slate-800/40 select-none transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-amber-800 dark:text-amber-400">{lesson.number}</span>
                    <span className="text-stone-300 dark:text-slate-700">|</span>
                    <span className="text-stone-500 dark:text-slate-400 font-tajawal">{lesson.unit}</span>
                    <span className="text-stone-300 dark:text-slate-700">|</span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 text-[11px] font-mono tabular-nums">
                      {lesson.pageRange}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-amiri text-stone-900 dark:text-white">
                    {lesson.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToSlide(lesson.id);
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-slate-300 hover:text-amber-900 text-xs font-semibold transition-colors"
                    title="الانتقال إلى هذه الشريحة في العرض"
                  >
                    <Presentation className="w-3.5 h-3.5 text-amber-600" />
                    <span>عرض بالشرائح</span>
                  </button>

                  <div className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800/80 space-y-6">
                  
                  {/* Learning Outcomes */}
                  {lesson.learningOutcomes && lesson.learningOutcomes.length > 0 && (
                    <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700/60">
                      <span className="text-xs font-bold text-stone-600 dark:text-slate-300 block mb-2 font-tajawal">
                        الأهداف الإجرائية ونواتج التعلم المستهدفة للدرس:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-slate-300 font-tajawal">
                        {lesson.learningOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Introduction */}
                  <p className="text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-tajawal">
                    {lesson.introduction}
                  </p>

                  {/* Detailed Key Points */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 font-tajawal">
                      التحرير الأصولي والمسائل الملخصة (انقر على الزر لاستعراض نص الـ PDF):
                    </h4>

                    <div className="space-y-3">
                      {lesson.keyPoints.map((point: KeyPoint) => {
                        const excerpt = PDF_EXCERPTS[point.excerptId];

                        return (
                          <div
                            key={point.id}
                            className="p-4 rounded-xl bg-stone-50/70 dark:bg-slate-800/30 border border-stone-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700/60 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1.5 flex-1">
                                <h5 className="font-bold font-amiri text-base text-stone-900 dark:text-white">
                                  {point.title}
                                </h5>
                                <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-tajawal">
                                  {point.summary}
                                </p>
                                {point.details && point.details.length > 0 && (
                                  <ul className="mt-2 space-y-1 text-xs text-stone-600 dark:text-slate-400 list-disc list-inside">
                                    {point.details.map((item, idx) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              {/* Clickable Excerpt Button */}
                              {excerpt && (
                                <button
                                  onClick={() => onOpenExcerpt(excerpt)}
                                  className="shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 text-xs font-semibold font-tajawal transition-all active:scale-95 shadow-xs"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>مقتطف ص {excerpt.pageNumber}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Exam Tips Callout */}
                  {lesson.examTips && lesson.examTips.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>إضاءات للاختبارات التحريرية والشفهية:</span>
                      </div>
                      <ul className="space-y-1 text-stone-600 dark:text-emerald-100/90 list-disc list-inside font-tajawal">
                        {lesson.examTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
