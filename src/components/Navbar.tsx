/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon, Maximize2, Minimize2, BookOpen, Presentation, Scale, Award, HelpCircle } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-slate-800 bg-stone-50/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('slides')}
            className="text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <span className="block text-base sm:text-lg font-bold font-amiri tracking-wide text-amber-900 dark:text-amber-300 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors whitespace-nowrap">
              منصة الحكم الشرعي وأصول الفقه
            </span>
            <span className="hidden sm:block text-[11px] text-stone-500 dark:text-slate-400 font-tajawal -mt-0.5">
              دراسة تحليلية تفاعلية (ص 1 - 141)
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'slides'
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 shadow-xs'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Presentation className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>عرض الشرائح التفاعلي</span>
          </button>

          <button
            onClick={() => setActiveTab('hub')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'hub'
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 shadow-xs'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>لوحة المذاكرة الشاملة</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'comparison'
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 shadow-xs'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Scale className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>مقارنة المذاهب</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 shadow-xs'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>بطاقات الاستذكار</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'quiz'
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 shadow-xs'
                : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>الاختبارات الذكية</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="تبديل الوضع الليلي والنهاري"
            className="p-2 rounded-lg text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700 transition-colors"
            title={isDark ? 'التحويل للوضع النهاري' : 'التحويل للوضع الليلي'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label="ملء الشاشة"
            className="hidden sm:inline-flex p-2 rounded-lg text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700 transition-colors"
            title="تبديل وضع ملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'slides' ? 'hub' : 'slides')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            {activeTab === 'slides' ? (
              <>
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لوحة المذاكرة</span>
                <span className="sm:hidden">المذاكرة</span>
              </>
            ) : (
              <>
                <Presentation className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">عرض الشرائح</span>
                <span className="sm:hidden">الشرائح</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-slate-800 py-1.5 px-2 bg-stone-100/90 dark:bg-slate-900/90 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('slides')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'slides' ? 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-100 font-semibold' : 'text-stone-600 dark:text-slate-400'
          }`}
        >
          الشرائح
        </button>
        <button
          onClick={() => setActiveTab('hub')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'hub' ? 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-100 font-semibold' : 'text-stone-600 dark:text-slate-400'
          }`}
        >
          المذاكرة
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'comparison' ? 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-100 font-semibold' : 'text-stone-600 dark:text-slate-400'
          }`}
        >
          المقارنات
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'flashcards' ? 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-100 font-semibold' : 'text-stone-600 dark:text-slate-400'
          }`}
        >
          البطاقات
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'quiz' ? 'bg-amber-200/80 dark:bg-amber-900/50 text-amber-950 dark:text-amber-100 font-semibold' : 'text-stone-600 dark:text-slate-400'
          }`}
        >
          الاختبار
        </button>
      </div>
    </header>
  );
};
