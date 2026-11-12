/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, BookmarkCheck, ExternalLink } from 'lucide-react';
import { PDFExcerpt } from '../types/curriculum';

interface ExcerptModalProps {
  excerpt: PDFExcerpt | null;
  onClose: () => void;
}

export const ExcerptModal: React.FC<ExcerptModalProps> = ({ excerpt, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!excerpt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `[${excerpt.bookTitle} - صفحة ${excerpt.pageNumber}]\n${excerpt.heading}\n\n${excerpt.originalText}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-stone-50 dark:bg-slate-900 border border-amber-800/20 dark:border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden text-stone-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-slate-800 bg-stone-100/80 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/50 flex items-center justify-center text-amber-800 dark:text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-medium text-amber-800 dark:text-amber-400 block font-tajawal">
                مقتطف موثق من المقرر الأصلي
              </span>
              <h3 className="text-base sm:text-lg font-bold font-amiri text-stone-900 dark:text-white leading-tight">
                {excerpt.heading}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-300 text-xs font-semibold tabular-nums">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>صفحة {excerpt.pageNumber}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {excerpt.contextNote && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-tajawal">
              <span className="font-semibold block mb-0.5">سياق المذاكرة والتحرير:</span>
              {excerpt.contextNote}
            </div>
          )}

          {/* Classical Manuscript Excerpt Box */}
          <div className="relative p-5 rounded-xl border border-stone-300 dark:border-slate-800 bg-white dark:bg-slate-950/80 shadow-xs">
            <div className="absolute top-2 left-3 text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-slate-500">
              PDF Text Verbatim · ص {excerpt.pageNumber}
            </div>

            <div className="mt-3 text-stone-800 dark:text-slate-200 font-amiri text-lg sm:text-xl leading-loose whitespace-pre-line text-justify selection:bg-amber-200 dark:selection:bg-amber-900/60">
              {excerpt.originalText}
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-stone-200 dark:border-slate-800 bg-stone-100/60 dark:bg-slate-800/50 text-xs text-stone-500 dark:text-slate-400">
          <span className="truncate max-w-[280px] sm:max-w-md font-tajawal">
            المصدر: {excerpt.bookTitle} (الصفحات 1 - 141)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200 dark:bg-slate-700 hover:bg-stone-300 dark:hover:bg-slate-600 text-stone-800 dark:text-slate-100 font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ النص</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
