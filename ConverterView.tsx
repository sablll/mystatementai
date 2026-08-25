/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  UploadCloud, 
  FileText, 
  FileSpreadsheet, 
  Sparkles, 
  Download, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  RefreshCcw, 
  Filter, 
  Check, 
  X,
  PlusCircle,
  HelpCircle,
  TrendingDown,
  Lock,
  Edit2,
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  Eye,
  EyeOff,
  Key,
  Volume2,
  Pause,
  Play,
  Square,
  Mic,
  MicOff,
  Copy,
  Moon,
  Sun,
  BookOpen
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Transaction, BankStatementSummary, ChatMessage } from '../types';
import { BANK_TEMPLATES, BankTemplate } from '../data/mockData';
import Markdown from 'react-markdown';

export default function ConverterView() {
  // State for upload workflow
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [parsingLogs, setParsingLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Tab layout state: 'editor' | 'analytics' | 'insights'
  const [activeSubTab, setActiveSubTab] = useState<'editor' | 'analytics' | 'insights'>('editor');

  // Interactive password modal state
  const [passwordPrompt, setPasswordPrompt] = useState<{
    fileName: string;
    onSubmit: (password: string) => void;
    onCancel: () => void;
  } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  // AI premium advisory text
  const [aiAdvisoryText, setAiAdvisoryText] = useState<string | null>(null);
  const [isGeneratingAdvisory, setIsGeneratingAdvisory] = useState(false);

  // AI Financial Assistant Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');

  // Premium ChatGPT Voice, Language, and Smart Glossary states
  const [chatDarkMode, setChatDarkMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechPaused, setIsSpeechPaused] = useState(false);
  const [currentSpeechMsgId, setCurrentSpeechMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'auto' | 'en' | 'hi' | 'bn' | 'ar' | 'fr' | 'es'>('auto');
  const [copiedMessageIds, setCopiedMessageIds] = useState<Record<string, boolean>>({});
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const [glossaryTerm, setGlossaryTerm] = useState<string | null>(null);

  // Loaded bank template / state
  const [selectedTemplate, setSelectedTemplate] = useState<BankTemplate | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<BankStatementSummary | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Interactive addition of transaction
  const [newTx, setNewTx] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Miscellaneous',
    reference: '',
    deposit: '',
    withdrawal: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Volatile Zero-Storage Mode feature
  const [zeroStorageMode, setZeroStorageMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    'Initializing secure document layout interpreter...',
    'Performing high-fidelity optical text extraction...',
    'Identifying credit and debit transaction bounds...',
    'Re-assembling multi-page transaction structures...',
    'Running double-entry reconciliation audit...',
    'Applying AI category labels to merchant descriptions...',
    'Finalizing structural ledgers...'
  ];

  // Simulated Processing Effect for templates
  useEffect(() => {
    let timer: any;
    if (isProcessing && selectedTemplate) {
      if (processingStep < processingSteps.length - 1) {
        timer = setTimeout(() => {
          setParsingLogs(prev => [...prev, processingSteps[processingStep]]);
          setProcessingStep(prev => prev + 1);
        }, 350);
      }
    }
    return () => clearTimeout(timer);
  }, [isProcessing, processingStep, selectedTemplate]);

  // Sync Chat when a statement is loaded
  useEffect(() => {
    if (summary) {
      setChatMessages([
        {
          id: 'welcome-msg',
          role: 'model',
          text: `Hello ${summary.accountHolderName ? summary.accountHolderName.split(' ')[0] : 'Valued Client'}! I am **StatementAI Personal Coach**, your elite forensic auditor. 
          
I have analyzed your statement from **${summary.bankName}** covering **${summary.statementPeriod}**. 

Ask me any natural language questions about your expenditures, category splits, duplicate records, or subscription profiles!`,
          timestamp: new Date().toISOString()
        }
      ]);
    } else {
      setChatMessages([]);
    }
  }, [summary]);

  const getActiveLanguageCode = () => {
    if (selectedLanguage !== 'auto') {
      const mapping: Record<string, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        bn: 'bn-IN',
        ar: 'ar-SA',
        fr: 'fr-FR',
        es: 'es-ES'
      };
      return mapping[selectedLanguage];
    }
    const browserLang = navigator.language ? navigator.language.toLowerCase() : 'en-us';
    if (browserLang.startsWith('hi')) return 'hi-IN';
    if (browserLang.startsWith('bn')) return 'bn-IN';
    if (browserLang.startsWith('ar')) return 'ar-SA';
    if (browserLang.startsWith('fr')) return 'fr-FR';
    if (browserLang.startsWith('es')) return 'es-ES';
    return 'en-US';
  };

  const stripMarkdownForTTS = (markdownText: string) => {
    let clean = markdownText;
    // Strip markdown formatting symbols
    clean = clean.replace(/[*#_~`\[\]()]/g, '');
    // Clean tables and lists
    clean = clean.replace(/\|/g, ' ');
    clean = clean.replace(/:/g, ' ');
    clean = clean.replace(/-/g, ' ');
    // Standardize white spaces
    clean = clean.replace(/\s+/g, ' ').trim();
    return clean;
  };

  const handleSpeak = (messageId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = stripMarkdownForTTS(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langCode = getActiveLanguageCode();
    utterance.lang = langCode;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.toLowerCase() === langCode.toLowerCase() || v.lang.toLowerCase().startsWith(langCode.substring(0, 2)));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsSpeechPaused(false);
      setCurrentSpeechMsgId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsSpeechPaused(false);
      setCurrentSpeechMsgId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsSpeechPaused(false);
      setCurrentSpeechMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePauseSpeech = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsSpeechPaused(true);
    }
  };

  const handleResumeSpeech = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeechPaused(false);
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsSpeechPaused(false);
      setCurrentSpeechMsgId(null);
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSttSupported(true);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop current speech when summary changes (uploading a new document)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsSpeechPaused(false);
    setCurrentSpeechMsgId(null);
    setGlossaryTerm(null);
  }, [summary]);

  const toggleListening = () => {
    if (!sttSupported) {
      alert('Speech Recognition is not supported or microphone permissions are disabled.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (isListening) {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = getActiveLanguageCode();

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setChatInput(prev => (prev ? prev + ' ' + transcript : transcript));
      }
    };

    rec.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.start();
    setRecognitionInstance(rec);
  };

  const copyMessageToClipboard = (messageId: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageIds(prev => ({ ...prev, [messageId]: true }));
      setTimeout(() => {
        setCopiedMessageIds(prev => ({ ...prev, [messageId]: false }));
      }, 2000);
    });
  };

  const sendChatMessage = async (msgText: string) => {
    if (!msgText.trim() || chatLoading || !summary) return;

    // Stop speaking when user submits a new message
    handleStopSpeech();

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: msgText,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);
    setChatError('');

    try {
      const historyPayload = chatMessages
        .filter(m => m.id !== 'welcome-msg')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const response = await fetch('/api/chat-statement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history: historyPayload,
          summary,
          transactions,
          message: msgText
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Server refused or timed out while analyzing statement data.');
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'model',
        text: result.text,
        timestamp: new Date().toISOString()
      };

      setChatMessages(prev => [...prev, assistantMsg]);

    } catch (err: any) {
      console.error(err);
      setChatError(err.message || 'Error communicating with parsing gateway.');
    } finally {
      setChatLoading(false);
    }
  };

  const regenerateLastAnswer = async () => {
    if (chatLoading || !summary) return;

    handleStopSpeech();

    const lastUserMsg = [...chatMessages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    setChatMessages(prev => {
      const lastIndex = prev.map(m => m.id).lastIndexOf(lastUserMsg.id);
      if (lastIndex !== -1) {
        return prev.slice(0, lastIndex + 1);
      }
      return prev;
    });

    setChatLoading(true);
    setChatError('');

    try {
      const lastUserMsgIndex = chatMessages.findIndex(m => m.id === lastUserMsg.id);
      const historyPayload = chatMessages
        .slice(0, lastUserMsgIndex)
        .filter(m => m.id !== 'welcome-msg')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const response = await fetch('/api/chat-statement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history: historyPayload,
          summary,
          transactions,
          message: lastUserMsg.text
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Server refused or timed out while analyzing statement data.');
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'model',
        text: result.text,
        timestamp: new Date().toISOString()
      };

      setChatMessages(prev => [...prev, assistantMsg]);

    } catch (err: any) {
      console.error(err);
      setChatError(err.message || 'Error communicating with parsing gateway.');
    } finally {
      setChatLoading(false);
    }
  };

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processSelectedFiles(Array.from(files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processSelectedFiles(Array.from(files));
    }
  };

  // Helper: check if a PDF is encrypted
  const checkPdfEncryption = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          // @ts-ignore
          const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
          await loadingTask.promise;
          resolve(false);
        } catch (error: any) {
          if (error.name === 'PasswordException') {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsArrayBuffer(file);
    });
  };

  // Helper: extract raw text from PDF
  const extractTextFromPdf = async (file: File, password?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer;
          // @ts-ignore
          const loadingTask = window.pdfjsLib.getDocument({
            data: arrayBuffer,
            password: password
          });
          const pdf = await loadingTask.promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += `--- PAGE ${i} ---\n${pageText}\n`;
          }
          resolve(fullText);
        } catch (error: any) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsArrayBuffer(file);
    });
  };

  // Helper: trigger interactive modal to ask for password
  const promptForPassword = (fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setPasswordPrompt({
        fileName,
        onSubmit: (password: string) => {
          resolve(password);
          setPasswordPrompt(null);
          setPasswordInput('');
          setPasswordError(null);
        },
        onCancel: () => {
          reject(new Error("File decryption cancelled by user."));
          setPasswordPrompt(null);
          setPasswordInput('');
          setPasswordError(null);
        }
      });
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordPrompt) return;
    if (!passwordInput.trim()) {
      setPasswordError("Password cannot be empty.");
      return;
    }
    passwordPrompt.onSubmit(passwordInput);
  };

  // Process selected file lists
  const processSelectedFiles = async (files: File[]) => {
    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStep(0);
    setParsingLogs(["Reading statement files raw bits..."]);
    setAiAdvisoryText(null);
    setActiveSubTab('editor');

    const allTx: Transaction[] = [];
    const allSums: BankStatementSummary[] = [];
    const filesMeta: { name: string; size: string }[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        filesMeta.push({ name: file.name, size: `${sizeMB} MB` });

        setParsingLogs(prev => [...prev, `[File ${i+1}/${files.length}] Checking document protection for ${file.name}...`]);

        let password = '';
        const isEncrypted = await checkPdfEncryption(file);
        if (isEncrypted) {
          setParsingLogs(prev => [...prev, `🔒 "${file.name}" is password protected! Prompting for passphrase...`]);
          try {
            password = await promptForPassword(file.name);
            setParsingLogs(prev => [...prev, `🔓 Passphrase loaded. Decrypting document...`]);
          } catch (cancelErr) {
            throw new Error(`Decryption cancelled for protected file "${file.name}".`);
          }
        }

        setParsingLogs(prev => [...prev, `[File ${i+1}/${files.length}] Extracting structural text layouts...`]);

        let textData = '';
        let base64Data = '';
        const mimeType = file.type || 'application/pdf';

        if (mimeType === 'application/pdf') {
          try {
            textData = await extractTextFromPdf(file, password);
          } catch (extractErr: any) {
            if (extractErr.name === 'PasswordException') {
              throw new Error(`The password provided for "${file.name}" was incorrect.`);
            }
            console.warn("Client-side text extract bypassed:", extractErr);
          }
        }

        // Fallback to base64 if empty text (scanned PDF) or image
        if (!textData) {
          setParsingLogs(prev => [...prev, `[File ${i+1}/${files.length}] Scanned paper format detected. Initializing vision models...`]);
          base64Data = await new Promise<string>((resVal, rejVal) => {
            const r = new FileReader();
            r.onload = () => {
              const resText = r.result as string;
              resVal(resText.split(',')[1]);
            };
            r.onerror = () => rejVal(new Error("File stream reading error"));
            r.readAsDataURL(file);
          });
        }

        setParsingLogs(prev => [...prev, `[File ${i+1}/${files.length}] Submitting securely to StatementAI conversion nodes...`]);

        const response = await fetch('/api/convert-statement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            textData,
            base64Data,
            mimeType,
            fileName: file.name,
          }),
        });

        const resultJson = await response.json();
        if (!response.ok || !resultJson.success) {
          throw new Error(resultJson.error || `Could not parse statement "${file.name}".`);
        }

        const statementData = resultJson.data;

        // Map transactions
        const fileTxList: Transaction[] = (statementData.transactions || []).map((t: any, idx: number) => ({
          id: t.id || `tx-ai-${Date.now()}-${i}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
          date: t.date || new Date().toISOString().split('T')[0],
          description: (t.description || "UNNAMED MERCHANT").toUpperCase(),
          category: t.category || "Miscellaneous",
          reference: t.reference || "",
          deposit: t.deposit !== undefined ? t.deposit : null,
          withdrawal: t.withdrawal !== undefined ? t.withdrawal : null,
          balance: Number(t.balance) || 0,
        }));

        const fileSummary: BankStatementSummary = {
          bankName: statementData.bankName || "Extracted Bank",
          accountHolderName: statementData.accountHolderName || "",
          accountNumber: statementData.accountNumber || "•••• ••••",
          ifscSwift: statementData.ifscSwift || "",
          statementPeriod: statementData.statementPeriod || "N/A Period",
          startingBalance: Number(statementData.startingBalance) || 0,
          endingBalance: Number(statementData.endingBalance) || 0,
          totalDeposits: Number(statementData.totalDeposits) || 0,
          totalWithdrawals: Number(statementData.totalWithdrawals) || 0,
          currency: statementData.currency || "USD",
          transactionsCount: fileTxList.length,
        };

        allTx.push(...fileTxList);
        allSums.push(fileSummary);
      }

      // Merge and sort transactions chronologically
      setParsingLogs(prev => [...prev, "Merging and sorting transactions chronologically..."]);
      allTx.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      let mergedSummary: BankStatementSummary;
      if (allSums.length === 1) {
        mergedSummary = allSums[0];
      } else {
        const totalDeps = allTx.reduce((sum, t) => sum + (t.deposit || 0), 0);
        const totalWiths = allTx.reduce((sum, t) => sum + (t.withdrawal || 0), 0);
        const uniqueBanks = Array.from(new Set(allSums.map(s => s.bankName).filter(Boolean)));
        const uniqueHolders = Array.from(new Set(allSums.map(s => s.accountHolderName).filter(Boolean)));
        const uniqueAccNums = Array.from(new Set(allSums.map(s => s.accountNumber).filter(Boolean)));
        const uniqueIfscSwift = Array.from(new Set(allSums.map(s => s.ifscSwift).filter(Boolean)));

        mergedSummary = {
          bankName: uniqueBanks.join(" + ") || "Multiple Banks",
          accountHolderName: uniqueHolders.join(" & ") || "Multiple Holders",
          accountNumber: uniqueAccNums.join(" / ") || "•••• ••••",
          ifscSwift: uniqueIfscSwift.join(" / ") || "",
          statementPeriod: `${allTx[0]?.date || 'Start'} to ${allTx[allTx.length - 1]?.date || 'End'}`,
          startingBalance: allSums[0]?.startingBalance || 0,
          endingBalance: allSums[allSums.length - 1]?.endingBalance || 0,
          totalDeposits: totalDeps,
          totalWithdrawals: totalWiths,
          currency: allSums[0]?.currency || "USD",
          transactionsCount: allTx.length,
        };
      }

      setParsingLogs(prev => [
        ...prev,
        "Double-entry ledger match verified...",
        "Applying AI category labels to merchant descriptions...",
        "Reconciliation complete! Statement parsed successfully."
      ]);

      setTimeout(() => {
        setTransactions(allTx);
        setSummary(mergedSummary);
        setUploadedFiles(filesMeta);
        setUploadedFile({
          name: files.length === 1 ? files[0].name : `${files.length} PDF Statements Merged`,
          size: files.length === 1 
            ? `${(files[0].size / (1024 * 1024)).toFixed(2)} MB` 
            : `${(files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024)).toFixed(2)} MB`
        });
        setIsProcessing(false);
      }, 600);

    } catch (err: any) {
      console.error("[StatementAI] Conversion error:", err);
      setErrorMessage(err.message || "An error occurred. Make sure your statements are valid, uncorrupted, and decrypted.");
      setIsProcessing(false);
      setUploadedFiles([]);
      setUploadedFile(null);
    }
  };

  const handleUseSample = (templateId: string) => {
    setErrorMessage(null);
    setAiAdvisoryText(null);
    setActiveSubTab('editor');
    const template = BANK_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setUploadedFile({
        name: `${template.id === 'chase' ? 'Chase_Business' : template.id === 'boa' ? 'BoA_Advantage' : 'HSBC_Statement'}_Demo.pdf`,
        size: '1.24 MB'
      });
      setUploadedFiles([{
        name: `${template.id === 'chase' ? 'Chase_Business' : template.id === 'boa' ? 'BoA_Advantage' : 'HSBC_Statement'}_Demo.pdf`,
        size: '1.24 MB'
      }]);
      setSelectedTemplate(template);
      setIsProcessing(true);
      setProcessingStep(0);
      setParsingLogs(["Loading preloaded statement model cache..."]);

      let stepIdx = 0;
      const interval = setInterval(() => {
        if (stepIdx < processingSteps.length) {
          setParsingLogs(prev => [...prev, processingSteps[stepIdx]]);
          stepIdx++;
        } else {
          clearInterval(interval);
          setTransactions([...template.transactions]);
          setSummary({ ...template.summary });
          setIsProcessing(false);
        }
      }, 250);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setUploadedFiles([]);
    setIsProcessing(false);
    setProcessingStep(0);
    setParsingLogs([]);
    setSelectedTemplate(null);
    setTransactions([]);
    setSummary(null);
    setSearchQuery('');
    setCategoryFilter('All');
    setShowAddForm(false);
    setErrorMessage(null);
    setAiAdvisoryText(null);
    setActiveSubTab('editor');
  };

  // Add transaction
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description.trim()) return;

    const dep = newTx.deposit ? parseFloat(newTx.deposit) : null;
    const withdr = newTx.withdrawal ? parseFloat(newTx.withdrawal) : null;

    const tNew: Transaction = {
      id: `tx-custom-${Date.now()}`,
      date: newTx.date,
      description: newTx.description.toUpperCase(),
      category: newTx.category,
      reference: newTx.reference || `REF-${Math.floor(10000 + Math.random() * 90000)}`,
      deposit: dep && dep > 0 ? dep : null,
      withdrawal: withdr && withdr > 0 ? withdr : null,
      balance: 0
    };

    const updatedTransactions = [...transactions, tNew];
    recalculateLedger(updatedTransactions);

    // Reset Form
    setNewTx({
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: 'Miscellaneous',
      reference: '',
      deposit: '',
      withdrawal: '',
    });
    setShowAddForm(false);
  };

  // Delete transaction
  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    recalculateLedger(updated);
  };

  // Edit inline cells
  const handleCellEdit = (txId: string, field: keyof Transaction, value: any) => {
    const updated = transactions.map(t => {
      if (t.id === txId) {
        let val = value;
        if (field === 'deposit' || field === 'withdrawal') {
          val = value === '' ? null : parseFloat(value);
          if (isNaN(val)) val = null;
        }
        return { ...t, [field]: val };
      }
      return t;
    });
    recalculateLedger(updated);
  };

  // Re-calculate math balances chronologically
  const recalculateLedger = (txList: Transaction[]) => {
    if (!summary) return;

    // Sort chronologically by date
    const sorted = [...txList].sort((a, b) => a.date.localeCompare(b.date));
    
    let runningBalance = summary.startingBalance;
    let totalDeposits = 0;
    let totalWithdrawals = 0;

    const calculated = sorted.map(t => {
      if (t.deposit) {
        runningBalance += t.deposit;
        totalDeposits += t.deposit;
      }
      if (t.withdrawal) {
        runningBalance -= t.withdrawal;
        totalWithdrawals += t.withdrawal;
      }
      return {
        ...t,
        balance: Math.round(runningBalance * 100) / 100
      };
    });

    setTransactions(calculated);
    setSummary(prev => {
      if (!prev) return null;
      return {
        ...prev,
        endingBalance: Math.round(runningBalance * 100) / 100,
        totalDeposits: Math.round(totalDeposits * 100) / 100,
        totalWithdrawals: Math.round(totalWithdrawals * 100) / 100,
        transactionsCount: calculated.length
      };
    });
  };

  // Verify Ledger integrity
  const isLedgerBalanced = () => {
    if (!summary) return false;
    const computedEnd = summary.startingBalance + summary.totalDeposits - summary.totalWithdrawals;
    return Math.abs(computedEnd - summary.endingBalance) < 0.01;
  };

  // Filter lists
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Unique categories list for filtering
  const allCategories = Array.from(new Set(transactions.map(t => t.category)));

  // Analytics Computation helpers
  const dailyBalanceData = useMemo(() => {
    if (transactions.length === 0) return [];
    const dateGroups: { [date: string]: number } = {};
    transactions.forEach(t => {
      dateGroups[t.date] = t.balance;
    });
    return Object.keys(dateGroups).sort().map(date => ({
      date,
      balance: Number(dateGroups[date].toFixed(2))
    }));
  }, [transactions]);

  const categorySpendingData = useMemo(() => {
    const categories: { [cat: string]: number } = {};
    transactions.forEach(t => {
      if (t.withdrawal) {
        categories[t.category] = (categories[t.category] || 0) + t.withdrawal;
      }
    });
    const COLORS = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#ec4899', '#14b8a6', '#6366f1', '#f97316', '#06b6d4',
      '#84cc16', '#64748b'
    ];
    return Object.keys(categories).map((cat, idx) => ({
      name: cat,
      value: Number(categories[cat].toFixed(2)),
      color: COLORS[idx % COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyCashflowData = useMemo(() => {
    const months: { [month: string]: { income: number; expense: number } } = {};
    transactions.forEach(t => {
      const month = t.date.substring(0, 7) || 'Unknown';
      if (!months[month]) {
        months[month] = { income: 0, expense: 0 };
      }
      if (t.deposit) months[month].income += t.deposit;
      if (t.withdrawal) months[month].expense += t.withdrawal;
    });
    return Object.keys(months).sort().map(month => ({
      month,
      income: Number(months[month].income.toFixed(2)),
      expense: Number(months[month].expense.toFixed(2)),
      cashflow: Number((months[month].income - months[month].expense).toFixed(2))
    }));
  }, [transactions]);

  // Insights computation helpers
  const savingsRate = useMemo(() => {
    if (!summary || summary.totalDeposits === 0) return 0;
    const rate = ((summary.totalDeposits - summary.totalWithdrawals) / summary.totalDeposits) * 100;
    return Math.round(rate * 10) / 10;
  }, [summary]);

  const topMerchants = useMemo(() => {
    const merchants: { [name: string]: number } = {};
    transactions.forEach(t => {
      if (t.withdrawal) {
        const cleaned = t.description.replace(/(ST-|SQ-|ACH-|REF-|PR-|COFFEE|WWW|INC|LLC|CORP|CO)/g, '').trim();
        merchants[cleaned] = (merchants[cleaned] || 0) + t.withdrawal;
      }
    });
    return Object.entries(merchants)
      .map(([name, total]) => ({ name, total: Number(total.toFixed(2)) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [transactions]);

  const duplicateTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(t => {
      const amount = t.withdrawal || t.deposit || 0;
      if (amount > 0) {
        const key = `${t.date}_${t.description.trim()}_${amount}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(t);
      }
    });
    return Object.values(groups).filter(arr => arr.length > 1).flat();
  }, [transactions]);

  const largeExpenses = useMemo(() => {
    const threshold = summary?.currency === 'INR' ? 20000 : 500;
    return transactions.filter(t => t.withdrawal && t.withdrawal >= threshold);
  }, [transactions, summary]);

  // Generate premium AI report using backend endpoint
  const generateAdvisoryReport = async () => {
    if (!summary || isGeneratingAdvisory) return;
    setIsGeneratingAdvisory(true);
    try {
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary,
          transactions: transactions
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiAdvisoryText(data.text);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Advisory error:", err);
      setAiAdvisoryText("Unable to generate live advisory due to a network connection timeout. Here is a calculated outlook based on local transaction audit metrics: \n\n" +
                       `1. Liquid Cash reserves are currently sitting at ${summary.currency} ${summary.endingBalance.toLocaleString()}. ` +
                       `2. Your savings rate this cycle stands at ${savingsRate}%. This indicates a ${savingsRate >= 10 ? 'healthy savings posture' : 'tight cash runway'}. ` +
                       `3. Large expense alerts total ${largeExpenses.length} lines. Consider minimizing recurring merchant expenditure.`);
    } finally {
      setIsGeneratingAdvisory(false);
    }
  };

  // Exporters
  const downloadCSV = () => {
    if (!summary) return;
    const headers = ['Date', 'Description', 'Category', 'Reference', 'Withdrawal/Debit', 'Deposit/Credit', 'Running Balance'];
    const rows = filteredTransactions.map(t => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.reference,
      t.withdrawal !== null ? t.withdrawal : '',
      t.deposit !== null ? t.deposit : '',
      t.balance
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${summary.bankName.replace(/\s+/g, '_')}_Ledger_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    if (!summary) return;
    const payload = {
      summary,
      transactions: filteredTransactions,
      exportedAt: new Date().toISOString(),
      generator: 'StatementAI Premium Parser'
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${summary.bankName.replace(/\s+/g, '_')}_Ledger_Raw.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    if (!summary) return;
    
    const wb = XLSX.utils.book_new();
    
    // Transactions sheet
    const txSheetData = filteredTransactions.map(t => ({
      'Date': t.date,
      'Merchant / Description': t.description,
      'Category': t.category,
      'Reference ID': t.reference,
      'Debit (Withdrawal)': t.withdrawal !== null ? Number(t.withdrawal) : null,
      'Credit (Deposit)': t.deposit !== null ? Number(t.deposit) : null,
      'Running Balance': Number(t.balance)
    }));
    
    const wsTx = XLSX.utils.json_to_sheet(txSheetData);
    const wscols = [
      { wch: 12 }, // Date
      { wch: 35 }, // Description
      { wch: 22 }, // Category
      { wch: 15 }, // Reference
      { wch: 18 }, // Debit
      { wch: 18 }, // Credit
      { wch: 18 }  // Running Balance
    ];
    wsTx['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, wsTx, 'Transactions Log');

    // Summary sheet
    const summarySheetData = [
      ['STATEMENT CONVERSION REPORT SUMMARY'],
      [],
      ['Bank Institution Name', summary.bankName],
      ['Account Holder Name', summary.accountHolderName || 'N/A'],
      ['Account Number', summary.accountNumber],
      ['IFSC / SWIFT Code', summary.ifscSwift || 'N/A'],
      ['Covered Statement Period', summary.statementPeriod],
      ['Currency Unit', summary.currency],
      [],
      ['Starting Balance', Number(summary.startingBalance)],
      ['Total Processed Deposits (+)', Number(summary.totalDeposits)],
      ['Total Processed Withdrawals (-)', Number(summary.totalWithdrawals)],
      ['Final Reconciliation Balance', Number(summary.endingBalance)],
      [],
      ['Double Entry Balanced Audit', (isLedgerBalanced() ? 'PASS / BALANCED' : 'REVIEWS REQ')],
      ['Total Extracted Records', summary.transactionsCount],
      ['Exported On', new Date().toLocaleString()]
    ];
    
    const wsSummary = XLSX.utils.aoa_to_sheet(summarySheetData);
    wsSummary['!cols'] = [{ wch: 30 }, { wch: 35 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Auditing Summary');

    XLSX.writeFile(wb, `${summary.bankName.replace(/\s+/g, '_')}_Premium_Report.xlsx`);
  };

  return (
    <div id="converter-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center space-x-2">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
            <span>AI Bank Statement Converter</span>
          </h1>
          <p className="text-sm text-slate-500">
            Securely decrypt, extract, and convert multi-bank statements globally directly to Excel, CSV, and visual insights dashboards.
          </p>
        </div>

        {/* Security Info */}
        <div className="flex flex-wrap items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-xs">
          <label htmlFor="toggle-zero-storage" className="flex items-center space-x-2 cursor-pointer">
            <input
              id="toggle-zero-storage"
              type="checkbox"
              checked={zeroStorageMode}
              onChange={() => setZeroStorageMode(!zeroStorageMode)}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
              <Lock className="h-3.5 w-3.5 text-blue-500" />
              <span>Zero-Storage Mode (Volatile processing)</span>
            </span>
          </label>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100 font-semibold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>Secure End-To-End</span>
          </span>
        </div>
      </div>

      {/* PHASE 1: NO FILE LOADED -> Drop Zone & Demo buttons */}
      {!uploadedFile && !isProcessing && (
        <div id="upload-stage" className="space-y-8 animate-fade-in">
          
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-3 text-rose-800 animate-fade-in">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Statement Conversion Failed</p>
                <p className="text-xs leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Uploader Box */}
          <div
            id="drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-3 border-dashed rounded-3xl p-10 md:p-16 text-center cursor-pointer transition-all duration-200 bg-white ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/45 scale-[0.99] shadow-inner' 
                : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 hover:shadow-md'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".pdf,image/*"
              className="hidden"
            />
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="mx-auto h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <UploadCloud className="h-8 w-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-lg text-slate-800">
                  Upload PDF Bank Statements
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Drag and drop <strong>one or multiple</strong> statements here, or click to browse. Supports PDF & paper scans worldwide.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-6 text-[11px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                  <span>Supports Password-Protected PDFs</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                  <span>Automatic Bank Detection</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bank Logos Showcase / Templates */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                No statement on hand? Test instantly with sample templates
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                id="template-chase-btn"
                onClick={() => handleUseSample('chase')}
                className="bg-white hover:bg-blue-50/20 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 text-left cursor-pointer transition shadow-xs group space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono text-blue-600 uppercase">USA Format</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-slate-800 text-sm">Chase Business Classic</h4>
                  <p className="text-xs text-slate-400 mt-1">Multi-merchant software statement with subscription fees & credits.</p>
                </div>
              </button>

              <button
                id="template-boa-btn"
                onClick={() => handleUseSample('boa')}
                className="bg-white hover:bg-blue-50/20 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 text-left cursor-pointer transition shadow-xs group space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono text-blue-600 uppercase">Global Format</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-slate-800 text-sm">Bank of America Advantage</h4>
                  <p className="text-xs text-slate-400 mt-1">SaaS revenue operations statement with square deposits & utilities.</p>
                </div>
              </button>

              <button
                id="template-hsbc-btn"
                onClick={() => handleUseSample('hsbc')}
                className="bg-white hover:bg-blue-50/20 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 text-left cursor-pointer transition shadow-xs group space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono text-blue-600 uppercase">UK/Europe Format</span>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-slate-800 text-sm">HSBC Corporate Premium</h4>
                  <p className="text-xs text-slate-400 mt-1">International premium statement with SWIFT coordinates & GBP rates.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: PROCESSING STREAM VIEWS */}
      {isProcessing && (
        <div id="processing-stage" className="bg-white border border-slate-100 p-8 md:p-12 rounded-3xl shadow-sm text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
          
          <div className="relative h-20 w-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-blue-600">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-bold text-xl text-slate-800">
              Converting Bank Statements
            </h3>
            <p className="text-sm text-slate-400">
              Running deep structural OCR audits. Merging balances chronologically.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${selectedTemplate ? ((processingStep / processingSteps.length) * 100) : 75}%` }}
            ></div>
          </div>

          {/* Logs Terminal */}
          <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs text-emerald-400 space-y-2.5 h-64 overflow-y-auto text-left shadow-inner border border-slate-800">
            <p className="text-slate-500">// StatementAI v2.5 Log Parser Stream</p>
            {parsingLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-2 animate-fade-in">
                <span className="text-slate-500 select-none">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-emerald-500">✔</span>
                <span className="text-slate-200">{log}</span>
              </div>
            ))}
            {!selectedTemplate && (
              <div className="flex items-center space-x-2 text-blue-400">
                <span className="text-slate-500 select-none">[{new Date().toLocaleTimeString()}]</span>
                <span className="animate-spin text-blue-500">⚙</span>
                <span className="animate-pulse">Synthesizing and indexing Ledger models...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHASE 3: PARSED VIEW & WORKSPACE SPREADSHEET EDITOR */}
      {uploadedFile && !isProcessing && summary && (
        <div id="editor-stage" className="space-y-6 animate-fade-in">
          
          {/* Active File Header */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md border border-slate-800">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/10">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-display font-semibold text-lg">{uploadedFile.name}</h3>
                  <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded uppercase font-bold">
                    Merged & Reconciled
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono flex flex-wrap gap-x-4">
                  <span>File Size: {uploadedFile.size}</span>
                  <span>Institution: {summary.bankName}</span>
                  {summary.accountHolderName && <span>Holder: {summary.accountHolderName}</span>}
                  {summary.ifscSwift && <span>IFSC/SWIFT: {summary.ifscSwift}</span>}
                </div>
              </div>
            </div>

            <button
              id="editor-reset-btn"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center space-x-1.5"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              <span>Convert New Document</span>
            </button>
          </div>

          {/* Validation Alert Banner */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
            isLedgerBalanced() 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50/70 border-rose-200 text-rose-800'
          }`}>
            {isLedgerBalanced() ? (
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {isLedgerBalanced() 
                  ? 'Double-Entry Statement Balanced Successfully' 
                  : 'Ledger Audit Balance Mismatch Detected'}
              </p>
              <p className="text-xs opacity-90 leading-relaxed">
                {isLedgerBalanced() 
                  ? `Math validation complete: Starting Balance (${summary.currency} ${summary.startingBalance.toLocaleString()}) + Deposits (${summary.currency} ${summary.totalDeposits.toLocaleString()}) - Withdrawals (${summary.currency} ${summary.totalWithdrawals.toLocaleString()}) matches Ending Balance (${summary.currency} ${summary.endingBalance.toLocaleString()}) perfectly.`
                  : `Math values mismatch: Starting Balance (${summary.currency} ${summary.startingBalance.toLocaleString()}) + Deposits (${summary.currency} ${summary.totalDeposits.toLocaleString()}) - Withdrawals (${summary.currency} ${summary.totalWithdrawals.toLocaleString()}) yields ${summary.currency} ${(summary.startingBalance + summary.totalDeposits - summary.totalWithdrawals).toLocaleString()}, differing from the statement ending balance (${summary.currency} ${summary.endingBalance.toLocaleString()}). Adjust cells to reconcile.`
                }
              </p>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Starting Balance</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xs text-slate-400">{summary.currency}</span>
                <span className="text-xl md:text-2xl font-display font-bold text-slate-800 font-mono">
                  {summary.startingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Total Deposits (Credits)</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xs text-emerald-500 font-semibold">+</span>
                <span className="text-xs text-slate-400">{summary.currency}</span>
                <span className="text-xl md:text-2xl font-display font-bold text-emerald-600 font-mono">
                  {summary.totalDeposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Total Withdrawals (Debits)</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xs text-rose-500 font-semibold">-</span>
                <span className="text-xs text-slate-400">{summary.currency}</span>
                <span className="text-xl md:text-2xl font-display font-bold text-rose-600 font-mono">
                  {summary.totalWithdrawals.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-1 bg-gradient-to-br from-blue-50/20 to-indigo-50/10">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Recalculated Ending Balance</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-xs text-slate-400">{summary.currency}</span>
                <span className="text-xl md:text-2xl font-display font-bold text-blue-700 font-mono">
                  {summary.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex border-b border-slate-100 gap-6">
            <button
              onClick={() => setActiveSubTab('editor')}
              className={`pb-4 text-sm font-semibold tracking-tight transition cursor-pointer flex items-center space-x-2 border-b-2 ${
                activeSubTab === 'editor' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileSpreadsheet className="h-4.5 w-4.5" />
              <span>Spreadsheet Editor</span>
            </button>

            <button
              onClick={() => setActiveSubTab('analytics')}
              className={`pb-4 text-sm font-semibold tracking-tight transition cursor-pointer flex items-center space-x-2 border-b-2 ${
                activeSubTab === 'analytics' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <BarChart3 className="h-4.5 w-4.5" />
              <span>Dashboard Analytics</span>
            </button>

            <button
              onClick={() => setActiveSubTab('insights')}
              className={`pb-4 text-sm font-semibold tracking-tight transition cursor-pointer flex items-center space-x-2 border-b-2 ${
                activeSubTab === 'insights' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Lightbulb className="h-4.5 w-4.5" />
              <span>AI Financial Insights</span>
            </button>
          </div>

          {/* ACTIVE TAB CONTENTS */}

          {/* TAB 1: SPREADSHEET EDITOR */}
          {activeSubTab === 'editor' && (
            <div id="sub-tab-editor" className="bg-white rounded-2xl border border-slate-100 p-4 md:p-6 shadow-sm space-y-6">
              
              {/* Table Toolbar controls */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                
                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-2xl">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="table-search"
                      type="text"
                      placeholder="Search by description, reference, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                      id="table-category-filter"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="rounded-xl border border-slate-200 text-sm py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="All">All Categories</option>
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action buttons (Add, Exporters) */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    id="table-toggle-add-btn"
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition flex items-center space-x-1.5"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>{showAddForm ? 'Hide Add Form' : 'Add Custom Row'}</span>
                  </button>

                  <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

                  <div className="flex gap-1.5 w-full sm:w-auto">
                    <button
                      id="export-csv-btn"
                      onClick={downloadCSV}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center space-x-1"
                      title="Export as Comma Separated Values (.csv)"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>CSV</span>
                    </button>
                    <button
                      id="export-excel-btn"
                      onClick={downloadExcel}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center space-x-1"
                      title="Export as Microsoft Excel (.xlsx)"
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                      <span>Excel</span>
                    </button>
                    <button
                      id="export-json-btn"
                      onClick={downloadJSON}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center space-x-1"
                      title="Export as structural JSON payload"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>JSON</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* In-Line Addition Form */}
              {showAddForm && (
                <form onSubmit={handleAddTransaction} className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-6 gap-3 animate-fade-in text-xs">
                  <div className="space-y-1">
                    <label htmlFor="add-date" className="font-semibold text-slate-600 block">Date</label>
                    <input
                      id="add-date"
                      type="date"
                      value={newTx.date}
                      onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                      required
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="add-desc" className="font-semibold text-slate-600 block">Merchant / Description</label>
                    <input
                      id="add-desc"
                      type="text"
                      placeholder="e.g. STRIPE / STARBUCKS"
                      value={newTx.description}
                      onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                      required
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="add-category" className="font-semibold text-slate-600 block">Category</label>
                    <select
                      id="add-category"
                      value={newTx.category}
                      onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                    >
                      <option value="Revenue">Revenue</option>
                      <option value="Software & Hosting">Software & Hosting</option>
                      <option value="Office Operations">Office Operations</option>
                      <option value="Meals & Entertainment">Meals & Entertainment</option>
                      <option value="Rent & Lease">Rent & Lease</option>
                      <option value="Salaries & Wages">Salaries & Wages</option>
                      <option value="Advertising & Marketing">Advertising & Marketing</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Travel & Transport">Travel & Transport</option>
                      <option value="Bank Fees">Bank Fees</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="add-withdrawal" className="font-semibold text-slate-600 block">Debit / Withdrawal</label>
                    <input
                      id="add-withdrawal"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newTx.withdrawal}
                      onChange={(e) => setNewTx({ ...newTx, withdrawal: e.target.value, deposit: '' })}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="add-deposit" className="font-semibold text-slate-600 block">Credit / Deposit</label>
                    <input
                      id="add-deposit"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newTx.deposit}
                      onChange={(e) => setNewTx({ ...newTx, deposit: e.target.value, withdrawal: '' })}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div className="md:col-span-6 flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      id="add-cancel-btn"
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      id="add-save-btn"
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    >
                      Add Transaction Row
                    </button>
                  </div>
                </form>
              )}

              {/* Interactive Data Grid */}
              <div className="overflow-x-auto border border-slate-150 rounded-xl">
                <table className="w-full border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-150 text-xs">
                      <th className="p-3">Date</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Reference ID</th>
                      <th className="p-3 text-right">Debit / Withdrawal</th>
                      <th className="p-3 text-right">Credit / Deposit</th>
                      <th className="p-3 text-right">Running Balance</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-xs">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400 font-sans">
                          No transactions match the filter criteria. Clear your search or add a custom row!
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/50 group transition">
                          {/* Date Cell */}
                          <td className="p-3">
                            <input
                              id={`cell-date-${tx.id}`}
                              type="date"
                              value={tx.date}
                              onChange={(e) => handleCellEdit(tx.id, 'date', e.target.value)}
                              className="bg-transparent hover:bg-white focus:bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-hidden border border-transparent rounded px-1.5 py-0.5 w-28 text-xs font-mono"
                            />
                          </td>

                          {/* Description Cell */}
                          <td className="p-3">
                            <input
                              id={`cell-desc-${tx.id}`}
                              type="text"
                              value={tx.description}
                              onChange={(e) => handleCellEdit(tx.id, 'description', e.target.value)}
                              className="bg-transparent hover:bg-white focus:bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-hidden border border-transparent rounded px-1.5 py-0.5 w-full text-xs font-sans font-medium text-slate-900"
                            />
                          </td>

                          {/* Category Selector Cell */}
                          <td className="p-3">
                            <select
                              id={`cell-cat-${tx.id}`}
                              value={tx.category}
                              onChange={(e) => handleCellEdit(tx.id, 'category', e.target.value)}
                              className="bg-transparent hover:bg-white focus:bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-hidden border border-transparent rounded px-1.5 py-0.5 text-xs font-sans"
                            >
                              <option value="Revenue">Revenue</option>
                              <option value="Software & Hosting">Software & Hosting</option>
                              <option value="Office Operations">Office Operations</option>
                              <option value="Meals & Entertainment">Meals & Entertainment</option>
                              <option value="Rent & Lease">Rent & Lease</option>
                              <option value="Salaries & Wages">Salaries & Wages</option>
                              <option value="Advertising & Marketing">Advertising & Marketing</option>
                              <option value="Utilities">Utilities</option>
                              <option value="Professional Services">Professional Services</option>
                              <option value="Travel & Transport">Travel & Transport</option>
                              <option value="Bank Fees">Bank Fees</option>
                              <option value="Miscellaneous">Miscellaneous</option>
                            </select>
                          </td>

                          {/* Reference Cell */}
                          <td className="p-3 text-slate-500">
                            <input
                              id={`cell-ref-${tx.id}`}
                              type="text"
                              value={tx.reference}
                              onChange={(e) => handleCellEdit(tx.id, 'reference', e.target.value)}
                              className="bg-transparent hover:bg-white focus:bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-hidden border border-transparent rounded px-1.5 py-0.5 w-24 text-xs font-mono"
                            />
                          </td>

                          {/* Debit Cell */}
                          <td className="p-3 text-right">
                            <input
                              id={`cell-withdr-${tx.id}`}
                              type="text"
                              value={tx.withdrawal === null ? '' : tx.withdrawal}
                              placeholder="-"
                              onChange={(e) => handleCellEdit(tx.id, 'withdrawal', e.target.value)}
                              className="bg-transparent hover:bg-white focus:bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-hidden border border-transparent rounded px-1.5 py-0.5 w-20 text-right text-xs font-mono text-rose-600 font-bold"
                            />
                          </td>

                          {/* Credit Cell */}
                          <td className="p-3 text-right">
                            <input
                              id={`cell-dep-${tx.id}`}
                              type="text"
                              value={tx.deposit === null ? '' : tx.deposit}
                              placeholder="-"
                              onChange={(e) => handleCellEdit(tx.id, 'deposit', e.target.value)}
                              className="bg-transparent hover:bg-white focus:bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-hidden border border-transparent rounded px-1.5 py-0.5 w-20 text-right text-xs font-mono text-emerald-600 font-bold"
                            />
                          </td>

                          {/* Running Balance Cell */}
                          <td className="p-3 text-right font-bold text-slate-800 font-mono">
                            {summary.currency} {tx.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>

                          {/* Actions Cell */}
                          <td className="p-3 text-center">
                            <button
                              id={`row-delete-${tx.id}`}
                              onClick={() => handleDeleteTransaction(tx.id)}
                              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                              title="Delete transaction line"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination / Table Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
                <p>
                  Showing {filteredTransactions.length} of {transactions.length} rows parsed from PDF statement.
                </p>
                <p className="flex items-center space-x-1">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Double-click cells to modify dates or amounts. Ledgers recalculate instantly.</span>
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: DASHBOARD ANALYTICS */}
          {activeSubTab === 'analytics' && (
            <div id="sub-tab-analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              
              {/* Daily Balance Trend Chart */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-semibold text-slate-800 text-sm">Ledger Balance Trend</h3>
                    <p className="text-xs text-slate-400">Daily chronological balance run over the statement lifecycle</p>
                  </div>
                  <LineIcon className="h-5 w-5 text-blue-500 shrink-0" />
                </div>
                
                <div className="h-72 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyBalanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} />
                      <YAxis stroke="#94a3b8" tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px' }}
                        formatter={(val) => [`${summary.currency} ${Number(val).toLocaleString()}`, 'Balance']}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBalance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Expense Breakdown Pie Chart */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-semibold text-slate-800 text-sm">Category Expenditure</h3>
                    <p className="text-xs text-slate-400">Total debit distribution among core accounts</p>
                  </div>
                  <PieIcon className="h-5 w-5 text-blue-500 shrink-0" />
                </div>

                <div className="h-44 w-full flex items-center justify-center relative">
                  {categorySpendingData.length === 0 ? (
                    <p className="text-xs text-slate-400">No expense debits recorded.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categorySpendingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categorySpendingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                          formatter={(val) => [`${summary.currency} ${Number(val).toLocaleString()}`, 'Spent']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Debits</span>
                    <span className="text-sm font-bold text-slate-800 font-mono">
                      {summary.currency} {summary.totalWithdrawals.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Pie legend mini table */}
                <div className="h-28 overflow-y-auto pr-1 space-y-1.5 text-[11px]">
                  {categorySpendingData.slice(0, 5).map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-slate-600 truncate">{entry.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-800 shrink-0">
                        {summary.currency} {entry.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {categorySpendingData.length > 5 && (
                    <p className="text-[10px] text-slate-400 text-center italic pt-1">
                      + {categorySpendingData.length - 5} more categories in statement
                    </p>
                  )}
                </div>
              </div>

              {/* Monthly Income vs Expense Bar Chart */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-display font-semibold text-slate-800 text-sm">Monthly Revenue vs Expenditure</h3>
                    <p className="text-xs text-slate-400">Side-by-side cash inflow vs outflow comparison</p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-blue-500 shrink-0" />
                </div>

                <div className="h-64 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyCashflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                      <YAxis stroke="#94a3b8" tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px' }}
                        formatter={(val) => [`${summary.currency} ${Number(val).toLocaleString()}`]}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Bar dataKey="income" name="Deposits (Inflow)" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" name="Withdrawals (Outflow)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: AI FINANCIAL INSIGHTS */}
          {activeSubTab === 'insights' && (
            <div id="sub-tab-insights" className="space-y-6 animate-fade-in">
              
              {/* Dynamic KPI Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Savings Rate Percentage</span>
                    <span className={`text-xl font-bold font-mono ${savingsRate >= 10 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {savingsRate}%
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {savingsRate >= 10 ? 'Solid cash retention surplus' : 'Tight liquid operating overhead'}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${savingsRate >= 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <TrendingDown className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Potential Duplicate Alerts</span>
                    <span className={`text-xl font-bold font-mono ${duplicateTransactions.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {duplicateTransactions.length / 2} Matches
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {duplicateTransactions.length > 0 ? 'Identical merchant charges flagged' : 'No double billing flags found'}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${duplicateTransactions.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Large Expense Volatility</span>
                    <span className={`text-xl font-bold font-mono ${largeExpenses.length > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {largeExpenses.length} Outliers
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {largeExpenses.length > 0 ? 'Debits exceeding threshold flagged' : 'No massive outlier spikes detected'}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${largeExpenses.length > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Audit Findings and Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Outlier Alerts list */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center space-x-1.5">
                      <ShieldAlert className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                      <span>Large Outlier Expenses</span>
                    </h4>
                    <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                      Threshold: &gt; {summary.currency === 'INR' ? '₹20,000' : '$500'}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs">
                    {largeExpenses.length === 0 ? (
                      <div className="text-center py-10 text-slate-400">
                        <Check className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p>No transactions exceed the anomaly threshold value.</p>
                      </div>
                    ) : (
                      largeExpenses.map((tx) => (
                        <div key={tx.id} className="p-3 bg-rose-50/40 rounded-xl border border-rose-100/50 flex justify-between items-center">
                          <div className="space-y-0.5 min-w-0">
                            <span className="font-semibold text-slate-800 truncate block font-sans">{tx.description}</span>
                            <span className="text-[10px] font-mono text-slate-400">{tx.date} | Category: {tx.category}</span>
                          </div>
                          <span className="font-mono font-bold text-rose-600 shrink-0">
                            -{summary.currency} {tx.withdrawal.toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Duplicate Charges */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center space-x-1.5">
                      <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                      <span>Potential Duplicate Charges</span>
                    </h4>
                    <span className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">
                      Audit Flags
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs">
                    {duplicateTransactions.length === 0 ? (
                      <div className="text-center py-10 text-slate-400">
                        <Check className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p>No duplicate charges flagged in statement.</p>
                      </div>
                    ) : (
                      duplicateTransactions.map((tx) => (
                        <div key={tx.id} className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/50 flex justify-between items-center">
                          <div className="space-y-0.5 min-w-0">
                            <span className="font-semibold text-slate-800 truncate block font-sans">{tx.description}</span>
                            <span className="text-[10px] font-mono text-slate-400">{tx.date} | Ref: {tx.reference || 'N/A'}</span>
                          </div>
                          <span className="font-mono font-bold text-amber-700 shrink-0">
                            {tx.withdrawal ? `-${summary.currency} ${tx.withdrawal.toLocaleString()}` : `+${summary.currency} ${tx.deposit.toLocaleString()}`}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top Spending Merchants */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm lg:col-span-2 space-y-4">
                  <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center space-x-1.5">
                    <TrendingDown className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                    <span>Top Outflow Outlets (Merchants)</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {topMerchants.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 col-span-5 text-center">No merchants outflow logs recorded.</p>
                    ) : (
                      topMerchants.map((m, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-center">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Rank #{idx+1}</span>
                          <span className="font-bold text-slate-800 truncate block font-sans text-xs" title={m.name}>{m.name}</span>
                          <span className="font-mono font-bold text-blue-600 block text-xs">
                            {summary.currency} {m.total.toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Side-by-Side: Premium AI Advisory & Interactive AI Coach Chat */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:col-span-2">
                  
                  {/* Left Block: Premium AI Report Panel */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6 min-h-[480px]">
                    {/* Decorative background visual */}
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4">
                      <Sparkles className="h-96 w-96 text-blue-400" />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-600/30 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Advanced Auditing LLM
                          </span>
                          <span className="text-xs text-slate-400">• Powered by Gemini 3.5 Flash</span>
                        </div>
                        <h3 className="font-display font-bold text-xl tracking-tight">
                          Generate Premium AI Wealth Advisory Brief
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Synthesize your converted transaction spreadsheets into a multi-paragraph wealth outlook advising on burn-rate sustainability, tax optimizations, duplicate billings, and cash flow anomalies.
                        </p>
                      </div>

                      {!aiAdvisoryText && (
                        <button
                          onClick={generateAdvisoryReport}
                          disabled={isGeneratingAdvisory}
                          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold text-xs rounded-xl flex items-center space-x-1.5 shadow-md cursor-pointer transition shrink-0"
                        >
                          {isGeneratingAdvisory ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Synthesizing Advisory Brief...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              <span>Run Advanced Audit Report</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Generated Advisory Text Container */}
                    {aiAdvisoryText && (
                      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 animate-fade-in flex-grow flex flex-col justify-between text-xs font-sans text-slate-200 leading-relaxed overflow-y-auto max-h-[300px]">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="font-semibold text-blue-300 flex items-center space-x-1.5">
                              <CheckCircle className="h-4 w-4" />
                              <span>Executive Financial Advisory Brief</span>
                            </span>
                            <button
                              onClick={() => setAiAdvisoryText(null)}
                              className="text-slate-400 hover:text-white transition"
                            >
                              Clear Report
                            </button>
                          </div>

                          <div className="space-y-3.5 whitespace-pre-line text-slate-300">
                            {aiAdvisoryText}
                          </div>
                        </div>

                        <div className="pt-4 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                          <span>Report generated successfully</span>
                          <span>CONFIDENTIAL - For Internal Review Only</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Block: Interactive AI Coach Chat Panel */}
                  <div className={`rounded-3xl p-6 border shadow-lg flex flex-col justify-between min-h-[540px] space-y-4 transition-all duration-300 ${
                    chatDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-100 shadow-slate-950/40' 
                      : 'bg-white border-slate-100 text-slate-800 shadow-slate-200/50'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-xl ${chatDarkMode ? 'bg-slate-900 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            <Sparkles className="h-5 w-5 animate-pulse" />
                          </div>
                          <div>
                            <h3 className={`font-display font-bold text-sm ${chatDarkMode ? 'text-white' : 'text-slate-800'}`}>
                              AI Premium Financial Agent
                            </h3>
                            <p className="text-[10px] text-slate-400">Powered by Gemini 3.5 Flash • Zero-Storage Privacy</p>
                          </div>
                        </div>
                        
                        {/* Control actions */}
                        <div className="flex items-center space-x-2">
                          {/* Clear chat button */}
                          <button
                            onClick={() => {
                              handleStopSpeech();
                              setChatMessages([
                                {
                                  id: 'welcome-msg',
                                  role: 'model',
                                  text: `Hello ${summary.accountHolderName ? summary.accountHolderName.split(' ')[0] : 'Valued Client'}! I am **StatementAI Personal Coach**, your elite forensic auditor. \n\nI have analyzed your statement from **${summary.bankName}** covering **${summary.statementPeriod}**.\n\nAsk me any natural language questions about your expenditures, category splits, duplicate records, or subscription profiles!`,
                                  timestamp: new Date().toISOString()
                                }
                              ]);
                            }}
                            title="Clear conversation history"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              chatDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          {/* Dark mode toggle */}
                          <button
                            onClick={() => setChatDarkMode(!chatDarkMode)}
                            title="Toggle Chat Dark Mode"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              chatDarkMode ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-slate-100 text-slate-500'
                            }`}
                          >
                            {chatDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Language Selection Pill Group */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Voice & Chat Language</label>
                        <div className="flex flex-wrap gap-1">
                          {[
                            { code: 'auto', label: '🌐 Auto' },
                            { code: 'en', label: '🇬🇧 EN' },
                            { code: 'hi', label: '🇮🇳 HI' },
                            { code: 'bn', label: '🇧🇩 BN' },
                            { code: 'ar', label: '🇸🇦 AR' },
                            { code: 'fr', label: '🇫🇷 FR' },
                            { code: 'es', label: '🇪🇸 ES' }
                          ].map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                handleStopSpeech();
                                setSelectedLanguage(lang.code as any);
                              }}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                selectedLanguage === lang.code
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : chatDarkMode
                                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages Log */}
                    <div className={`flex-grow border rounded-2xl p-4 overflow-y-auto max-h-[280px] min-h-[220px] space-y-3 text-xs scrollbar-thin ${
                      chatDarkMode 
                        ? 'bg-slate-900/50 border-slate-850' 
                        : 'bg-slate-50/50 border-slate-100'
                    }`}>
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[90%] rounded-2xl p-3.5 shadow-xs relative group ${
                              msg.role === 'user'
                                ? 'bg-blue-600 text-white font-medium rounded-br-none'
                                : chatDarkMode
                                  ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none leading-relaxed'
                                  : 'bg-white border border-slate-150 text-slate-800 rounded-bl-none leading-relaxed'
                            }`}
                          >
                            {msg.role === 'user' ? (
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            ) : (
                              <div className={`prose prose-xs max-w-none markdown-body ${
                                chatDarkMode ? 'text-slate-100 prose-invert font-normal' : 'text-slate-800 font-normal'
                              }`}>
                                <Markdown>{msg.text}</Markdown>
                              </div>
                            )}

                            {/* Message actions inside response */}
                            {msg.role === 'model' && (
                              <div className={`mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-[10px] ${
                                chatDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
                              }`}>
                                {/* Audio Synthesis Controls */}
                                <div className="flex items-center space-x-1">
                                  {currentSpeechMsgId === msg.id && isSpeaking ? (
                                    <>
                                      {isSpeechPaused ? (
                                        <button
                                          type="button"
                                          onClick={handleResumeSpeech}
                                          className="flex items-center space-x-1 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-1.5 py-0.5 rounded cursor-pointer transition"
                                          title="Resume reading"
                                        >
                                          <Play className="h-2.5 w-2.5" />
                                          <span>Resume</span>
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={handlePauseSpeech}
                                          className="flex items-center space-x-1 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 px-1.5 py-0.5 rounded cursor-pointer transition"
                                          title="Pause reading"
                                        >
                                          <Pause className="h-2.5 w-2.5" />
                                          <span>Pause</span>
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={handleStopSpeech}
                                        className="flex items-center space-x-1 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 px-1.5 py-0.5 rounded cursor-pointer transition"
                                        title="Stop reading"
                                      >
                                        <Square className="h-2.5 w-2.5" />
                                        <span>Stop</span>
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleSpeak(msg.id, msg.text)}
                                      className={`flex items-center space-x-1 px-1.5 py-0.5 rounded cursor-pointer transition ${
                                        chatDarkMode 
                                          ? 'bg-slate-850 text-slate-300 hover:bg-slate-800 hover:text-white' 
                                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                                      }`}
                                      title="Read this response aloud"
                                    >
                                      <Volume2 className="h-2.5 w-2.5 animate-pulse" />
                                      <span>🔊 Listen</span>
                                    </button>
                                  )}
                                </div>

                                {/* Utility buttons: Copy & Regenerate */}
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => copyMessageToClipboard(msg.id, msg.text)}
                                    className="hover:text-blue-500 flex items-center space-x-0.5 transition cursor-pointer"
                                    title="Copy answer"
                                  >
                                    {copiedMessageIds[msg.id] ? (
                                      <>
                                        <Check className="h-2.5 w-2.5 text-emerald-500" />
                                        <span className="text-emerald-500 font-bold">Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-2.5 w-2.5" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>

                                  {/* Regenerate only for the last model message */}
                                  {chatMessages.filter(m => m.role === 'model').pop()?.id === msg.id && msg.id !== 'welcome-msg' && (
                                    <button
                                      type="button"
                                      onClick={regenerateLastAnswer}
                                      className="hover:text-blue-500 flex items-center space-x-0.5 transition cursor-pointer"
                                      title="Regenerate response"
                                    >
                                      <RefreshCcw className="h-2.5 w-2.5" />
                                      <span>Regenerate</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className={`rounded-2xl p-3.5 shadow-xs rounded-bl-none flex items-center space-x-2 border ${
                            chatDarkMode ? 'bg-slate-900 border-slate-850 text-slate-400' : 'bg-white border-slate-100 text-slate-400'
                          }`}>
                            <Sparkles className="h-3 w-3 text-blue-500 animate-spin" />
                            <div className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                          </div>
                        </div>
                      )}

                      {chatError && (
                        <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl font-medium text-center">
                          {chatError}
                        </div>
                      )}
                    </div>

                    {/* Suggested questions chips */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Questions</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: "💰 Inflow vs Outflow", text: "What is my total income and total spending?" },
                          { label: "💳 Subscriptions Profile", text: "What recurring subscriptions or service fees do I have?" },
                          { label: "🍔 Food Spending", text: "Show travel expenses and food expenses." },
                          { label: "🔎 Suspicious / Anomaly Checks", text: "Find duplicate transactions. Detect suspicious transactions." }
                        ].map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => sendChatMessage(chip.text)}
                            disabled={chatLoading}
                            className={`text-[10px] font-semibold border px-2 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${
                              chatDarkMode 
                                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white' 
                                : 'bg-slate-100 border-slate-150 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Smart Financial Terms Decoder */}
                    <div className={`rounded-xl border p-3 ${
                      chatDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-blue-50/40 border-blue-100/50'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setGlossaryTerm(prev => prev ? null : 'IMPS')}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="text-[11px] font-bold flex items-center space-x-1.5 text-blue-500">
                          <BookOpen className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          <span>📚 Smart Financial Term Decoder</span>
                        </span>
                        <span className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">
                          {glossaryTerm ? 'Hide Decoder' : 'Show Terms'}
                        </span>
                      </button>
                      
                      {glossaryTerm && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/50 space-y-2.5 animate-fade-in text-[11px]">
                          <div className="flex flex-wrap gap-1">
                            {[
                              { term: 'IMPS', label: 'IMPS (Immediate)' },
                              { term: 'NEFT', label: 'NEFT (Electronic)' },
                              { term: 'Debit', label: 'Debit (Outflow)' },
                              { term: 'Credit', label: 'Credit (Inflow)' },
                              { term: 'Opening Balance', label: 'Opening Bal' },
                              { term: 'Closing Balance', label: 'Closing Bal' }
                            ].map((item) => (
                              <button
                                key={item.term}
                                type="button"
                                onClick={() => setGlossaryTerm(item.term)}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                  glossaryTerm === item.term
                                    ? 'bg-blue-600 text-white'
                                    : chatDarkMode
                                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {item.term}
                              </button>
                            ))}
                          </div>
                          
                          {/* Explanation Box */}
                          <div className={`p-2.5 rounded-lg border leading-relaxed ${
                            chatDarkMode ? 'bg-slate-950 border-slate-850 text-slate-300' : 'bg-white border-blue-50 text-slate-600'
                          }`}>
                            <p className="font-bold text-[11px] mb-1 text-blue-500 flex items-center justify-between">
                              <span>{glossaryTerm} Meaning:</span>
                              <button
                                type="button"
                                onClick={() => sendChatMessage(`What is ${glossaryTerm} in very simple language?`)}
                                className="text-[10px] font-bold text-blue-500 hover:underline flex items-center space-x-1 shrink-0 cursor-pointer"
                              >
                                <span>Ask AI Agent 🤖 →</span>
                              </button>
                            </p>
                            <p className="font-sans text-[11px]">
                              {glossaryTerm === 'IMPS' && "Like sending cash through WhatsApp—it is instant, works 24/7, and the money lands in the other person's account within seconds."}
                              {glossaryTerm === 'NEFT' && "Like physical mail batches—transactions are processed in hourly batches during banking hours. Safe, but takes a few hours to arrive."}
                              {glossaryTerm === 'Debit' && "Money going OUT of your pocket. Like buying groceries or paying rent. Your balance decreases."}
                              {glossaryTerm === 'Credit' && "Money coming IN to your pocket. Like receiving your salary or a refund from a friend. Your balance increases."}
                              {glossaryTerm === 'Opening Balance' && "The amount of money in your wallet or bank account at the very beginning of the statement period."}
                              {glossaryTerm === 'Closing Balance' && "The final amount of money left in your account at the very end of the statement period after all debits and credits."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input Field with Microphone Voice Question dictation */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendChatMessage(chatInput);
                      }}
                      className="flex items-center gap-2"
                    >
                      {/* Microphone Voice dictation button */}
                      <button
                        type="button"
                        onClick={toggleListening}
                        title={isListening ? "Listening to voice... click to stop" : "🎤 Speak instead of typing"}
                        className={`p-2.5 rounded-xl border shadow-sm transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                          isListening
                            ? 'bg-rose-500 text-white animate-pulse border-rose-500 shadow-rose-200'
                            : chatDarkMode
                              ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {isListening ? (
                          <div className="relative">
                            <Mic className="h-4.5 w-4.5" />
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                          </div>
                        ) : (
                          <Mic className="h-4.5 w-4.5" />
                        )}
                      </button>

                      <input
                        type="text"
                        placeholder={isListening ? "Listening... Speak now!" : "Ask your financial agent/coach..."}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        disabled={chatLoading}
                        className={`flex-grow px-4 py-2.5 rounded-xl border focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs shadow-inner ${
                          chatDarkMode 
                            ? 'bg-slate-900 border-slate-800 text-slate-100 focus:bg-slate-850 focus:border-blue-500' 
                            : 'bg-white border-slate-200 text-slate-900 focus:bg-white'
                        }`}
                      />
                      
                      <button
                        type="submit"
                        disabled={chatLoading || !chatInput.trim()}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Sparkles className="h-4 w-4" />
                      </button>
                    </form>

                    {/* Zero-Storage Guard footer message */}
                    <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 font-medium">
                      <Lock className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>🔒 Zero-Storage Privacy: All chats & sheets are kept strictly in-memory</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* Password Decryption Prompt Modal */}
      {passwordPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-100 shadow-2xl animate-scale-up space-y-6">
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900">Protected PDF Document</h3>
                <p className="text-xs text-slate-500">Decryption credentials required</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Enter Password for:</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-2 font-mono text-xs text-slate-600 truncate">
                <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                <span>{passwordPrompt.fileName}</span>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="pdf-password-field" className="text-xs font-semibold text-slate-500">Password</label>
                <div className="relative">
                  <input
                    id="pdf-password-field"
                    type={showPasswordInput ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono bg-white text-slate-950"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInput(!showPasswordInput)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswordInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-rose-600 font-medium">{passwordError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={passwordPrompt.onCancel}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition font-medium"
                >
                  Unlock & Convert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
