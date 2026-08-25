/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  reference: string;
  deposit: number | null;
  withdrawal: number | null;
  balance: number;
}

export interface BankStatementSummary {
  bankName: string;
  accountNumber: string;
  statementPeriod: string;
  startingBalance: number;
  endingBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  currency: string;
  transactionsCount: number;
  accountHolderName?: string;
  ifscSwift?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type ActiveView = 
  | 'home'
  | 'converter'
  | 'about'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin'
  | 'developer-api'
  | 'boa-to-excel'
  | 'free-pdf-converter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface SavedReport {
  id: string;
  userId: string;
  fileName: string;
  bankName: string;
  savedAt: string;
  summary: BankStatementSummary;
  transactions: Transaction[];
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  usageCount: number;
}

export interface AdminLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  user: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
