/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Transaction, BankStatementSummary, BlogPost, FaqItem } from '../types';

export interface BankTemplate {
  id: string;
  name: string;
  summary: BankStatementSummary;
  transactions: Transaction[];
}

export const BANK_TEMPLATES: BankTemplate[] = [
  {
    id: 'chase',
    name: 'Chase Business Classic',
    summary: {
      bankName: 'Chase Bank N.A.',
      accountNumber: '•••• •••• 9284',
      statementPeriod: 'June 01, 2026 - June 30, 2026',
      startingBalance: 14250.32,
      endingBalance: 28412.95,
      totalDeposits: 22450.00,
      totalWithdrawals: 8287.37,
      currency: 'USD',
      transactionsCount: 9,
    },
    transactions: [
      { id: 'tx-1', date: '2026-06-02', description: 'STRIPE TRANSFER ST-829371', category: 'Revenue', reference: 'REF-83921', deposit: 4850.00, withdrawal: null, balance: 19100.32 },
      { id: 'tx-2', date: '2026-06-05', description: 'AMAZON WEB SERVICES AWS.AMAZON.CO', category: 'Software & Hosting', reference: 'REF-28491', deposit: null, withdrawal: 428.50, balance: 18671.82 },
      { id: 'tx-3', date: '2026-06-08', description: 'GOOGLE WORKSPACE GSUITE_BIZ', category: 'Office Operations', reference: 'REF-92048', deposit: null, withdrawal: 72.00, balance: 18599.82 },
      { id: 'tx-4', date: '2026-06-12', description: 'DEPOSIT - INCOMING WIRE FROM CLIENT ACME', category: 'Revenue', reference: 'REF-11239', deposit: 12500.00, withdrawal: null, balance: 31099.82 },
      { id: 'tx-5', date: '2026-06-15', description: 'STARBUCKS COFFEE SEATTLE WA', category: 'Meals & Entertainment', reference: 'REF-59302', deposit: null, withdrawal: 18.45, balance: 31081.37 },
      { id: 'tx-6', date: '2026-06-18', description: 'LANDLORD PROPERTIES RENT PAYMENT', category: 'Rent & Lease', reference: 'REF-48201', deposit: null, withdrawal: 3200.00, balance: 27881.37 },
      { id: 'tx-7', date: '2026-06-22', description: 'STRIPE TRANSFER ST-992013', category: 'Revenue', reference: 'REF-39210', deposit: 5100.00, withdrawal: null, balance: 32981.37 },
      { id: 'tx-8', date: '2026-06-25', description: 'WURKFORCE PAYROLL PR-882193', category: 'Salaries & Wages', reference: 'REF-20184', deposit: null, withdrawal: 4500.00, balance: 28481.37 },
      { id: 'tx-9', date: '2026-06-28', description: 'ADOBE SYSTEMS CREATIVE CLOUD', category: 'Software & Hosting', reference: 'REF-55102', deposit: null, withdrawal: 68.42, balance: 28412.95 }
    ]
  },
  {
    id: 'boa',
    name: 'Bank of America Advantage',
    summary: {
      bankName: 'Bank of America, N.A.',
      accountNumber: '•••• •••• 4410',
      statementPeriod: 'May 10, 2026 - June 09, 2026',
      startingBalance: 4520.10,
      endingBalance: 12152.60,
      totalDeposits: 11150.00,
      totalWithdrawals: 3517.50,
      currency: 'USD',
      transactionsCount: 7,
    },
    transactions: [
      { id: 'tx-101', date: '2026-05-12', description: 'MERCHANT DEPOSIT FROM SQUARE INC', category: 'Revenue', reference: 'SQ-9920', deposit: 3450.00, withdrawal: null, balance: 7970.10 },
      { id: 'tx-102', date: '2026-05-15', description: 'GITHUB GITHUB-PRO ACCNT', category: 'Software & Hosting', reference: 'GH-8219', deposit: null, withdrawal: 24.00, balance: 7946.10 },
      { id: 'tx-103', date: '2026-05-20', description: 'INTERNET UTILITIES FIBER COM', category: 'Utilities', reference: 'UT-3829', deposit: null, withdrawal: 143.50, balance: 7802.60 },
      { id: 'tx-104', date: '2026-05-25', description: 'INCOMING ACH CUSTOMER PAYMENT ACC', category: 'Revenue', reference: 'ACH-482', deposit: 7700.00, withdrawal: null, balance: 15502.60 },
      { id: 'tx-105', date: '2026-05-29', description: 'OFFICE DEPOT SUPPLIES CORP', category: 'Office Operations', reference: 'OD-2940', deposit: null, withdrawal: 285.00, balance: 15217.60 },
      { id: 'tx-106', date: '2026-06-02', description: 'FACEBOOK ADS FB-88291039', category: 'Advertising & Marketing', reference: 'FB-9302', deposit: null, withdrawal: 3000.00, balance: 12217.60 },
      { id: 'tx-107', date: '2026-06-05', description: 'BANK OF AMERICA SERVICE CHARGE', category: 'Bank Fees', reference: 'FE-8819', deposit: null, withdrawal: 65.00, balance: 12152.60 }
    ]
  },
  {
    id: 'hsbc',
    name: 'HSBC Corporate Premium',
    summary: {
      bankName: 'HSBC Bank USA, N.A.',
      accountNumber: '•••• •••• 8820',
      statementPeriod: 'June 01, 2026 - June 30, 2026',
      startingBalance: 68140.00,
      endingBalance: 81840.00,
      totalDeposits: 25000.00,
      totalWithdrawals: 11300.00,
      currency: 'GBP',
      transactionsCount: 6,
    },
    transactions: [
      { id: 'tx-201', date: '2026-06-04', description: 'INCOMING SEPA BANK TRANSFER', category: 'Revenue', reference: 'SEPA-819', deposit: 15000.00, withdrawal: null, balance: 83140.00 },
      { id: 'tx-202', date: '2026-06-08', description: 'HEROKU DYNOS HOSTING BILL', category: 'Software & Hosting', reference: 'HK-9381', deposit: null, withdrawal: 350.00, balance: 82790.00 },
      { id: 'tx-203', date: '2026-06-12', description: 'GLOBAL TRAVEL FLIGHTS BRUSSELS', category: 'Travel & Transport', reference: 'TR-1192', deposit: null, withdrawal: 950.00, balance: 81840.00 },
      { id: 'tx-204', date: '2026-06-18', description: 'CONSULTING SERVICES OUTSOURCE', category: 'Professional Services', reference: 'CS-8831', deposit: null, withdrawal: 10000.00, balance: 71840.00 },
      { id: 'tx-205', date: '2026-06-25', description: 'CLIENT DEPOSIT INWARD CREDIT', category: 'Revenue', reference: 'CL-9201', deposit: 10000.00, withdrawal: null, balance: 81840.00 }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How AI Is Revolutionizing Bank Reconciliation for SMBs',
    excerpt: 'Traditional bank reconciliation is slow and highly prone to human error. Discover how computer vision and LLMs are transforming bookkeeping.',
    content: `Bank reconciliation is the cornerstone of healthy financial management. Yet, for many small and medium-sized businesses (SMBs), it remains a dreaded monthly chore. Accounting teams spend hours manually matching paper or PDF bank statements with their internal ledgers, searching for tiny discrepancies that can ruin audits.

### The Old Way: Manual Labor and Stress

For decades, the standard procedure involved:
1. Downloading PDF statements from various bank accounts.
2. Manually keying transactions into spreadsheets or legacy ERP systems.
3. Checking off items one-by-one.
4. Dealing with truncated descriptions, ambiguous codes, and missing reference numbers.

This process is not only boring but highly prone to data entry errors, which can lead to faulty tax filings or incorrect cash flow reporting.

### Enter AI-Powered Statement Converters

Modern AI Bank Statement Converters, like StatementAI, utilize advanced Optical Character Recognition (OCR), Layout-Aware LLMs, and intelligent validation algorithms to turn flat PDF files into perfectly formatted spreadsheets in seconds.

#### 1. Smart Layout Detection
Unlike standard text extractors that scramble tables, layout-aware AI reads the PDF just like a human eye does. It understands where headers start, how credit and debit columns are divided, and links corresponding dates and descriptions accurately.

#### 2. Automatic Categorization
By leveraging natural language understanding, the AI automatically categorizes transactions. It knows that "AMAZON WEB SERVICES" belongs to *Software & Hosting* and "STARBUCKS" is a *Meal & Entertainment* expense, saving hours of manual tagging.

#### 3. Error Checking and Integrity Audits
AI models mathematically verify that the starting balance plus the sum of all deposits, minus the sum of all withdrawals, exactly equals the closing balance. If a line is skipped or scanned incorrectly, the AI instantly highlights the exact spot for rapid manual correction.

### Conclusion

By adopting an AI-driven bank statement converter, businesses can reduce reconciliation times by up to **90%**, eliminate expensive human transcription errors, and gain real-time visibility into their cash flow. It is no longer a luxury; it is a vital standard for modern financial operations.`,
    author: 'Sarah Jenkins, CPA',
    date: 'July 14, 2026',
    readTime: '5 min read',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-2',
    title: 'The Hidden Risks of Using Free PDF-to-Excel Converters',
    excerpt: 'Uploading sensitive corporate bank statements to unsecured online converters could expose your bank accounts and violate strict privacy regulations.',
    content: `When you need a quick way to convert a bank statement, it is tempting to search for a "free PDF to Excel converter" and click the first result. However, when it comes to financial documents, "free" often comes with hidden dangers that could cost your business dearly.

### 1. Data Privacy and Storage Concerns
Unsecured free converter sites often fund their servers by storing and mining your uploaded files. Bank statements contain:
- Complete account numbers
- Legal business names and addresses
- Vendor lists and payment cycles
- Precise financial metrics and cash flow status

If this data is leaked or sold to advertising networks, your business could become a target for spear-phishing campaigns, corporate espionage, or fraud.

### 2. Strict Compliance Failures (GDPR, SOC2, HIPAA)
If your business handles European customer transactions, is HIPAA-regulated, or is aiming for SOC2 certification, uploading files to unauthorized third-party processors is a serious compliance violation. You could face hefty fines for failing to protect corporate and customer records.

### 3. Scrambled Columns and Unreliable Balances
Standard converters do not understand financial schemas. They treat bank statements like generic text documents. This leads to:
- Debits and credits merged into a single column.
- Truncated transaction descriptions lost in conversion.
- Decimal points shifted or omitted.
- Missing dates and misaligned rows.

You will spend more time clean-up and correcting the Excel sheet than you would have spent doing it manually.

### How StatementAI Protects Your Security
StatementAI was designed with enterprise-grade security as its top priority:
- **No File Logging option**: Statements are processed in volatile RAM memory and immediately wiped.
- **Bank-grade 256-bit SSL encryption** in transit and at rest.
- **GDPR and SOC2 compliance** framework.
- **Accurate Financial Parsing**: Built specifically for banks, understanding financial ledgers and executing structural balance validation.

Your financial data is too sensitive to trust with generic online tools. Choose security and accuracy.`,
    author: 'Marcus Vance, Cybersecurity Director',
    date: 'June 28, 2026',
    readTime: '4 min read',
    category: 'Security',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-3',
    title: 'A Guide to Tax Preparation: Automating Expense Tracking',
    excerpt: 'Tax season does not have to be painful. Learn how automated bank statement conversion streamlines write-offs and saves CPA expenses.',
    content: `Every spring, millions of business owners experience the same panic: scrambling to find receipt files, organizing bank statement PDFs, and categorizing thousands of transactions to claim maximum tax write-offs. 

By automating your expense tracking before tax season, you can secure valuable deductions and save thousands of dollars in professional CPA hourly rates.

### The Checklist for Stress-Free Tax Prep

To ensure a smooth filing process, you need to collect and structure your records into a clean ledger. Here are the crucial steps:

1. **Convert All Statement Formats Into One Standard Spreadsheet**:
   Different bank accounts and credit cards issue different statement layouts. Convert them all into a unified CSV structure using a smart converter. This allows you to combine and sort all transactions chronologically.

2. **Tag Deductible Categories Immediately**:
   Ensure categories correspond to tax return schedules (e.g., Office Supplies, Utilities, Travel, Meals). This prevents your CPA from having to ask about individual line items at $150/hour.

3. **Reconcile End-of-Year Balances**:
   Verify that your spreadsheets match the bank’s certified starting and ending balances for the fiscal year. Any missing transaction can trigger an audit or result in a missed deduction.

### How StatementAI Accelerates Tax Prep

StatementAI is the perfect companion for tax preparation. It automatically structures messy PDFs from Chase, Wells Fargo, SVB, and hundreds of global banks into a single unified spreadsheet format, complete with tax-ready categories and reference lookups. 

Start automating your bookkeeping today, and make tax panic a thing of the past.`,
    author: 'Elena Rostova, Senior Tax consultant',
    date: 'May 15, 2026',
    readTime: '6 min read',
    category: 'Finance',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How accurate is the StatementAI converter?',
    answer: 'StatementAI achieves over 99.5% accuracy on standard PDF bank statements. Our proprietary parser understands financial table structures, dual-column and single-column debit/credit systems, multi-page breaks, and automatically executes double-entry audits to verify that the ending balance matches transaction calculations exactly.',
    category: 'Accuracy'
  },
  {
    id: 'faq-2',
    question: 'Is my financial data secure?',
    answer: 'Absolutely. Security is our absolute priority. We use bank-grade 256-bit SSL encryption for all file transfers. We never share or sell your statements. In addition, you can choose to turn on "Zero Storage Mode," which processes files entirely in memory and permanently deletes them from our servers the millisecond you download your file.',
    category: 'Security'
  },
  {
    id: 'faq-3',
    question: 'Which banks are supported?',
    answer: 'StatementAI supports over 10,000 global banks including Chase, Wells Fargo, Bank of America, HSBC, Barclays, Citibank, Capital One, Silicon Valley Bank, Revolut, and Wise. We support formats in English, Spanish, German, French, Italian, and Portuguese.',
    category: 'Compatibility'
  },
  {
    id: 'faq-4',
    question: 'Does StatementAI support scanned, low-quality, or tilted PDFs?',
    answer: 'Yes! StatementAI is equipped with advanced layout-aware Optical Character Recognition (OCR) that can digitize scanned documents, mobile photos of bank sheets, and skewed or faded printouts. It corrects skew angles and increases contrast automatically before reading.',
    category: 'Technology'
  },
  {
    id: 'faq-5',
    question: 'Can I export to accounting software like QuickBooks or Xero?',
    answer: 'Yes. Our generated Excel, CSV, and JSON structures are fully compliant with QuickBooks, Xero, Wave, and Sage. You can easily import our standard CSV layouts directly into your preferred ledger without reformatting.',
    category: 'Integration'
  },
  {
    id: 'faq-6',
    question: 'Is there a limit on file size or page count?',
    answer: 'Our standard converter can easily handle files of up to 100 pages and 50MB. For enterprise clients with massive historical statements (e.g. 500+ pages of quarterly statements), our batch converter is available to split and process them simultaneously.',
    category: 'Pricing & Limits'
  }
];

export const TESTIMONIALS = [
  {
    quote: "StatementAI saves our accounting firm over 40 hours of manual data entry every single month. The transaction accuracy and automatic categorization are unmatched.",
    author: "Robert Kowalski",
    role: "Managing Partner, RK Advisors LLC",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "I tried five different online converters, and they all produced completely scrambled tables. StatementAI was the only one that perfectly parsed our multi-page bank statements.",
    author: "Lina Chen",
    role: "Founder, Bloom Logistics",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "The Zero Storage mode is a game-changer. Our strict security guidelines forbid us from hosting client financial data on third-party sites, but StatementAI's volatile processing lets us convert securely.",
    author: "Dominic Thorne",
    role: "Chief Compliance Officer, FinGuard",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];
