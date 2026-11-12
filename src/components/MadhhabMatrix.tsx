/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Scale, FileText, CheckCircle2, AlertCircle, BookmarkCheck } from 'lucide-react';
import { MadhhabComparison, PDFExcerpt } from '../types/curriculum';
import { MADHHAB_COMPARISONS, PDF_EXCERPTS } from '../data/curriculumData';

interface MadhhabMatrixProps {
  onOpenExcerpt: (excerpt: PDFExcerpt) => void;
}

export const MadhhabMatrix: React.FC<MadhhabMatrixProps> = ({ onOpenExcerpt }) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(MADHHAB_COMPARISONS[0].id);

  const currentComparison = MADHHAB_COMPARISONS.find((c) => c.id === selectedIssueId) || MADHHAB_COMPARISONS[0];
  const excerpt = PDF_EXCERPTS[currentComparison.excerptId];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-stone-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 dark:text-cyan-400 mb-1">
          <Scale className="w-4 h-4" />
          <span>الخلاف الأصولي والمقارنة بين المذاهب الأربعة (ص 1 - 141)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-amiri text-stone-900 dark:text-white">
          جداول المقارنة التفاعلية وثمرة الخلاف الفقهي
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400 font-tajawal mt-1">
          استعراض مقارن لأهم المسائل الخلافية الكبرى في المقرر مع توضيح أدلة المذاهب ومناط النزاع وثمرة الخلاف والقول الراجح.
        </p>
      </div>

      {/* Issues Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {MADHHAB_COMPARISONS.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedIssueId(comp.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedIssueId === comp.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800'
            }`}
          >
            {comp.topic}
          </button>
        ))}
      </div>

      {/* Main Comparison Card */}
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Top Issue Title & Excerpt Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-mono text-stone-400 dark:text-slate-500 tabular-nums">
              المسألة في المقرر: {currentComparison.pageRange}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-amiri text-amber-900 dark:text-amber-300">
              {currentComparison.question}
            </h2>
          </div>

          {excerpt && (
            <button
              onClick={() => onOpenExcerpt(excerpt)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 text-xs font-semibold font-tajawal transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>مقتطف المقرر ص {excerpt.pageNumber}</span>
            </button>
          )}
        </div>

        {/* School Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Jumhur Position */}
          {currentComparison.positions.jumhur && (
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-stone-200 dark:bg-slate-700 text-stone-800 dark:text-slate-200 text-xs font-bold font-tajawal">
                  مذهب جمهور الأصوليين
                </span>
              </div>
              <p className="text-sm font-semibold font-amiri text-stone-900 dark:text-white leading-relaxed">
                {currentComparison.positions.jumhur.text}
              </p>
              <div className="text-xs text-stone-600 dark:text-slate-300 font-tajawal pt-1 border-t border-stone-200 dark:border-slate-700/60">
                <span className="font-semibold text-stone-700 dark:text-slate-200">الدليل والمستند: </span>
                {currentComparison.positions.jumhur.evidence}
              </div>
            </div>
          )}

          {/* Hanafi Position */}
          {currentComparison.positions.hanafi && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 text-xs font-bold font-tajawal">
                  المذهب الحنفي
                </span>
              </div>
              <p className="text-sm font-semibold font-amiri text-stone-900 dark:text-white leading-relaxed">
                {currentComparison.positions.hanafi.text}
              </p>
              <div className="text-xs text-stone-600 dark:text-slate-300 font-tajawal pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
                <span className="font-semibold text-stone-700 dark:text-slate-200">الدليل والمستند: </span>
                {currentComparison.positions.hanafi.evidence}
              </div>
            </div>
          )}

          {/* Shafii Position */}
          {currentComparison.positions.shafii && (
            <div className="p-4 sm:p-5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-200/80 dark:bg-cyan-900/60 text-cyan-950 dark:text-cyan-200 text-xs font-bold font-tajawal">
                  المذهب الشافعي
                </span>
              </div>
              <p className="text-sm font-semibold font-amiri text-stone-900 dark:text-white leading-relaxed">
                {currentComparison.positions.shafii.text}
              </p>
              <div className="text-xs text-stone-600 dark:text-slate-300 font-tajawal pt-1 border-t border-cyan-200/60 dark:border-cyan-900/40">
                <span className="font-semibold text-stone-700 dark:text-slate-200">الدليل والمستند: </span>
                {currentComparison.positions.shafii.evidence}
              </div>
            </div>
          )}

          {/* Hanbali Position */}
          {currentComparison.positions.hanbali && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200 text-xs font-bold font-tajawal">
                  المذهب الحنبلي
                </span>
              </div>
              <p className="text-sm font-semibold font-amiri text-stone-900 dark:text-white leading-relaxed">
                {currentComparison.positions.hanbali.text}
              </p>
              <div className="text-xs text-stone-600 dark:text-slate-300 font-tajawal pt-1 border-t border-emerald-200/60 dark:border-emerald-900/40">
                <span className="font-semibold text-stone-700 dark:text-slate-200">الدليل والمستند: </span>
                {currentComparison.positions.hanbali.evidence}
              </div>
            </div>
          )}

          {/* Maliki Position */}
          {currentComparison.positions.maliki && (
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-200/80 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 text-xs font-bold font-tajawal">
                  المذهب المالكي
                </span>
              </div>
              <p className="text-sm font-semibold font-amiri text-stone-900 dark:text-white leading-relaxed">
                {currentComparison.positions.maliki.text}
              </p>
              <div className="text-xs text-stone-600 dark:text-slate-300 font-tajawal pt-1 border-t border-purple-200/60 dark:border-purple-900/40">
                <span className="font-semibold text-stone-700 dark:text-slate-200">الدليل والمستند: </span>
                {currentComparison.positions.maliki.evidence}
              </div>
            </div>
          )}

          {/* Mutakallimin Position */}
          {currentComparison.positions.mutakallimin && (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-200/80 dark:bg-rose-900/60 text-rose-950 dark:text-rose-200 text-xs font-bold font-tajawal">
                  المعتزلة والمتكلمون
                </span>
              </div>
              <p className="text-sm font-semibold font-amiri text-stone-900 dark:text-white leading-relaxed">
                {currentComparison.positions.mutakallimin.text}
              </p>
              <div className="text-xs text-stone-600 dark:text-slate-300 font-tajawal pt-1 border-t border-rose-200/60 dark:border-rose-900/40">
                <span className="font-semibold text-stone-700 dark:text-slate-200">الدليل والمستند: </span>
                {currentComparison.positions.mutakallimin.evidence}
              </div>
            </div>
          )}
        </div>

        {/* Thamarah Al-Khilaf (ثمرة الخلاف) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm font-tajawal">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>ثمرة الخلاف الفقهية والعملية:</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-slate-200 leading-relaxed font-tajawal">
            {currentComparison.thamarah}
          </p>
        </div>

        {/* Preferred View (الراجح) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm font-tajawal">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>القول الراجح والمختار وسببه:</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-slate-200 leading-relaxed font-tajawal">
            {currentComparison.preferredView}
          </p>
        </div>
      </div>
    </div>
  );
};
