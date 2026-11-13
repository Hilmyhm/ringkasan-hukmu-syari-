/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Download } from 'lucide-react';
import { PDFExcerpt } from '../types/curriculum';
import { SOURCE_PDF_URL, SOURCE_PDF_DOWNLOAD_NAME } from './Navbar';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-stone-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300/70 dark:border-amber-700/40 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500 font-tajawal">
                <span>النص الأصلي الموثق</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                  صفحة {excerpt.pageNumber}
                </span>
              </div>
              <h3 className="study-heading text-xl sm:text-2xl font-bold text-stone-950 dark:text-white">
                {excerpt.heading}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
          {excerpt.contextNote && (
            <p className="text-sm text-stone-500 dark:text-slate-400 leading-[1.75] font-tajawal">
              {excerpt.contextNote}
            </p>
          )}

          {/* Classical Manuscript Reading Surface */}
          <div className="p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 shadow-xs">
            <div className="study-classical text-stone-900 dark:text-slate-100 whitespace-pre-line selection:bg-amber-200 dark:selection:bg-amber-900/60">
              {excerpt.originalText}
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-stone-200 dark:border-slate-800 bg-stone-100/60 dark:bg-slate-900 text-xs text-stone-400 dark:text-slate-500">
          <span className="truncate max-w-[260px] sm:max-w-md font-tajawal">
            {excerpt.bookTitle} · ص ١ - ١٤١
          </span>

          <div className="flex items-center gap-2">
            <a
              href={SOURCE_PDF_URL}
              download={SOURCE_PDF_DOWNLOAD_NAME}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600/10 hover:bg-amber-600 text-amber-900 dark:text-amber-300 hover:text-white dark:hover:text-white border border-amber-500/30 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>تحميل PDF</span>
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-200/80 dark:bg-slate-800 hover:bg-stone-300 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-100 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
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
