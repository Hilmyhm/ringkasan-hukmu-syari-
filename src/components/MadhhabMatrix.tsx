/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Scale, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { PDFExcerpt } from '../types/curriculum';
import { MADHHAB_COMPARISONS, PDF_EXCERPTS } from '../data/curriculumData';

interface MadhhabMatrixProps {
  onOpenExcerpt: (excerpt: PDFExcerpt) => void;
}

export const MadhhabMatrix: React.FC<MadhhabMatrixProps> = ({ onOpenExcerpt }) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(MADHHAB_COMPARISONS[0].id);

  const currentComparison = MADHHAB_COMPARISONS.find((c) => c.id === selectedIssueId) || MADHHAB_COMPARISONS[0];
  const excerpt = PDF_EXCERPTS[currentComparison.excerptId];

  const schoolEntries = [
    {
      key: 'jumhur' as const,
      label: 'مذهب جمهور الأصوليين',
      cardClass: 'bg-stone-50/70 dark:bg-slate-800/40 border-stone-200 dark:border-slate-800',
      labelClass: 'text-stone-700 dark:text-slate-300',
    },
    {
      key: 'hanafi' as const,
      label: 'المذهب الحنفي',
      cardClass: 'bg-amber-50/40 dark:bg-amber-950/15 border-amber-200/70 dark:border-amber-900/40',
      labelClass: 'text-amber-800 dark:text-amber-300',
    },
    {
      key: 'shafii' as const,
      label: 'المذهب الشافعي',
      cardClass: 'bg-cyan-50/40 dark:bg-cyan-950/15 border-cyan-200/70 dark:border-cyan-900/40',
      labelClass: 'text-cyan-800 dark:text-cyan-300',
    },
    {
      key: 'hanbali' as const,
      label: 'المذهب الحنبلي',
      cardClass: 'bg-emerald-50/40 dark:bg-emerald-950/15 border-emerald-200/70 dark:border-emerald-900/40',
      labelClass: 'text-emerald-800 dark:text-emerald-300',
    },
    {
      key: 'maliki' as const,
      label: 'المذهب المالكي',
      cardClass: 'bg-purple-50/40 dark:bg-purple-950/15 border-purple-200/70 dark:border-purple-900/40',
      labelClass: 'text-purple-800 dark:text-purple-300',
    },
    {
      key: 'mutakallimin' as const,
      label: 'المتكلمون والمعتزلة',
      cardClass: 'bg-rose-50/40 dark:bg-rose-950/15 border-rose-200/70 dark:border-rose-900/40',
      labelClass: 'text-rose-800 dark:text-rose-300',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 text-stone-900 dark:text-slate-100">
      
      {/* Header */}
      <header className="border-b border-stone-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500 font-tajawal">
          <Scale className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
          <span>مقارنة المذاهب الأصولية · ص ١ - ١٤١</span>
        </div>
        <h1 className="study-title text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
          جداول المقارنة وثمرة الخلاف الفقهي
        </h1>
        <p className="study-subtext text-stone-500 dark:text-slate-400">
          تحرير محل النزاع وأدلة كل مذهب مع بيان الثمرة الفقهية والقول الراجح.
        </p>
      </header>

      {/* Interactive Issues Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {MADHHAB_COMPARISONS.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedIssueId(comp.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              selectedIssueId === comp.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800'
            }`}
          >
            {comp.topic}
          </button>
        ))}
      </div>

      {/* Main Comparison Card */}
      <article className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-9 shadow-sm space-y-7">
        
        {/* Top Issue Title & Excerpt Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-stone-200 dark:border-slate-800">
          <div className="space-y-1.5">
            <span className="text-xs text-stone-400 dark:text-slate-500 tabular-nums font-tajawal block">
              {currentComparison.topic} · {currentComparison.pageRange}
            </span>
            <h2 className="study-heading text-2xl sm:text-[26px] font-bold text-amber-900 dark:text-amber-300">
              {currentComparison.question}
            </h2>
          </div>

          {excerpt && (
            <button
              onClick={() => onOpenExcerpt(excerpt)}
              className="shrink-0 self-start sm:self-end inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 text-xs sm:text-sm font-semibold font-tajawal transition-all whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>النص الأصلي · ص {excerpt.pageNumber}</span>
            </button>
          )}
        </div>

        {/* School Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {schoolEntries.map((school) => {
            const position = currentComparison.positions[school.key];
            if (!position) return null;

            return (
              <div
                key={school.key}
                className={`p-5 sm:p-6 rounded-2xl border space-y-3.5 ${school.cardClass}`}
              >
                <span className={`text-xs font-bold font-tajawal block ${school.labelClass}`}>
                  {school.label}
                </span>

                {/* Primary Madhhab Ruling */}
                <p className="study-heading text-lg sm:text-xl font-bold text-stone-950 dark:text-white">
                  {position.text}
                </p>

                {/* Supporting Evidence */}
                <div className="pt-3 border-t border-stone-200/70 dark:border-slate-700/60 space-y-1">
                  <span className="text-xs font-medium text-stone-400 dark:text-slate-500 block">
                    الدليل والمستند
                  </span>
                  <p className="study-subtext text-stone-600 dark:text-slate-300">
                    {position.evidence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Thamarah & Preferred View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/8 border border-amber-500/25 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm font-tajawal">
              <AlertCircle className="w-4 h-4" />
              <span>ثمرة الخلاف الفقهية</span>
            </div>
            <p className="study-body text-stone-800 dark:text-slate-100">
              {currentComparison.thamarah}
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/8 border border-emerald-500/25 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm font-tajawal">
              <CheckCircle2 className="w-4 h-4" />
              <span>القول الراجح والمختار</span>
            </div>
            <p className="study-body text-stone-800 dark:text-slate-100">
              {currentComparison.preferredView}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
