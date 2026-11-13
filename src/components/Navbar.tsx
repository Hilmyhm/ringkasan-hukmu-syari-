/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon, Maximize2, Minimize2, FileText, ExternalLink } from 'lucide-react';

export const SOURCE_PDF_URL =
  '/assets/aistudio/__________________________________________________hal-43_3599647b.pdf';
export const SOURCE_PDF_DOWNLOAD_NAME =
  'مسودة كاملة لمقرر الحكم الشرعي للتعليم الإلكتروني.pdf';

interface NavbarProps {
  activeTab: 'slides' | 'hub' | 'comparison' | 'flashcards' | 'quiz';
  setActiveTab: (tab: 'slides' | 'hub' | 'comparison' | 'flashcards' | 'quiz') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  isFullscreen,
  toggleFullscreen,
}) => {
  const navItems: { id: 'slides' | 'hub' | 'comparison' | 'flashcards' | 'quiz'; label: string }[] = [
    { id: 'slides', label: 'الشرائح' },
    { id: 'hub', label: 'المذاكرة' },
    { id: 'comparison', label: 'المذاهب' },
    { id: 'flashcards', label: 'البطاقات' },
    { id: 'quiz', label: 'الاختبار' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-slate-800/90 bg-stone-50/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('slides')}
          className="text-lg sm:text-2xl font-bold font-amiri tracking-wide text-amber-900 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-1"
        >
          الحكم الشرعي وأصول الفقه
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`py-1.5 text-sm lg:text-[15px] font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === item.id
                  ? 'border-amber-600 dark:border-amber-400 text-stone-950 dark:text-white font-semibold'
                  : 'border-transparent text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Theme, Fullscreen & Source PDF Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="تبديل الوضع الليلي والنهاري"
            className="p-2 rounded-lg text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'التحويل للوضع النهاري' : 'التحويل للوضع الليلي'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label="ملء الشاشة"
            className="hidden sm:inline-flex p-2 rounded-lg text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            title="تبديل وضع ملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <a
            href={SOURCE_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="عرض وتحميل: مسودة كاملة لمقرر الحكم الشرعي للتعليم الإلكتروني (PDF)"
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">الكتاب المصدري (PDF)</span>
            <span className="sm:hidden">المصدر PDF</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
          </a>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-slate-800 py-2 px-2 bg-stone-100/90 dark:bg-slate-900/90 text-sm overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 ${
              activeTab === item.id
                ? 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-100 font-semibold'
                : 'text-stone-600 dark:text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
