/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SlideDeck } from './components/SlideDeck';
import { StudyHub } from './components/StudyHub';
import { MadhhabMatrix } from './components/MadhhabMatrix';
import { FlashcardDeck } from './components/FlashcardDeck';
import { QuizEngine } from './components/QuizEngine';
import { ExcerptModal } from './components/ExcerptModal';
import { PDFExcerpt } from './types/curriculum';

export default function App() {
  const [activeTab, setActiveTab] = useState<'slides' | 'hub' | 'comparison' | 'flashcards' | 'quiz'>('slides');
  const [activeExcerpt, setActiveExcerpt] = useState<PDFExcerpt | null>(null);
  const [initialLessonId, setInitialLessonId] = useState<number | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dark mode state: default to true (as requested: "implement a dark mode to reduce eye strain during late-night study sessions")
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved) return saved === 'dark';
    return true; // default dark for study focus
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [isDark]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSwitchToHub = (lessonId?: number) => {
    if (lessonId) setInitialLessonId(lessonId);
    setActiveTab('hub');
  };

  const handleJumpToSlide = (lessonId: number) => {
    setActiveTab('slides');
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-slate-950 text-stone-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Main Content Area Based on Active Tab */}
      <div className="flex-1">
        {activeTab === 'slides' && (
          <SlideDeck
            onOpenExcerpt={(excerpt) => setActiveExcerpt(excerpt)}
            onSwitchToHub={handleSwitchToHub}
          />
        )}

        {activeTab === 'hub' && (
          <StudyHub
            onOpenExcerpt={(excerpt) => setActiveExcerpt(excerpt)}
            onJumpToSlide={handleJumpToSlide}
            initialLessonId={initialLessonId}
          />
        )}

        {activeTab === 'comparison' && (
          <MadhhabMatrix
            onOpenExcerpt={(excerpt) => setActiveExcerpt(excerpt)}
          />
        )}

        {activeTab === 'flashcards' && <FlashcardDeck />}

        {activeTab === 'quiz' && <QuizEngine />}
      </div>

      {/* PDF Excerpt Modal */}
      <ExcerptModal
        excerpt={activeExcerpt}
        onClose={() => setActiveExcerpt(null)}
      />
    </div>
  );
}
