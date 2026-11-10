/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MadhhabId = 'hanafi' | 'maliki' | 'shafii' | 'hanbali' | 'jumhur' | 'mutakallimin';

export interface PDFExcerpt {
  id: string;
  pageNumber: number;
  bookTitle: string;
  heading: string;
  originalText: string;
  contextNote?: string;
  lessonId: number;
}

export interface KeyPoint {
  id: string;
  title: string;
  summary: string;
  details?: string[];
  excerptId: string;
  tags?: string[];
}

export interface Lesson {
  id: number;
  number: string; // e.g. "الدرس 1"
  title: string;
  unit: string;
  pageRange: string; // e.g. "ص 10 - ص 14"
  startPage: number;
  endPage: number;
  learningOutcomes: string[];
  introduction: string;
  keyPoints: KeyPoint[];
  examTips?: string[];
}

export interface MadhhabComparison {
  id: string;
  topic: string;
  question: string;
  pageRange: string;
  excerptId: string;
  positions: {
    jumhur?: { text: string; evidence: string };
    hanafi?: { text: string; evidence: string };
    maliki?: { text: string; evidence: string };
    shafii?: { text: string; evidence: string };
    hanbali?: { text: string; evidence: string };
    mutakallimin?: { text: string; evidence: string };
  };
  thamarah: string; // ثمرة الخلاف
  preferredView: string; // القول الراجح وسببه
}

export interface Flashcard {
  id: string;
  lessonId: number;
  front: string; // Term or question
  category: string;
  back: string; // Definition, rule, or answer
  keyRule: string;
  pageNumber: number;
}

export interface QuizQuestion {
  id: string;
  lessonId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pageNumber: number;
}
